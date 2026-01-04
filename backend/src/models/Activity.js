const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
    {
        issue: {
            type: mongoose.Schema.ObjectId,
            ref: 'Issue',
            required: true,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        action: {
            type: String,
            required: true,
            enum: ['created', 'status_updated', 'priority_updated', 'category_updated', 'comment_added', 'deleted'],
        },
        details: {
            from: String,
            to: String,
            message: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Activity', activitySchema);
