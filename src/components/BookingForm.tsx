import React, { useState } from 'react';
import { Calendar, Clock, Shield, Building2, Users, Video, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface TimeSlot {
  morning: string[];
  afternoon: string[];
}

interface AvailableSlots {
  [key: string]: TimeSlot;
}

interface BookingFormProps {
  type: 'personal' | 'business' | 'meeting';
  celebrity: {
    name: string;
    prices: {
      personal: number;
      business: number;
      meeting: number;
    };
  };
  availableSlots?: AvailableSlots;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  type, 
  celebrity,
  availableSlots = {} // Provide default empty object
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
  
    const today = new Date();
    const todayLocal = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  
    for (let i = 1; i <= daysInMonth; i++) {
      const localDate = new Date(year, month, i);
      const utcDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));
      
      days.push({
        date: i,
        fullDate: utcDate.toISOString().split('T')[0], // UTC date for backend lookup
        hasSlots: availableSlots[utcDate.toISOString().split('T')[0]] !== undefined,
        isToday: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}` === todayLocal
      });
    }
  
    return days;
  };

  const formatDisplayDate = (utcDate: string) => {
    const date = new Date(`${utcDate}T00:00:00Z`);
    return `${date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    })} (UTC) → ${date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })} (Your Time)`;
  };

  const handleDateSelect = (fullDate: string) => {
    setSelectedDate(fullDate);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const getTotalSlots = (date: string) => {
    if (!availableSlots[date]) return 0;
    const slots = availableSlots[date];
    return Object.values(slots).reduce((total, timeSlots) => total + timeSlots.length, 0);
  };

  const parseUTCTime = (timeStr: string) => {
    // Handles both "HH:mm" and "HH:mm AM/PM" formats
    const [timePart, modifier] = timeStr.split(' ');
    const [hoursStr, minutesStr] = timePart.split(':');
    
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
  
    if (modifier) {
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
    }
  
    return { hours, minutes };
  };
  
  const convertUTCTimeToLocal = (utcTime: string, selectedUTCDate: string) => {
    const { hours, minutes } = parseUTCTime(utcTime);
    const utcDateTime = new Date(`${selectedUTCDate}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00Z`);
    
    return {
      localTime: utcDateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      localDate: utcDateTime.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    };
  };
  



  const renderBookingTypeInfo = () => {
    if (type !== 'meeting') return null;
    
    return (
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-emerald-400" />
          Video Call Meeting
        </h3>
        <div className="grid gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-white font-medium">15-minute private session</p>
              <p className="text-gray-400 text-sm">One-on-one video call with {celebrity.name}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-white font-medium">Flexible scheduling</p>
              <p className="text-gray-400 text-sm">Choose from available time slots</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(currentMonth);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const newDate = new Date(currentMonth);
                newDate.setMonth(currentMonth.getMonth() - 1);
                setCurrentMonth(newDate);
              }}
              className="p-2 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
              disabled={currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                const newDate = new Date(currentMonth);
                newDate.setMonth(currentMonth.getMonth() + 1);
                setCurrentMonth(newDate);
              }}
              className="p-2 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const isSelected = selectedDate === day.fullDate;
            const isAvailable = day.hasSlots;
            const isPast = new Date(day.fullDate) < today;
            const totalSlots = getTotalSlots(day.fullDate);

            return (
              <button
                key={day.date}
                onClick={() => isAvailable && !isPast && handleDateSelect(day.fullDate)}
                disabled={!isAvailable || isPast}
                className={`
                  relative aspect-square rounded-lg flex flex-col items-center justify-center transition-all
                  ${isSelected ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-gray-900' : ''}
                  ${
                    isAvailable && !isPast
                      ? isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transform'
                      : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                  }
                  ${day.isToday ? 'ring-2 ring-yellow-500' : ''}
                `}
              >
                <span className={`text-sm font-medium ${isSelected ? 'text-white' : ''}`}>
                  {day.date}
                </span>
                {isAvailable && !isPast && (
                  <div className="flex flex-col items-center">
                    <span className={`text-xs ${isSelected ? 'text-white' : 'text-emerald-400'} font-medium`}>
                      {totalSlots} slots
                    </span>
                    {day.isToday && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-500 rounded-full"></span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimeSlots = () => {
    if (!selectedDate || !availableSlots[selectedDate]) return null;
    const slots = availableSlots[selectedDate];

    return (
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Available Times</h3>
          <span className="text-emerald-400 text-sm font-medium">{formatDisplayDate(selectedDate)}</span>
        </div>

        <div className="space-y-6">
          {Object.entries(slots).map(([period, times]) => (
            <div key={period}>
              <h4 className="text-sm font-medium text-gray-400 mb-3 capitalize">{period}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
{times.map((time: string) => {
  const { localTime, localDate } = convertUTCTimeToLocal(time, selectedDate);
  const isDifferentDate = localDate !== new Date(selectedDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <button
      key={time}
      onClick={() => handleTimeSelect(time)}
      className={`
        p-4 rounded-lg text-sm font-medium transition-all duration-200
        ${selectedTime === time 
          ? 'bg-emerald-600 text-white ring-2 ring-emerald-500 ring-offset-2 ring-offset-gray-900 scale-105 transform' 
          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transform'
        }
      `}
    >
      <Clock className="w-4 h-4 mx-auto mb-2" />
      {localTime}
      {isDifferentDate && (
        <span className="block text-xs text-gray-400 mt-1">
          ({localDate})
        </span>
      )}
    </button>
  );
})}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderBookingTypeInfo()}

      {type === 'meeting' ? (
        <>
          {renderCalendar()}
          {renderTimeSlots()}
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {type === 'business' ? 'Business/Organization Name' : 'Who is this for?'}
            </label>
            <input
              type="text"
              placeholder={type === 'business' ? 'Enter business name' : "Enter recipient's name"}
              className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          {type === 'business' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Business Contact Email
              </label>
              <input
                type="email"
                placeholder="Enter business email"
                className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
          )}
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Message for {celebrity.name.split(' ')[0]}
        </label>
        <textarea
          rows={4}
          placeholder={
            type === 'meeting'
              ? 'What would you like to discuss in the meeting?'
              : type === 'business'
              ? 'Describe your business needs and how you plan to use the video'
              : 'What should they say or do in the video?'
          }
          className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
        />
      </div>

      <div className="flex items-center justify-between py-4 border-t border-gray-700">
        <span className="text-gray-300">
          {type === 'meeting' ? 'Meeting Rate (15 mins)' : type === 'business' ? 'Business Rate' : 'Personal Rate'}
        </span>
        <span className="text-2xl font-bold text-white">
          ${celebrity.prices[type]}
        </span>
      </div>

      <button 
        className={`w-full py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
          type === 'meeting' && (!selectedDate || !selectedTime)
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 transform hover:scale-[1.02]'
        }`}
        disabled={type === 'meeting' && (!selectedDate || !selectedTime)}
      >
        {type === 'meeting' ? (
          <>
            <Video className="w-5 h-5" />
            {selectedDate && selectedTime 
              ? `Schedule Meeting for ${formatDisplayDate(selectedDate)} at ${selectedTime}` 
              : 'Select a date and time'}
          </>
        ) : (
          <>
            {type === 'business' ? <Building2 className="w-5 h-5" /> : <Users className="w-5 h-5" />}
            Book {type === 'business' ? 'Business' : 'Personal'} Video
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
        <Shield className="w-4 h-4" />
        <span>Secure payment powered by Stripe</span>
      </div>
    </div>
  );
};

export default BookingForm;