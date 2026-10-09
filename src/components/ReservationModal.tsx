import { useState, useId } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, MapPin, Sparkles, Phone } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';
import { ReservationData } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const formId = useId();
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    phone: '',
    email: '',
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    seatingArea: 'Rooftop Terrace',
    occasion: 'Casual Dining / Adda',
    specialRequest: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `WUC-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(code);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-[#161714] border border-white/20 rounded-sm shadow-2xl p-6 sm:p-8 my-8 text-[#F6F2E9]">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-white/50 hover:text-white transition-colors"
          aria-label="Close Reservation Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Confirmation Pass Screen */
          <div className="space-y-6 text-center py-4">
            <div className="w-14 h-14 bg-[#D4FF45]/20 text-[#D4FF45] rounded-full flex items-center justify-center mx-auto border border-[#D4FF45]/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4FF45] font-bold">
                Table Reserved Successfully
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                SEE YOU ON THE ROOFTOP!
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto">
                Your reservation request has been confirmed. Please arrive within 15 minutes of your reserved time slot.
              </p>
            </div>

            {/* Digital Pass Card */}
            <div className="p-5 bg-[#10110F] border border-[#D4FF45]/30 rounded-sm text-left space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-white/50">CONFIRMATION REF</span>
                <span className="text-[#D4FF45] font-bold text-sm">{confirmationCode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">GUEST NAME</span>
                <span className="text-white font-bold">{formData.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">DATE & TIME</span>
                <span className="text-white">{formData.date} at {formData.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">PARTY SIZE</span>
                <span className="text-white">{formData.guests} Guests</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-2">
                <span className="text-white/50">SEATING ZONE</span>
                <span className="text-[#D9A35D] font-bold">{formData.seatingArea}</span>
              </div>
            </div>

            <div className="text-[11px] text-white/50 space-y-1">
              <p>📍 Gate 2, 122/A Southern Avenue, Kolkata (Opp. Nazrul Manch)</p>
              <p>Need to make changes? Call us directly at <a href={`tel:${CAFE_INFO.phoneRaw}`} className="text-[#D4FF45] underline">{CAFE_INFO.phone}</a></p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="w-full py-3 text-xs font-bold uppercase tracking-wider text-[#10110F] bg-[#D4FF45] hover:bg-[#bce438] rounded-sm transition-colors cursor-pointer"
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          /* Booking Form Screen */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1 border-b border-white/10 pb-4">
              <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-[#D4FF45]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Reserve Your Table · টেবিল বুকিং</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                WHATS<span className="text-[#D4FF45]">UP</span> CAFE ROOFTOP
              </h3>
              <p className="text-xs text-white/60">
                Opposite Nazrul Manch, Southern Avenue · Open 12:00 PM – 12:30 AM
              </p>
            </div>

            {/* Step 1: Party Size & Seating Zone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${formId}-guests`} className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Number of Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <select
                    id={`${formId}-guests`}
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full bg-[#10110F] border border-white/15 focus:border-[#D4FF45] focus:outline-none text-white text-xs py-2.5 pl-9 pr-3 rounded-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor={`${formId}-seating`} className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Seating Area
                </label>
                <select
                  id={`${formId}-seating`}
                  value={formData.seatingArea}
                  onChange={(e) => setFormData({ ...formData, seatingArea: e.target.value as any })}
                  className="w-full bg-[#10110F] border border-white/15 focus:border-[#D4FF45] focus:outline-none text-white text-xs py-2.5 px-3 rounded-sm"
                >
                  <option value="Rooftop Terrace">Rooftop Terrace (Open-Air)</option>
                  <option value="Sunset Deck">Sunset Deck (Balcony Views)</option>
                  <option value="Indoor AC Lounge">Indoor AC Lounge</option>
                </select>
              </div>
            </div>

            {/* Step 2: Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${formId}-date`} className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Reservation Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    id={`${formId}-date`}
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#10110F] border border-white/15 focus:border-[#D4FF45] focus:outline-none text-white text-xs py-2 pl-9 pr-3 rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${formId}-time`} className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Preferred Time Slot
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <select
                    id={`${formId}-time`}
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#10110F] border border-white/15 focus:border-[#D4FF45] focus:outline-none text-white text-xs py-2.5 pl-9 pr-3 rounded-sm"
                  >
                    <option value="13:00">1:00 PM (Lunch)</option>
                    <option value="15:00">3:00 PM (Afternoon)</option>
                    <option value="17:30">5:30 PM (Golden Hour Sunset)</option>
                    <option value="19:00">7:00 PM (Early Dinner)</option>
                    <option value="20:00">8:00 PM (Peak Dinner)</option>
                    <option value="21:30">9:30 PM (Night Atmosphere)</option>
                    <option value="22:30">10:30 PM (Late Night Drinks)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Contact Info */}
            <div className="space-y-3 pt-2">
              <div>
                <label htmlFor={`${formId}-name`} className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1">
                  Full Name
                </label>
                <input
                  id={`${formId}-name`}
                  type="text"
                  required
                  placeholder="e.g. Debanjan Sen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#10110F] border border-white/15 focus:border-[#D4FF45] focus:outline-none text-white text-xs py-2.5 px-3 rounded-sm placeholder:text-white/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`${formId}-phone`} className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1">
                    Phone Number
                  </label>
                  <input
                    id={`${formId}-phone`}
                    type="tel"
                    required
                    placeholder="+91 98300 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#10110F] border border-white/15 focus:border-[#D4FF45] focus:outline-none text-white text-xs py-2.5 px-3 rounded-sm placeholder:text-white/30"
                  />
                </div>

                <div>
                  <label htmlFor={`${formId}-occasion`} className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1">
                    Occasion (Optional)
                  </label>
                  <select
                    id={`${formId}-occasion`}
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-[#10110F] border border-white/15 focus:border-[#D4FF45] focus:outline-none text-white text-xs py-2.5 px-3 rounded-sm"
                  >
                    <option value="Casual Dining / Adda">Casual Dining / Adda</option>
                    <option value="Romantic Date Night">Romantic Date Night</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Office / Team Outing">Office / Team Outing</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Note & Direct Call */}
            <div className="p-3 bg-white/5 rounded-sm border border-white/10 flex items-center justify-between text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4FF45]" />
                Immediate seating confirmation
              </span>
              <a
                href={`tel:${CAFE_INFO.phoneRaw}`}
                className="text-[#D4FF45] hover:underline flex items-center gap-1 font-mono"
              >
                <Phone className="w-3 h-3" />
                {CAFE_INFO.phone}
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-[#10110F] bg-[#D4FF45] hover:bg-[#bce438] transition-colors rounded-sm shadow-[0_0_20px_rgba(212,255,69,0.25)] cursor-pointer"
            >
              Confirm Table Reservation
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
