import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ethLogo from '../images/ethLogo.png'
import polygonLogo from '../images/polygonLogo.png'
import ABI from './ABI.json'
const ethers = require("ethers")

const LockForm = () => {
    const style = {
        div_inner: `min-h-fit min-w-fit bg-grey m-12 rounded-xl  `,
        title_text: `font-vesting text-pink text-3xl justify-self-start`,
        title_div: `flex m-6`,
        form_div: `m-11`,
        input_form_div: `flex justify-center min-w-fit `,
        btn_lock: `bg-pink font-vesting rounded-full px-6 mb-10 h-10 box-border  `,
        input_field: `bg-white_text rounded font-form mb-10 w-full h-8 p-2`,
        input_label: `font-form text-white_text justify-self-start mt-2 text-xl`,
        input_form_div_left: `flex flex-col items-start rounded-xl m-7 p-7 w-full`,
        network_div: `rounded-xl bg-white_text h-12 w-full  mx-9 flex items-center pl-4`,
        cmp_network: `px-11`,
        networkLogo: `max-h-8 px-4`,
        network_name: `font-form pl-2 `
    }
    const [form, setForm] = useState({})
    const [network, setNetwork] = useState('sepolia');
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = '0xf193F9eF9AEA49abC654465808cbaF53ce60E255';

    function view() {

        console.log(form)
        const amount = form.amount;
        const duration = form.duration;
        const slice = form.slice;
        const cliff = form.cliff;
        const Beneficiaries = form.Beneficiaries;
        const addressoftoken = form.address_of_token
        // console.log(amount);
        try {
            lockToken(amount, duration, slice, cliff, Beneficiaries, addressoftoken);
            writeContract();
        }
        catch (e) {
            console.log(e)
        }
        //lock call here
        alert("jay che")
        navigate("/currentVesting")
    }
    const lockToken = async (amount, duration, slice, cliff, Beneficiaries, addressoftoken) => {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        const locked = await contract.lock(amount, duration, slice, cliff, Beneficiaries, addressoftoken, { value: 10000000 });
        console.log(locked);
    }
    const writeContract = (async () => {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer)
        const tx = await contract.getTime();
        console.log(tx)
    })
    return (

        <div className={style.div_inner}>
            <div className={style.title_div}>
                <p className={style.title_text}>New Vesting</p>
            </div>
            <div className={style.form_div}>
                <div className={style.input_form_div}>
                    <div className={style.input_form_div_left}>
                        <p className={style.input_label}>Amount</p>
                        <input type='number' className={style.input_field} onChange={(event) => { setForm({ ...form, amount: event.target.value }) }} />
                        <p className={style.input_label}>Slice Period</p>
                        <input type='number' className={style.input_field} onChange={(event) => { setForm({ ...form, slice: event.target.value }) }} />
                        <p className={style.input_label}>Beneficiaries</p>
                        <input type='text' className={style.input_field} onChange={(event) => { setForm({ ...form, Beneficiaries: event.target.value }) }} />
                    </div>
                    <div className={style.input_form_div_left}>
                        <p className={style.input_label}>Duration</p>
                        <input type='number' className={style.input_field} onChange={(event) => { setForm({ ...form, duration: event.target.value }) }} />
                        <p className={style.input_label}>Cliff</p>
                        <input type='number' className={style.input_field} onChange={(event) => { setForm({ ...form, cliff: event.target.value }) }} />
                        <p className={style.input_label}>Address Of Token</p>
                        <input type='text' className={style.input_field} onChange={(event) => { setForm({ ...form, address_of_token: event.target.value }) }} />
                    </div>
                </div>
                <div className={style.cmp_network}>
                    <div className={style.input_form_div}>
                        <div className={style.network_div}>
                            <input type="radio" name="topping" value="Sepolia Testnet" id="regular" onChange={(event) => { setNetwork(event.target.value) }} />
                            <label htmlFor="regular"></label>
                            <img className={style.networkLogo} src={ethLogo} alt="ETH" />
                            <p className={style.network_name}>Goreli Testnet</p>
                        </div>
                        <div className={style.network_div}>
                            <input type="radio" name="topping" value="Polygon Mumbai" id="regular" onChange={(event) => { setNetwork(event.target.value) }} />
                            <label htmlFor="regular"></label>
                            <img className={style.networkLogo} src={polygonLogo} alt="MTC" />
                            <p className={style.network_name}>Polygon Mumbai</p>
                        </div>
                        <div className={style.network_div}>
                            <input type="radio" name="topping" value="Ethereum Mainnet" id="regular" onChange={(event) => { setNetwork(event.target.value) }} />
                            <label htmlFor="regular"></label>
                            <img className={style.networkLogo} src={ethLogo} alt="ETH" />
                            <p className={style.network_name}>Ethereum Mainnet</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button className={style.btn_lock} onClick={view}>Lock Tocken</button>
            </div>
        </div>
    )
}

export default LockForm