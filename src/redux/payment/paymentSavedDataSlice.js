import { createSlice } from '@reduxjs/toolkit';
const cleanDeep = require('clean-deep');

export const paymentSavedDataSlice = createSlice({
    name: 'paymentForm',
    initialState: {
        value: localStorage.savedPaymentData ? JSON.parse(localStorage.savedPaymentData) : [],
        requests: [],
        loading: false
    },
    reducers: {
        setPaymentSavedData: (state, action) => {
            state.value = [...state.value, { loading: false, data: action.payload, checked: false }]
            localStorage.savedPaymentData = JSON.stringify(state.value)
        },
        paymentSavedToggleLoading: state => { state.loading = !state.loading },
        removePaymentAllRequest: state => {
            state.value = JSON.parse(JSON.stringify(state.value)).filter(function (value, index, arr) { return !state.requests.includes(index.toString()) })
            state.requests = []
            localStorage.savedPaymentData = JSON.stringify(state.value)
        },
        selectAllPaymentRequests: (state, action) => {
            for (var i = 0; i < state.value.length; i++) {
                state.value[i].checked = action.payload
            }
            action.payload ? state.requests = Object.keys(state.value) : state.requests = []
        },
        individualPaymentRequestSelect: (state, action) => {
            var value = action.payload.value
            var checked = action.payload.checked
            state.value[value].checked = !state.value[value].checked
            checked ? state.requests = [...state.requests, action.payload.value] : state.requests.splice(state.requests.indexOf(action.payload.value), 1)
        },
        removePaymentSingleRequests: (state, action) => {
            delete state.value[action.payload]
            state.value = cleanDeep(state.value)
            localStorage.savedPaymentData = JSON.stringify(state.value)
        }
    },
})

export const { setPaymentSavedData, paymentSavedToggleLoading, removePaymentAllRequest, selectAllPaymentRequests, individualPaymentRequestSelect, removePaymentSingleRequests } = paymentSavedDataSlice.actions;
export default paymentSavedDataSlice.reducer;