import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

const SetTiming = ({ half_form_send }) => {
    console.log(half_form_send);
    const contractAddress = '0x5444e45e8F82c9379B1843e77658AE1D6f2aC258';
    const { whitemod_flag, setWhitemodflag } = useContext(AppContext)
    const { WalletConnection, setWalletConnection } = useContext(AppContext)
    const [amount_error, setAmountError] = useState()
    const [slice_error, setSliceError] = useState('')
    const [beneficiaries_error, setBeneficiariesError] = useState('')
    const [cliff_error, setCliffError] = useState('')
    const [duration_error, setDurationError] = useState('')
    const [addressOfToken_error, setAddressTokenError] = useState('')
    const [half_form, sethalf_form] = useState({ ...half_form_send })
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false)
    const [whiteListedToken, setData] = useState([])
    const navigate = useNavigate();
    console.log(half_form);
    const style = {
        div_inner: whitemod_flag ? `min-h-fit min-w-fit bg-light_pink shadow-[rgba(0,_0,_0,_0.24)_0px_0px_5px] m-12 rounded-xl  ` : `min-h-fit min-w-fit bg-grey m-12 rounded-xl  `,
        title_text: `font-vesting text-pink text-3xl justify-self-start`,
        title_div: `flex m-6 pt-2 mb-0`,
        half_form_div: `m-11 mb-2`,
        input_half_form_div: `flex justify-center min-w-fit `,
        btn_lock: `bg-pink font-vesting rounded-full px-6 mb-10 h-10 box-border  `,
        input_field: whitemod_flag ? `bg-white_text  rounded font-half_form mb-2 w-full h-8 p-2` : `bg-dim_black text-white_text rounded font-half_form mb-2 w-full h-10 p-2`,
        input_field_dd: whitemod_flag ? `  rounded font-half_form mb-2 w-full h-6  relative w-full` : `relative w-full text-white_text rounded font-half_form mb-2 w-full h-6`,
        input_label: whitemod_flag ? `font-half_form text-dim_black justify-self-start mt-2 text-xl` : `font-half_form text-white justify-self-start mt-2 text-xl`,
        input_half_form_div_left: `flex flex-col items-start rounded-xl  p-7 w-full`,
        input_half_form_div_left_child: `flex flex-col items-start rounded-xl  p-7 w-full border-pink border-solid border-2`,
        half_formValidationError: `mb-8 text-red h-6 text-xs text-left`,
    }
    function SetupForm() {

        if (validateForm(half_form)) {

        }
        else {

        }
    }
    function validateForm(form) {

        // const amount_result = (num_regex.test(form.amount)) && (form.amount > 0);
        // (!amount_result) ? setAmountError(' * Amount Field contain only digit 0-9, no any other symbol and character. It must be greater than 0(zero)') : setAmountError('')
        // const slice_result = (num_regex.test(form.slice)) && (form.slice > 0);
        // (!slice_result) ? setSliceError('* Slice Period only contains digit 0-9. It must be greater than 0(Zero)') : setSliceError('')
        // const beneficiearies_result = beneficiaries_regex.test(form.Beneficiaries);
        // (!beneficiearies_result) ? setBeneficiariesError('*  Enter a valid address of Beneficiaries.') : setBeneficiariesError('')
        // const TokenAddressError = (form.address_of_token == undefined);
        // (TokenAddressError) ? setAddressTokenError(' * please select token') : setAddressTokenError('');
        // return (amount_result && slice_result && beneficiearies_result && (!TokenAddressError)
        // )
    }


    return (
        <>
            <div className={style.input_half_form_div}>
                <div className={style.input_half_form_div_left}>
                    <p className={style.input_label}>Start Date</p>
                    <input type="date" className={style.input_field} onChange={(event) => {
                        const currentTimestamp = Math.floor(Date.now() / 1000);
                        const timestamp = new Date(event.target.value).getTime() / 1000;
                        const input_duration = (timestamp - currentTimestamp);
                        sethalf_form({ ...half_form, Start_date: input_duration })
                    }} />
                    <span className={style.half_formValidationError}>{duration_error}</span>
                    <p className={style.input_label}>Cliff Date</p>
                    <input type="date" className={style.input_field} onChange={(event) => {
                        const currentTimestamp = Math.floor(Date.now() / 1000);
                        const timestamp = new Date(event.target.value).getTime() / 1000;
                        const input_duration = (timestamp - currentTimestamp);
                        sethalf_form({ ...half_form, cliff_date: input_duration })
                    }} />
                    <span className={style.half_formValidationError}>{duration_error}</span>
                    <p className={style.input_label}>End Date</p>
                    <input type="date" className={style.input_field} onChange={(event) => {
                        const currentTimestamp = Math.floor(Date.now() / 1000);
                        const timestamp = new Date(event.target.value).getTime() / 1000;
                        const input_duration = (timestamp - currentTimestamp);
                        sethalf_form({ ...half_form, end_date: input_duration })
                    }} />
                    <span className={style.half_formValidationError}>{duration_error}</span>
                </div>

                <div className={style.input_half_form_div_left}>
                    <p className={style.input_label}>Start Time</p>
                    <input type="time" className={style.input_field} onChange={(event) => {
                        const currentTimestamp = Math.floor(Date.now() / 1000);
                        const timestamp = new Date(event.target.value).getTime() / 1000;
                        const input_duration = (timestamp - currentTimestamp);
                        sethalf_form({ ...half_form, start_time: input_duration })
                    }} />
                    <span className={style.half_formValidationError}>{duration_error}</span>
                    <p className={style.input_label}>Cliff Time</p>
                    <input type="time" className={style.input_field} onChange={(event) => {
                        const currentTimestamp = Math.floor(Date.now() / 1000);
                        const timestamp = new Date(event.target.value).getTime() / 1000;
                        const input_duration = (timestamp - currentTimestamp);
                        sethalf_form({ ...half_form, cliff_time: input_duration })
                    }} />
                    <span className={style.half_formValidationError}>{duration_error}</span>
                    <p className={style.input_label}>End Time</p>
                    <input type="time" className={style.input_field} onChange={(event) => {
                        const currentTimestamp = Math.floor(Date.now() / 1000);
                        const timestamp = new Date(event.target.value).getTime() / 1000;
                        const input_duration = (timestamp - currentTimestamp);
                        sethalf_form({ ...half_form, end_time: input_duration })
                    }} />
                    <span className={style.half_formValidationError}>{duration_error}</span>
                </div>
            </div>
            <div>
                <button className={style.btn_lock} onClick={SetupForm}>Next</button>
            </div>
        </>
    )
}

export default SetTiming