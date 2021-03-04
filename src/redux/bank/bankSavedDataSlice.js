import { createSlice } from '@reduxjs/toolkit';
const cleanDeep = require('clean-deep');

export const bankSavedDataSlice = createSlice({
    name: 'bankForm',
    initialState: {
        value: localStorage.savedBankData ? JSON.parse(localStorage.savedBankData) : [],
        requests: [],
        loading: false
    },
    reducers: {
        setbankSavedData: (state, action) => {
            state.value = [...state.value, { loading: false, data: action.payload, checked: false }]
            localStorage.savedBankData = JSON.stringify(state.value)
        },
        bankSavedToggleLoading: state => { state.loading = !state.loading },
        removeBankAllRequest: state => {
            state.value = JSON.parse(JSON.stringify(state.value)).filter(function (value, index, arr) { return !state.requests.includes(index.toString()) })
            state.requests = []
            localStorage.savedBankData = JSON.stringify(state.value)
        },
        selectAllBankRequests: (state, action) => {
            for (var i = 0; i < state.value.length; i++) {
                state.value[i].checked = action.payload
            }
            action.payload ? state.requests = Object.keys(state.value) : state.requests = []
        },
        individualBankRequestSelect: (state, action) => {
            var value = action.payload.value
            var checked = action.payload.checked
            state.value[value].checked = !state.value[value].checked
            checked ? state.requests = [...state.requests, action.payload.value] : state.requests.splice(state.requests.indexOf(action.payload.value), 1)
        },
        removeBankSingleRequests: (state, action) => {
            delete state.value[action.payload]
            state.value = cleanDeep(state.value)
            localStorage.savedBankData = JSON.stringify(state.value)
        }
    },
})

export const { setbankSavedData, bankSavedToggleLoading, removeBankAllRequest, selectAllBankRequests, individualBankRequestSelect, removeBankSingleRequests } = bankSavedDataSlice.actions;
export default bankSavedDataSlice.reducer;