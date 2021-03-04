import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const paymentFormSlice = createSlice({
    name: 'paymentForm',
    initialState: {
        date: new Date().toString(),
        code: nanoid(),
        cheque: '',
        type: '',
        payee: '',
        memo: '',
        acc: null,
        payeePayment: '',
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
        setPaymentData: (state, action) => {
            state[action.payload.key] = action.payload.value
        },
        setPayment: (state, action) => {
            state.date = action.payload.date.toString();
            state.code = action.payload.code;
            state.cheque = action.payload.cheque;
            state.type = action.payload.type;
            state.payee = action.payload.payee;
            state.payeePayment = action.payload.payeePayment;
            state.memo = action.payload.memo;
            state.acc = action.payload.acc;
            state.currency = action.payload.currency;
            state.debit = action.payload.debit;
            state.credit = action.payload.credit;
            state.note1 = action.payload.note1;
            state.note2 = action.payload.note2;
        },
        resetPaymentForm: (state) => {
            document.getElementById('container').scrollTo(0, 0)
            state.date = new Date().toString();
            state.code = nanoid();
            state.cheque = '';
            state.type = '';
            state.payee = '';
            state.payeePayment = '';
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

export const { setPaymentData, resetPaymentForm, setPayment } = paymentFormSlice.actions;

export default paymentFormSlice.reducer;