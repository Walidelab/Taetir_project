import React from "react";
import { Users, Clock, TrendingUp } from "lucide-react";
import WelcomeCard from "./WelcomeCard";
import StatsCard from "./StatsCard";
import RatingWidget from "./RatingWidget";
import RecentSessions from "./RecentSessions";
import { USER_STATS } from "../utils/constants";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <WelcomeCard />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Active Mentors"
          value={`${USER_STATS.activeMentors.current}/${USER_STATS.activeMentors.total}`}
          icon={<Users size={24} />}
          color="blue"
        />
        <StatsCard
          title="Completed Sessions"
          value={USER_STATS.completedSessions}
          icon={<Clock size={24} />}
          color="green"
        />
        <StatsCard
          title="Average Session Duration"
          value={USER_STATS.averageSessionDuration}
          icon={<TrendingUp size={24} />}
          color="purple"
        />
      </div>

      {/* Rating and Recent Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RatingWidget rating={USER_STATS.rating} />
        </div>
        <div className="lg:col-span-2">
          <RecentSessions />
        </div>
      </div>
    </div>
  );
}
