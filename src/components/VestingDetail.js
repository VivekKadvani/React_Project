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
    const contractAddress = '0x5444e45e8F82c9379B1843e77658AE1D6f2aC258';
    const { WalletConnection, setWalletConnection } = useContext(AppContext)
    const { whitemod_flag } = useContext(AppContext)
    const { vestingId } = useParams();
    const [btn_disable, setDisable] = useState(false)
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
            setVestingData(tempschedule)
            tempschedule.locked ? setDisable(false) : setDisable(true)
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
                                        <p className={style.data}>{parseInt(data.amount)}</p>
                                        <p className={style.input_label}>Slice Period</p>
                                        <p className={style.data}>{parseInt(data.slice_period)}</p>
                                        <p className={style.input_label}>Beneficiaries</p>
                                        <p className={style.data}>{data.beneficiaries}</p>
                                        <p className={style.input_label}>Duration</p>
                                        <p className={style.data}>{parseInt(data.duration)}</p>
                                        <p className={style.input_label}>Transaction Hash</p>
                                        <p className={style.data}>R0xC9399199f40686cfacF7Ae7555Ef0DEfa0487Ebe</p>
                                    </div>
                                    <div className={style.input_form_div_left}>
                                        <p className={style.input_label}>Locked</p>
                                        <p className={style.data}>{(data.locked) ? "true" : "false"}</p>
                                        <p className={style.input_label}>Cliff</p>
                                        <p className={style.data}>{parseInt(data.cliff)}</p>
                                        <p className={style.input_label}>Address Of Token</p>
                                        <p className={style.data}>{data.TokenAddress}</p>
                                        <p className={style.input_label}>Recive on Interval</p>
                                        <p className={style.data}>{parseInt(data.recive_on_interval)}</p>
                                        <p className={style.input_label_green}>Withdrawable</p>
                                        <p className={style.data_green}>{withdrawable}</p>
                                    </div>
                                </div>}


                        </div>
                        <div>
                            <button className={style.btn_withdraw} onClick={calculate_withdrawable}>Calculate</button>
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