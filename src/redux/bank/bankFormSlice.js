import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const bankFormSlice = createSlice({
    name: 'bankForm',
    initialState: {
        date: new Date().toString(),
        code: nanoid(),
        cheque: '',
        type: '',
        payee: '',
        memo: '',
        acc: null,
        payeeBank: '',
        note1: '',
        note2: '',
        currency: "PKR Pakistani Rupee",
        debit: '',
        credit: '',
        crate: '',
        dpkr: '',
        cpkr: '',
    },
    reducers: {
        setBankData: (state, action) => {
            state[action.payload.key] = action.payload.value
        },
        setBank: (state, action) => {
            state.date = action.payload.date.toString();
            state.code = action.payload.code;
            state.cheque = action.payload.cheque;
            state.type = action.payload.type;
            state.payee = action.payload.payee;
            state.payeeBank = action.payload.payeeBank;
            state.memo = action.payload.memo;
            state.acc = action.payload.acc;
            state.currency = action.payload.currency;
            state.debit = action.payload.debit;
            state.credit = action.payload.credit;
            state.note1 = action.payload.note1;
            state.note2 = action.payload.note2;
        },
        resetBankForm: (state) => {
            document.getElementById('container').scrollTo(0, 0)
            state.date = new Date().toString();
            state.code = nanoid();
            state.cheque = '';
            state.type = '';
            state.payee = '';
            state.payeeBank = '';
            state.memo = '';
            state.acc = null;
            state.currency = 'PKR Pakistani Rupee';
            state.debit = '';
            state.credit = '';
            state.note1 = '';
            state.note2 = '';
        },
    },

})

export const { setBankData, resetBankForm, setBank } = bankFormSlice.actions;

export default bankFormSlice.reducer;