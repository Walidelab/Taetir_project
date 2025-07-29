import React, { useState } from 'react';
import { Bell, Shield, User, Globe, Moon, Sun, Smartphone, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      sessionReminders: true,
      newMessages: true,
      weeklyDigest: false,
    },
    privacy: {
      profileVisibility: 'public',
      showOnlineStatus: true,
      allowDirectMessages: true,
      showSessionHistory: false,
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC-8',
      dateFormat: 'MM/DD/YYYY',
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      loginAlerts: true,
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const SettingSection = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and privacy settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <SettingSection title="Notifications" icon={Bell}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.email}
                onChange={(value) => updateSetting('notifications', 'email', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600">Receive push notifications on your device</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.push}
                onChange={(value) => updateSetting('notifications', 'push', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-600">Receive notifications via SMS</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.sms}
                onChange={(value) => updateSetting('notifications', 'sms', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Session Reminders</p>
                <p className="text-sm text-gray-600">Get reminded about upcoming sessions</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.sessionReminders}
                onChange={(value) => updateSetting('notifications', 'sessionReminders', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">New Messages</p>
                <p className="text-sm text-gray-600">Get notified about new messages</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.newMessages}
                onChange={(value) => updateSetting('notifications', 'newMessages', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Weekly Digest</p>
                <p className="text-sm text-gray-600">Receive weekly activity summary</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.weeklyDigest}
                onChange={(value) => updateSetting('notifications', 'weeklyDigest', value)}
              />
            </div>
          </div>
        </SettingSection>

        {/* Privacy */}
        <SettingSection title="Privacy & Security" icon={Shield}>
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-900 mb-2">Profile Visibility</label>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="public">Public</option>
                <option value="connections">Connections Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Show Online Status</p>
                <p className="text-sm text-gray-600">Let others see when you're online</p>
              </div>
              <ToggleSwitch
                enabled={settings.privacy.showOnlineStatus}
                onChange={(value) => updateSetting('privacy', 'showOnlineStatus', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Allow Direct Messages</p>
                <p className="text-sm text-gray-600">Allow anyone to send you messages</p>
              </div>
              <ToggleSwitch
                enabled={settings.privacy.allowDirectMessages}
                onChange={(value) => updateSetting('privacy', 'allowDirectMessages', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Show Session History</p>
                <p className="text-sm text-gray-600">Make your session history visible to others</p>
              </div>
              <ToggleSwitch
                enabled={settings.privacy.showSessionHistory}
                onChange={(value) => updateSetting('privacy', 'showSessionHistory', value)}
              />
            </div>
          </div>
        </SettingSection>

        {/* Preferences */}
        <SettingSection title="Preferences" icon={Globe}>
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-900 mb-2">Theme</label>
              <div className="flex space-x-3">
                <button
                  onClick={() => updateSetting('preferences', 'theme', 'light')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    settings.preferences.theme === 'light'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Sun size={16} />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => updateSetting('preferences', 'theme', 'dark')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    settings.preferences.theme === 'dark'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Moon size={16} />
                  <span>Dark</span>
                </button>
              </div>
            </div>
            
            <div>
              <label className="block font-medium text-gray-900 mb-2">Language</label>
              <select
                value={settings.preferences.language}
                onChange={(e) => updateSetting('preferences', 'language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
              </select>
            </div>
            
            <div>
              <label className="block font-medium text-gray-900 mb-2">Timezone</label>
              <select
                value={settings.preferences.timezone}
                onChange={(e) => updateSetting('preferences', 'timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC+0">GMT (UTC+0)</option>
                <option value="UTC+3">Arabia Standard Time (UTC+3)</option>
              </select>
            </div>
            
            <div>
              <label className="block font-medium text-gray-900 mb-2">Date Format</label>
              <select
                value={settings.preferences.dateFormat}
                onChange={(e) => updateSetting('preferences', 'dateFormat', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </SettingSection>

        {/* Security */}
        <SettingSection title="Security" icon={Lock}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <ToggleSwitch
                enabled={settings.security.twoFactorAuth}
                onChange={(value) => updateSetting('security', 'twoFactorAuth', value)}
              />
            </div>
            
            <div>
              <label className="block font-medium text-gray-900 mb-2">Session Timeout</label>
              <select
                value={settings.security.sessionTimeout}
                onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="never">Never</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Login Alerts</p>
                <p className="text-sm text-gray-600">Get notified of new login attempts</p>
              </div>
              <ToggleSwitch
                enabled={settings.security.loginAlerts}
                onChange={(value) => updateSetting('security', 'loginAlerts', value)}
              />
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Change Password</h4>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Current password"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </SettingSection>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Save All Changes
        </button>
      </div>
    </div>
  );
}