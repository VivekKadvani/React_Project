import React, { useContext } from 'react'
import { NavLink } from "react-router-dom"
import lock_logo from '../images/lock_logo.png'
import dark_mode from '../images/dark-theme.svg'
import { useState } from 'react'
import { AppContext } from '../App'


const HeaderMain = () => {
    const { WalletConnection, setWalletConnection } = useContext(AppContext)
    const [l_value, setLabel] = useState('Connect')//define this useState hook for setting label value
    //after that for connection to metamask this function is defined

    async function connectWallet() {
        try {
            const acc = await window.ethereum.request({ method: "eth_requestAccounts" });
            const start = acc[0].substring(0, 6);
            const end = acc[0].substring(acc[0].length - 4);
            const Short_acc = `${start}...${end}`
            // console.log("Wallet connected", acc[0]);
            localStorage.setItem("WalletAddress", Short_acc)
            setWalletConnection(true);
            WalletConnection ? setLabel(Short_acc) : setLabel("Connect")
        } catch (error) {
            console.log("Failed to connect wallet: ");
        }
    };
    //set label on connect 
    (!WalletConnection) ? connectWallet() : connectWallet()
    //set label on disconnect
    window.ethereum.on("accountsChanged", (accounts) => {
        console.log("On acc changed :   ", accounts)
        if (accounts.length === 0) {
            console.log("no acc connected")
            setLabel("Connect")
        }
    })
    const style = {
        header: `bg-pink box-border h-12 flex justify-left items-center`,
        logo: ' justify-left items-center box-border h-10 mx-2',
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
    return (

        <div className={style.header}>
            <img className={style.logo} src={lock_logo} alt="logo" />
            <div>
                <NavLink to={'/home'} style={navLinkStyles} >Home</NavLink>
                <NavLink to={'/newVesting'} style={navLinkStyles} >New Vesting</NavLink>
                <NavLink to={'/currentVesting'} style={navLinkStyles} >Current Listing</NavLink>
                <NavLink to={'/whitelist'} style={navLinkStyles} >Whitelist</NavLink>
            </div>
            <button className={style.wallet_connect} onClick={connectWallet}>{l_value}</button>
            <img src={dark_mode} className={style.dark_mode_logo} alt="mode" />
        </div>
    )
}


export default HeaderMain 