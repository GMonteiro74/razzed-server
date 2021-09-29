const { Schema, model } = require("mongoose");

const tourSchema = new Schema({
    type: {
        type: String,
        enum: ['HD', 'FD', 'Circuit'],
        required: true,
    },
    language: {
        type: String,
        enum: ['EN', 'PT', 'ES', 'IT', 'ZH', 'JA', 'RU', 'FR', 'NL', 'DE'],
        required: true,
    },
    rate: Number,
    pax: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    available: Boolean,
    startDate: {
        type: Date,
        required: true,
    },
    finalDate: {
        type: Date,
        required: true,
    },
    
    // agency: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Agency'
    // }
}, {
    timestamps: true,
})

const Tour = new model('Tour', tourSchema);

module.exports = Tour;