import React from 'react'
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
        nav_link: `font-vesting`
    }
    return (
        <div className={style.header}>
            <img className={style.logo} src={lock_logo} alt="logo" />
            <p className={style.title}>Vesting Contract</p>
            <p className={style.nav_link}>New Vesting</p>
            <p className={style.nav_link}>Current Vesting</p>
            <p className={style.nav_link}>Whitelist</p>
            <button className={style.wallet_connect}>Connect</button>
            <img src={dark_mode} className={style.dark_mode_logo} alt="mode" />
        </div>
    )
}


export { Header, HeaderMain }