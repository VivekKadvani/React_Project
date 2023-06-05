import React, { useContext, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import lock_logo from '../images/lock_logo.png'
import dark_mode from '../images/dark-theme.svg'
import { useState } from 'react'
import { AppContext } from '../App'
import {ethers} from "ethers"
import { userRegistration } from '../dbInteraction'


const HeaderMain = () => {
    const { WalletConnection, setWalletConnection } = useContext(AppContext)
    const { whitemod_flag, setWhitemodflag } = useContext(AppContext);
    const [l_value, setLabel] = useState('Connect')
    const [Flag, setFlag] = useState(0);


    async function connectWallet() {
        try {
            const requestLogin = await fetch("/api/login");
            const response = await requestLogin.json();
            const acc = await window.ethereum.request({ method: "eth_requestAccounts" });

            if(response.error === "invalid"  ||  response.error === "not registered"){
                const provider  = new ethers.providers.Web3Provider(window.ethereum);
                const messageObj = {nounce : (Math.random()*100) , accountAddress:acc[0]}
                const signedMessage = await provider.getSigner().signMessage(JSON.stringify(messageObj));
                userRegistration(messageObj, signedMessage)
            }

            const start = acc[0].substring(0, 6);
            const end = acc[0].substring(acc[0].length - 4);
            const Short_acc = `${start}...${end}`
            localStorage.setItem("WalletAddress", Short_acc);
            setWalletConnection(true);
            setLabel(Short_acc)
            localStorage.setItem("MetamaskConnection","true");
        } catch (error) {
            console.log(error);
            setLabel("Connect")
        }
    };

    //set label on connect
    useEffect(() => {
        (localStorage.getItem("MetamaskConnection") == "true") ?   connectWallet() : setLabel("Connect")
    },[Flag])

    window.addEventListener("load",()=>{
        setFlag(Flag+1)
    })

    //set label on disconnect
    window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length == 0) {
            setLabel("Connect")
            setFlag(Flag + 1)
            setWalletConnection(false)
            localStorage.setItem("MetamaskConnection","false")
        }
        else {
            setLabel(accounts[0])
            setFlag(Flag + 1)
        }
    })

    const style = {
        header: `bg-pink box-border h-12 flex justify-left inset-0 z-11  items-center`,
        logo: ' justify-left items-center box-border h-10 mx-6',
        dark_mode_logo: `flex justify-end items-center box-border h-6  mr-8`,
        wallet_connect: `font-vesting items-center rounded-full bg-dim_black h-8 mr-8 px-4 ml-auto text-white_text`,
        nav_link: `font-vesting mr-10`,
        nav_link_active: `text-white_text font-vesting mr-10`
    }

    const navLinkStyles = ({ isActive }) => {
        return {
            'color': isActive ? `#D9D9D9` : '#1A1A1D',
            'font-family': `'Bruno Ace SC', 'Georgia, Cambria', 'Times New Roman', 'Times', 'serif'`,
            'margin-left': '15px',
            'margin-right': '15px'
        }
    }

    const whitemod = () => {
        whitemod_flag ? setWhitemodflag(false) : setWhitemodflag(true);
        const bgColor = document.body.style.backgroundColor;
        if (bgColor.toString() == "rgb(255, 255, 255)") {
            document.body.style = "background-color:#1A1A1D"//Black
        }
        else
            document.body.style = "background-color:#ffffff;"//white
    }

    return (
        <div className={style.header}>
            <img className={style.logo} src={lock_logo} alt="logo" />
            <div>
                {WalletConnection ? <>
                    <NavLink to={'/home'} style={navLinkStyles} >Home</NavLink>
                    <NavLink to={'/newVesting'} style={navLinkStyles} >New Vesting</NavLink>
                    <NavLink to={'/currentVesting'} style={navLinkStyles} >Current Vesting</NavLink>
                    <NavLink to={'/whitelist'} style={navLinkStyles} >Whitelist</NavLink>
                </>
                    : <></>}
            </div>
            <button className={style.wallet_connect} onClick={connectWallet}>{l_value}</button>
            <img src={dark_mode} className={style.dark_mode_logo} onClick={whitemod} alt="mode" />
        </div>
    )
}

export default HeaderMain 