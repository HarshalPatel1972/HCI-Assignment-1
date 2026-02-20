import React, { useState, useEffect } from 'react';
import { Activity, Bell, Heart, Wind, Droplets, Thermometer, WifiOff, Wifi, LayoutDashboard, Users, Settings, Search, Filter, ChevronRight, AlertTriangle, CheckCircle2, Database, Moon, Volume2 } from 'lucide-react';

const INITIAL_PATIENTS = [
  { id: 1, name: "Meera Desai", age: 68, room: "ICU-A1", hr: 72, bpSys: 120, bpDia: 80, spo2: 98, temp: 37.1 },
  { id: 2, name: "Rahul Sharma", age: 45, room: "ICU-A2", hr: 115, bpSys: 145, bpDia: 90, spo2: 94, temp: 38.5 },
  { id: 3, name: "Priya Patel", age: 34, room: "ICU-A3", hr: 65, bpSys: 110, bpDia: 75, spo2: 99, temp: 36.8 },
  { id: 4, name: "Anil Kumar", age: 82, room: "ICU-B1", hr: 135, bpSys: 85, bpDia: 55, spo2: 88, temp: 35.9 },
  { id: 5, name: "Sunita Reddy", age: 56, room: "ICU-B2", hr: 78, bpSys: 125, bpDia: 82, spo2: 96, temp: 37.3 },
  { id: 6, name: "Vikram Singh", age: 71, room: "ICU-B3", hr: 95, bpSys: 138, bpDia: 88, spo2: 92, temp: 37.9 }
];

const evaluateStatus = (p) => {
  if (p.hr > 130 || p.hr < 50 || p.spo2 < 90 || p.bpSys < 90) return "critical";
  if (p.hr > 100 || p.spo2 < 95 || p.bpSys > 140) return "warning";
  return "normal";
};

