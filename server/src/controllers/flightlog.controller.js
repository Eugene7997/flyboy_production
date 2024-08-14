const FlightLog = require('../models/flightlog.model')

const getFlightLogs = async (req, res) => {
    try {
        console.log("Received request for flight logs")
        const flightLogs = await FlightLog.find({});
        console.log(flightLogs)
        res.status(200).json(flightLogs)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getFlightLog = async (req, res) => {
    try {
        const {id} = req.params
        console.log(`Received request for flight log with ${id}`)
        const flightLog = await FlightLog.findById(id);
        console.log(flightLog)
        res.status(200).json(flightLog)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

const postFlightLog = async (req, res) => {
    try {
        console.log("Received request to create flight log")
        const flightLogs = await FlightLog.create(req.body)
        res.status(200).json(flightLogs)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateFlightLog = async (req, res) => {
    try {
        const {id} = req.params
        console.log(`Received request to update flight log ${id}`)
        const flightLog = await FlightLog.findByIdAndUpdate(id, req.body)
        if (!flightLog) {
            res.status(404).json({message: "Flight log not found"})
        }
        const updatedFlightLog = await FlightLog.findById(id)
        res.status(200).json(updatedFlightLog)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteFlightLog = async (req, res) => {
    try {
        const {id} = req.params
        console.log(`Received request to delete flight log ${id}`)
        const flightLog = await FlightLog.findByIdAndDelete(id)
        if (!flightLog) {
            res.status(404).json({message: "Flight log not found"})
        }
        res.status(200).json({message: "Flight log deleted successfully"})
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getFlightLogs,
    getFlightLog,
    postFlightLog,
    updateFlightLog,
    deleteFlightLog
}