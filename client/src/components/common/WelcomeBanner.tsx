

const WelcomeBanner = ({ name }: { name: string }) => (
    <div className="relative rounded-2xl p-8 text-white overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg">
        <div className="relative z-10">
            <h2 className="text-3xl font-bold">Welcome back, {name}!</h2>
            <p className="text-blue-100 max-w-md mt-2">Your next session is scheduled for tomorrow at 10:00 AM.</p>
        </div>
        <div className="relative z-10 mt-6 flex gap-4">
            <button className="bg-white text-blue-800 font-semibold py-2 px-5 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow">
                Go to Session
            </button>
            <button className="bg-blue-500/50 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-500/80 transition-all transform hover:scale-105">
                Reschedule
            </button>
        </div>
    </div>
);
export default WelcomeBanner