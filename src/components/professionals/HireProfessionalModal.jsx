import React, { useState } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  Calendar,
  Briefcase,
  Layers,
  Clock,
  Phone,
  Video,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  Coins,
  ArrowRight
} from "lucide-react";
import { bookConsultation } from "../../services/professionalsService";

export default function HireProfessionalModal({
  isOpen,
  onClose,
  professional,
  initialUser,
  initialBusiness,
  onBookingSuccess,
  onOpenChat
}) {
  if (!isOpen || !professional) return null;

  const defaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const [hireType, setHireType] = useState("Service / Project"); // "Service / Project" | "Full-Time"
  const [formData, setFormData] = useState({
    offeredSalary: "",
    clientName: initialUser?.displayName || initialUser?.name || initialBusiness?.personalInfo?.fullName || "",
    clientPhone: initialUser?.phone || initialBusiness?.contactPhone || "",
    clientEmail: initialUser?.email || "",
    businessName: initialBusiness?.name || "My MSME Enterprise",
    mode: "Phone Call",
    preferredDate: defaultDate(),
    preferredTimeSlot: "Morning",
    inquiryTopic: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedDetails, setBookedDetails] = useState(null);

  const activeSalaryRange = hireType === "Full-Time"
    ? (professional.fullTimeSalaryRange || professional.salaryRange || "₹40,000 - ₹75,000 / month")
    : (professional.serviceSalaryRange || professional.salaryRange || "₹8,000 - ₹20,000 / project");

  const timeSlots = ["Morning", "Afternoon", "Evening"];

  const validate = () => {
    const errs = {};
    if (!formData.clientName.trim()) errs.clientName = "Your name is required";
    if (!formData.clientPhone.trim() || formData.clientPhone.length < 8) errs.clientPhone = "Valid phone number is required";
    if (!formData.inquiryTopic.trim()) errs.inquiryTopic = "Please describe the job role or project requirements";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const booked = bookConsultation({
        professionalId: professional.id,
        professionalName: professional.name,
        professionalRole: professional.role,
        professionalCategory: professional.category,
        professionalPhone: professional.phone,
        professionalWhatsapp: professional.whatsapp,
        hireType: hireType,
        salaryRange: activeSalaryRange,
        offeredSalary: formData.offeredSalary || activeSalaryRange,
        clientName: formData.clientName,
        clientPhone: formData.clientPhone,
        clientEmail: formData.clientEmail,
        businessName: formData.businessName,
        mode: formData.mode,
        preferredDate: formData.preferredDate,
        preferredTimeSlot: formData.preferredTimeSlot,
        inquiryTopic: formData.inquiryTopic
      });

      setBookedDetails(booked);
      setIsSubmitting(false);
      if (onBookingSuccess) onBookingSuccess(booked);
    } catch (err) {
      setIsSubmitting(false);
      setErrors({ submit: "Could not submit hire proposal. Please try again." });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hire Freelancer / Professional</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Hire {professional.name}
            </h2>
            <p className="text-xs text-slate-300">
              {professional.role} • {professional.category}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* HIRE TYPE TABS: Service vs Full-Time */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200/80 rounded-2xl">
            <button
              type="button"
              onClick={() => setHireType("Service / Project")}
              className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                hireType === "Service / Project"
                  ? "bg-white text-slate-900 shadow-soft-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Hire for a Service</span>
            </button>

            <button
              type="button"
              onClick={() => setHireType("Full-Time")}
              className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                hireType === "Full-Time"
                  ? "bg-white text-slate-900 shadow-soft-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>Full-Time Hire</span>
            </button>
          </div>
        </div>

        {/* SALARY RANGE BANNER (REQUIRED BY USER) */}
        <div className="bg-emerald-50/90 border-b border-emerald-100 px-6 py-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
              {hireType === "Full-Time" ? "Expected Full-Time Salary Range:" : "Expected Service / Project Rate:"}
            </span>
            <span className="text-sm font-black text-emerald-900">
              {activeSalaryRange}
            </span>
          </div>

          {/* Quick Chat Shortcut to discuss salary */}
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenChat) onOpenChat(professional);
            }}
            className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-black flex items-center gap-1.5 hover:bg-emerald-100 transition-all cursor-pointer shadow-2xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>Chat About Salary</span>
          </button>
        </div>

        {bookedDetails ? (
          /* Proposal Submitted Confirmation */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2 animate-in zoom-in duration-300">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Hire Proposal Sent!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your <strong className="text-slate-900">{bookedDetails.hireType}</strong> proposal has been delivered to <strong className="text-slate-900">{professional.name}</strong>.
              </p>
            </div>

            {/* Proposal Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Hire Arrangement</span>
                <span className="font-bold text-slate-900">{bookedDetails.hireType}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Professional's Range</span>
                <span className="font-bold text-slate-900">{bookedDetails.salaryRange}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Proposed Compensation</span>
                <span className="font-black text-emerald-700">{bookedDetails.offeredSalary}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Status</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-bold">
                  {bookedDetails.status}
                </span>
              </div>
            </div>

            {/* Direct Actions: Chat or Done */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenChat) onOpenChat(professional);
                }}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-soft-sm transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open Chat to Negotiate Salary & Terms</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Hire Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            {errors.submit && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Proposed Salary / Offer */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Proposed Salary / Offer (₹)
              </label>
              <input
                type="text"
                placeholder={`e.g. ${hireType === "Full-Time" ? "₹45,000 / month" : "₹12,000 for project"} (or leave blank to discuss in chat)`}
                value={formData.offeredSalary}
                onChange={(e) => setFormData({ ...formData, offeredSalary: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 bg-white"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Professional's expected range: <span className="font-bold text-emerald-800">{activeSalaryRange}</span>
              </p>
            </div>

            {/* Scope / Role Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {hireType === "Full-Time" ? "Job Role / Scope of Responsibility *" : "Project Requirements & Deliverables *"}
              </label>
              <textarea
                rows={3}
                placeholder={
                  hireType === "Full-Time"
                    ? "e.g. We need a full-time Senior Accountant to manage books, monthly GST filings, vendor reconciliation, and year-end audits..."
                    : "e.g. We need a detailed project report (DPR) prepared for a 25 Lakh PMEGP bank loan with machinery quotations..."
                }
                value={formData.inquiryTopic}
                onChange={(e) => setFormData({ ...formData, inquiryTopic: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 resize-none ${
                  errors.inquiryTopic ? "border-rose-400 focus:ring-rose-200" : "border-slate-300 focus:ring-emerald-200 focus:border-emerald-600"
                }`}
              />
              {errors.inquiryTopic && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.inquiryTopic}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Contact Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Discussion Format
                </label>
                <select
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 bg-white"
                >
                  <option value="Phone Call">Phone Call</option>
                  <option value="Google Meet / Video">Video Call (Google Meet)</option>
                  <option value="WhatsApp Consultation">WhatsApp Discussion</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Start / Discussion Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                    errors.clientName ? "border-rose-400 focus:ring-rose-200" : "border-slate-300 focus:ring-emerald-200 focus:border-emerald-600"
                  }`}
                />
                {errors.clientName && <p className="text-[11px] text-rose-500 mt-1">{errors.clientName}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                    errors.clientPhone ? "border-rose-400 focus:ring-rose-200" : "border-slate-300 focus:ring-emerald-200 focus:border-emerald-600"
                  }`}
                />
                {errors.clientPhone && <p className="text-[11px] text-rose-500 mt-1">{errors.clientPhone}</p>}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenChat) onOpenChat(professional);
                }}
                className="px-3.5 py-2.5 rounded-xl border border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discuss in Chat</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-soft-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{isSubmitting ? "Sending..." : `Hire for ${hireType}`}</span>
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
