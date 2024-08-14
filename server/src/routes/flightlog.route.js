const express = require("express")
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: "uploads/" });
const {getFlightLogs, getFlightLog, postFlightLog, updateFlightLog, deleteFlightLog} = require("../controllers/flightlog.controller")

router.get("/", getFlightLogs)

router.get("/:id", getFlightLog)

router.post("/", upload.array("files"), postFlightLog)

router.put("/:id", upload.array("files"), updateFlightLog)

router.delete("/:id", deleteFlightLog)

module.exports = router