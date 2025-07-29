import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/AuthContext'; // Your AuthContext
import api from '@/utils/axios'
import { motion } from 'framer-motion';
import {
    Edit, Camera, MapPin, Star, BookOpen, Users, Clock, X
} from "lucide-react";

// --- API Service Function (To be moved to a service file) ---
// This function prepares and sends all profile updates to your backend.
const updateUserProfile = async (
    profileData: any,
    menteeProfileData: any,
    avatarFile: File | null
) => {
    const formData = new FormData();

    // Append the text data as JSON strings. The backend will parse these.
    formData.append('profileData', JSON.stringify(profileData));
    formData.append('menteeProfileData', JSON.stringify(menteeProfileData));

    // If a new avatar file was selected, append it.
    // The key 'avatar_file' MUST match the field name used by multer on the backend.
    if (avatarFile) {
        formData.append('avatar_file', avatarFile);
    }

    // Send the request. Axios automatically sets the correct 'Content-Type' for FormData.
    const response = await api.put('/profile/change', formData);
    return response.data;
};


// --- Type Definitions for Profile Data ---
interface ProfileData {
    first_name: string;
    last_name: string;
    title: string;
    location: string;
    bio: string;
    languages: string[];
    avatar_url: string;
    experience_level: string;
    education: string;
    learning_hours: number;
    avatar_file?: File | null; 
}

// --- Reusable Tag Input Component ---
const TagInput = ({ value, onChange, placeholder }: { value: string[], onChange: (newValue: string[]) => void, placeholder: string }) => {
    const [inputValue, setInputValue] = useState('');
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            if (!value.includes(inputValue.trim())) {
                onChange([...value, inputValue.trim()]);
            }
            setInputValue('');
        }
    };
    const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };
    return (
        <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-white">
            {value.map(tag => (
                <div key={tag} className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-2 text-blue-600 hover:text-blue-800"><X size={14} /></button>
                </div>
            ))}
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder} className="flex-grow p-1 outline-none bg-transparent" />
        </div>
    );
};

// --- UI Components for the Profile Page ---

const ProfileHeader = ({ isEditing, onEdit, onSave, onCancel, isSaving }: { isEditing: boolean, onEdit: () => void, onSave: () => void, onCancel: () => void, isSaving: boolean }) => (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
                    <p className="text-gray-600">Manage your profile information and preferences.</p>
                </div>
                {!isEditing ? (
                    <button onClick={onEdit} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                        <Edit size={18} /><span>Edit Profile</span>
                    </button>
                ) : (
                    <div className="flex space-x-3">
                        <button onClick={onCancel} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold" disabled={isSaving}>Cancel</button>
                        <button onClick={onSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold" disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    </motion.div>
);

const ProfileInfoCard = ({ isEditing, data, setData }: { isEditing: boolean, data: Partial<ProfileData>, setData: React.Dispatch<React.SetStateAction<Partial<ProfileData>>> }) => {
    const name = `${data.first_name || ''} ${data.last_name || ''}`.trim();
    const initials = name.split(" ").map((n) => n[0]).join("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData(prev => ({
                ...prev,
                avatar_file: file,
                avatar_url: URL.createObjectURL(file) // Create a temporary URL for preview
            }));
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start space-x-6">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                        {data.avatar_url ? (
                            <img src={data.avatar_url} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-3xl font-bold text-blue-600">{initials}</span>
                        )}
                    </div>
                    {isEditing && (
                        <>
                            <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
                            <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-md">
                                <Camera size={16} />
                            </button>
                        </>
                    )}
                </div>
                <div className="flex-1 pt-2">
                    {isEditing ? (
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <input type="text" value={data.first_name} onChange={(e) => setData({ ...data, first_name: e.target.value })} placeholder="First Name" className="w-full px-3 py-2 border rounded-lg" />
                                <input type="text" value={data.last_name} onChange={(e) => setData({ ...data, last_name: e.target.value })} placeholder="Last Name" className="w-full px-3 py-2 border rounded-lg" />
                            </div>
                            <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} placeholder="Your Title" className="w-full px-3 py-2 border rounded-lg" />
                            <input type="text" value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} placeholder="Location" className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{name}</h2>
                            <p className="text-lg text-gray-700 mb-1">{data.title || 'No title set'}</p>
                            <div className="flex items-center text-gray-500 text-sm">
                                <MapPin size={16} className="mr-1" />
                                <span>{data.location || 'No location set'}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProfileSectionCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        {children}
    </div>
);

const StatisticsCard = ({ stats }: { stats: any[] }) => (
    <ProfileSectionCard title="Statistics">
        <div className="space-y-4">
            {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <stat.icon className={stat.color} size={20} />
                        <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stat.value}</span>
                </div>
            ))}
        </div>
    </ProfileSectionCard>
);

