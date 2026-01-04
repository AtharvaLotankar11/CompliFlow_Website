import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import { ISSUE_CATEGORY, ISSUE_PRIORITY, ISSUE_STATUS } from '../../../constants/issue';
import { useAuth } from '../../../hooks/useAuth';
import { Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const IssueForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';
    const [isAiLoading, setIsAiLoading] = useState(false);
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

    const handleAiSuggest = async () => {
        if (!formData.title) {
            toast.error('Please enter a title first');
            return;
        }

        setIsAiLoading(true);
        try {
            const response = await axios.post('/api/ai/chat', {
                message: `Based on this issue title: "${formData.title}", please suggest a detailed description and the most appropriate category (one of: ${Object.values(ISSUE_CATEGORY).join(', ')}). Format your response as JSON: {"description": "...", "category": "..."}`,
                history: []
            }, { withCredentials: true });

            const aiData = JSON.parse(response.data.response);
            setFormData(prev => ({
                ...prev,
                description: aiData.description || prev.description,
                category: aiData.category || prev.category
            }));
            toast.success('AI suggestions applied!');
        } catch (error) {
            console.error('AI Suggestion Error:', error);
            toast.error('Failed to get AI suggestions');
        } finally {
            setIsAiLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = { ...formData };
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
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
                <Input
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Brief summary of the issue"
                    className="pr-12"
                />
                <button
                    type="button"
                    onClick={handleAiSuggest}
                    disabled={isAiLoading}
                    className="absolute right-3 top-[38px] p-2 text-accent hover:text-accent-dark transition-colors disabled:opacity-50"
                    title="Get AI Suggestions"
                >
                    {isAiLoading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                </button>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all dark:bg-slate-950/50 dark:border-slate-800 dark:text-white"
                    placeholder="Detailed explanation..."
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

            {initialData && isAdmin && (
                <Select
                    label="Status (Admin Only)"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    options={statusOptions}
                />
            )}

            {initialData && !isAdmin && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Current Status
                    </label>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {formData.status?.replace('_', ' ').charAt(0).toUpperCase() +
                            formData.status?.slice(1).replace('_', ' ') || 'Open'}
                    </div>
                </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="btn-primary">
                    {isLoading ? 'Saving...' : initialData ? 'Update Issue' : 'Create Issue'}
                </Button>
            </div>
        </form>
    );
};

export default IssueForm;

