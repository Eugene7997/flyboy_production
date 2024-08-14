import FlightRegistrationForm from "../components/RegisterFlightLog";
import FlightDisplay from "../components/FlightDisplay";
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors } from '../redux/flight/flightSlice';
import { useState } from 'react';

export default function Flights() {
    const [formVisible, setFormVisible] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Flights</h1>
            <div className="mb-6">
                <button
                    onClick={() => {
                        setFormVisible(!formVisible)
                        dispatch(clearErrors())
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition-colors"
                >
                    {formVisible ? 'Hide Form' : 'Create Flight Log'}
                </button>
            </div>
            
            {formVisible && <FlightRegistrationForm setFormVisible={setFormVisible} />}
            
            <div className="mt-8">
                <FlightDisplay />
            </div>
        </div>
    );
}
