import { INITIAL_PROFESSIONALS } from "../data/professionalsData";

const REGISTERED_STORAGE_KEY = "udyamsathi_registered_professionals";
const BOOKINGS_STORAGE_KEY = "udyamsathi_professional_bookings";
const CURRENT_PRO_KEY = "udyamsathi_current_professional_id";
const CHATS_STORAGE_KEY_PREFIX = "udyamsathi_chat_";

/**
 * Fetch all professionals (pre-seeded + user registered)
 */
export function getAllProfessionals() {
  if (typeof window === "undefined" || !window.localStorage) {
    return INITIAL_PROFESSIONALS;
  }

  try {
    const stored = localStorage.getItem(REGISTERED_STORAGE_KEY);
    const registered = stored ? JSON.parse(stored) : [];
    // User registered professionals appear at the front with priority
    return [...registered, ...INITIAL_PROFESSIONALS];
  } catch (err) {
    console.error("Failed to load registered professionals:", err);
    return INITIAL_PROFESSIONALS;
  }
}

/**
 * Get current logged in / claimed professional profile (if any)
 */
export function getCurrentProfessional() {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  try {
    const currentId = localStorage.getItem(CURRENT_PRO_KEY);
    const all = getAllProfessionals();
    if (currentId) {
      const found = all.find(p => p.id === currentId);
      if (found) return found;
    }
    // If there is any user-registered professional, default to the latest
    const registered = getRegisteredProfessionals();
    return registered.length > 0 ? registered[0] : null;
  } catch (err) {
    console.error("Failed to get current professional:", err);
    return null;
  }
}

export function setCurrentProfessionalId(id) {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem(CURRENT_PRO_KEY, id);
  }
}

