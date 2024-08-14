const mongoose = require("mongoose")

const FlightLogSchema = mongoose.Schema({
    flightID: {
        type: Number,
        required: true
    },
    tailNumber: {
        type: Number,
        required: true
    },
    takeoff: {
        type: Date,
        required: true
    },
    landing: {
        type: Date,
        required: true
    },
    Duration: {
        type: Number,
        required: true
    },
}, 
{
    timestamps: true
})

const FlightLog = mongoose.model("FlightLog", FlightLogSchema)
module.exports = FlightLog