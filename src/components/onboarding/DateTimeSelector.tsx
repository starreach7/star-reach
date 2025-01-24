import React, { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, X, Plus, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface TimeSlot {
  start: string;
  end: string;
}

interface DateAvailability {
  date: string;
  timeSlots: TimeSlot[];
}

const DateTimeSelector = ({ setFieldValue }: any) => {
  const [selectedDates, setSelectedDates] = useState<DateAvailability[]>([]);
  const [showDateModal, setShowDateModal] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [errorModal, setErrorModal] = useState({ show: false, message: '' });

  const handleAddDate = () => {
    if (!newDate) return;

    setSelectedDates([...selectedDates, { date: newDate, timeSlots: [] }]);
    setShowDateModal(false);
    setNewDate('');
  };

  const handleRemoveDate = (dateToRemove: string) => {
    setSelectedDates(selectedDates.filter((d) => d.date !== dateToRemove));
  };

 const handleAddTimeSlot = (date: string) => {
  setSelectedDates((prev) =>
    prev.map((d) => {
      if (d.date === date) {
        const lastSlot = d.timeSlots[d.timeSlots.length - 1];

        let newStart: Date;
        let newEnd: Date;

        if (lastSlot) {
          // Calculate the next time slot based on the last slot
          const lastEndTime = new Date(`1970-01-01T${lastSlot.end}:00`);
          newStart = new Date(lastEndTime.getTime());
          newEnd = new Date(newStart.getTime() + 15 * 60 * 1000); // Add 15 minutes
        } else {
          // Default to 09:00 - 09:15 if no slots exist
          newStart = new Date(`1970-01-01T09:00:00`);
          newEnd = new Date(newStart.getTime() + 15 * 60 * 1000);
        }

        const formattedStart = newStart.toTimeString().slice(0, 5);
        const formattedEnd = newEnd.toTimeString().slice(0, 5);

        // Check if the new time slot overlaps with any existing ones
        const isConflict = d.timeSlots.some((slot) => {
          const existingStart = new Date(`1970-01-01T${slot.start}:00`);
          const existingEnd = new Date(`1970-01-01T${slot.end}:00`);

          return (
            (newStart >= existingStart && newStart < existingEnd) || // New start overlaps
            (newEnd > existingStart && newEnd <= existingEnd) || // New end overlaps
            (newStart <= existingStart && newEnd >= existingEnd) // New slot completely overlaps
          );
        });

        if (isConflict) {
          setErrorModal({
            show: true,
            message: 'No available time slots. Please adjust existing slots.',
          });
          return d; // Keep the state unchanged
        }

        return {
          ...d,
          timeSlots: [...d.timeSlots, { start: formattedStart, end: formattedEnd }],
        };
      }
      return d;
    })
  );
};

  const handleRemoveTimeSlot = (date: string, index: number) => {
    setSelectedDates((prev) =>
      prev.map((d) =>
        d.date === date
          ? { ...d, timeSlots: d.timeSlots.filter((_, i) => i !== index) }
          : d
      )
    );
  };

  const handleTimeChange = (date: string, index: number, field: 'start' | 'end', value: string) => {
    setSelectedDates((prev) =>
      prev.map((d) => {
        if (d.date === date) {
          const updatedTimeSlots = d.timeSlots.map((slot, i) => {
            if (i === index) {
              const updatedSlot = { ...slot, [field]: value };
  
              let start = new Date(`1970-01-01T${updatedSlot.start}:00`);
              let end = new Date(`1970-01-01T${updatedSlot.end}:00`);
  
              if (field === 'start') {
                // Add 15 minutes to the start time
                const [hours, minutes] = updatedSlot.start.split(':').map(Number); // Extract hours and minutes from start time
                const startInMinutes = hours * 60 + minutes; // Convert start time to total minutes
                const endInMinutes = startInMinutes + 15; // Add 15 minutes
              
                // Convert end time back to "HH:mm" format
                const endHours = Math.floor(endInMinutes / 60);
                const endMinutes = endInMinutes % 60;
                updatedSlot.end = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
              }
              
              // Validate Time Slot Duration
            //   if (field === 'end' && end.getTime() - start.getTime() > 15 * 60 * 1000) {
            //     setErrorModal({
            //       show: true,
            //       message: 'Time slot cannot exceed 15 minutes.',
            //     });
            //     return slot; // Revert to previous value
            //   }
  
              // Validate Overlap with Other Time Slots
              const isConflict = d.timeSlots.some((existingSlot, idx) => {
                if (idx !== index) {
                  const existingStart = new Date(`1970-01-01T${existingSlot.start}:00`);
                  // Compare the time values
                  return existingStart.getTime() === start.getTime();
                }
                return false;
              });
  
  
              if (isConflict) {
                setErrorModal({
                  show: true,
                  message: 'Time slot overlaps with an existing slot. Please choose another time.',
                });
                return slot; // Revert to previous value
              }
  
              return updatedSlot;
            }
            return slot;
          });
  
          return { ...d, timeSlots: updatedTimeSlots };
        }
        return d;
      })
    );
  };
  

  const closeErrorModal = () => {
    setErrorModal({ show: false, message: '' });
  };

  useEffect(() => {
    setFieldValue('availability', selectedDates)
  }, [selectedDates])
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Meeting Availability</h3>
        <button
          type="button"
          onClick={() => setShowDateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Date
        </button>
      </div>

      {/* Selected Dates and Time Slots */}
      <div className="space-y-6">
        {selectedDates.map((dateObj) => (
          <div
            key={dateObj.date}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary-400" />
                <span className="text-white font-medium">
                  {format(new Date(dateObj.date), 'MMMM d, yyyy')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveDate(dateObj.date)}
                className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {dateObj.timeSlots.map((slot, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="time"
                        value={slot.start}
                        onChange={(e) =>
                          handleTimeChange(dateObj.date, index, 'start', e.target.value)
                        }
                        className="w-full pl-10 px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="time"
                        value={slot.end}
                        disabled
                        onChange={(e) =>
                          handleTimeChange(dateObj.date, index, 'end', e.target.value)
                        }
                        className="w-full pl-10 px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveTimeSlot(dateObj.date, index)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddTimeSlot(dateObj.date)}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-600 hover:border-primary-500 text-gray-400 hover:text-primary-400 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Time Slot
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Error Modal */}
      {errorModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Error</h3>
              <button onClick={closeErrorModal} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-300">{errorModal.message}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeErrorModal}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding a Date */}
      {showDateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Select a Date</h3>
              <button onClick={() => setShowDateModal(false)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddDate}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelector;