// import React, { useState, createContext, useContext, useEffect } from 'react'
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ABI from '../ABI/ABI.json'
import { AppContext } from '../App'
import Popup from './Popup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingLock from '../Animation/LandingLock';

const ethers = require("ethers")
const VestingDetail = () => {
    const contractAddress = '0xf8d318205eD763959Fb79FF55469C6071Fe061a7';
    const { WalletConnection, setWalletConnection } = useContext(AppContext)

    const { whitemod_flag } = useContext(AppContext)
    const { vestingId } = useParams();
    const [btn_disable, setDisable] = useState(true)
    const [c_btn_disable, setDisableC] = useState(false)
    const [data, setVestingData] = useState()
    const [loading, setLoading] = useState(false)
    const [withdrawable, setWithdrawableToken] = useState(0)
    const [Flag, setFlag] = useState(0);

    const style = {
        outer_div: `flex min-h-fit items-center px-24`,
        div_inner: !whitemod_flag ? `h-fit pb-10 w-full bg-grey m-12 rounded-xl  ` : `h-fit pb-10 w-full bg-light_pink m-12 rounded-xl  `,
        title_text: `font-vesting text-pink text-3xl justify-self-start`,
        title_div: `flex m-6`,
        form_div: whitemod_flag ? `m-11 bg-white_text shadow-[rgba(0,_0,_0,_0.24)_0px_0px_5px] rounded-xl` : `m-11 bg-dim_black  shadow-[rgba(0,_0,_0,_0.24)_0px_0px_10px] rounded-xl`,
        input_form_div: `flex justify-center `,
        btn_withdraw: btn_disable ? `bg-pink opacity-25 font-vesting rounded-full px-6 h-10 box-border mx-10  ` : `bg-pink font-vesting rounded-full px-6 h-10 box-border mx-10  `,
        btn_calculate: c_btn_disable ? `bg-pink opacity-25 font-vesting rounded-full px-6 h-10 box-border mx-10  ` : `bg-pink font-vesting rounded-full px-6 h-10 box-border mx-10  `,
        input_field: `bg-white_text rounded font-form mb-10 w-full h-8 p-2`,
        input_label: whitemod_flag ? `font-form text-dim_black justify-self-start mt-4 text-xl` : `font-form text-white justify-self-start mt-4 text-xl`,
        input_label_green: `font-form text-green justify-self-start mt-4 text-xl`,
        input_form_div_left: `mb-0 pb-0 mt-4 pt-0 flex flex-col items-start rounded-xl m-9 p-11 w-full`,
        network_div: `rounded-xl bg-white_text h-12 w-full mx-9 flex items-center pl-4`,
        cmp_network: `px-11`,
        networkLogo: `h-8 px-4`,
        network_name: `font-form pl-2`,
        data: whitemod_flag ? `text-dim_black pb-4` : `text-white_text pb-4`,
        data_green: `text-green pb-4`
    }

    useEffect(() => {
        const getVestingData = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const wallet_add = await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ABI, signer);
            const tempschedule = await contract.vestings(wallet_add[0], vestingId);
            const status = Number(await contract.getTime()) > (Number(((await contract.vestings(wallet_add[0], vestingId)).params).start))
            console.log(Number(await contract.getTime()), ' >', (Number(((await contract.vestings(wallet_add[0], vestingId)).params).start)));
            console.log(status);
            setVestingData(tempschedule)
            if (tempschedule.locked) {
                setDisable(false)
                setDisableC(false)
            }
            else {
                setDisableC(true)
                setDisable(true);
            }
            console.log(Number(await contract.getTime()))
        }
        getVestingData()
        console.log('useefect')
    }, [Flag])

    const calculate_withdrawable = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        const withdrawable = await contract.calculate_available_withdraw_token(vestingId);
        setWithdrawableToken(parseInt(withdrawable));
        console.log(parseInt(withdrawable));
        if (parseInt(withdrawable) == 0)
            setDisable(true)
        else
            setDisable(false)
    }

    const withdraw = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ABI, signer);
            const tx = await contract.withdraw(vestingId);
            setLoading(true)
            await tx.wait()
            setLoading(false)
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
    function formatTimestamp(unixTimestamp) {
        const currentTimestamp = Date.now(); // Current timestamp in milliseconds
        const targetTimestamp = unixTimestamp * 1000; // Convert Unix timestamp to milliseconds

        const resultTimestamp = currentTimestamp + targetTimestamp;
        const dateObject = new Date(resultTimestamp);

        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = String(dateObject.getFullYear());
        const hours = String(dateObject.getHours()).padStart(2, '0');
        const minutes = String(dateObject.getMinutes()).padStart(2, '0');
        const seconds = String(dateObject.getSeconds()).padStart(2, '0');

        const formattedDate = `${day}-${month}-${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        return `${formattedDate} ${formattedTime}`;
    }
    function calculateDuration(startTimestamp, endTimestamp) {
        const start = new Date(startTimestamp * 1000); // Convert to milliseconds
        const end = new Date(endTimestamp * 1000); // Convert to milliseconds

        const durationInMilliseconds = end - start;

        // Calculate individual units (days, hours, minutes, seconds)
        const seconds = Math.floor(durationInMilliseconds / 1000) % 60;
        const minutes = Math.floor(durationInMilliseconds / 1000 / 60) % 60;
        const hours = Math.floor(durationInMilliseconds / 1000 / 60 / 60) % 24;
        const days = Math.floor(durationInMilliseconds / 1000 / 60 / 60 / 24);

        // Format the duration as a string
        const formattedDuration = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

        return formattedDuration;
    }
    function convertUnixTimestampToDateTime(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const dateTimeFormat = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

        return dateTimeFormat;
    }
    window.addEventListener('load', () => {
        setFlag(Flag + 1);
    });

    window.ethereum.on("accountsChanged", (accounts) => {
        setFlag(Flag + 1)
        if (accounts.length === 0) {
            setWalletConnection(false)
        }
    })

    return (
        <div className={style.outer_div}>
            {WalletConnection
                ?
                (loading
                    ?
                    <LandingLock />
                    :
                    <div className={style.div_inner}>
                        <div className={style.title_div}>
                            <p className={style.title_text}>Vesting Detail</p>
                        </div>
                        <div className={style.form_div}>
                            {data &&
                                <div className={style.input_form_div}>
                                    <div className={style.input_form_div_left}>
                                        <p className={style.input_label}>Amount</p>
                                        <p className={style.data}>{parseInt(data.params.amount)}</p>
                                        <p className={style.input_label}>Start Time</p>
                                        <p className={style.data}>{convertUnixTimestampToDateTime(parseInt(data.params.start))}</p>
                                        <p className={style.input_label}>End Time</p>
                                        <p className={style.data}>{convertUnixTimestampToDateTime(parseInt(parseInt(data.params.start) + parseInt(data.params.duration)))}</p>


                                        <p className={style.input_label}>Duration</p>
                                        <p className={style.data}>{calculateDuration(parseInt(data.params.start), parseInt(parseInt(data.params.start) + parseInt(data.params.duration)))}</p>
                                        <p className={style.input_label}>Beneficiaries</p>
                                        <p className={style.data}>{data.params.beneficiaries}</p>
                                        <p className={style.input_label}>Address Of Token</p>
                                        <p className={style.data}>{data.params.TokenAddress}</p>


                                    </div>
                                    <div className={style.input_form_div_left}>
                                        <p className={style.input_label}>Claimed</p>
                                        <p className={style.data}>{Number(data.claimed)}</p>
                                        <p className={style.input_label}>Locked</p>
                                        <p className={style.data}>{((data.params.locked) && (new Date().getTime() > parseInt(data.params.start))) ? "Running" : "Completed"}</p>
                                        <p className={style.input_label}>Cliff</p>
                                        <p className={style.data}>{formatTimestamp(parseInt(data.params.cliff))}</p>
                                        <p className={style.input_label}>Slice Period</p>
                                        <p className={style.data}>{parseInt(data.params.slice_period)}</p>
                                        <p className={style.input_label}>Recive on Interval</p>
                                        <p className={style.data}>{parseInt(data.params.recive_on_interval)}</p>
                                        <p className={style.input_label_green}>Withdrawable</p>
                                        <p className={style.data_green}>{withdrawable}</p>
                                    </div>
                                </div>}


                        </div>
                        <div>
                            <button className={style.btn_calculate} onClick={calculate_withdrawable}>Calculate</button>
                            <button className={style.btn_withdraw} disabled={btn_disable} onClick={withdraw}>Withdraw</button>
                        </div>
                    </div>
                )
                :
                <Popup />
            }
        </div>
    )
}

export default VestingDetail