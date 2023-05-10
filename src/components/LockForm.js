import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ABI from './ABI.json'
import Popup from './Popup'
import { AppContext } from '../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ethers = require("ethers")

const LockForm = () => {
    const { whitemod_flag, setWhitemodflag } = useContext(AppContext)
    const style = {
        div_inner: whitemod_flag ? `min-h-fit min-w-fit bg-light_pink shadow-[rgba(0,_0,_0,_0.24)_0px_0px_5px] m-12 rounded-xl  ` : `min-h-fit min-w-fit bg-grey m-12 rounded-xl  `,
        title_text: `font-vesting text-pink text-3xl justify-self-start`,
        title_div: `flex m-6 pt-2`,
        form_div: `m-11`,
        input_form_div: `flex justify-center min-w-fit `,
        btn_lock: `bg-pink font-vesting rounded-full px-6 mb-10 h-10 box-border  `,
        input_field: whitemod_flag ? `bg-white_text  rounded font-form mb-2 w-full h-8 p-2` : `bg-dim_black text-white_text rounded font-form mb-2 w-full h-8 p-2`,
        input_label: whitemod_flag ? `font-form text-dim_black justify-self-start mt-2 text-xl` : `font-form text-white justify-self-start mt-2 text-xl`,
        input_form_div_left: `flex flex-col items-start rounded-xl m-7 p-7 w-full`,
        input_form_div_left_child: `flex flex-col items-start rounded-xl m-7 p-7 w-full border-pink border-solid border-2`,
        network_div: `rounded-xl bg-white_text h-12 w-full  mx-9 flex items-center pl-4`,
        cmp_network: `px-11`,
        networkLogo: `max-h-8 px-4`,
        network_name: `font-form pl-2 `,
        formValidationError: `mb-8 text-red h-6 text-xs text-left`
    }

    const [amount_error, setAmountError] = useState()
    const [slice_error, setSliceError] = useState('')
    const [beneficiaries_error, setBeneficiariesError] = useState('')
    const [cliff_error, setCliffError] = useState('')
    const [duration_error, setDurationError] = useState('')
    const [addressOfToken_error, setAddressTokenError] = useState('')
    const [form, setForm] = useState({})
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const { WalletConnection, setWalletConnection } = useContext(AppContext)
    const contractAddress = '0x5444e45e8F82c9379B1843e77658AE1D6f2aC258';

    async function SetupForm() {

        const amount = form.amount;
        const duration = form.duration;
        const slice = form.slice;
        const cliff = form.cliff;
        const Beneficiaries = form.Beneficiaries;
        const addressoftoken = form.address_of_token
        if (validateForm(form))
            console.log("yes valid")
        else console.log("not valid");
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const wallet_add = await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            let ABI_Token = null;
            if (provider.provider.networkVersion == 80001)
                ABI_Token = await fetch(`https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${addressoftoken}&apikey=6Z536YUCYRCIDW1CR53QAS1PYZ41X2FA7K`)
            else if (provider.provider.networkVersion == 11155111)
                ABI_Token = await fetch(`https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${addressoftoken}&apikey=WSG13CQU7C9GAHQIRH3J51BPRDYDSC835B`)
            const respo = await ABI_Token.json()
            const Tokencontract = new ethers.Contract(addressoftoken, respo.result, signer);
            const tx_allowance = await Tokencontract.allowance(wallet_add[0], contractAddress)
            const allowance = parseInt(tx_allowance);
            if (allowance < amount) {
                const tx_approve = await Tokencontract.approve(contractAddress, amount)

            }

            await lockToken(amount, duration, slice, cliff, Beneficiaries, addressoftoken);
            navigate("/currentVesting")
        }
        catch (e) {
            console.log(e)
        }
    }
    function validateForm(form) {
        const num_regex = /^[0-9]+$/
        const beneficiaries_regex = /^0x[a-fA-F0-9]{40}$/
        const addressOFToken_regex = /^0x[0-9a-fA-F]{40}$/

        const amount_result = (num_regex.test(form.amount)) && (form.amount > 0);
        (!amount_result) ? setAmountError(' * Amount Field contain only digit 0-9, no any other symbol and character. It must be greater than 0(zero)') : setAmountError('')
        const slice_result = (num_regex.test(form.slice)) && (form.slice > 0);
        (!slice_result) ? setSliceError('* Slice Period only contains digit 0-9. It must be greater than 0(Zero)') : setSliceError('')
        const cliff_result = (num_regex.test(form.cliff));
        (!cliff_result) ? setCliffError(' * Cliff contains only digit 0-9. No any other characters are accepted') : setCliffError('')
        const beneficiearies_result = beneficiaries_regex.test(form.Beneficiaries);
        (!beneficiearies_result) ? setBeneficiariesError('*  Enter a valid address of Beneficiaries.') : setBeneficiariesError('')
        const addressOfToken_result = addressOFToken_regex.test(form.address_of_token);
        (!addressOfToken_result) ? setAddressTokenError(' * Please enter valid Address Of Token.') : setAddressTokenError('')
        const duration_result = num_regex.test(form.duration);
        (!duration_result) ? setDurationError('Duration contains only digit 0-9. Enter Valid Duration.') : setDurationError('')
        return (amount_result && slice_result && cliff_result && beneficiearies_result && addressOfToken_result && duration_result)
    }
    const lockToken = async (amount, duration, slice, cliff, Beneficiaries, addressoftoken) => {
        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const acc = await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ABI, signer);
            const locked = await contract.lock(amount, duration, slice, cliff, Beneficiaries, addressoftoken);
            await locked.wait()
            toast.success('Transaction successful', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: whitemod_flag ? "light" : "dark",
            })
        }
        catch (e) {
            ((e.toString()).includes('user rejected transaction'))
                ?
                toast.error('User Reject Transaction', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: whitemod_flag ? "light" : "dark",
                })
                :
                console.log(e)
        }
    }
    return (

        <div className={style.div_inner}>
            {WalletConnection
                ? <>
                    <div className={style.title_div}>
                        <p className={style.title_text}>New Vesting</p>
                    </div>
                    <div className={style.form_div}>
                        <div className={style.input_form_div}>
                            <div className={style.input_form_div_left}>
                                <p className={style.input_label}>Amount</p>
                                <input type='number' placeholder='Enter amount here' required className={style.input_field} onChange={(event) => { setForm({ ...form, amount: event.target.value }) }} />
                                <span className={style.formValidationError}>{amount_error}</span>
                                <p className={style.input_label}>Slice Period</p>
                                <input type='number' placeholder='Enter slice period here' className={style.input_field} onChange={(event) => { setForm({ ...form, slice: event.target.value }) }} />
                                <span className={style.formValidationError}>{slice_error}</span>
                                <p className={style.input_label}>Beneficiaries</p>
                                <input type='text' placeholder='Enter Beneficiaries address here' className={style.input_field} onChange={(event) => { setForm({ ...form, Beneficiaries: event.target.value }) }} />
                                <span className={style.formValidationError}>{beneficiaries_error}</span>
                            </div>
                            <div className={style.input_form_div_left}>
                                <p className={style.input_label}>Duration</p>

                                <input type="datetime-local" className={style.input_field} id="birthdaytime" name="birthdaytime" onChange={(event) => {
                                    const currentTimestamp = Math.floor(Date.now() / 1000);
                                    const timestamp = new Date(event.target.value).getTime() / 1000;
                                    const input_duration = (timestamp - currentTimestamp);
                                    setForm({ ...form, duration: input_duration })
                                }} />
                                <span className={style.formValidationError}>{duration_error}</span>
                                <p className={style.input_label}>Cliff</p>
                                <input type="datetime-local" className={style.input_field} id="birthdaytime" name="birthdaytime" onChange={(event) => {
                                    const currentTimestamp = Math.floor(Date.now() / 1000);
                                    const timestamp = new Date(event.target.value).getTime() / 1000;
                                    const cliff_duration = (timestamp - currentTimestamp);
                                    setForm({ ...form, cliff: cliff_duration })
                                }} />
                                <span className={style.formValidationError}>{cliff_error}</span>
                                <p className={style.input_label}>Address Of Token</p>
                                <input type='text' placeholder='Enter address of token' className={style.input_field} onChange={(event) => { setForm({ ...form, address_of_token: event.target.value }) }} />
                                <span className={style.formValidationError}>{addressOfToken_error}</span>
                            </div>
                        </div>

                    </div>
                    <div>
                        <button className={style.btn_lock} onClick={SetupForm}>Lock Tocken</button>
                    </div></> : <> <Popup /></>}
        </div>
    )
}

export default LockForm