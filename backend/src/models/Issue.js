const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
            enum: ['bug', 'facility', 'request', 'other'],
        },
        priority: {
            type: String,
            required: [true, 'Please add a priority'],
            enum: ['low', 'medium', 'high', 'critical'],
            default: 'medium',
        },
        status: {
            type: String,
            required: [true, 'Please add a status'],
            enum: ['open', 'in_progress', 'resolved', 'closed'],
            default: 'open',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        aiTriage: {
            sentiment: String,
            suggestedPriority: {
                type: String,
                enum: ['low', 'medium', 'high', 'critical']
            },
            suggestedCategory: {
                type: String,
                enum: ['bug', 'facility', 'request', 'other']
            },
            explanation: String,
            tags: [String]
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Issue', issueSchema);