export function getRegisteredProfessionals() {
  if (typeof window === "undefined" || !window.localStorage) return [];
  try {
    const stored = localStorage.getItem(REGISTERED_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    return [];
  }
}

/**
 * Register a new professional (freelancer setting their own salary/rate range)
 */
export function registerProfessional(professionalData) {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  const id = `pro-reg-${Date.now()}`;
  const minSal = professionalData.minSalary?.trim() || "";
  const maxSal = professionalData.maxSalary?.trim() || "";
  const period = professionalData.salaryPeriod || "month";

  let computedSalaryRange = professionalData.salaryRange?.trim();
  if (!computedSalaryRange && minSal && maxSal) {
    computedSalaryRange = `₹${minSal} - ₹${maxSal} / ${period}`;
  } else if (!computedSalaryRange) {
    computedSalaryRange = "₹30,000 - ₹60,000 / month";
  }

  const newPro = {
    id,
    name: professionalData.name.trim(),
    role: professionalData.role.trim(),
    category: professionalData.category,
    location: professionalData.location.trim() || "Pan-India Remote Support",
    experience: professionalData.experience.trim() || "3+ Years",
    rating: "5.0",
    reviewCount: 1,
    verified: true,
    isNewlyRegistered: true,
    salaryRange: computedSalaryRange,
    serviceSalaryRange: professionalData.serviceSalaryRange?.trim() || computedSalaryRange,
    fullTimeSalaryRange: professionalData.fullTimeSalaryRange?.trim() || computedSalaryRange,
    hiringTypes: Array.isArray(professionalData.hiringTypes) && professionalData.hiringTypes.length > 0
      ? professionalData.hiringTypes
      : ["Service / Project", "Full-Time"],
    availability: professionalData.availability?.trim() || "Available for Full-time & Projects",
    languages: Array.isArray(professionalData.languages) && professionalData.languages.length > 0 
      ? professionalData.languages 
      : ["English", "Hindi"],
    phone: professionalData.phone.trim(),
    whatsapp: professionalData.whatsapp?.replace(/\D/g, "") || professionalData.phone.replace(/\D/g, ""),
    email: professionalData.email.trim(),
    specialties: Array.isArray(professionalData.specialties) 
      ? professionalData.specialties 
      : (professionalData.specialties || "").split(",").map(s => s.trim()).filter(Boolean),
    bio: professionalData.bio?.trim() || "Independent freelance professional open for project and full-time hiring.",
    registeredAt: new Date().toISOString()
  };

  try {
    const existing = localStorage.getItem(REGISTERED_STORAGE_KEY);
    const list = existing ? JSON.parse(existing) : [];
    list.unshift(newPro);
    localStorage.setItem(REGISTERED_STORAGE_KEY, JSON.stringify(list));
    localStorage.setItem(CURRENT_PRO_KEY, id);
    return newPro;
  } catch (err) {
    console.error("Failed to save professional:", err);
    throw err;
  }
}

/**
 * Update existing professional profile (salary ranges, availability, etc.)
 */
export function updateProfessionalProfile(proId, updates) {
  if (typeof window === "undefined" || !window.localStorage) return null;

  try {
    const existing = localStorage.getItem(REGISTERED_STORAGE_KEY);
    const list = existing ? JSON.parse(existing) : [];
    const index = list.findIndex(p => p.id === proId);
    
    if (index !== -1) {
      list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem(REGISTERED_STORAGE_KEY, JSON.stringify(list));
      return list[index];
    } else {
      // If it is a pre-seeded professional being customized by user
      const all = getAllProfessionals();
      const base = all.find(p => p.id === proId) || {};
      const customized = { ...base, ...updates, id: proId, updatedAt: new Date().toISOString() };
      list.unshift(customized);
      localStorage.setItem(REGISTERED_STORAGE_KEY, JSON.stringify(list));
      return customized;
    }
  } catch (err) {
    console.error("Failed to update professional profile:", err);
    return null;
  }
}

/**
 * Book / Create Hire Proposal for a freelance professional
 */
export function bookConsultation(bookingData) {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  const booking = {
    id: `hire-${Date.now()}`,
    professionalId: bookingData.professionalId,
    professionalName: bookingData.professionalName,
    professionalRole: bookingData.professionalRole,
    professionalCategory: bookingData.professionalCategory,
    professionalPhone: bookingData.professionalPhone,
    professionalWhatsapp: bookingData.professionalWhatsapp,
    hireType: bookingData.hireType || "Service / Project", // "Service / Project" | "Full-Time"
    salaryRange: bookingData.salaryRange || "₹30,000 - ₹50,000 / month",
    offeredSalary: bookingData.offeredSalary?.trim() || bookingData.salaryRange || "Negotiable",
    clientName: bookingData.clientName.trim(),
    clientPhone: bookingData.clientPhone.trim(),
    clientEmail: bookingData.clientEmail.trim(),
    businessName: bookingData.businessName?.trim() || "My Business Enterprise",
    mode: bookingData.mode || "Phone Call", // "Phone Call", "Google Meet / Video", "WhatsApp Consultation"
    preferredDate: bookingData.preferredDate,
    preferredTimeSlot: bookingData.preferredTimeSlot || "Morning",
    inquiryTopic: bookingData.inquiryTopic.trim(),
    status: "Pending Negotiation", // "Pending Negotiation" | "Accepted" | "Declined"
    bookedAt: new Date().toISOString()
  };

  try {
    const existing = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    const list = existing ? JSON.parse(existing) : [];
    list.unshift(booking);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(list));

    // Also initialize a chat message between client and professional
    const convId = `conv_${booking.professionalId}`;
    const initialMessages = [
      {
        id: `msg-${Date.now()}`,
        sender: "client",
        senderName: booking.clientName,
        text: `Hello ${booking.professionalName}, I would like to hire you for ${booking.hireType}. Offered Budget / Salary: ${booking.offeredSalary}. Requirements: "${booking.inquiryTopic}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOffer: true,
        offerDetails: {
          hireType: booking.hireType,
          amount: booking.offeredSalary,
          status: "Pending"
        }
      }
    ];
    saveChatMessages(convId, initialMessages);

    return booking;
  } catch (err) {
    console.error("Failed to book consultation:", err);
    throw err;
  }
}

/**
 * Retrieve all user bookings / hire requests
 */
export function getUserBookings() {
  if (typeof window === "undefined" || !window.localStorage) {
    return [];
  }

  try {
    const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Failed to read bookings:", err);
    return [];
  }
}

/**
 * Retrieve incoming hire requests for a specific professional
 */
export function getProfessionalHireRequests(proId) {
  const allBookings = getUserBookings();
  if (!proId) return allBookings;
  return allBookings.filter(b => b.professionalId === proId);
}

/**
 * Update hire request status (Accept / Decline)
 */
export function updateBookingStatus(bookingId, newStatus) {
  if (typeof window === "undefined" || !window.localStorage) return false;

  try {
    const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!stored) return false;
    const list = JSON.parse(stored);
    const updated = list.map(b => b.id === bookingId ? { ...b, status: newStatus } : b);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error("Failed to update status:", err);
    return false;
  }
}

/**
 * Cancel / Delete a booking
 */
export function cancelBooking(bookingId) {
  if (typeof window === "undefined" || !window.localStorage) {
    return false;
  }

  try {
    const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!stored) return false;
    const list = JSON.parse(stored);
    const updated = list.filter(b => b.id !== bookingId);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error("Failed to cancel booking:", err);
    return false;
  }
}

/**
 * CHAT PERSISTENCE SYSTEM
 */
export function getChatMessages(conversationId) {
  if (typeof window === "undefined" || !window.localStorage) return [];
  try {
    const stored = localStorage.getItem(`${CHATS_STORAGE_KEY_PREFIX}${conversationId}`);
    if (stored) return JSON.parse(stored);

    // Default welcome messages if empty
    const proId = conversationId.replace("conv_", "");
    const pro = getAllProfessionals().find(p => p.id === proId);
    const proName = pro ? pro.name : "Professional";
    const salaryRange = pro ? (pro.salaryRange || "₹30,000 - ₹60,000") : "standard rates";

    return [
      {
        id: `msg-welcome-${proId}`,
        sender: "professional",
        senderName: proName,
        text: `Hello! Thank you for reaching out. My standard salary/rate range is ${salaryRange}. I am available for both service-based projects and full-time hiring. What are the key deliverables or role you are looking to fill?`,
        timestamp: "Online",
        isOffer: false
      }
    ];
  } catch (err) {
    return [];
  }
}

export function saveChatMessages(conversationId, messages) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    localStorage.setItem(`${CHATS_STORAGE_KEY_PREFIX}${conversationId}`, JSON.stringify(messages));
  } catch (err) {
    console.error("Failed to save chat:", err);
  }
}
