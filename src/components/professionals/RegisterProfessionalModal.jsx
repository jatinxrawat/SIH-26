import React, { useState } from "react";
import { X, ShieldCheck, UserPlus, CheckCircle2, AlertCircle, Sparkles, Coins, Briefcase } from "lucide-react";
import { PROFESSIONAL_CATEGORIES } from "../../data/professionalsData";
import { registerProfessional } from "../../services/professionalsService";

export default function RegisterProfessionalModal({ isOpen, onClose, onRegistered }) {
  const availableCategories = PROFESSIONAL_CATEGORIES.filter(c => c !== "All");

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    category: availableCategories[0],
    experience: "5+ Years",
    location: "",
    minSalary: "35,000",
    maxSalary: "65,000",
    salaryPeriod: "month",
    serviceSalaryRange: "₹8,000 - ₹20,000 / project",
    fullTimeSalaryRange: "₹35,000 - ₹65,000 / month",
    hiringTypes: ["Service / Project", "Full-Time"],
    availability: "Available for Full-time & Projects",
    phone: "",
    whatsapp: "",
    email: "",
    specialties: "",
    bio: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleHireTypeToggle = (type) => {
    const exists = formData.hiringTypes.includes(type);
    if (exists && formData.hiringTypes.length === 1) {
      return; // Keep at least one
    }
    const updated = exists 
      ? formData.hiringTypes.filter(t => t !== type)
      : [...formData.hiringTypes, type];
    setFormData({ ...formData, hiringTypes: updated });
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full Name or Firm Name is required";
    if (!formData.role.trim()) errs.role = "Professional title/designation is required";
    if (!formData.minSalary.trim() || !formData.maxSalary.trim()) {
      errs.salaryRange = "Please specify both min and max of your salary range";
    }
    if (!formData.phone.trim() || formData.phone.length < 8) errs.phone = "Valid phone number is required";
    if (!formData.email.trim() || !formData.email.includes("@")) errs.email = "Valid email address is required";
    if (!formData.location.trim()) errs.location = "City / Region or Remote availability is required";
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
      const cleanMin = formData.minSalary.replace(/[^0-9,]/g, "").trim();
      const cleanMax = formData.maxSalary.replace(/[^0-9,]/g, "").trim();
      const cleanSalaryRange = `₹${cleanMin} - ₹${cleanMax} / ${formData.salaryPeriod}`;

      const created = registerProfessional({
        ...formData,
        salaryRange: cleanSalaryRange,
        fullTimeSalaryRange: `₹${cleanMin} - ₹${cleanMax} / ${formData.salaryPeriod}`,
        whatsapp: formData.whatsapp || formData.phone
      });

      setSuccess(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(false);
        if (onRegistered) onRegistered(created);
        onClose();
      }, 1500);
    } catch (err) {
      setIsSubmitting(false);
      setErrors({ submit: "Failed to register profile. Please check your data." });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <Coins className="w-3.5 h-3.5" />
              <span>Freelance & Full-Time Expert Network</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">Register as Professional</h2>
            <p className="text-xs text-slate-400">
              Provide your expected salary range. MSME entrepreneurs can hire you for services or full-time roles.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Salary Range Notice Banner */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-3 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs text-emerald-900">
            <span className="font-bold">Transparent Salary Range: </span>
            Specify your expected compensation range. Entrepreneurs will see this range and can discuss salary directly with you via chat.
          </p>
        </div>

        {success ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Registration Successful!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your professional profile is now listed. You can access the Professional Portal anytime to manage incoming hire requests and negotiate salary with clients.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            {errors.submit && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.submit}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name / Firm */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name / Firm Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Sharma & Associates"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.name ? "border-rose-400 focus:ring-rose-200" : "border-slate-300 focus:ring-emerald-200 focus:border-emerald-600"
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
              </div>

              {/* Role / Designation */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Title / Designation <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chartered Accountant & Tax Consultant"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.role ? "border-rose-400 focus:ring-rose-200" : "border-slate-300 focus:ring-emerald-200 focus:border-emerald-600"
                  }`}
                />
                {errors.role && <p className="text-[11px] text-rose-500 mt-1">{errors.role}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Domain Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 bg-white"
                >
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  placeholder="e.g. 8+ Years"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600"
                />
              </div>
            </div>

            {/* SALARY RANGE SECTION (KEY USER REQUIREMENT) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                    Expected Salary / Fee Range <span className="text-rose-500">*</span>
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Negotiable via direct chat</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Minimum (₹)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 35,000"
                    value={formData.minSalary}
                    onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Maximum (₹)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 65,000"
                    value={formData.maxSalary}
                    onChange={(e) => setFormData({ ...formData, maxSalary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Frequency / Basis
                  </label>
                  <select
                    value={formData.salaryPeriod}
                    onChange={(e) => setFormData({ ...formData, salaryPeriod: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 bg-white"
                  >
                    <option value="month">per Month (Full-Time)</option>
                    <option value="project">per Project / Service</option>
                  </select>
                </div>
              </div>

              {errors.salaryRange && (
                <p className="text-[11px] text-rose-500 font-medium">{errors.salaryRange}</p>
              )}

              {/* Hiring Type Availability Checkboxes */}
              <div className="pt-2 border-t border-slate-200/80">
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  I am available for:
                </label>
                <div className="flex flex-wrap gap-4 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.hiringTypes.includes("Service / Project")}
                      onChange={() => handleHireTypeToggle("Service / Project")}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <span>Hire for a Service / Project</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.hiringTypes.includes("Full-Time")}
                      onChange={() => handleHireTypeToggle("Full-Time")}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <span>Full-Time Hire</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* City / Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Location <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Delhi NCR / Remote"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.location ? "border-rose-400 focus:ring-rose-200" : "border-slate-300 focus:ring-emerald-200 focus:border-emerald-600"
                  }`}
                />
                {errors.location && <p className="text-[11px] text-rose-500 mt-1">{errors.location}</p>}
              </div>

              {/* Phone / Mobile */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.phone ? "border-rose-400 focus:ring-rose-200" : "border-slate-300 focus:ring-emerald-200 focus:border-emerald-600"
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="advisor@firm.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.email ? "border-rose-400 focus:ring-rose-200" : "border-slate-300 focus:ring-emerald-200 focus:border-emerald-600"
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Specialties */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Specialties / Core Services (Comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. GST Notices, Trademark Filing, PMEGP Bank DPR, Financial Projections"
                value={formData.specialties}
                onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600"
              />
            </div>

            {/* Professional Summary / Bio */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Freelance Summary & Past Experience
              </label>
              <textarea
                rows={3}
                placeholder="Describe your qualifications, key client successes, and types of projects you take up..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-soft-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{isSubmitting ? "Registering..." : "Register & Publish Profile"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
