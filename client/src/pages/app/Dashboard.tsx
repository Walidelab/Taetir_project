import React from 'react';
import { Search as SearchIcon, Bell as BellIcon, Star as StarIcon, Users as UsersIcon, CheckCircle as CheckCircleIcon, Clock as ClockIcon, Video as VideoIcon, MessageSquare as MessageSquareIcon, ArrowUpRight , ArrowDownRight} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/AuthContext'; 
import { useState , useEffect } from 'react';
import api from '@/utils/axios';
import MotionCard from '@/components/common/MotionCard';
import WelcomeBanner from '@/components/common/WelcomeBanner';
import ActivityFeed from '@/components/common/ActivityFeed';
import ActivityChart from '@/components/common/ActivityChart';



interface DashboardStats {
  activeConnections: number;
  sessionsThisMonth: number;
  averageRating: number;
  connectionChangePercent: number;
  sessionChangePercent: number;
  ratingChange: number;
}

interface NextSessions {
    id : number ,
    title : string ,
    startTime : Date ,
    withUser : {
        name : string ,
        avatar_url : string 
    }
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




const DashboardHeader = ({ user, profile , notificationCount }: { user: any, profile: any , notificationCount: number }) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">{getGreeting()}, {profile?.first_name || user?.username || 'Guest'}!</h1>
            <p className="text-md text-gray-500">{getCurrentDate()}</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button className="relative p-3 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors">
                <BellIcon className="w-6 h-6 text-gray-600" />
                {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
                            {notificationCount}
                        </span>
                    </span>
                )}
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
            {change && parseInt(change) >= 0  ? (
                <div className="flex items-center text-sm font-medium text-green-500">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+{change}</span>
                </div>
            ):(
                <div className="flex items-center text-sm font-medium text-red-500">
                    <ArrowDownRight className="w-4 h-4" />
                    <span>{change}</span>
                </div>
            )  
        }
        </div>
        <div className="mt-4">
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    </div>
);





export default function DashboardPage() {
    const { user, profile, loading: authLoading } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [nextSession , setSession] = useState<NextSessions | null>(null);
    const [activities, setActivities] = useState<any[]>([]);
    const [chartData, setChartData] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        
        const fetchDashboardStats = async () => {
            if (!user) {
              
                setStatsLoading(false);
                return;
            }
            try {
                setStatsLoading(true);
                const [statsResponse, activitiesResponse, chartResponse, notificationsResponse] = await Promise.all([
                    api.get('/dashboard/stats').catch(() => null),
                    api.get('/dashboard/activities?limit=5').catch(() => null),
                    api.get('/dashboard/activity-chart').catch(() => null),
                    api.get('/dashboard/unread-count').catch(() => null) 
                ]);

                if (statsResponse) setStats(statsResponse.data);
                if (activitiesResponse) setActivities(activitiesResponse.data);
                if (chartResponse) setChartData(chartResponse.data);
                if (notificationsResponse) setNotificationCount(notificationsResponse.data.count);

            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
           
                setStats(null);
            } finally {
                setStatsLoading(false);
            }
        };

        if (!authLoading) {
            fetchDashboardStats();
        }
    }, [authLoading, user]); 


    if (authLoading) {
        return <DashboardSkeleton />;
    }
    console.log(stats)

    return (
        <div className="min-h-screen font-sans">
            <MotionCard delay={0}>
                <DashboardHeader user={user} profile={profile} notificationCount={notificationCount} />
            </MotionCard>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <MotionCard delay={0.1}>
                        <WelcomeBanner name={profile?.first_name || user?.username || "Guest"} session={nextSession} />
                    </MotionCard>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       
                        <MotionCard delay={0.2}>
                            <StatCard 
                                title="Active Users" 
                                value={stats?.activeConnections ?? 'N/A'} 
                                change={`${stats?.connectionChangePercent ?? 0}%`}
                                icon={<UsersIcon className="w-6 h-6 text-blue-600"/>} 
                            />
                        </MotionCard>
                        <MotionCard delay={0.3}>
                            <StatCard 
                                title="Sessions This Month" 
                                value={stats?.sessionsThisMonth ?? 'N/A'} 
                                change={`${stats?.sessionChangePercent ?? 0}%`}
                                icon={<CheckCircleIcon className="w-6 h-6 text-blue-600"/>} 
                            />
                        </MotionCard>
                        <MotionCard delay={0.4}>
                            <StatCard 
                                title="Avg. Rating" 
                                value={stats?.averageRating ?? 'N/A'} 
                                change={`${stats?.ratingChange ?? 0}`}
                                icon={<StarIcon className="w-6 h-6 text-blue-600"/>} 
                            />
                        </MotionCard>
                    </div>
                     <MotionCard delay={0.6}>
                        <ActivityChart chartData={chartData} />
                    </MotionCard>
                </div>
                <div className="lg:col-span-1">
                    <MotionCard delay={0.5}>
                        <ActivityFeed activities = {activities}/>
                    </MotionCard>
                </div>
            </div>
        </div>
    );
}
