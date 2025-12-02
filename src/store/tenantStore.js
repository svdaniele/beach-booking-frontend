import { create } from 'zustand';

const useTenantStore = create((set) => ({
  tenant: null,
  loading: false,

  setTenant: (tenant) => set({ tenant }),

  setLoading: (loading) => set({ loading }),

  updateTenant: (updates) => set((state) => ({
    tenant: state.tenant ? { ...state.tenant, ...updates } : null
  })),

  clear: () => set({ tenant: null, loading: false }),
}));

export default useTenantStore;