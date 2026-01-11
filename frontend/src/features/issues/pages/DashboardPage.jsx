import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import { getIssues, createIssue, updateIssue, deleteIssue } from '../api/issuesApi';
import { useAuth } from '../../../hooks/useAuth';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import IssueCard from '../components/IssueCard';
import IssueForm from '../components/IssueForm';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';
import AIHelper from '../../../components/AIHelper';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Home } from 'lucide-react';

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIssue, setEditingIssue] = useState(null);

    // Remove the redirect logic - allow admins to access user view

    const { data: issues, isLoading } = useQuery(
        ['issues', filters],
        () => getIssues(filters),
        { keepPreviousData: true }
    );

    const createMutation = useMutation(createIssue, {
        onSuccess: () => {
            queryClient.invalidateQueries('issues');
            toast.success('Issue created successfully');
            setIsModalOpen(false);
        },
        onError: (error) => toast.error(error.response?.data?.message || 'Failed to create issue'),
    });

    const updateMutation = useMutation(
        ({ id, data }) => updateIssue(id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('issues');
                toast.success('Issue updated successfully');
                setIsModalOpen(false);
                setEditingIssue(null);
            },
            onError: (error) => toast.error(error.response?.data?.message || 'Failed to update issue'),
        }
    );

    const deleteMutation = useMutation(deleteIssue, {
        onSuccess: () => {
            queryClient.invalidateQueries('issues');
            toast.success('Issue deleted');
        },
        onError: (error) => toast.error(error.response?.data?.message || 'Failed to delete issue'),
    });

    const handleFilterChange = (name, value) => {
        setFilters({ ...filters, [name]: value });
    };

    const handleCreateOrUpdate = (formData) => {
        if (editingIssue) {
            updateMutation.mutate({ id: editingIssue._id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const openEditModal = (issue) => {
        setEditingIssue(issue);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this issue?')) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7FEE7] transition-colors duration-200 flex flex-col">
            <Navbar />

            <main className="flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="animate-slide-in-left">
                        <Sidebar filters={filters} onFilterChange={handleFilterChange} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 animate-slide-in-right">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div className="relative flex-1 max-w-md group">
                                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-accent transition-colors duration-300" />
                                <input
                                    type="text"
                                    placeholder="Search issues..."
                                    className="input-premium pl-12"
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={() => { setEditingIssue(null); setIsModalOpen(true); }}
                                className="btn-primary"
                            >
                                <PlusIcon className="h-5 w-5" />
                                {user?.role === 'admin' ? 'New Issue (Admin)' : 'New Complaint'}
                            </Button>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-xl" />
                                ))}
                            </div>
                        ) : issues?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {issues.map((issue, index) => (
                                    <div
                                        key={issue._id}
                                        className="animate-fade-in-up"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <IssueCard
                                            issue={issue}
                                            onEdit={openEditModal}
                                            onDelete={handleDelete}
                                            userRole={user?.role}
                                            currentUserId={user?._id}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 animate-fade-in">
                                <p className="text-gray-500">No issues found matching your filters.</p>
                                <Button
                                    variant="ghost"
                                    className="mt-4 hover:scale-105 transition-transform duration-200"
                                    onClick={() => setFilters({ status: '', priority: '', search: '' })}
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingIssue(null); }}
                title={editingIssue ? 'Edit Issue' : 'Create New Issue'}
            >
                <IssueForm
                    initialData={editingIssue}
                    onSubmit={handleCreateOrUpdate}
                    onCancel={() => { setIsModalOpen(false); setEditingIssue(null); }}
                    isLoading={createMutation.isLoading || updateMutation.isLoading}
                />
            </Modal>

            <Footer />
            <div className="fixed bottom-8 right-8 z-50">
                <button
                    onClick={() => navigate('/')}
                    className="p-4 bg-[#365314] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
                    title="Back to Home"
                >
                    <Home size={24} />
                </button>
            </div>
            <AIHelper />
        </div>
    );
};

export default DashboardPage;
