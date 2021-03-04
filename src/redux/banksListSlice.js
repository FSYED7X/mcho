import { createSlice } from '@reduxjs/toolkit';

export const banksListSlice = createSlice({
    name: 'banksList',
    initialState: {
        loading: false,
        data: localStorage.banksList ? JSON.parse(localStorage.banksList) : [],
    },
    reducers: {
        setBankListData: (state, action) => { state.data = action.payload },
        toggleBankListLoading: state => { state.loading = !state.loading }
    }
})

export const { setBankListData, toggleBankListLoading } = banksListSlice.actions;

export default banksListSlice.reducer;