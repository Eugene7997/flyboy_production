import { Form } from "react-bootstrap";
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {
    addFlightStart,
    addFlightSuccess,
    addFlightFailure,
    clearErrors
} from '../redux/flight/flightSlice'

function FlightRegistrationForm( {setFormVisible} ) {
    const [formData, setFormData] = useState({})
    const {flights, loading, errors} = useSelector((state)=> state.flight)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validateFormBeforeSubmit = () => {
        let flag = true;
    
        if (!formData.flightID || formData.flightID.trim() === '') {
            dispatch(addFlightFailure("flightID is required"))
            flag = false;
        }
        if (!formData.tailNumber || formData.tailNumber.trim() === '') {
            dispatch(addFlightFailure("tailNumber is required."))
            flag = false;
        }
        if (!formData.takeoff || formData.takeoff.trim() === '') {
            dispatch(addFlightFailure("takeoff is required."))
            flag = false;
        }
        if (!formData.landing || formData.landing.trim() === '') {
            dispatch(addFlightFailure("landing is required."))
            flag = false;
        }
        if (formData.landing < formData.takeoff) {
            dispatch(addFlightFailure("landing cannot be before take off."))
            flag = false;
        }
        if (!formData.Duration || formData.Duration.trim() === '') {
            dispatch(addFlightFailure("Duration is required."))
            flag = false;
        }
        
        return flag;
    }

    const submitForm = async (e) => {
        e.preventDefault();
        dispatch(clearErrors())
        if (!validateFormBeforeSubmit()) {
            return;
        }
        
        try {
            dispatch(clearErrors())
            dispatch(addFlightStart())
            const res = await fetch("http://localhost:5000/api/flightlogs", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Something went wrong. Please try again.");
            }
            const data = await res.json()
            dispatch(addFlightSuccess(data))
            setFormData({});
            setFormVisible(false)
        }
        catch (err) {
            dispatch(addFlightFailure(err.message))
        }   
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h1 className="text-2xl font-semibold mb-4 text-center">Add new Flight Log</h1>
            <form onSubmit={submitForm}>
                <Form.Group className="mb-4">
                    <Form.Label className="block text-gray-700 font-medium">Flight ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="flightID"
                        placeholder="Enter Flight ID"
                        onChange={handleChange}
                        className="border-gray-300 rounded-md"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label className="block text-gray-700 font-medium">Tail Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="tailNumber"
                        placeholder="Enter Tail Number"
                        onChange={handleChange}
                        className="border-gray-300 rounded-md"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label className="block text-gray-700 font-medium">Take Off</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="takeoff"
                        placeholder="Enter Take Off"
                        onChange={handleChange}
                        className="border-gray-300 rounded-md"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label className="block text-gray-700 font-medium">Landing</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="landing"
                        placeholder="Enter Landing"
                        onChange={handleChange}
                        className="border-gray-300 rounded-md"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label className="block text-gray-700 font-medium">Duration</Form.Label>
                    <Form.Control
                        type="text"
                        name="Duration"
                        placeholder="Enter Duration"
                        onChange={handleChange}
                        className="border-gray-300 rounded-md"
                    />
                </Form.Group>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition-colors"
                >
                    Submit
                </button>
            </form>
            <div className="">
            {errors.length>0 && errors.map((err, index) => (
                <p key={index} className="text-red-500 text-center mt-4">{err}</p>
            ))} 
            </div>
            
        </div>
    );
}
export default FlightRegistrationForm;