const SkeletonLoader = () => (
    <div className="space-y-6 animate-pulse">
        <div className="h-24 bg-gray-200 rounded-xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <div className="h-40 bg-gray-200 rounded-xl"></div>
                <div className="h-48 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="space-y-6">
                <div className="h-48 bg-gray-200 rounded-xl"></div>
                <div className="h-56 bg-gray-200 rounded-xl"></div>
            </div>
        </div>
    </div>
);

// --- Main Profile Page Component ---

export default function ProfilePage() {
    const { user, profile, roleProfile, loading, refetchUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editableData, setEditableData] = useState<Partial<ProfileData>>({});

    useEffect(() => {
        if (!loading && user && profile) {
            const combinedData = {
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                title: (profile as any).title || '',
                location: (profile as any).location || '',
                bio: profile.bio || '',
                languages: (profile as any).languages || [],
                avatar_url: profile.avatar_url || '',
                experience_level: (roleProfile as any)?.experience_level || '',
                education: (roleProfile as any)?.education || '',
                learning_hours: (roleProfile as any)?.learning_hours || 0,
                avatar_file: null,
            };
            setEditableData(combinedData);
        }
    }, [loading, user, profile, roleProfile]);

    const separateDataForAPI = (data: Partial<ProfileData>) => {
        const profileData = {
            first_name: data.first_name,
            last_name: data.last_name,
            title: data.title,
            location: data.location,
            bio: data.bio,
            languages: data.languages,
        };
        const menteeProfileData = {
            experience_level: data.experience_level,
            education: data.education,
            learning_hours: data.learning_hours,
        };
        return { profileData, menteeProfileData };
    };

    const handleSave = async () => {
        setIsSaving(true);
        
        const { profileData, menteeProfileData } = separateDataForAPI(editableData);
        const avatarFile: File | null = editableData.avatar_file ?? null;
        
        try {
            // The service function now handles sending all data, including the file.
            await updateUserProfile(profileData, menteeProfileData, avatarFile);
            
            // After saving, refetch all user data to update the AuthContext and UI.
            await refetchUser();
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save profile:", error);
            // Optionally show an error message to the user
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        if (user && profile) {
            const combinedData = {
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                title: (profile as any).title || '',
                location: (profile as any).location || '',
                bio: profile.bio || '',
                languages: (profile as any).languages || [],
                avatar_url: profile.avatar_url || '',
                experience_level: (roleProfile as any)?.experience_level || '',
                education: (roleProfile as any)?.education || '',
                learning_hours: (roleProfile as any)?.learning_hours || 0,
                avatar_file: null,
            };
            setEditableData(combinedData);
        }
        setIsEditing(false);
    };

    if (loading) {
        return <SkeletonLoader />;
    }
    
    const stats = [
        { label: "Sessions Completed", value: "11", icon: Clock, color: "text-blue-600" },
        { label: "Active Mentors", value: "3", icon: Users, color: "text-green-600" },
        { label: "Average Rating", value: "4.2", icon: Star, color: "text-yellow-600" },
        { label: "Learning Hours", value: `${editableData.learning_hours || 0}h`, icon: BookOpen, color: "text-purple-600" },
    ];

    return (
        <div className="space-y-6 font-sans">
            <ProfileHeader isEditing={isEditing} onEdit={() => setIsEditing(true)} onSave={handleSave} onCancel={handleCancel} isSaving={isSaving} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                        <ProfileInfoCard isEditing={isEditing} data={editableData} setData={setEditableData} />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <ProfileSectionCard title="About">
                            {isEditing ? (
                                <textarea value={editableData.bio} onChange={(e) => setEditableData({ ...editableData, bio: e.target.value })} rows={4} className="w-full p-2 border rounded-lg" />
                            ) : (
                                <p className="text-gray-700 leading-relaxed">{editableData.bio || 'No bio provided.'}</p>
                            )}
                        </ProfileSectionCard>
                    </motion.div>
                </div>

                <div className="space-y-6">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                        <StatisticsCard stats={stats} />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                        <ProfileSectionCard title="Additional Information">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Experience Level</label>
                                    {isEditing ? <input type="text" value={editableData.experience_level} onChange={(e) => setEditableData({ ...editableData, experience_level: e.target.value })} className="w-full p-2 border rounded-lg mt-1" /> : <p className="text-gray-900 font-semibold">{editableData.experience_level || 'Not set'}</p>}
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Education</label>
                                    {isEditing ? <input type="text" value={editableData.education} onChange={(e) => setEditableData({ ...editableData, education: e.target.value })} className="w-full p-2 border rounded-lg mt-1" /> : <p className="text-gray-900 font-semibold">{editableData.education || 'Not set'}</p>}
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Languages</label>
                                     {isEditing ? <TagInput value={editableData.languages || []} onChange={(tags) => setEditableData({ ...editableData, languages: tags })} placeholder="Add a language and press Enter" /> : (
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {(editableData.languages || []).map((lang) => (
                                                <span key={lang} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">{lang}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ProfileSectionCard>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
