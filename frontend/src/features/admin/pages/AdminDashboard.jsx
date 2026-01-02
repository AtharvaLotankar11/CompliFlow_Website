import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import { getIssuesGroupedByUser, updateIssueStatus } from '../api/adminApi';
import { useAuth } from '../../../hooks/useAuth';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import UserComplaintSection from '../components/UserComplaintSection';
import AdminStats from '../components/AdminStats';
import { MagnifyingGlassIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const AdminDashboard = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState({ status: '', priority: '', search: '' });

    const { data: adminData, isLoading, error } = useQuery(
        ['admin-issues', filters],
        () => getIssuesGroupedByUser(filters),
        { 
            keepPreviousData: true,
            onSuccess: (data) => {
                console.log('Admin dashboard data received:', data);
            },
            onError: (error) => {
                console.error('Admin dashboard query error:', error);
            }
        }
    );

    const updateMutation = useMutation(
        ({ id, status }) => updateIssueStatus(id, status),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('admin-issues');
                toast.success('Issue status updated successfully');
            },
            onError: (error) => toast.error(error.response?.data?.message || 'Failed to update issue'),
        }
    );

    const handleStatusUpdate = (issueId, newStatus) => {
        updateMutation.mutate({ id: issueId, status: newStatus });
    };

    const handleFilterChange = (name, value) => {
        setFilters({ ...filters, [name]: value });
    };

    const userGroups = adminData?.userGroups || {};
    const userEntries = Object.entries(userGroups);
    const totalUsers = adminData?.totalUsers || 0;
    const totalIssues = adminData?.totalIssues || 0;

    // Debug logging
    console.log('Admin Dashboard State:', {
        isLoading,
        error,
        adminData,
        userGroups,
        userEntries: userEntries.length,
        totalUsers,
        totalIssues
    });

    // Flatten issues for stats
    const allIssues = userEntries.flatMap(([_, { issues }]) => issues);

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
                    <p className="text-gray-600">You need admin privileges to access this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 transition-colors duration-200">
            <Navbar />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="animate-slide-in-left">
                        <Sidebar filters={filters} onFilterChange={handleFilterChange} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 animate-slide-in-right">
                        {/* Header */}
                        <div className="mb-8 animate-fade-in-up">
                            <div className="flex items-center gap-3 mb-4">
                                <UserGroupIcon className="h-8 w-8 text-indigo-600 animate-bounce-in" />
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Admin Dashboard
                                </h1>
                            </div>
                            <p className="text-gray-600">
                                Manage user complaints and track issue resolution
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div className="relative flex-1 max-w-md">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-200" />
                                <input
                                    type="text"
                                    placeholder="Search issues..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200 hover:border-gray-300 focus:scale-105"
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="animate-scale-in">
                            <AdminStats 
                                totalUsers={totalUsers}
                                totalIssues={totalIssues}
                                issuesData={allIssues}
                            />
                        </div>

                        {/* User Complaint Sections */}
                        {isLoading ? (
                            <div className="space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
                                ))}
                            </div>
                        ) : userEntries.length > 0 ? (
                            <div className="space-y-6">
                                {userEntries.map(([userId, { user: userData, issues }], index) => (
                                    <div 
                                        key={userId}
                                        className="animate-fade-in-up"
                                        style={{ animationDelay: `${index * 150}ms` }}
                                    >
                                        <UserComplaintSection
                                            user={userData}
                                            issues={issues}
                                            onStatusUpdate={handleStatusUpdate}
                                            isUpdating={updateMutation.isLoading}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 animate-fade-in">
                                <UserGroupIcon className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-bounce-in" />
                                <p className="text-gray-500 text-lg">No user complaints found</p>
                                <p className="text-gray-400 text-sm mt-2">
                                    Users haven't submitted any complaints yet
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;