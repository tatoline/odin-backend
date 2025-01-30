const mongoose = require('mongoose')

const BaseSchema = new mongoose.Schema({
    deletedAt: { type: Date, default: null }, // Soft delete timestamp
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null } // User who deleted this record
}, { timestamps: true }) // Auto-adds createdAt & updatedAt

module.exports = BaseSchema