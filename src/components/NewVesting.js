import React from 'react'
import new_img from '../images/new.png'
import current_img from '../images/current.png'
import whitelist_img from '../images/whitelist.png'

import { NavLink } from "react-router-dom"
const NewVesting = () => {

    const style = {
        outer_div: `flex min-h-fit items-center px-24`,
        div_inner: `h-[calc(100vh-32vh)] w-full  bg-grey m-12  flex flex-col  justify-center rounded-xl  hover:drop-shadow-3xl `,
        div_inr_text: `font-vesting mt-6 text-3xl  text-pink`,
        img_div: `max-h-96 mx-12 mt-20 rounded-xl`
    }

    return (
        <div className={style.outer_div}>
            <NavLink to={'/lockToken'} className={style.div_inner}>
                <div>
                    <p className={style.div_inr_text}>New Vesting</p>
                    <img className={style.img_div} src={new_img} alt="img" />
                </div>
            </NavLink>
            <NavLink to={'/currentVesting'} className={style.div_inner}>
                <div>
                    <p className={style.div_inr_text}>Current Vesting</p>
                    <img className={style.img_div} src={current_img} alt="img" />
                </div>
            </NavLink>
            <NavLink to={'/lockToken'} className={style.div_inner}>
                <div>
                    <p className={style.div_inr_text}>Whitelist</p>
                    <img className={style.img_div} src={whitelist_img} alt="img" />
                </div>
            </NavLink>
        </div>
    )
}

export default NewVesting