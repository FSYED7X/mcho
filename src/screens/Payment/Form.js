import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import { setPaymentData } from '../../redux/payment/paymentFormSlice';
import Calendar from '../../components/Calendar/Calendar'
import CurrencyList from '../../components/CurrencyList/CurrencyList';
import copy from 'copy-to-clipboard';
import { setBankData, resetBankForm } from '../../redux/bank/bankFormSlice'
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';
import SaveIcon from '@material-ui/icons/Save';
import { openSnackbar, toggleLoading } from '../../redux/screenSlice'
import { Offline, Online } from "react-detect-offline";
import ToggleButtons from '../../components/ToggleButtons/ToggleButtons'
import WifiOffRoundedIcon from '@material-ui/icons/WifiOffRounded';
import { setbankSavedData } from '../../redux/bank/bankSavedDataSlice'
import { useIt } from '../../Context'
import BanksList from '../../components/BanksList/BanksList'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { nanoid } from 'nanoid'
import { BASE_URL } from '../../urlConstants'

const useStyles = makeStyles((theme) => ({
    large: {
        // width: theme.spacing(15),
        width: theme.spacing(17),
        height: theme.spacing(17),
        // height: theme.spacing(15),
    },
}));
const transactionType = ['Shop', 'Office', 'Godam', 'Other']
const paymentType = ['Cheque', 'Cash', 'Credit/Debit Card', 'Online/Atm', 'Bank Deposit']

