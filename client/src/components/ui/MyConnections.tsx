import React, { useState } from 'react';
import { Users, Star, Clock, MessageCircle, Calendar, MoreVertical, UserPlus, UserCheck, UserX } from 'lucide-react';
import { SAMPLE_CONNECTIONS } from '../utils/constants';
import { Connection } from '../types';

export default function MyConnections() {
  const [connections] = useState<Connection[]>(SAMPLE_CONNECTIONS);
  const [activeTab, setActiveTab] = useState<'all' | 'mentors' | 'mentees' | 'pending'>('all');

  const filteredConnections = connections.filter(connection => {
    switch (activeTab) {
      case 'mentors': return connection.role === 'mentor';
      case 'mentees': return connection.role === 'mentee';
      case 'pending': return connection.status === 'pending';
      default: return true;
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <UserCheck className="text-green-600" size={16} />;
      case 'pending': return <Clock className="text-yellow-600" size={16} />;
      case 'requested': return <UserPlus className="text-blue-600" size={16} />;
      default: return <Users className="text-gray-600" size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'pending': return 'Pending';
      case 'requested': return 'Requested';
      default: return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'requested': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Connections</h1>
        <p className="text-gray-600">Manage your mentorship relationships and network</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Connections</p>
              <p className="text-2xl font-bold text-gray-900">{connections.length}</p>
            </div>
            <Users className="text-blue-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Mentors</p>
              <p className="text-2xl font-bold text-gray-900">{connections.filter(c => c.role === 'mentor' && c.status === 'connected').length}</p>
            </div>
            <Star className="text-yellow-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mentees</p>
              <p className="text-2xl font-bold text-gray-900">{connections.filter(c => c.role === 'mentee').length}</p>
            </div>
            <UserPlus className="text-green-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{connections.filter(c => c.status === 'pending').length}</p>
            </div>
            <Clock className="text-orange-600" size={24} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'all', label: 'All Connections', count: connections.length },
              { id: 'mentors', label: 'Mentors', count: connections.filter(c => c.role === 'mentor').length },
              { id: 'mentees', label: 'Mentees', count: connections.filter(c => c.role === 'mentee').length },
              { id: 'pending', label: 'Pending', count: connections.filter(c => c.status === 'pending').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Connections List */}
        <div className="p-6">
          <div className="space-y-4">
            {filteredConnections.map((connection) => (
              <div key={connection.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <img
                    src={connection.avatar}
                    alt={connection.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{connection.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="capitalize">{connection.role}</span>
                      <span>•</span>
                      <span>Last active {connection.lastActive}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(connection.status)}
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(connection.status)}`}>
                          {getStatusText(connection.status)}
                        </span>
                      </div>
                      {connection.status === 'connected' && (
                        <>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Calendar size={14} />
                            <span>{connection.sessionsCount} sessions</span>
                          </div>
                          {connection.rating && (
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <Star className="text-yellow-400 fill-current" size={14} />
                              <span>{connection.rating}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {connection.status === 'connected' && (
                    <>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <MessageCircle size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Calendar size={18} />
                      </button>
                    </>
                  )}
                  
                  {connection.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                        Accept
                      </button>
                      <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
                        Decline
                      </button>
                    </div>
                  )}
                  
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredConnections.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No connections found</h3>
              <p className="text-gray-600">Start building your network by connecting with mentors</p>
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Find Mentors
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}