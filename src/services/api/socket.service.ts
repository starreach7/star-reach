import { io, Socket } from "socket.io-client";
import { useNotificationStore } from "../../store/notificationStore";
import api from "./axios";

class SocketService {
	private socket: Socket | null = null;
	private initialized = false;

	async initialize(userId: string) {
		if (this.initialized) return;

		try {
			// Initialize socket connection
			this.socket = io(
				import.meta.env.VITE_SOCKET_URL || "https://starreach.onrender.com",
				{
					auth: {
						userId,
					},
					transports: ["websocket"],
				}
			);

			this.setupEventListeners();
			this.initialized = true;
		} catch (error) {
			console.error("Failed to initialize notifications:", error);
		}
	}

	private setupEventListeners() {
		if (!this.socket) return;

		// Connection events
		this.socket.on("connect", () => {
			console.log("Connected to socket server");
		});

		this.socket.on("disconnect", () => {
			console.log("Disconnected from socket server");
		});

		// Notification events
		this.socket.on("notification", (notification) => {
			const { setInitialNotifications } = useNotificationStore.getState();
			setInitialNotifications(notification);
		});

		this.socket.on("new-notification", (notification) => {
			const { addNotification } = useNotificationStore.getState();
			addNotification(notification);
		});

		

	}

	disconnect() {
		if (this.socket) {
			this.socket.disconnect();
			this.socket = null;
			this.initialized = false;
		}
	}

	// Mark a notification as read
	async markNotificationAsRead(notificationId: string) {
        try {
            // Send the read event to server with the notification ID
            this.socket?.emit("notification_read", notificationId);
            
            // Optimistically update the local state
            const { markNotificationAsRead } = useNotificationStore.getState();
            markNotificationAsRead(notificationId);

        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    }

	// Mark all notifications as read
	async markAllNotificationsAsRead() {
		try {
			await api.put("/user/notifications/read-all");
			const { markAllAsRead } = useNotificationStore.getState();
			markAllAsRead();
		} catch (error) {
			console.error("Failed to mark all notifications as read:", error);
		}
	}
}

export default new SocketService();
