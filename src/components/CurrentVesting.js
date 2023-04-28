import React from 'react'
import { NavLink } from 'react-router-dom'

const CurrentVesting = () => {
    const style = {
        outer_div: `flex min-h-fit items-center px-24`,
        div_inner: `h-[calc(100vh-20vh)] w-full bg-grey m-12 rounded-xl  `,
        title_text: `font-vesting text-pink text-3xl justify-self-start`,
        title_div: `flex m-6`,
        title_data: `grid grid-cols-7 gap-4 mb-2 font-bold font-form bg-pink rounded-xl h-12 items-center mx-10`,
        vesting_data: `grid grid-cols-7 mt-4 gap-4 font-form bg-white_text rounded-xl h-10 items-center mx-10`

    }

    return (
        <div className={style.outer_div}>
            <div className={style.div_inner}>
                <div className={style.title_div}>
                    <p className={style.title_text}>Current Vesting</p>
                </div>

                <div className={style.title_data}>
                    <div>Id</div>
                    <div class='col-span-2 '>Transaction Hash</div>
                    <div>Amount</div>
                    <div>Duration</div>
                    <div>Withdrawable</div>
                    <div>Network</div>
                </div>

                <NavLink to={`/vestingDetail/${88}`}>
                    <div className={style.vesting_data}>
                        <div>Id</div>
                        <div class='col-span-2'>Transaction Hash</div>
                        <div>Amount</div>
                        <div>Duration</div>
                        <div>Withdrawable</div>
                        <div>Network</div>
                    </div>
                </NavLink>

                <div className={style.vesting_data}>
                    <div>Id</div>
                    <div class='col-span-2'>Transaction Hash</div>
                    <div>Amount</div>
                    <div>Duration</div>
                    <div>Withdrawable</div>
                    <div>Network</div>

                </div>


            </div>
        </div>
    )
}

export default CurrentVesting