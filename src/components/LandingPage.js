import React from 'react'
import { NavLink } from 'react-router-dom'

const LandingPage = () => {
    const style = {
        title_landing: `text-pink font-vesting lg:text-9xl  box-border lg:mt-40 md:text-7xl md:mt-20`,
        btn_landing: `bg-pink font-vesting rounded-full px-6 h-10 box-border mt-20 `,
        cmp_landing: `  `
    }
    return (
        <div className={style.cmp_landing}>
            <p className={style.title_landing}>Vesting <br />Contract</p>
            <NavLink to="/new">
                <button className={style.btn_landing}>Get Start</button>
            </NavLink>
        </div>
    )
}

export default LandingPage