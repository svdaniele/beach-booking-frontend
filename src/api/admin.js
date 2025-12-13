import axiosInstance from './axiosConfig';

const adminAPI = {
  /**
   * Dashboard stats
   */
  getDashboardStats: async () => {
    const response = await axiosInstance.get('/admin/dashboard/stats');
    return response.data;
  },

  /**
   * Get all tenants
   */
  getAllTenants: async () => {
    const response = await axiosInstance.get('/admin/tenants');
    return response.data;
  },

  /**
   * Get tenant details
   */
  getTenantDetails: async (tenantId) => {
    const response = await axiosInstance.get(`/admin/tenants/${tenantId}`);
    return response.data;
  },

  /**
   * Suspend tenant
   */
  suspendTenant: async (tenantId, motivo) => {
    const response = await axiosInstance.put(`/admin/tenants/${tenantId}/suspend`, { motivo });
    return response.data;
  },

  /**
   * Activate tenant
   */
  activateTenant: async (tenantId) => {
    const response = await axiosInstance.put(`/admin/tenants/${tenantId}/activate`);
    return response.data;
  },

  /**
   * Delete tenant
   */
  deleteTenant: async (tenantId) => {
    const response = await axiosInstance.delete(`/admin/tenants/${tenantId}`);
    return response.data;
  },

  /**
   * Get all users
   */
  getAllUsers: async () => {
    const response = await axiosInstance.get('/admin/users');
    return response.data;
  },

  /**
   * Get revenue stats
   */
  getRevenueStats: async () => {
    const response = await axiosInstance.get('/admin/revenue');
    return response.data;
  },

  /**
   * Get platform analytics
   */
  getAnalytics: async (startDate, endDate) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const response = await axiosInstance.get(`/admin/analytics?${params.toString()}`);
    return response.data;
  },
};

export default adminAPI;