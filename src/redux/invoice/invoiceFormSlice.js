import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const invoiceFormSlice = createSlice({
    name: 'invoiceForm',
    initialState: {
        formfields: {
            customer: {
                mobile: '',
                image: '',
                name: '',
                detail: '',
            },
            currency: "PKR Pakistani Rupee",
            date: new Date().toString(),
            code: nanoid(),
            description: '',
            type: '',
            weight: '',
            tare: '',
            unitPrice: '',
            paymentAmount: '',
            discount: '',
            reference: '',
            invoiceNote: '',
            paymentNote: '',
            memo: '',
            cheque: '',
            paymentType: '',
            account: ''
        },
        formType: 'invoice',
        loading: false,
    },
    reducers: {
        changeFormType: (state, action) => {
            state.formType = action.payload
            if (action.payload === 'invoice') {
                state.formfields.paymentNote = '';
                state.formfields.memo = '';
                state.formfields.cheque = '';
                state.formfields.paymentType = '';
                state.formfields.account = '';
                state.formfields.paymentNote = '';
                state.formfields.paymentAmount = '';
            } else {
                state.formfields.description = '';
                state.formfields.reference = '';
                state.formfields.weight = '';
                state.formfields.invoiceNote = '';
                state.formfields.tare = '';
                state.formfields.discount = '';
                // state.formfields.invoiceAmount = '';
                state.formfields.unitPrice = '';
            }
        },
        setInvoiceData: (state, action) => {
            state.formfields[action.payload.key] = action.payload.value
        },
        toggleLoading: state => {
            state.loading = !state.loading
        },
        setInvoice: (state, action) => {
            state.formfields.date = action.payload.date.toString();
            state.formfields.code = action.payload.code;
            state.formfields.customer = action.payload.customer;
            state.formfields.type = action.payload.type;
            state.formfields.currency = action.payload.currency;
            state.formfields.description = action.payload.description;
            state.formfields.weight = action.payload.weight;
            state.formfields.tare = action.payload.tare;
            state.formfields.paymentAmount = action.payload.paymentAmount;
            state.formfields.reference = action.payload.reference;
            state.formfields.credit = action.payload.credit;
            state.formfields.note = action.payload.note;
            state.formfields.memo = action.payload.memo;
            state.formfields.cheque = action.payload.cheque;
            state.formfields.paymentType = action.payload.paymentType;
            state.formfields.account = action.payload.account;
            state.formfields.unitPrice = action.payload.unitPrice;
        },
        resetInvoiceForm: (state) => {
            document.getElementById('container').scrollTo(0, 0)
            state.formfields.date = new Date().toString();
            state.formfields.code = nanoid();
            state.formfields.customer = {
                mobile: '',
                image: '',
                name: '',
                detail: '',
            }
            state.formfields.currency = 'PKR Pakistani Rupee';
            state.formfields.type = '';
            state.formfields.description = '';
            state.formfields.weight = '';
            state.formfields.tare = '';
            state.formfields.paymentAmount = null;
            state.formfields.reference = '';
            state.formfields.note = '';
            state.formfields.memo = '';
            state.formfields.cheque = '';
            state.formfields.paymentType = '';
            state.formfields.account = '';
            state.formfields.paymentNote = '';
            state.formfields.invoiceNote = '';
            state.formfields.unitPrice = '';
        },
    },

})

export const { setInvoiceData, resetInvoiceForm, setInvoice, changeFormType, toggleLoading } = invoiceFormSlice.actions;

export default invoiceFormSlice.reducer;