import React from 'react';
import { Clock, Calendar, Star, User } from 'lucide-react';
import { RECENT_SESSIONS } from '../utils/constants';

export default function RecentSessions() {
  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'completed':
        return <Clock size={16} className="text-green-600" />;
      case 'scheduled':
        return <Calendar size={16} className="text-blue-600" />;
      case 'review':
        return <Star size={16} className="text-yellow-600" />;
      default:
        return <User size={16} className="text-gray-600" />;
    }
  };

  const getSessionColor = (type: string) => {
    switch (type) {
      case 'completed':
        return 'border-l-green-500 bg-green-50';
      case 'scheduled':
        return 'border-l-blue-500 bg-blue-50';
      case 'review':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Sessions</h3>
      
      <div className="space-y-4">
        {RECENT_SESSIONS.map((session) => (
          <div
            key={session.id}
            className={`border-l-4 p-4 rounded-r-lg ${getSessionColor(session.type)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {getSessionIcon(session.type)}
                  <h4 className="font-medium text-gray-900">{session.mentorName}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-1">{session.title}</p>
                <p className="text-xs text-gray-500">{session.time}</p>
              </div>
              
              {session.rating && (
                <div className="flex items-center space-x-1">
                  {[...Array(session.rating)].map((_, index) => (
                    <Star
                      key={index}
                      size={12}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
        View All Sessions
      </button>
    </div>
  );
}