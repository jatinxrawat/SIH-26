import React, { useState, useEffect } from "react";
import {
  X,
  Briefcase,
  Layers,
  Coins,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Sparkles,
  Phone,
  User,
  Settings,
  Clock,
  ArrowRight
} from "lucide-react";
import {
  getAllProfessionals,
  getCurrentProfessional,
  updateProfessionalProfile,
  getUserBookings,
  updateBookingStatus
} from "../../services/professionalsService";

export default function ProfessionalPortalDrawer({
  isOpen,
  onClose,
  onOpenChat,
  onProfileUpdated
}) {
  if (!isOpen) return null;

  const allProfessionals = getAllProfessionals();
  const currentPro = getCurrentProfessional() || allProfessionals[0];

  const [activePro, setActivePro] = useState(currentPro);
  const [activeTab, setActiveTab] = useState("proposals"); // "proposals" | "rates" | "settings"
  
  // Rate edit state
  const [serviceRate, setServiceRate] = useState(activePro.serviceSalaryRange || "₹10,000 - ₹25,000 / project");
  const [fullTimeRate, setFullTimeRate] = useState(activePro.fullTimeSalaryRange || "₹45,000 - ₹80,000 / month");
  const [availability, setAvailability] = useState(activePro.availability || "Available for Full-time & Projects");
  const [isSaved, setIsSaved] = useState(false);

  // Incoming proposals for this professional
  const allBookings = getUserBookings();
  const incomingProposals = allBookings.filter(b => b.professionalId === activePro.id || !b.professionalId);

  const handleSaveRates = (e) => {
    e.preventDefault();
    const updated = updateProfessionalProfile(activePro.id, {
      serviceSalaryRange: serviceRate,
      fullTimeSalaryRange: fullTimeRate,
      salaryRange: fullTimeRate,
      availability: availability
    });

    if (updated) {
      setActivePro(updated);
      setIsSaved(true);
      if (onProfileUpdated) onProfileUpdated(updated);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const handleStatusChange = (bookingId, newStatus) => {
    updateBookingStatus(bookingId, newStatus);
    if (onProfileUpdated) onProfileUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/65 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between border-b border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>Professional & Freelancer Portal</span>
            </div>
            <h2 className="text-xl font-black">{activePro.name}</h2>
            <p className="text-xs text-slate-300">
              {activePro.role} • {activePro.category}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Switcher & Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 space-y-2">
          {/* Quick profile select if multiple exist */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-600">Managing Profile:</span>
            <select
              value={activePro.id}
              onChange={(e) => {
                const selected = allProfessionals.find(p => p.id === e.target.value);
                if (selected) {
                  setActivePro(selected);
                  setServiceRate(selected.serviceSalaryRange || "₹10,000 - ₹25,000 / project");
                  setFullTimeRate(selected.fullTimeSalaryRange || "₹45,000 - ₹80,000 / month");
                  setAvailability(selected.availability || "Available for Full-time & Projects");
                }
              }}
              className="px-2.5 py-1 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs max-w-xs truncate"
            >
              {allProfessionals.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.role.split(" ")[0]})</option>
              ))}
            </select>
          </div>

          {/* Nav Tabs */}
          <div className="grid grid-cols-2 gap-1 bg-slate-200/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("proposals")}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "proposals"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Hire Proposals ({incomingProposals.length})
            </button>

            <button
              onClick={() => setActiveTab("rates")}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "rates"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Manage Salary Rates
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* TAB 1: INCOMING HIRE PROPOSALS */}
          {activeTab === "proposals" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Client Inquiries & Hire Proposals
                </h4>
                <span className="text-xs font-bold text-emerald-700">
                  {incomingProposals.length} received
                </span>
              </div>

              {incomingProposals.length === 0 ? (
                <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
                  <h5 className="text-sm font-bold text-slate-800">No Proposals Yet</h5>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    When entrepreneurs select your profile to hire you for a service or full-time role, proposals will appear here.
                  </p>
                </div>
              ) : (
                incomingProposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white shadow-soft-xs space-y-3 hover:border-emerald-300 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        proposal.hireType === "Full-Time"
                          ? "bg-indigo-50 border border-indigo-200 text-indigo-800"
                          : "bg-emerald-50 border border-emerald-200 text-emerald-800"
                      }`}>
                        {proposal.hireType || "Service Hire"}
                      </span>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        proposal.status === "Accepted"
                          ? "bg-emerald-100 text-emerald-800"
                          : proposal.status === "Declined"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {proposal.status || "Pending Review"}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        {proposal.clientName}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Enterprise: <span className="font-semibold text-slate-800">{proposal.businessName}</span>
                      </p>
                    </div>

                    {/* Offered Salary */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Offered Compensation:</span>
                      <span className="font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                        {proposal.offeredSalary || proposal.salaryRange}
                      </span>
                    </div>

                    {/* Scope / Query */}
                    <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">Project Scope:</span>
                      <p className="italic line-clamp-3">"{proposal.inquiryTopic}"</p>
                    </div>

                    {/* Actions: Accept, Decline, Chat */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          if (onOpenChat) onOpenChat(activePro);
                        }}
                        className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-soft-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Chat & Negotiate</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(proposal.id, "Accepted")}
                          title="Accept Proposal"
                          className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(proposal.id, "Declined")}
                          title="Decline"
                          className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: MANAGE SALARY RATES & AVAILABILITY */}
          {activeTab === "rates" && (
            <form onSubmit={handleSaveRates} className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900 flex items-start gap-2">
                <Coins className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  As an independent professional, update your expected salary rates for both full-time positions and service projects anytime.
                </p>
              </div>

              {isSaved && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-xl flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Your salary rates and availability have been published!</span>
                </div>
              )}

              {/* Full-Time Salary Range */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Expected Full-Time Salary Range
                </label>
                <input
                  type="text"
                  value={fullTimeRate}
                  onChange={(e) => setFullTimeRate(e.target.value)}
                  placeholder="e.g. ₹40,000 - ₹75,000 / month"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 bg-white"
                />
              </div>

              {/* Service / Project Salary Range */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Expected Service / Project Rate Range
                </label>
                <input
                  type="text"
                  value={serviceRate}
                  onChange={(e) => setServiceRate(e.target.value)}
                  placeholder="e.g. ₹8,000 - ₹20,000 / project"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 bg-white"
                />
              </div>

              {/* Availability Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Availability Status
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 bg-white"
                >
                  <option value="Available for Full-time & Projects">Available for Full-time & Projects</option>
                  <option value="Open for Full-Time Hire Only">Open for Full-Time Hire Only</option>
                  <option value="Open for Project / Service Only">Open for Project / Service Only</option>
                  <option value="Limited Availability / Booked">Limited Availability / Booked</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-soft-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Update & Publish Rates</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 text-center">
          UdyamSaathi Freelance & MSME Advisory Portal • All rates negotiable
        </div>
      </div>
    </div>
  );
}
