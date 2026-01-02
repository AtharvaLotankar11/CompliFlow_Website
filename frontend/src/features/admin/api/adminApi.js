import api from '../../../api/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get issues grouped by users for admin dashboard
export const getIssuesGroupedByUser = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        
        if (filters.status) params.append('status', filters.status);
        if (filters.priority) params.append('priority', filters.priority);
        if (filters.search) params.append('search', filters.search);

        console.log('Fetching admin data with filters:', filters);
        console.log('API URL:', `/issues/admin/users?${params}`);
        
        const response = await api.get(`/issues/admin/users?${params}`);
        console.log('Admin API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Admin API error:', error.response?.data || error.message);
        throw error;
    }
};

// Update issue status (admin only)
export const updateIssueStatus = async (issueId, status) => {
    const response = await api.put(`/issues/${issueId}`, { status });
    return response.data;
};