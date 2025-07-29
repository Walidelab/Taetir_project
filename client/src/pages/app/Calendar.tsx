import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Video,
  MapPin,
  User,
} from "lucide-react";
import { SAMPLE_CALENDAR_EVENTS } from "@/utils/constants";
import type { CalendarEvent } from "@/utils/types";
import NewSessionButton from "./Newsession";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState<CalendarEvent[]>(SAMPLE_CALENDAR_EVENTS);
  const [view, setView] = useState<"month" | "week" | "day">("month");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const getEventTypeColor = (type: string) => {
    return (
      {
        session: "bg-blue-500",
        meeting: "bg-green-500",
        review: "bg-purple-500",
      }[type] || "bg-gray-500"
    );
  };

  const getStatusColor = (status: string) => {
    return (
      {
        confirmed: "border-green-500 bg-green-50",
        pending: "border-yellow-500 bg-yellow-50",
        cancelled: "border-red-500 bg-red-50",
      }[status] || "border-gray-300 bg-gray-50"
    );
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Calendar</h1>
          <p className="text-gray-500 text-sm">Track your sessions </p>
        </div>
        <NewSessionButton />
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-md border p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth("next")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex gap-2">
          {["month", "week", "day"].map((viewType) => (
            <button
              key={viewType}
              onClick={() => setView(viewType as any)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                view === viewType
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-sm">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-gray-500 font-medium py-2 bg-gray-50 rounded-lg"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-[100px] p-2 border rounded-xl ${
              day ? "bg-white hover:bg-gray-50" : "bg-gray-50 text-transparent"
            } transition`}
          >
            {day && (
              <>
                <div className="text-gray-800 font-semibold mb-1">{day}</div>
                <div className="space-y-1">
                  {getEventsForDate(day).map((event) => (
                    <div
                      key={event.id}
                      className={`p-1 rounded text-xs text-white truncate ${getEventTypeColor(
                        event.type
                      )}`}
                      title={`${event.title} with ${event.mentorName} at ${event.time}`}
                    >
                      {event.time} {event.title}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-2xl shadow-md border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Upcoming Events
        </h3>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className={`p-4 rounded-xl border-l-4 ${getStatusColor(
                event.status
              )} transition-shadow hover:shadow-sm`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getEventTypeColor(
                        event.type
                      )}`}
                    ></div>
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <span
                      className={`text-xs rounded-full px-2 py-0.5 ${
                        event.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : event.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }
                    `}
                    >
                      {event.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User size={14} /> {event.mentorName}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} /> {event.time} ({event.duration}min)
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Join
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}