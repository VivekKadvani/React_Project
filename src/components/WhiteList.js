import React from 'react'

const WhiteList = () => {
    const style = {
        outer_div: `flex min-h-fit items-center px-24`,
        div_inner: `h-[calc(100vh-20vh)] w-full bg-grey m-12 rounded-xl  `,
        title_text: `font-vesting text-pink text-3xl justify-self-start`,
        title_div: `flex m-6`,
        title_data: `grid grid-cols-4 gap-4 mb-2 font-bold font-form bg-pink rounded-xl h-12 items-center mx-10`,
        vesting_data: `grid grid-cols-4 mt-4 gap-4 font-form bg-white_text rounded-xl h-10 items-center mx-10`,
        addWhitelist_div: `flex  items-center mx-10`,
        input_field: `bg-white_text rounded font-form mb-10 w-full h-8 p-2 mr-10`,
        btn_lock: `bg-green font-vesting rounded-full px-6 mb-10 h-10 box-border  `,

    }
    return (
        <div className={style.outer_div}>
            <div className={style.div_inner}>
                <div className={style.title_div}>
                    <p className={style.title_text}>Whitelisted Token</p>
                </div>
                <div className={style.addWhitelist_div}>
                    <input type='text' className={style.input_field} placeholder="Address of Token" />
                    <button className={style.btn_lock}>Add</button>
                </div>
                <div className={style.title_data}>
                    <div>Id</div>
                    <div>Name</div>
                    <div class='col-span-2 '>Address</div>
                </div>

                <div className={style.vesting_data}>
                    <div>Id</div>
                    <div>Name</div>
                    <div class='col-span-2 '>Address</div>
                </div>

                <div className={style.vesting_data}>
                    <div>Id</div>
                    <div>Name</div>
                    <div class='col-span-2 '>Address</div>

                </div>


            </div>
        </div>
    )
}

export default WhiteList