import React from "react";
import {
  X,
  Calendar,
  Clock,
  Phone,
  MessageSquare,
  ShieldCheck,
  Trash2,
  ExternalLink,
  Users2,
  Coins,
  Briefcase,
  Layers
} from "lucide-react";
import { cancelBooking } from "../../services/professionalsService";

export default function BookingsDrawer({ isOpen, onClose, bookings, onBookingCancelled, onOpenChat }) {
  if (!isOpen) return null;

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this hire inquiry?")) {
      cancelBooking(id);
      if (onBookingCancelled) onBookingCancelled(id);
    }
  };

  const handleWhatsApp = (booking) => {
    if (!booking.professionalWhatsapp && !booking.professionalPhone) return;
    const num = (booking.professionalWhatsapp || booking.professionalPhone).replace(/\D/g, "");
    const text = encodeURIComponent(
      `Hello ${booking.professionalName}, I am ${booking.clientName}. Following up on my hire proposal (${booking.hireType}) regarding "${booking.inquiryTopic}".`
    );
    window.open(`https://wa.me/${num}?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold mb-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Hiring & Engagements</span>
            </div>
            <h2 className="text-lg font-black tracking-tight">My Hires & Proposals</h2>
            <p className="text-xs text-slate-400">
              {bookings.length} {bookings.length === 1 ? "inquiry sent" : "inquiries sent"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                <Users2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800">No Hire Inquiries Sent</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Select any verified Chartered Accountant, Legal Counsel, or DPR freelance expert to propose a service or full-time hire.
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-soft-xs space-y-3 relative group hover:border-emerald-300 transition-all"
              >
                {/* Top Badge: Hire Type & Status */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    booking.hireType === "Full-Time"
                      ? "bg-indigo-50 border border-indigo-200 text-indigo-800"
                      : "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  }`}>
                    {booking.hireType || "Service Hire"}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-500">
                      {booking.status || "Pending"}
                    </span>
                    <button
                      onClick={() => handleCancel(booking.id)}
                      title="Cancel Inquiry"
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Professional Name & Role */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{booking.professionalName}</h4>
                  <p className="text-xs text-slate-500">{booking.professionalRole}</p>
                </div>

                {/* Salary Info */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Compensation:</span>
                  <span className="font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                    {booking.offeredSalary || booking.salaryRange || "Negotiable"}
                  </span>
                </div>

                {/* Query / Topic */}
                <div className="text-xs text-slate-600 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-900 uppercase block mb-0.5">Role / Project Scope:</span>
                  <p className="line-clamp-2 italic">"{booking.inquiryTopic}"</p>
                </div>

                {/* Quick Actions */}
                <div className="pt-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onOpenChat) onOpenChat({ id: booking.professionalId, name: booking.professionalName, role: booking.professionalRole });
                    }}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-soft-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Discuss Salary in Chat</span>
                  </button>

                  {booking.professionalWhatsapp && (
                    <button
                      type="button"
                      onClick={() => handleWhatsApp(booking)}
                      className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 text-center">
          UdyamSaathi Direct Hiring Platform • Direct salary & project agreement
        </div>
      </div>
    </div>
  );
}
