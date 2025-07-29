import React, { useState } from "react";
import {
  Search,
  Filter,
  Star,
  Clock,
  DollarSign,
  Users,
  MapPin,
} from "lucide-react";
import { SAMPLE_MENTORS } from "../utils/constants";
import { Mentor } from "../types";

export default function FindMentors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [mentors] = useState<Mentor[]>(SAMPLE_MENTORS);

  const skills = [
    "All Skills",
    "Product Strategy",
    "Leadership",
    "Software Architecture",
    "UX Design",
    "Data Analysis",
  ];

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill =
      !selectedSkill ||
      selectedSkill === "All Skills" ||
      mentor.skills.some((skill) => skill.includes(selectedSkill));
    return matchesSearch && matchesSkill;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "available":
        return "Available";
      case "busy":
        return "Busy";
      case "offline":
        return "Offline";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Mentors</h1>
        <p className="text-gray-600">
          Discover experienced mentors to guide your professional journey
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search mentors by name, title, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              {skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>

            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={20} />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getAvailabilityColor(
                      mentor.availability
                    )}`}
                  ></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                  <p className="text-sm text-gray-600">{mentor.title}</p>
                  <p className="text-xs text-gray-500">{mentor.company}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  mentor.availability === "available"
                    ? "bg-green-100 text-green-800"
                    : mentor.availability === "busy"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {getAvailabilityText(mentor.availability)}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {mentor.bio}
            </p>

            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400 fill-current" size={16} />
                <span className="font-medium">{mentor.rating}</span>
                <span>({mentor.reviewCount})</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={16} />
                <span>{mentor.experience}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {mentor.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {mentor.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{mentor.skills.length - 3} more
                </span>
              )}
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Connect
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Users className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No mentors found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
}
