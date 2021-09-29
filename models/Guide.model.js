const { Schema, model } = require("mongoose");

const guideSchema = new Schema({
    
        firstName: String,
        lastName: String,
        // password: String,
        startedWorking: Number,
        email: {
            type: String,
            unique: true,
        },
        location: String,
        languages: {
            type: String,
            enum: ['EN', 'PT', 'ES', 'IT', 'ZH', 'JA', 'RU', 'FR', 'NL', 'DE']
        },
        bio: String,
        imageUrl: String,
        password: String,
}, {
    timestamps: true
});

const Guide = new model('Guide', guideSchema);

module.exports = Guide;

