import React from 'react'
import { NavLink } from "react-router-dom"
import lock_logo from '../images/lock_logo.png'
import dark_mode from '../images/dark-theme.svg'

const Header = () => {

    const style = {
        header: `bg-pink box-border h-12 flex justify-left items-center`,
        logo: ' justify-left items-center box-border h-10 mx-2',
        title: `font-vesting text-3xl`,
        dark_mode_logo: `flex justify-end items-center box-border h-6  mr-8`,
        wallet_connect: `font-vesting items-center rounded-full bg-dim_black h-8 mr-8 px-4 ml-auto text-white_text`,
    }
    return (
        <div className={style.header}>
            <img className={style.logo} src={lock_logo} alt="logo" />
            <p className={style.title}>Vesting Contract</p>

            <button className={style.wallet_connect}>Connect</button>
            <img src={dark_mode} className={style.dark_mode_logo} alt="mode" />
        </div>
    )
}

const HeaderMain = () => {
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
                <NavLink to={'/new'} style={navLinkStyles} >New Listing</NavLink>
                <NavLink to={'/current'} style={navLinkStyles} >Current Listing</NavLink>
                <NavLink to={'/whitelist'} style={navLinkStyles} >Whitelist</NavLink>
            </div>
            <button className={style.wallet_connect}>Connect</button>
            <img src={dark_mode} className={style.dark_mode_logo} alt="mode" />
        </div>
    )
}


export { Header, HeaderMain }