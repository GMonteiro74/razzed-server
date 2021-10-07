const { Schema, model } = require("mongoose");

const guideSchema = new Schema({
    
        firstName: String,
        lastName: String,
        startedWorking: Number,
        email: {
            type: String,
            unique: false,
        },
        location: String,
        languages: {
            type: Array,
        },
        bio: String,
        imageUrl: String,
        password: String,
        type: String,
        tours: Array,
        notifications: Array,
}, {
    timestamps: true,
});

const Guide = new model('Guide', guideSchema);

module.exports = Guide;

