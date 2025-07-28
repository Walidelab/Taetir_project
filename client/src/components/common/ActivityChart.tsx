import React from 'react'
import { motion } from 'framer-motion';

const ActivityChart = ({ chartData }: { chartData: {day: string, value: number}[] }) => {
    const maxVal = Math.max(...chartData.map(d => d.value), 1);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Weekly Activity</h3>
            <div className="flex justify-between items-end h-48 space-x-2">
                {chartData.map(item => (
                    <div key={item.day} className="flex-1 flex flex-col items-center justify-end group">
                        <motion.div
                            className="w-full bg-blue-500 rounded-t-md group-hover:bg-blue-600 transition-colors"
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

export default ActivityChart