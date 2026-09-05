import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Landmark,
  Coins,
  MapPin,
  Users2,
  Bot,
  FileText,
  User,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import Logo from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { useEntrepreneurProfile } from '../../context/EntrepreneurProfileContext';

export default function Sidebar({ onCloseMobile }) {
  const { logout, currentUser, userProfile } = useAuth();
  const { profile } = useEntrepreneurProfile();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navSections = [
    {
      label: 'MAIN',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'My Business', path: '/business', icon: Building2 },
        { name: 'Government Schemes', path: '/schemes', icon: Landmark },
        { name: 'Funding', path: '/funding', icon: Coins },
        { name: 'Roadmap', path: '/roadmap', icon: MapPin },
        { name: 'Professionals', path: '/professionals', icon: Users2 },
        { name: 'AI Business Advisor', path: '/advisor', icon: Bot, isAi: true }
      ]
    },
    {
      label: 'TOOLS',
      items: [
        { name: 'Documents', path: '/documents', icon: FileText }
      ]
    },
    {
      label: 'ACCOUNT',
      items: [
        { name: 'Profile', path: '/profile', icon: User },
        { name: 'Settings', path: '/settings', icon: Settings }
      ]
    }
  ];

  const displayName = profile?.personalInfo?.fullName || userProfile?.name || currentUser?.displayName || 'Entrepreneur';
  const businessName = profile?.business?.name || 'My Enterprise';
  const stage = profile?.business?.stage || 'PLANNING';

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-full flex flex-col justify-between select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between">
          <NavLink
            to="/dashboard"
            onClick={onCloseMobile}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg"
          >
            <Logo variant="dark" size="sm" showTagline={false} />
          </NavLink>
        </div>

        {/* Business Stage Pill Mini-Card */}
        <div className="mx-3 mt-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Entity Stage</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
              {stage.replace('_', ' ')}
            </span>
          </div>
          <p className="text-xs font-bold text-slate-900 mt-1 truncate">
            {businessName}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-230px)] scrollbar-none">
          {navSections.map((section) => (
            <div key={section.label}>
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                {section.label}
              </span>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        onClick={onCloseMobile}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/80 shadow-soft-sm'
                              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-transparent'
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              item.isAi ? 'text-emerald-600' : 'text-slate-500 group-hover:text-slate-800'
                            }`}
                          />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {item.isAi && (
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500 text-white shrink-0">
                            AI
                          </span>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer User Widget */}
      <div className="p-3 border-t border-slate-100">
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs uppercase shrink-0 shadow-sm">
              {displayName.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate leading-tight">{displayName}</p>
              <p className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">{currentUser?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
