import React from 'react';
import { Search as SearchIcon, Bell as BellIcon, Star as StarIcon, Users as UsersIcon, CheckCircle as CheckCircleIcon, Clock as ClockIcon, Video as VideoIcon, MessageSquare as MessageSquareIcon, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/AuthContext'; 
import { useState , useEffect } from 'react';
import api from '@/utils/axios';
import MotionCard from '@/components/common/MotionCard';
import WelcomeBanner from '@/components/common/WelcomeBanner';


interface DashboardStats {
  activeConnections: number;
  sessionsThisMonth: number;
  averageRating: number;
  connectionChangePercent: number;
  sessionChangePercent: number;
  ratingChange: number;
}

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
};

const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const DashboardSkeleton = () => (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen animate-pulse">
        <div className="flex justify-between items-center mb-8">
            <div>
                <div className="h-8 w-56 bg-gray-300 rounded-md"></div>
                <div className="h-4 w-64 bg-gray-200 rounded-md mt-2"></div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="h-56 bg-gray-200 rounded-2xl"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="h-28 bg-gray-200 rounded-2xl"></div>
                    <div className="h-28 bg-gray-200 rounded-2xl"></div>
                    <div className="h-28 bg-gray-200 rounded-2xl"></div>
                </div>
                <div className="h-72 bg-gray-200 rounded-2xl"></div>
            </div>
            <div className="lg:col-span-1 h-[500px] bg-gray-200 rounded-2xl"></div>
        </div>
    </div>
);




const DashboardHeader = ({ user, profile }: { user: any, profile: any }) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">{getGreeting()}, {profile?.first_name || user?.username || 'Guest'}!</h1>
            <p className="text-md text-gray-500">{getCurrentDate()}</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
             <button className="p-3 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors">
                <BellIcon className="w-6 h-6 text-gray-600" />
            </button>
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white shadow-sm">
                {profile?.avatar_url ? 
                    <img src={profile.avatar_url} alt="User Avatar" className="w-full h-full object-cover" /> :
                    <span className="flex items-center justify-center h-full w-full bg-blue-500 text-white font-bold text-lg">
                        {(profile?.first_name?.[0] || user?.username?.[0] || 'G').toUpperCase()}
                    </span>
                }
            </div>
        </div>
    </div>
);


const StatCard = ({ title, value, change, icon }: { title: string; value: string | number; change: string, icon: React.ReactNode }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
        <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-100 rounded-lg">
                {icon}
            </div>
            <div className="flex items-center text-sm font-medium text-green-500">
                <ArrowUpRight className="w-4 h-4" />
                <span>{change}</span>
            </div>
        </div>
        <div className="mt-4">
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    </div>
);

const ActivityFeed = () => {
    const activities = [
        { type: 'review', name: 'Layla Hassan', desc: 'left a 5-star review for your "Leadership" session.', time: '1d ago', avatar: 'https://i.pravatar.cc/40?img=3', icon: <StarIcon className="w-5 h-5 text-white" /> },
        { type: 'session', name: 'Omar Ali', desc: 'confirmed your session for Jul 29, 2025.', time: '4h ago', avatar: 'https://i.pravatar.cc/40?img=2', icon: <VideoIcon className="w-5 h-5 text-white" /> },
        { type: 'message', name: 'Sarah Mohamed', desc: 'sent you a new message.', time: '2h ago', avatar: 'https://i.pravatar.cc/40?img=1', icon: <MessageSquareIcon className="w-5 h-5 text-white" /> },
    ];

    const getIconBg = (type: string) => ({
        review: 'bg-yellow-400',
        session: 'bg-green-500',
        message: 'bg-blue-500',
    }[type] || 'bg-gray-400');

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Activity Feed</h3>
            <div className="space-y-6">
                {activities.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                        <div className={`relative p-2 rounded-full ${getIconBg(item.type)}`}>
                           {item.icon}
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">{item.name}</span> {item.desc}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ActivityChart = () => {
    const data = [ {day: 'Mon', value: 4}, {day: 'Tue', value: 6}, {day: 'Wed', value: 5}, {day: 'Thu', value: 8}, {day: 'Fri', value: 7}, {day: 'Sat', value: 9}, {day: 'Sun', value: 6} ];
    const maxVal = Math.max(...data.map(d => d.value));

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Weekly Activity</h3>
            <div className="flex justify-between items-end h-48 space-x-2">
                {data.map(item => (
                    <div key={item.day} className="flex-1 flex flex-col items-center justify-end">
                        <motion.div
                            className="w-full bg-blue-500 rounded-t-md"
                            initial={{ height: 0 }}
                            animate={{ height: `${(item.value / maxVal) * 100}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                        <p className="text-xs text-gray-500 mt-2">{item.day}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default function DashboardPage() {
    const { user, profile, loading: authLoading } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        // This function fetches the dashboard statistics from the backend.
        const fetchDashboardStats = async () => {
            if (!user) {
                // Don't fetch if the user isn't logged in yet.
                setStatsLoading(false);
                return;
            }
            try {
                setStatsLoading(true);
                const response = await api.get('/dashboard/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
                // Set stats to null or default values on error
                setStats(null);
            } finally {
                setStatsLoading(false);
            }
        };

        // We only run the fetch function once the initial auth check is complete.
        if (!authLoading) {
            fetchDashboardStats();
        }
    }, [authLoading, user]); // Re-run if authLoading or user changes.

    // Show a skeleton loader while either auth or stats are loading.
    if (authLoading) {
        return <DashboardSkeleton />;
    }
    console.log(stats)

    return (
        <div className="min-h-screen font-sans">
            <MotionCard delay={0}>
                <DashboardHeader user={user} profile={profile} />
            </MotionCard>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <MotionCard delay={0.1}>
                        <WelcomeBanner name={profile?.first_name || user?.username || "Guest"} />
                    </MotionCard>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* The StatCard components now receive real data from the 'stats' state.
                          We use placeholder values '??' if the stats object fails to load.
                        */}
                        <MotionCard delay={0.2}>
                            <StatCard 
                                title="Active Mentees" 
                                value={stats?.activeConnections ?? 'N/A'} 
                                change={`+${stats?.connectionChangePercent ?? 0}%`}
                                icon={<UsersIcon className="w-6 h-6 text-blue-600"/>} 
                            />
                        </MotionCard>
                        <MotionCard delay={0.3}>
                            <StatCard 
                                title="Sessions This Month" 
                                value={stats?.sessionsThisMonth ?? 'N/A'} 
                                change={`+${stats?.sessionChangePercent ?? 0}%`}
                                icon={<CheckCircleIcon className="w-6 h-6 text-blue-600"/>} 
                            />
                        </MotionCard>
                        <MotionCard delay={0.4}>
                            <StatCard 
                                title="Avg. Rating" 
                                value={stats?.averageRating ?? 'N/A'} 
                                change={`+${stats?.ratingChange ?? 0}`}
                                icon={<StarIcon className="w-6 h-6 text-blue-600"/>} 
                            />
                        </MotionCard>
                    </div>
                     <MotionCard delay={0.6}>
                        <ActivityChart />
                    </MotionCard>
                </div>
                <div className="lg:col-span-1">
                    <MotionCard delay={0.5}>
                        <ActivityFeed />
                    </MotionCard>
                </div>
            </div>
        </div>
    );
}
