import { create } from 'zustand';

const useBookingStore = create((set) => ({
  selectedDates: null,
  selectedOmbrellone: null,
  bookingData: null,
  step: 1,

  setDates: (dates) => set({ selectedDates: dates }),

  setOmbrellone: (ombrellone) => set({ selectedOmbrellone: ombrellone }),

  setBookingData: (data) => set({ bookingData: data }),

  setStep: (step) => set({ step }),

  nextStep: () => set((state) => ({ step: state.step + 1 })),

  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),

  reset: () => set({
    selectedDates: null,
    selectedOmbrellone: null,
    bookingData: null,
    step: 1,
  }),
}));

export default useBookingStore;