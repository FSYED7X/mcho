import { configureStore } from '@reduxjs/toolkit';
import screenReducer from './redux/screenSlice'
import authReducer from './redux/authSlice'

import bankFormReducer from './redux/bank/bankFormSlice'
import bankSavedDataReducer from './redux/bank/bankSavedDataSlice'

import invoiceFormReducer from './redux/invoice/invoiceFormSlice'
import invoiceSavedDataReducer from './redux/invoice/invoiceSavedDataSlice'

import paymentFormReducer from './redux/payment/paymentFormSlice'
import paymentSavedDataReducer from './redux/payment/paymentSavedDataSlice'

import banksListReducer from './redux/banksListSlice'
import customersListReducer from './redux/customersListSlice'
import operatorsListReducer from './redux/operatorsListSlice'

export default configureStore({
    reducer: {
        screen: screenReducer,
        auth: authReducer,
        bankForm: bankFormReducer,
        bankSavedData: bankSavedDataReducer,
        invoiceForm: invoiceFormReducer,
        invoiceSavedData: invoiceSavedDataReducer,
        paymentForm: paymentFormReducer,
        paymentSavedData: paymentSavedDataReducer,
        banksList: banksListReducer,
        customersList: customersListReducer,
        operatorsList: operatorsListReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});
