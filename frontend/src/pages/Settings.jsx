import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Bell, Shield, Key, Moon, Sun, CheckCircle2, Camera, Mic } from 'lucide-react';

export default function Settings() {
  const { user, themeMode, toggleTheme, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || 'Rohit Dubey');
  const [email, setEmail] = useState(user?.email || 'demo@example.com');
  const [bio, setBio] = useState('Full Stack Software Engineer preparing for senior technical roles.');
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [testDeviceStatus, setTestDeviceStatus] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({ name, email });
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const testCameraAndMic = async () => {
    setTestDeviceStatus('testing');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach(track => track.stop());
      setTestDeviceStatus('success');
    } catch (err) {
      setTestDeviceStatus('error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Account Settings & Preferences</h1>
        <p className="text-zinc-400">Manage your profile, theme appearance, and hardware device permissions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Settings Sidebar */}
        <div className="md:col-span-1 space-y-1">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-primary text-white font-semibold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
          <button 
            onClick={() => setActiveTab('preferences')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'preferences' ? 'bg-primary text-white font-semibold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            <Sun className="w-5 h-5" />
            <span>Theme & Devices</span>
          </button>
          <button 
            onClick={() => setActiveTab('account')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'account' ? 'bg-primary text-white font-semibold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            <Shield className="w-5 h-5" />
            <span>Security</span>
          </button>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3">
          
          {activeTab === 'profile' && (
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">User Profile</h2>
              
              {showSaveMessage && (
                <div className="mb-6 p-4 bg-accent/10 border border-accent/30 text-accent rounded-xl text-sm font-semibold flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Profile updated successfully!
                </div>
              )}

              <div className="flex items-center space-x-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl border-4 border-surface shadow-xl">
                  {name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <button type="button" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-white/5">
                    Change Avatar
                  </button>
                  <p className="text-xs text-zinc-500 mt-2">PNG, JPG or SVG. 2MB max.</p>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="w-5 h-5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Bio / Career Goal</label>
                  <textarea 
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us a little bit about yourself..."
                    className="w-full bg-background border border-border rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors resize-none text-sm leading-relaxed"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-border flex justify-end">
                  <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-primary/20">
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="bg-surface border border-border rounded-2xl p-8 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">App Theme</h2>
                <p className="text-xs text-zinc-400 mb-6">Switch between dark mode and high contrast light mode.</p>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={() => toggleTheme('dark')}
                    className={`flex flex-col items-center p-5 border-2 rounded-2xl transition-all ${
                      themeMode === 'dark' ? 'border-primary bg-primary/10 text-white' : 'border-border bg-background text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Moon className="w-8 h-8 text-primary mb-2" />
                    <span className="text-sm font-bold">Dark Mode</span>
                  </button>

                  <button 
                    onClick={() => toggleTheme('light')}
                    className={`flex flex-col items-center p-5 border-2 rounded-2xl transition-all ${
                      themeMode === 'light' ? 'border-primary bg-primary/10 text-white' : 'border-border bg-background text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Sun className="w-8 h-8 text-yellow-400 mb-2" />
                    <span className="text-sm font-bold">Light Mode</span>
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-bold text-white mb-2">Hardware Device Test</h3>
                <p className="text-xs text-zinc-400 mb-4">Verify webcam and microphone permissions for mock interview room.</p>
                
                <button 
                  onClick={testCameraAndMic}
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors border border-white/10 flex items-center"
                >
                  <Camera className="w-4 h-4 mr-2 text-primary" />
                  <Mic className="w-4 h-4 mr-2 text-secondary" />
                  Test Camera & Microphone
                </button>

                {testDeviceStatus === 'testing' && <p className="mt-3 text-xs text-primary animate-pulse">Requesting media device access...</p>}
                {testDeviceStatus === 'success' && <p className="mt-3 text-xs text-accent font-bold flex items-center"><CheckCircle2 className="w-4 h-4 mr-1" /> Hardware devices verified! Camera & Microphone working.</p>}
                {testDeviceStatus === 'error' && <p className="mt-3 text-xs text-warning font-bold">Could not access camera/mic. Please check browser permissions.</p>}
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Account Security</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white mb-4">Change Password</h3>
                  <form onSubmit={(e) => { e.preventDefault(); alert("Password updated successfully!"); }} className="space-y-4 max-w-md">
                    <div className="relative">
                      <Key className="w-5 h-5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="password" 
                        required
                        placeholder="Current Password"
                        className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Key className="w-5 h-5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="password" 
                        required
                        placeholder="New Password (min 6 characters)"
                        className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                      />
                    </div>
                    <button type="submit" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors border border-white/5">
                      Update Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

