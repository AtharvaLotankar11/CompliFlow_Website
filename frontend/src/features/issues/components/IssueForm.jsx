import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import { ISSUE_CATEGORY, ISSUE_PRIORITY, ISSUE_STATUS } from '../../../constants/issue';
import { useAuth } from '../../../hooks/useAuth';

const IssueForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'other',
        priority: 'medium',
        status: 'open',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create a copy of formData
        const submitData = { ...formData };
        
        // Remove status field for non-admin users when editing
        if (initialData && !isAdmin) {
            delete submitData.status;
        }
        
        onSubmit(submitData);
    };

    const categoryOptions = Object.entries(ISSUE_CATEGORY).map(([key, value]) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
    }));

    const priorityOptions = Object.entries(ISSUE_PRIORITY).map(([key, value]) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
    }));

    const statusOptions = Object.entries(ISSUE_STATUS).map(([key, value]) => ({
        label: value.replace('_', ' ').charAt(0).toUpperCase() + value.slice(1).replace('_', ' '),
        value,
    }));

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Brief summary of the issue"
            />
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="Detailed explanation..."
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={categoryOptions}
                />
                <Select
                    label="Priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    options={priorityOptions}
                />
            </div>
            {/* Status field - Only show to admins when editing */}
            {initialData && isAdmin && (
                <Select
                    label="Status (Admin Only)"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    options={statusOptions}
                />
            )}
            {/* Show current status to non-admin users (read-only) */}
            {initialData && !isAdmin && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Status (Admin Only)
                    </label>
                    <div className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-600">
                        {formData.status?.replace('_', ' ').charAt(0).toUpperCase() + 
                         formData.status?.slice(1).replace('_', ' ') || 'Open'}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Only administrators can change issue status
                    </p>
                </div>
            )}
            <div className="flex justify-end gap-3 mt-6">
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : initialData ? 'Update Issue' : 'Create Issue'}
                </Button>
            </div>
        </form>
    );
};

export default IssueForm;
