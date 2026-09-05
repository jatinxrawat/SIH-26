import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

export default function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex text-slate-900 font-sans w-full max-w-full overflow-x-hidden relative">
      {/* Desktop Persistent Left Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30">
        <Sidebar onCloseMobile={() => setMobileNavOpen(false)} />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Dimmed Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setMobileNavOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            <Sidebar onCloseMobile={() => setMobileNavOpen(false)} />
          </div>
        </div>
      )}

      {/* Right Column: TopHeader + Main Outlet */}
      <div className="md:pl-64 flex flex-col flex-1 min-w-0 w-full max-w-full overflow-x-hidden">
        <TopHeader onToggleMobile={() => setMobileNavOpen(!mobileNavOpen)} />

        <main className="flex-1 w-full max-w-full overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
