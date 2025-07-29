import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Filter, Calendar } from 'lucide-react';
import { SAMPLE_FEEDBACKS } from '../utils/constants';
import { Feedback } from '../types';

export default function Feedbacks() {
  const [feedbacks] = useState<Feedback[]>(SAMPLE_FEEDBACKS);
  const [filter, setFilter] = useState<'all' | 'given' | 'received'>('all');

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const averageRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Feedbacks</h1>
        <p className="text-gray-600">View and manage session feedback and reviews</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{feedbacks.length}</p>
            </div>
            <MessageSquare className="text-blue-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                <div className="flex">
                  {renderStars(Math.round(averageRating))}
                </div>
              </div>
            </div>
            <Star className="text-yellow-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">5-Star Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{feedbacks.filter(f => f.rating === 5).length}</p>
            </div>
            <ThumbsUp className="text-green-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{feedbacks.filter(f => new Date(f.date).getMonth() === new Date().getMonth()).length}</p>
            </div>
            <Calendar className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = feedbacks.filter(f => f.rating === rating).length;
            const percentage = feedbacks.length > 0 ? (count / feedbacks.length) * 100 : 0;
            
            return (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm font-medium">{rating}</span>
                  <Star className="text-yellow-400 fill-current" size={14} />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All Feedback' },
              { id: 'given', label: 'Given by Me' },
              { id: 'received', label: 'Received' },
            ].map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterOption.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h3>
        <div className="space-y-6">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-start space-x-4">
                <img
                  src={feedback.mentorAvatar}
                  alt={feedback.mentorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{feedback.mentorName}</h4>
                      <p className="text-sm text-gray-600">{feedback.sessionTitle}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        {renderStars(feedback.rating)}
                      </div>
                      <p className="text-sm text-gray-500">{new Date(feedback.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{feedback.comment}</p>
                  
                  {feedback.response && (
                    <div className="bg-gray-50 rounded-lg p-3 mt-3">
                      <p className="text-sm font-medium text-gray-900 mb-1">Mentor Response:</p>
                      <p className="text-sm text-gray-700">{feedback.response}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 mt-3">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Reply
                    </button>
                    <button className="text-sm text-gray-600 hover:text-gray-800">
                      Share
                    </button>
                    <button className="text-sm text-gray-600 hover:text-gray-800">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}