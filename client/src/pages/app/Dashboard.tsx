import React from 'react';
import { SearchIcon , BellIcon  } from 'lucide-react';
import { useAuth } from '@/hooks/AuthContext';
// --- Icon Components ---
// Using a minimal set of icons as seen in the design.
const StarIcon = ({ className , filled = true }: { className?: string; filled?: boolean }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;


// --- Reusable Components based on the provided design ---

const DashboardHeader = () => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
            <h1 className="text-lg font-semibold text-gray-800">Welcome, Mr guest</h1>
            <p className="text-sm text-gray-500">Tue, 20 July 2025</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 w-full border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
                <BellIcon className="w-6 h-6 text-gray-500" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        </div>
    </div>
);

const WelcomeBanner = ({ name }: { name: string }) => (
    <div className="relative rounded-2xl p-8 text-white overflow-hidden flex flex-col justify-between h-64" style={{backgroundColor: '#4A6A8A'}}>
        <div
            className="absolute bottom-0 left-0 right-0 h-3/4 bg-contain bg-no-repeat bg-bottom opacity-40"
            style={{backgroundImage: 'url("../../assets/WelcomeBanner.png")'}} // Using a similar mountain silhouette
        ></div>
        <div className="relative z-10">
            <h2 className="text-2xl font-bold">Hello {name} in TAETIR !</h2>
            <p className="text-blue-100 max-w-md">We're here to help unlock your full potential</p>
        </div>
        <div className="relative z-10 bg-white rounded-xl h-20 w-full opacity-50">
           {/* This is the white box from the design */}
        </div>
    </div>
);

const StatCard = ({ title, value }: { title: string; value: string | number }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
);

const RecentSessions = () => {
    const sessions = [
        { name: 'Sarah Mohamed', desc: 'Session terminée sur le Leadership', time: 'il y a 2h', avatar: '40 x 40' },
        { name: 'Omar Ali', desc: 'Nouvelle session programmée', time: 'il y a 4h', avatar: '40 x 40' },
        { name: 'Layla Hassan', desc: 'A laissé un avis 5 étoiles', time: 'il y a 1j', avatar: '40 x 40' },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Sessions</h3>
            <div className="space-y-5">
                {sessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                {session.avatar}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700">{session.name}</p>
                                <p className="text-sm text-gray-500">{session.desc}</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 flex-shrink-0 ml-2">{session.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MyNote = () => (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-bold text-gray-800">My Note</h3>
            <StarIcon className="w-5 h-5 text-gray-400" filled={false}/>
        </div>
        <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-gray-800">4.2</p>
            <p className="font-semibold text-gray-600">Very Good</p>
        </div>
        <div className="flex space-x-1 mt-1 text-yellow-400">
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5 text-gray-300" />
        </div>
    </div>
);


// --- Main Dashboard Page Component ---

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
            <DashboardHeader />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <WelcomeBanner name={user?.email.split('@')[0] || "Guest"} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard title="Active Mentors" value="2 / 3" />
                        <StatCard title="Session Completed" value="11" />
                        <StatCard title="Av. Session Length" value="34m" />
                    </div>
                    <MyNote />
                </div>

                <div className="lg:col-span-1">
                    <RecentSessions />
                </div>
            </div>
        </div>
    );
}
