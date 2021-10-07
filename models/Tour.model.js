const { Schema, model } = require("mongoose");

const tourSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    language: {
        type: String,
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
    reply: Object,
    startDate: {
        type: Date,
        required: true,
    },
    finalDate: {
        type: Date,
        required: true,
    },
    agency: {
        type: Schema.Types.ObjectId,
        ref: 'Agency'
    },
    guide: {
        type: Schema.Types.ObjectId,
        ref: 'Guide'
    }
}, {
    timestamps: true,
})

const Tour = new model('Tour', tourSchema);

module.exports = Tour;