export default function App() {
  const [patients, setPatients] = useState(INITIAL_PATIENTS.map(p => ({ ...p, status: evaluateStatus(p) })));
  const [isOffline, setIsOffline] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
  const [currentView, setCurrentView] = useState('dashboard');

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString('en-US', { hour12: false })), 1000);
    return () => clearInterval(timer);
  }, []);

  // Vitals Simulator
  useEffect(() => {
    if (isOffline) return;
    const simTimer = setInterval(() => {
      setPatients(current => current.map(p => {
        let newHr = Math.max(40, Math.min(200, p.hr + (Math.floor(Math.random() * 5) - 2)));
        let newSpo2 = p.spo2;
        if (Math.random() > 0.7) {
          newSpo2 = Math.max(70, Math.min(100, p.spo2 + (Math.floor(Math.random() * 3) - 1)));
        }
        let newSys = Math.max(60, Math.min(220, p.bpSys + (Math.floor(Math.random() * 5) - 2)));
        let newDia = Math.max(40, Math.min(120, p.bpDia + (Math.floor(Math.random() * 3) - 1)));
        
        const updatedP = { ...p, hr: newHr, spo2: newSpo2, bpSys: newSys, bpDia: newDia };
        return { ...updatedP, status: evaluateStatus(updatedP) };
      }));
    }, 3000);
    return () => clearInterval(simTimer);
  }, [isOffline]);

  const criticalCount = patients.filter(p => p.status === 'critical').length;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-900 text-slate-100 font-sans overflow-x-hidden">
      
      {/* Sidebar */}
      <aside className="md:w-64 bg-slate-800 border-b md:border-b-0 md:border-r border-slate-700 flex flex-col p-4 md:p-6 sticky top-0 md:h-screen z-20 shadow-xl">
        <div className="flex items-center gap-3 text-blue-400 font-bold text-xl md:text-2xl mb-4 md:mb-10">
          <Activity className="w-8 h-8" />
          <span className="hidden leading-none sm:inline">PulseUI</span>
        </div>
        
        <nav className="flex md:flex-col justify-around md:justify-start gap-2 md:gap-4 flex-1 overflow-x-auto w-full scrollbar-hide py-2 md:py-0">
          <button onClick={() => setCurrentView('dashboard')} className={`flex flex-col md:flex-row items-center gap-2 md:gap-4 px-3 py-2 md:px-4 md:py-3 rounded-lg whitespace-nowrap min-w-fit transition-colors ${currentView === 'dashboard' ? 'bg-blue-600/20 text-blue-400 md:rounded-r-none md:rounded-l-lg md:border-r-4 border-blue-500' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-700/50'}`}>
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs md:text-sm font-medium">Dashboard</span>
          </button>
          <button onClick={() => setCurrentView('patients')} className={`flex flex-col md:flex-row items-center gap-2 md:gap-4 px-3 py-2 md:px-4 md:py-3 rounded-lg whitespace-nowrap min-w-fit transition-colors ${currentView === 'patients' ? 'bg-blue-600/20 text-blue-400 md:rounded-r-none md:rounded-l-lg md:border-r-4 border-blue-500' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-700/50'}`}>
            <Users className="w-5 h-5" />
            <span className="text-xs md:text-sm font-medium">Patients</span>
          </button>
          <button onClick={() => setCurrentView('alerts')} className={`flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 px-3 py-2 md:px-4 md:py-3 rounded-lg whitespace-nowrap min-w-fit transition-colors relative ${currentView === 'alerts' ? 'bg-blue-600/20 text-blue-400 md:rounded-r-none md:rounded-l-lg md:border-r-4 border-blue-500' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-700/50'}`}>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <Bell className="w-5 h-5" />
              <span className="text-xs md:text-sm font-medium">Alerts</span>
            </div>
            {criticalCount > 0 && (
              <span className="hidden md:flex bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-lg shadow-rose-500/30">
                {criticalCount}
              </span>
            )}
            {criticalCount > 0 && <div className="md:hidden absolute top-1 right-2 w-2 h-2 bg-rose-500 rounded-full" />}
          </button>
          <button onClick={() => setCurrentView('settings')} className={`flex flex-col md:flex-row items-center gap-2 md:gap-4 px-3 py-2 md:px-4 md:py-3 rounded-lg whitespace-nowrap min-w-fit transition-colors ${currentView === 'settings' ? 'bg-blue-600/20 text-blue-400 md:rounded-r-none md:rounded-l-lg md:border-r-4 border-blue-500' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-700/50'}`}>
            <Settings className="w-5 h-5" />
            <span className="text-xs md:text-sm font-medium">Settings</span>
          </button>
        </nav>

        <div className="hidden md:flex flex-col mt-auto pt-6 border-t border-slate-700">
          <div className={`flex items-center gap-2 text-sm mb-4 font-medium transition-colors ${isOffline ? 'text-rose-500' : 'text-emerald-500'}`}>
            {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
            {isOffline ? 'System Offline' : 'Connected'}
          </div>
          <button 
            onClick={() => setIsOffline(!isOffline)}
            className="w-full text-sm py-2 px-4 rounded-md border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all active:scale-95"
          >
            {isOffline ? 'Reconnect Network' : 'Simulate Offline'}
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 lg:px-10 bg-slate-800/50 border-b border-slate-800 sticky top-0 md:static z-10 backdrop-blur-md">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              {currentView === 'dashboard' ? 'ICU Floor 4 Overviews' : 
               currentView === 'patients' ? 'Patient Directory' : 
               currentView === 'alerts' ? 'Critical Alerts' : 'System Settings'}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {currentView === 'dashboard' ? 'Real-time patient monitoring' : 
               currentView === 'patients' ? 'Complete ward roster and history' : 
               currentView === 'alerts' ? 'Recent events and threshold breaches' : 'Preferences and device configurations'}
            </p>
          </div>
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
            <div className="text-lg md:text-xl font-semibold tabular-nums tracking-wider text-slate-200">{time}</div>
            <div className="flex items-center gap-3 bg-slate-800 py-1.5 px-3 rounded-full border border-slate-700 shadow-sm">
              <img src="https://ui-avatars.com/api/?name=Dr+Sharma&background=3b82f6&color=fff" alt="Dr. Sharma" className="w-8 h-8 rounded-full border-2 border-slate-700" />
              <span className="text-sm font-medium pr-1 text-slate-200">Dr. Sharma</span>
            </div>
            
            {/* Mobile network toggle */}
            <button 
              onClick={() => setIsOffline(!isOffline)}
              className={`md:hidden p-2 rounded-full border ${isOffline ? 'border-rose-500/50 bg-rose-500/10 text-rose-500' : 'border-slate-700 bg-slate-800 text-slate-400'}`}
              title="Toggle Network"
            >
              {isOffline ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Alerts Banner */}
        {criticalCount > 0 && (
          <div className="mx-4 mt-4 lg:mx-10 md:mt-6 bg-rose-500/15 border border-rose-500/50 text-rose-200 px-4 py-3 rounded-lg flex items-center gap-3 animate-pulse shadow-lg shadow-rose-500/10">
            <Activity className="w-5 h-5 text-rose-500" />
            <span className="font-semibold text-sm md:text-base">{criticalCount} Patient(s) require immediate attention!</span>
          </div>
        )}

        {/* Offline Banner Mobile */}
        {isOffline && (
          <div className="md:hidden mx-4 mt-4 bg-amber-500/15 border border-amber-500/40 text-amber-300 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium shadow-inner shadow-amber-500/5">
            <WifiOff className="w-4 h-4" /> Data is frozen (Offline)
          </div>
        )}

        {/* Patient Grid */}
        {currentView === 'dashboard' && (
          <div className={`p-4 md:p-6 lg:p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 transition-all duration-500 ${isOffline ? 'opacity-60 grayscale-[40%]' : ''}`}>
            {patients.map(p => (
              <div key={p.id} className={`bg-slate-800 rounded-xl p-5 md:p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                p.status === 'critical' ? 'border-rose-500 shadow-lg shadow-rose-500/20' : 
                p.status === 'warning' ? 'border-amber-500/50' : 'border-slate-700'
              }`}>
                
                <div className="flex justify-between items-start mb-5 pb-4 border-b border-slate-700/60">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 tracking-tight">{p.name}</h3>
                    <div className="text-xs md:text-sm text-slate-400 font-medium">{p.age} yrs <span className="mx-1">•</span> ID: #{20204 + p.id}</div>
                  </div>
                  <div className="bg-slate-900/80 px-3 py-1.5 rounded-md font-bold text-sm tracking-wide text-blue-300 border border-slate-700 shadow-inner inline-flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${p.status === 'critical' ? 'bg-rose-500 animate-ping' : p.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                    {p.room}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {/* Heart Rate */}
                  <div className="bg-slate-900/50 p-3 md:p-4 rounded-lg flex flex-col justify-between border border-slate-800/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] md:text-xs font-bold text-slate-400 tracking-wider uppercase">HR</span>
                      <Heart className={`w-4 h-4 md:w-5 md:h-5 ${p.hr > 100 || p.hr < 50 ? 'text-rose-500 fill-rose-500 animate-pulse' : 'text-slate-500'}`} />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl md:text-3xl font-bold tabular-nums tracking-tighter ${
                        p.hr > 130 || p.hr < 50 ? 'text-rose-500' : p.hr > 100 || p.hr < 60 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>{p.hr}</span>
                      <span className="text-xs text-slate-500 font-medium">bpm</span>
                    </div>
                  </div>

                  {/* SpO2 */}
                  <div className="bg-slate-900/50 p-3 md:p-4 rounded-lg flex flex-col justify-between border border-slate-800/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] md:text-xs font-bold text-slate-400 tracking-wider uppercase">SpO2</span>
                      <Wind className="w-4 h-4 md:w-5 md:h-5 text-blue-400/70" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl md:text-3xl font-bold tabular-nums tracking-tighter ${
                        p.spo2 < 90 ? 'text-rose-500' : p.spo2 < 95 ? 'text-amber-400' : 'text-blue-400'
                      }`}>{p.spo2}</span>
                      <span className="text-xs text-slate-500 font-medium">%</span>
                    </div>
                  </div>

                  {/* Blood Pressure */}
                  <div className="bg-slate-900/50 p-3 md:p-4 rounded-lg flex flex-col justify-between border border-slate-800/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] md:text-xs font-bold text-slate-400 tracking-wider uppercase">NIBP</span>
                      <Droplets className="w-4 h-4 md:w-5 md:h-5 text-indigo-400/70" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-xl md:text-2xl lg:text-3xl xl:text-2xl min-[1400px]:text-3xl font-bold tabular-nums tracking-tighter ${
                        p.bpSys > 180 || p.bpSys < 90 ? 'text-rose-500' : p.bpSys > 140 ? 'text-amber-400' : 'text-indigo-300'
                      }`}>{p.bpSys}/{p.bpDia}</span>
                      <span className="text-[10px] lg:text-xs text-slate-500 font-medium truncate">mmHg</span>
                    </div>
                  </div>

                  {/* Temp */}
                  <div className="bg-slate-900/50 p-3 md:p-4 rounded-lg flex flex-col justify-between border border-slate-800/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] md:text-xs font-bold text-slate-400 tracking-wider uppercase">TEMP</span>
                      <Thermometer className="w-4 h-4 md:w-5 md:h-5 text-orange-400/70" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl md:text-3xl font-bold tabular-nums tracking-tighter ${
                        p.temp > 38 ? 'text-amber-400' : 'text-orange-300'
                      }`}>{p.temp.toFixed(1)}</span>
                      <span className="text-xs text-slate-500 font-medium">°C</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Patients List View */}
        {currentView === 'patients' && (
          <div className="p-4 md:p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="Search patients by name or ID..." className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
              </div>
              <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-700 transition-all w-full sm:w-auto justify-center">
                <Filter className="w-4 h-4" /> Filter Status
              </button>
            </div>
            
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-800/80 border-b border-slate-700 text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-medium">Patient Name</th>
                      <th className="px-6 py-4 font-medium">ID & Room</th>
                      <th className="px-6 py-4 font-medium">Age</th>
                      <th className="px-6 py-4 font-medium">Current Status</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {patients.map(p => (
                      <tr key={p.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${p.status === 'critical' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : p.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                          {p.name}
                        </td>
                        <td className="px-6 py-4 text-slate-400">#{20204 + p.id} • <span className="text-slate-300 font-medium">{p.room}</span></td>
                        <td className="px-6 py-4 text-slate-300">{p.age} yrs</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                            p.status === 'critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 
                            p.status === 'warning' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 
                            'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center justify-end gap-1 ml-auto group">
                            View Chart <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Alerts View */}
        {currentView === 'alerts' && (
          <div className="p-4 md:p-6 lg:p-10 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-4 mb-8 border-b border-slate-700 pb-4 overflow-x-auto scrollbar-hide">
              <button className="bg-slate-700 text-white px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">All Alerts</button>
              <button className="text-slate-400 hover:text-white px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors">Critical Only</button>
              <button className="text-slate-400 hover:text-white px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors">Resolved</button>
            </div>
            
            <div className="space-y-4">
              {patients.filter(p => p.status === 'critical').map((p, i) => (
                <div key={`alert-${i}`} className="bg-slate-800 border-l-4 border-rose-500 rounded-lg p-5 flex flex-col sm:flex-row gap-4 sm:items-center shadow-lg">
                  <div className="bg-rose-500/10 p-3 rounded-full shrink-0 w-fit">
                    <Activity className="w-6 h-6 text-rose-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start sm:items-center mb-1">
                      <h4 className="font-bold text-white text-lg">Critical Tachycardia Detected</h4>
                      <span className="text-xs text-slate-500">Just now</span>
                    </div>
                    <p className="text-slate-400 text-sm">Patient <strong className="text-slate-200">{p.name}</strong> (Room {p.room}) heart rate breached threshold at <strong className="text-rose-400">{p.hr} bpm</strong>.</p>
                  </div>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-4 py-2 rounded-md transition-colors font-medium whitespace-nowrap mt-2 sm:mt-0">
                    Acknowledge
                  </button>
                </div>
              ))}
              
              <div className="bg-slate-800 border-l-4 border-amber-500 rounded-lg p-5 flex flex-col sm:flex-row gap-4 sm:items-center">
                <div className="bg-amber-500/10 p-3 rounded-full shrink-0 w-fit">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start sm:items-center mb-1">
                    <h4 className="font-bold text-white text-lg">Sensor Array Disconnect</h4>
                    <span className="text-xs text-slate-500">14 mins ago</span>
                  </div>
                  <p className="text-slate-400 text-sm">Intermittent SpO2 signal loss detected for Patient <strong className="text-slate-200">Priya Patel</strong> in ICU-A3. Please verify physical sensor attachment.</p>
                </div>
                <button className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-4 py-2 rounded-md transition-colors font-medium whitespace-nowrap mt-2 sm:mt-0">
                  Review
                </button>
              </div>

              <div className="bg-slate-800/50 border-l-4 border-slate-600 rounded-lg p-5 flex flex-col sm:flex-row gap-4 sm:items-center opacity-70">
                <div className="bg-slate-700/50 p-3 rounded-full shrink-0 w-fit">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start sm:items-center mb-1">
                    <h4 className="font-bold text-slate-300 text-lg">Hypotension Resolved</h4>
                    <span className="text-xs text-slate-500">2 hours ago</span>
                  </div>
                  <p className="text-slate-400 text-sm">Patient Vikram Singh's NIBP stabilized within normal parameters. Alert dismissed by Dr. Sharma.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings View */}
        {currentView === 'settings' && (
          <div className="p-4 md:p-6 lg:p-10 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl mb-6">
              <div className="p-6 border-b border-slate-700">
                <h3 className="text-lg font-bold text-white flex items-center gap-2"><Moon className="w-5 h-5 text-blue-400"/> Appearance & Display</h3>
                <p className="text-sm text-slate-400 mt-1">Manage themes, contrast, and visual heuristics.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-200">High Contrast Mode</h4>
                    <p className="text-xs text-slate-500 mt-1">Increased text saturation for bright ward environments.</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer border border-slate-600">
                    <div className="w-5 h-5 bg-slate-400 rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-200">Flashing Alerts</h4>
                    <p className="text-xs text-slate-500 mt-1">Enable screen flashing on critical telemetry breaches.</p>
                  </div>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer border border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm translate-x-0"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
              <div className="p-6 border-b border-slate-700">
                <h3 className="text-lg font-bold text-white flex items-center gap-2"><Database className="w-5 h-5 text-indigo-400"/> System Data Sync</h3>
                <p className="text-sm text-slate-400 mt-1">Configure HL7 FHIR connection parameters and refresh rates.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-200">Telemetry Polling Rate</h4>
                    <p className="text-xs text-slate-500 mt-1">Currently syncing via standard WebSocket stream (1Hz).</p>
                  </div>
                  <select className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-lg pr-8 pl-3 py-2 outline-none focus:border-blue-500">
                    <option>High Frequency (5Hz)</option>
                    <option selected>Standard (1Hz)</option>
                    <option>Low Bandwidth (0.2Hz)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-200">Auditory Chimes</h4>
                    <p className="text-xs text-slate-500 mt-1">Play nurse station sounds for new alerts.</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer border border-slate-600">
                    <div className="w-5 h-5 bg-slate-400 rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20">Save Preferences</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
