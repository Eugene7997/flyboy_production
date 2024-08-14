import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    flights: [],
    loading: false,
    errors: [],
}

const flightSlice = createSlice({
    name: 'flight',
    initialState: initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = []
        },
        fetchFlightsStart: (state) => {
            state.loading = true
        },
        fetchFlightsSuccess: (state, action) => {
            state.loading = false
            state.errors = []
            state.flights = action.payload
        },
        fetchFlightsFailure: (state, action) => {
            state.loading = false
            state.errors.push(action.payload)
        },
        addFlightStart: (state) => {
            state.loading = true
        },
        addFlightSuccess: (state, action) => {
            state.loading = false
            state.errors = []
            state.flights.push(action.payload)
        },
        addFlightFailure: (state, action) => {
            state.loading = false
            state.errors.push(action.payload)
        },
        updateFlightStart: (state) => {
            state.loading = true
        },
        updateFlightSuccess: (state, action) => {
            state.loading = false
            state.errors = []
            state.flights = state.flights.map(flight => (flight._id === action.payload._id ? action.payload : flight))
        },
        updateFlightFailure: (state, action) => {
            state.loading = false
            state.errors.push(action.payload)
        },
        deleteFlightStart: (state) => {
            state.loading = true
        },
        deleteFlightSuccess: (state, action) => {
            state.loading = false
            state.errors = []
            state.flights = state.flights.filter(flight => flight._id !== action.payload)
        },
        deleteFlightFailure: (state, action) => {
            state.loading = false
            state.errors.push(action.payload)
        },
    }
})

export const {
    fetchFlightsStart,
    fetchFlightsSuccess,
    fetchFlightsFailure,
    addFlightStart,
    addFlightSuccess,
    addFlightFailure,
    updateFlightStart,
    updateFlightSuccess,
    updateFlightFailure,
    deleteFlightStart,
    deleteFlightSuccess,
    deleteFlightFailure,
    clearErrors
} = flightSlice.actions
export default flightSlice.reducer