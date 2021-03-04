import { createSlice } from '@reduxjs/toolkit';

export const customersListSlice = createSlice({
    name: 'customersList',
    initialState: {
        loading: false,
        data: localStorage.customersList ? JSON.parse(localStorage.customersList) : [],
    },
    reducers: {
        setCustomersListData: (state, action) => { state.data = action.payload },
        toggleCustomersListLoading: state => { state.loading = !state.loading }
    }
})

export const { setCustomersListData, toggleCustomersListLoading } = customersListSlice.actions;

export default customersListSlice.reducer;