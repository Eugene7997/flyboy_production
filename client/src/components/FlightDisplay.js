import React, { useState, useEffect } from 'react';
import FlightItem from './FlightItem'; 
import {useDispatch, useSelector} from 'react-redux'
import {
    fetchFlightsStart,
    fetchFlightsSuccess,
    fetchFlightsFailure,
    updateFlightStart,
    updateFlightSuccess,
    updateFlightFailure,
    deleteFlightStart,
    deleteFlightSuccess,
    deleteFlightFailure,
    clearErrors
} from '../redux/flight/flightSlice'

export default function FlightDisplay() {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch()
    const {flights, loading, errors} = useSelector((state)=> state.flight)

    useEffect(() => {
        const fetchFlightLogs = async () => {
            dispatch(clearErrors())
            dispatch(fetchFlightsStart())
            try {
                const response = await fetch("http://localhost:5000/api/flightlogs", { method: "GET", credentials: 'include' });
                if (!response.ok) {
                    throw new Error("Failed to fetch flight logs.");
                }
                const data = await response.json();
                dispatch(fetchFlightsSuccess(data))
            } catch (error) {
                dispatch(fetchFlightsFailure(error.message))
                console.error("Error fetching flight logs:", error.message);
            }
        };
        fetchFlightLogs();
    }, []);

    const handleSave = async (updatedFlightLog) => {
        try {
            dispatch(updateFlightStart())
            const response = await fetch(`http://localhost:5000/api/flightlogs/${updatedFlightLog._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFlightLog),
                credentials: 'include',
            });
            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 404 || (errorData.message && errorData.message.includes('Flight log not found'))) {
                    throw new Error("Flight log is not found.");
                }
                else {
                    throw new Error(errorData.message || "Something went wrong. Please try again.");
                }
            }
            const data = await response.json();
            dispatch(updateFlightSuccess(data))
        } catch (error) {
            dispatch(updateFlightFailure(error.message))
            console.error("Error saving flight log:", error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            dispatch(deleteFlightStart())
            const response = await fetch(`http://localhost:5000/api/flightlogs/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (!response.ok) {
                const errorData = await response.json()
                if (response.status === 404 || (errorData.message && errorData.message.includes('Flight log not found'))) {
                    throw new Error("Flight log is not found.");
                }
                else {
                    throw new Error(errorData.message || "Something went wrong. Please try again.");
                }
            }
            dispatch(deleteFlightSuccess(id))
        } catch (error) {
            dispatch(deleteFlightFailure(error.message))
            console.error("Error deleting flight log:", error.message);
        }
    };

    // Filter flight logs based on search query
    const filteredFlightLogs = flights.filter(log =>
        (log.flightID?.toString() || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h1>Flight Display</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Flight ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>
            { loading ? <p>Loading flight logs...</p> : filteredFlightLogs.length > 0 ? (
                filteredFlightLogs.map(log => (
                    <FlightItem key={log._id} flightLog={log} onSave={handleSave} onDelete={handleDelete} />
                ))
            ) : (
                <p className="text-gray-500">No flight logs found.</p>
            )}
            <div>
                {errors && errors.map((error, index) => (
                    <p key={index} className="text-red-500">{error}</p>
                ))}
            </div>
        </div>
    );
}
