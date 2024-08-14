import React, { useState } from 'react';

export default function FlightItem({ flightLog, onSave, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState([]);
    const [editedFlightLog, setEditedFlightLog] = useState({ ...flightLog });

    // Handle input changes
    const handleChange = (e) => {
        setErrors([]);
        const newErrors = []
        const {name, value} = e.target
        if (name === 'landing') {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                newErrors.push("Invalid date-time input for takeoff")
                setErrors(newErrors)
                return;
            }
        }
        if (name === 'takeoff') {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                newErrors.push("Invalid date-time input for landing")
                setErrors(newErrors)
                return;
            }
        }
        setEditedFlightLog({
            ...editedFlightLog,
            [name]: value
        });
    };

    const validateFormBeforeSubmit = (updatedFlightLog) => {
        let flag = true;
        const newErrors = [];

        if (!updatedFlightLog.flightID) {
            newErrors.push("flightID is required.");            
            flag = false;
        }
        if (!updatedFlightLog.tailNumber) {
            newErrors.push("tailNumber is required.");
            flag = false;
        }
        if (!updatedFlightLog.takeoff) {
            newErrors.push("takeoff is required.");
            flag = false;
        }
        if (!updatedFlightLog.landing) {
            newErrors.push("landing is required.");
            flag = false;
        }
        if (updatedFlightLog.landing < updatedFlightLog.takeoff) {
            newErrors.push("landing cannot be before take off.");
            flag = false;
        }
        if (!updatedFlightLog.Duration) {
            newErrors.push("Duration is required.");
            flag = false;
        }
        setErrors(newErrors);
        console.log(errors)
        return flag;
    }

    const handleSave = () => {
        setErrors([]);
        if (!validateFormBeforeSubmit(editedFlightLog)) {
            return;
        }
        onSave(editedFlightLog);
        if (errors.length === 0) {
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditedFlightLog({ ...flightLog });
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this flight log?")) {
            onDelete(flightLog._id);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            {isEditing ? (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-600"><strong>Flight ID:</strong></label>
                            <input 
                                type="text" 
                                name="flightID" 
                                value={editedFlightLog.flightID} 
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="text-gray-600"><strong>Tail Number:</strong></label>
                            <input 
                                type="text" 
                                name="tailNumber" 
                                value={editedFlightLog.tailNumber} 
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="text-gray-600"><strong>Take Off:</strong></label>
                            <input 
                                type="datetime-local" 
                                name="takeoff" 
                                value={new Date(editedFlightLog.takeoff).toISOString().slice(0, 16)} 
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="text-gray-600"><strong>Landing:</strong></label>
                            <input 
                                type="datetime-local" 
                                name="landing" 
                                value={new Date(editedFlightLog.landing).toISOString().slice(0, 16)}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-gray-600"><strong>Duration:</strong></label>
                            <input 
                                type="text" 
                                name="Duration" 
                                value={editedFlightLog.Duration} 
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </div>
                        <div>
                        {errors && errors.map((error, index) => (
                            <p key={index} className="text-red-500">{error}</p>
                        ))}
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={handleCancel} className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Save
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Flight ID: {flightLog.flightID}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600"><strong>Tail Number:</strong> {flightLog.tailNumber}</p>
                            <p className="text-gray-600"><strong>Take Off:</strong> {new Date(flightLog.takeoff).toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-gray-600"><strong>Landing:</strong> {new Date(flightLog.landing).toLocaleString()}</p>
                            <p className="text-gray-600"><strong>Duration:</strong> {flightLog.Duration}</p>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={() => setIsEditing(true)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button>
                        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2">
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
