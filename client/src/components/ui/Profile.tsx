import React, { useState } from "react";
import {
  Edit,
  Camera,
  MapPin,
  Calendar,
  Star,
  Award,
  BookOpen,
  Users,
  Clock,
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Mr S1",
    title: "Product Manager",
    location: "Casablanca,MA",
    bio: " I obt  to learn more about product management and leadership.",

    interests: ["Technology", "Design", "Entrepreneurship", "Innovation"],
    education: "COMPUTER Science AT AIAC",
    languages: ["English", "Arabic", "French"],
  });

  const stats = [
    {
      label: "Sessions Completed",
      value: "11",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      label: "Active Mentors",
      value: "3",
      icon: Users,
      color: "text-green-600",
    },
    {
      label: "Average Rating",
      value: "4.2",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      label: "Learning Hours",
      value: "24h",
      icon: BookOpen,
      color: "text-purple-600",
    },
  ];

  const achievements = [
    {
      title: "First Session",
      description: "Completed your first mentorship session",
      date: "2024-12-15",
      icon: Award,
    },
    {
      title: "Active Learner",
      description: "Completed 10+ sessions",
      date: "2025-01-10",
      icon: BookOpen,
    },
    {
      title: "Great Feedback",
      description: "Received 5-star rating from mentor",
      date: "2025-01-08",
      icon: Star,
    },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-gray-600">
              Manage your profile information and preferences
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit size={18} />
            <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera size={16} />
                  </button>
                )}
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      value={profileData.title}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {profileData.name}
                    </h2>
                    <p className="text-lg text-gray-700 mb-1">
                      {profileData.title}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin size={16} className="mr-1" />
                      <span>{profileData.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
            )}
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {isEditing && (
                <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-600 rounded-full text-sm hover:border-blue-300 hover:text-blue-600 transition-colors">
                  + Add Skill
                </button>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Achievements
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                    <achievement.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Statistics
            </h3>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <stat.icon className={stat.color} size={20} />
                    <span className="text-sm text-gray-600">{stat.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Experience
                </label>
                <p className="text-gray-900">{profileData.experience}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Education
                </label>
                <p className="text-gray-900">{profileData.education}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Languages
                </label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {profileData.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {profileData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
