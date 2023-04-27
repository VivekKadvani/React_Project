import React from 'react'

const LandingPage = () => {
    const style = {
        title_landing: `text-pink font-vesting lg:text-9xl  box-border lg:mt-40 md:text-7xl md:mt-20`,
        btn_landing: `bg-pink font-vesting rounded-full px-6 h-10 box-border mt-20 md:mt-10`,
        cmp_landing: `h-screen bg-dim_black pt-6 `
    }
    return (
        <div className={style.cmp_landing}>
            <p className={style.title_landing}>Vesting <br />Contract</p>
            <button className={style.btn_landing}>Get Start</button>
        </div>
    )
}

export default LandingPage