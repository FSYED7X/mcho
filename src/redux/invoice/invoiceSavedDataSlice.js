import { createSlice } from '@reduxjs/toolkit';
const cleanDeep = require('clean-deep');

export const invoiceSavedDataSlice = createSlice({
    name: 'invoiceForm',
    initialState: {
        value: localStorage.savedInvoiceData ? JSON.parse(localStorage.savedInvoiceData) : [],
        requests: [],
        loading: false
    },
    reducers: {
        setInvoiceSavedData: (state, action) => {
            state.value = [...state.value, { loading: false, data: action.payload, checked: false }]
            localStorage.savedInvoiceData = JSON.stringify(state.value)
        },
        invoiceSavedToggleLoading: state => { state.loading = !state.loading },
        removeInvoiceAllRequest: state => {
            state.value = JSON.parse(JSON.stringify(state.value)).filter(function (value, index, arr) { return !state.requests.includes(index.toString()) })
            state.requests = []
            localStorage.savedInvoiceData = JSON.stringify(state.value)
        },
        selectAllInvoiceRequests: (state, action) => {
            for (var i = 0; i < state.value.length; i++) {
                state.value[i].checked = action.payload
            }
            action.payload ? state.requests = Object.keys(state.value) : state.requests = []
        },
        individualInvoiceRequestSelect: (state, action) => {
            var value = action.payload.value
            var checked = action.payload.checked
            state.value[value].checked = !state.value[value].checked
            checked ? state.requests = [...state.requests, action.payload.value] : state.requests.splice(state.requests.indexOf(action.payload.value), 1)
        },
        removeInvoiceSingleRequests: (state, action) => {
            delete state.value[action.payload]
            state.value = cleanDeep(state.value)
            localStorage.savedInvoiceData = JSON.stringify(state.value)
        }
    },
})

export const { setInvoiceSavedData, invoiceSavedToggleLoading, removeInvoiceAllRequest, selectAllInvoiceRequests, individualInvoiceRequestSelect, removeInvoiceSingleRequests } = invoiceSavedDataSlice.actions;
export default invoiceSavedDataSlice.reducer;