import React, { useContext, useState } from 'react'
import new_img from '../images/new.png'
import current_img from '../images/current.png'
import whitelist_img from '../images/whitelist.png'
import { AppContext } from '../App'
import { NavLink } from "react-router-dom"
import Popup from './Popup'
import VestingAnimation from './VestingAnimation'
import CurrentVestingAnimation from './CurrentVestingAnimation'
import WhitelistAnimation from './WhitelistAnimation'

const NewVesting = () => {
    const { whitemod_flag, setWhitemodflag } = useContext(AppContext)
    const style = {
        outer_div: `grid grid-cols-3 min-h-fit items-center  `,
        div_inner: whitemod_flag ? `bg-light_pink shadow-[rgba(0,_0,_0,_0.24)_0px_0px_5px] m-12 flex flex-col justify-center rounded-2xl hover:drop-shadow-3xl ` : `bg-grey m-12 flex flex-col justify-center rounded-2xl hover:drop-shadow-3xl `,
        div_inr_text: `font-vesting mt-6 text-3xl  text-pink`,
        img_div: `rounded-2xl flex justify-center p-12 `,
        onlyImage: ``,
        alert_popup: `text-pink bg-grey h-48 w-96`
    }
    const { WalletConnection, setWalletConnection } = useContext(AppContext)

    return (


        <div className={style.outer_div} >
            {WalletConnection
                ? <>
                    <NavLink to={'/lockToken'} className={style.div_inner}>

                        <p className={style.div_inr_text}>New Vesting</p>
                        <div className={style.img_div} >
                            <VestingAnimation />
                        </div>

                    </NavLink>
                    <NavLink to={'/currentVesting'} className={style.div_inner}>
                        <p className={style.div_inr_text}>Current Vesting</p>
                        <div className={style.img_div} >
                            <CurrentVestingAnimation />
                        </div>
                    </NavLink>
                    <NavLink to={'/whitelist'} className={style.div_inner}>
                        <p className={style.div_inr_text}>Whitelist</p>
                        <div className={style.img_div} >
                            <WhitelistAnimation />
                        </div>
                    </NavLink></>
                :
                <>
                    <Popup />
                </>
            }
        </div >

    )
}

export default NewVesting