export default function Payment() {
    const classes = useStyles();
    const theme = useSelector(state => state.screen.theme)
    const dispatch = useDispatch()
    const paymentForm = useSelector(state => state.paymentForm)
    const amount = useRef()
    const form = useRef()
    const [selectedValue, setSelectedValue] = useState(paymentForm.debit ? 'debit' : 'credit')
    const loading = useSelector(state => state.screen.loading)
    // const { uploadData, getBanksList } = useIt()

    useEffect(() => {
        // if (!localStorage.banksList) getBanksList()
    }, [])

    const submit = (e) => {
        e.preventDefault()
        // form.current.checkValidity() ? uploadData([paymentForm], toggleLoading, BASE_URL) : form.current.reportValidity()
    }

    const setData = (key, value) => {
        dispatch(setPaymentData({ key: key, value: value }))
    }

    return (
        <form ref={form} className='row py-2 justify-content-between' onSubmit={(e) => e.preventDefault()}>
            <div className="col-md-2 col-12 align-self-center">
                <div className='mb-4 pb-2'>
                    <Avatar src="/static/images/avatar/1.jpg" className={`mx-auto ${classes.large}`} />
                </div>
            </div>

            <div className="col-md-10 col-sm-12">
                <section className="row align-items-center">
                    <div className="col-md-12">
                        <section className="row align-items-center">
                            <div className="col-md-6 col-sm-12">
                                <TextField value={paymentForm.note1 || ''} onChange={(e) => setData('note1', e.target.value)} variant="outlined" label="Search Customer" className='mb-4 pb-2 w-100' />
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <TextField value={paymentForm.note2 || ''} onChange={(e) => setData('note2', e.target.value)} variant="outlined" label="Customer Mobile" className='mb-4 pb-2 w-100' />
                            </div>
                        </section>

                    </div>

                    <div className="col-md-12">
                        <section className="row align-items-center">
                            <div className="col-md-6 col-sm-12">
                                <TextField value={paymentForm.note2 || ''} onChange={(e) => setData('note2', e.target.value)} variant="outlined" label="Customer Detail" className='mb-4 pb-2 w-100' />
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-4 pb-2">
                                    <CurrencyList currency={paymentForm.currency} setCurrency={(e) => setData('currency', e)} />
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </div>

            <div className='col-md-6 col-sm-12 align-self-center'>
                <div className="mb-4 pb-2">
                    <Calendar date={paymentForm.date} handler={(e) => setData('date', e.toString())} />
                </div>
            </div>

            <div className="col-md-6 col-sm-12">
                <section className="row align-items-center">
                    <div className="col-md-12 col-sm-12">
                        <TextField required={paymentForm.type === 'Other' ? false : true} value={paymentForm.cheque || ''} type='number' onChange={(e) => setData("cheque", e.target.value)} variant="outlined" label="Account" className='w-100 mb-4 pb-2' />
                    </div>
                    
                </section>
                <section className="row align-items-center">
                    <div className="col-md-6 col-sm-12">
                        <TextField required={paymentForm.type === 'Other' ? false : true} value={paymentForm.cheque || ''} type='number' onChange={(e) => setData("cheque", e.target.value)} variant="outlined" label="Cheque/Other No." className='w-100 mb-4 pb-2' />
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <TextField required value={paymentForm.type} variant="outlined" select label="Select Type" className='w-100 mb-4 pb-2' onChange={(e) => setData('type', e.target.value)}>
                            {transactionType.map((item) =>
                                <MenuItem key={item} value={item}> {item} </MenuItem>
                            )}
                        </TextField>
                    </div>
                </section>
                <section className="row align-items-center">
                    <div className="col-md-6 col-sm-12">
                        <TextField value={paymentForm[selectedValue]} inputRef={amount} variant="outlined" label="Amount" fullwidth="true" className='w-100 mb-4 pb-2' inputProps={{ min: "0.01", step: "0.01" }} type="number" required onChange={(e) => setData(selectedValue, e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        {paymentForm.currency.substring(0, 3)}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <TextField required value={paymentForm.type} variant="outlined" select label="Payment Type" className='w-100 mb-4 pb-2' onChange={(e) => setData('type', e.target.value)}>
                            {paymentType.map((item) =>
                                <MenuItem key={item} value={item}> {item} </MenuItem>
                            )}
                        </TextField>
                    </div>
                    {/* <div className="col-md-6 col-sm-12">
                        <TextField value={paymentForm[selectedValue]} inputRef={amount} variant="outlined" label="Discount" fullwidth="true" className='w-100 mb-4 pb-2' inputProps={{ min: "0.01", step: "0.01" }} type="number" required onChange={(e) => setData(selectedValue, e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        {paymentForm.currency.substring(0, 3)}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div> */}
                </section>
                <section className="row align-items-center">
                    <div className="col-md-12">
                        <TextField value={paymentForm.note1 || ''} onChange={(e) => setData('note1', e.target.value)} variant="outlined" label="Note" className='mb-4 pb-2 w-100' required />
                    </div>

                </section>
            </div>

            <div className="col-12">
                <section className="row align-items-center">
                    <div className="col-md-8 col-sm-12">
                        <TextField required={paymentForm.type === 'Other' ? false : true} value={paymentForm.memo || ''} onChange={(e) => setData('memo', e.target.value)} variant="outlined" multiline label="Memo" className='w-100 mb-4' />
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <TextField
                            required
                            value={paymentForm.code || ''}
                            onChange={(e) => setData('code', e.target.value)}
                            variant="outlined"
                            label="Code" disabled className='w-100 mb-4'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => copy(paymentForm.code)}>
                                            <FileCopyOutlinedIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </section>
            </div>

            {/* <div className="col-md-6 col-sm-12">
                <div className="mb-4 pb-2">
                    <CurrencyList currency={paymentForm.currency} setCurrency={(e) => setData('currency', e)} />
                </div>
            </div>
            <div className="col-md-6 col-sm-12">
                <TextField required={paymentForm.type === 'Other' ? false : true} value={paymentForm.payeeBank || ''} onChange={(e) => setData('payeeBank', e.target.value)} variant="outlined" label="Payee's Bank" className='w-100 mb-4 pb-2' inputProps={{ className: 'text-capitalize' }} />
            </div>
            <div className="col-md-6 col-sm-12">
                <TextField required value={paymentForm.payee || ''} onChange={(e) => setData('payee', e.target.value)} variant="outlined" label="Payee Name" className='w-100  mb-4 pb-2' inputProps={{ className: 'text-capitalize' }} />
            </div>
            <div className='col-md-6 col-sm-12 align-self-center'>
                <div className="mb-4 pb-2">
                    <Calendar date={paymentForm.date} handler={(e) => setData('date', e.toString())} />
                </div>
            </div>
            <div className="col-md-6 col-sm-12">
                <section className="row align-items-center">
                    <div className="col-md-6 col-sm-12">
                        <TextField required={paymentForm.type === 'Other' ? false : true} value={paymentForm.cheque || ''} type='number' onChange={(e) => setData("cheque", e.target.value)} variant="outlined" label="Cheque/Other no" className='w-100 mb-4 pb-2' />
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <TextField required value={paymentForm.type} variant="outlined" select label="Select Type" className='w-100 mb-4 pb-2' onChange={(e) => setData('type', e.target.value)}>
                            {transactionType.map((item) =>
                                <MenuItem key={item} value={item}> {item} </MenuItem>
                            )}
                        </TextField>
                    </div>
                </section>
                <section className="row align-items-center">
                    <div className="col-md-6 col-sm-12">
                        <TextField value={paymentForm[selectedValue]} inputRef={amount} variant="outlined" label="Amount" fullwidth="true" className='w-100 mb-4 pb-2' inputProps={{ min: "0.01", step: "0.01" }} type="number" required onChange={(e) => setData(selectedValue, e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        {paymentForm.currency.substring(0, 3)}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className=" mb-4 pb-2">
                            <ToggleButtons value={selectedValue} setValue={(e) => setSelectedValue(e)} amount={amount} />
                        </div>
                    </div>
                </section>
                <section className="row align-items-center">
                    <div className="col-md-12">
                        <TextField value={paymentForm.note1 || ''} onChange={(e) => setData('note1', e.target.value)} variant="outlined" label="Note 1" className='mb-4 pb-2 w-100' />
                    </div>

                    <div className="col-md-12">
                        <TextField value={paymentForm.note2 || ''} onChange={(e) => setData('note2', e.target.value)} variant="outlined" label="Note 2" className='mb-4 pb-2 w-100' />
                    </div>
                </section>
            </div>
            <div className="col-12">
                <section className="row align-items-center">
                    <div className="col-md-8 col-sm-12">
                        <TextField required={paymentForm.type === 'Other' ? false : true} value={paymentForm.memo || ''} onChange={(e) => setData('memo', e.target.value)} variant="outlined" multiline label="Memo" className='w-100 mb-4' />
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <TextField
                            required
                            value={paymentForm.code || ''}
                            onChange={(e) => setData('code', e.target.value)}
                            variant="outlined"
                            label="Code" disabled className='w-100 mb-4'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => copy(paymentForm.code)}>
                                            <FileCopyOutlinedIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </section>
            </div> */}
            {/* <div className="text-center mt-0 mt-lg-4 col-lg-5 col-md-7 col-sm-12 mx-auto p-1" style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button size="large" type="button" variant={theme ? "outlined" : "contained"} color="secondary" className="px-3 border-3" onClick={() => { dispatch(resetBankForm()); }}><RotateLeftOutlinedIcon fontSize="small" />&nbsp;&nbsp;Reset</Button>

                <Button size="large" variant="contained" className={`px-3 mx-0 text-light bg-success`} onClick={save}><SaveIcon fontSize="small" />&nbsp;&nbsp;Save</Button>

                <Online>
                    <Button size="large" disabled={loading ? true : false} variant="contained" className={`bg-warning text-white`} onClick={submit}>{loading ? <i className="bricks-white" /> : <span style={{ display: 'flex' }}><CloudUploadOutlinedIcon /> &nbsp;&nbsp;Upload</span>}</Button>
                </Online>

                <Offline>
                    <Button size="large" disabled variant="contained" className={`text-light btn-warning`}><WifiOffRoundedIcon />&nbsp;&nbsp;Offline</Button>
                </Offline>
            </div> */}
        </form>
    )
}
