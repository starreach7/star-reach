import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Notification {
	id: string;
	userId: string;
	title: string;
	description: string;
	isRead: boolean;
	deepLink: boolean;
	createdAt: string;
	updatedAt: string;
}

interface NotificationState {
	notifications: Notification[];
	unreadCount: number;
	addNotification: (notification: Notification) => void;
	markNotificationAsRead: (id: string) => void;
	markAllAsRead: () => void;
	removeNotification: (id: string) => void;
	setInitialNotifications: (notifications: Notification[]) => void;
}

export const useNotificationStore = create<NotificationState>()(
	persist(
		(set, get) => ({
			notifications: [],
			unreadCount: 0,

			setInitialNotifications: (notifications) => {
				const unreadCount = notifications.filter((n) => !n.isRead).length;
				set({ notifications, unreadCount });
			},

			addNotification: (notification) => {
				set((state) => ({
					notifications: [notification, ...state.notifications],
					unreadCount: state.unreadCount + (notification.isRead ? 0 : 1),
				}));
			},

			markNotificationAsRead: (id) => {
				set((state) => {
					const notifications = state.notifications.map((n) =>
						n.id === id ? { ...n, isRead: true } : n
					);
					const unreadCount = notifications.filter((n) => !n.isRead).length;
					return { notifications, unreadCount };
				});
			},

			markAllAsRead: () => {
				set((state) => ({
					notifications: state.notifications.map((n) => ({
						...n,
						isRead: true,
					})),
					unreadCount: 0,
				}));
			},

	

			removeNotification: (id) => {
				set((state) => {
					const notification = state.notifications.find((n) => n.id === id);
					const notifications = state.notifications.filter((n) => n.id !== id);
					return {
						notifications,
						unreadCount:
							state.unreadCount -
							(notification && !notification.isRead ? 1 : 0),
					};
				});
			},
		}),
		{
			name: "notification-storage",
		}
	)
);
