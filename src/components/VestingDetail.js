import React from 'react'
// import { useParams } from 'react-router-dom';
const VestingDetail = () => {
    const style = {
        outer_div: `flex min-h-fit items-center px-24`,
        div_inner: `h-[calc(100vh-20vh)] w-full bg-grey m-12 rounded-xl  `,
        title_text: `font-vesting text-pink text-3xl justify-self-start`,
        title_div: `flex m-6`,
        form_div: `m-11 bg-white_text rounded-xl`,
        input_form_div: `flex justify-center `,
        btn_withdraw: `bg-pink font-vesting rounded-full px-6 h-10 box-border mx-10  `,
        input_field: `bg-white_text rounded font-form mb-10 w-full h-8 p-2`,
        input_label: `font-form text-grey justify-self-start mt-4 text-xl`,
        input_label_green: `font-form text-green justify-self-start mt-4 text-xl`,
        input_form_div_left: `mb-0 pb-0 mt-4 pt-0 flex flex-col items-start rounded-xl m-9 p-11 w-full`,
        network_div: `rounded-xl bg-white_text h-12 w-full mx-9 flex items-center pl-4`,
        cmp_network: `px-11`,
        networkLogo: `h-8 px-4`,
        network_name: `font-form pl-2`,
        data: `text-dim_black pb-4`,
        data_green: `text-green pb-4`
    }
    // const { vestingId } = useParams();
    return (
        // <div>VestingDetail : {vestingId}</div>
        <div className={style.outer_div}>
            <div className={style.div_inner}>
                <div className={style.title_div}>
                    <p className={style.title_text}>Vesting Detail</p>
                </div>
                <div className={style.form_div}>
                    <div className={style.input_form_div}>
                        <div className={style.input_form_div_left}>
                            <p className={style.input_label}>Amount</p>
                            <p className={style.data}>100</p>
                            <p className={style.input_label}>Slice Period</p>
                            <p className={style.data}>100</p>
                            <p className={style.input_label}>Beneficiaries</p>
                            <p className={style.data}>0xC9399199f40686cfacF7Ae7555Ef0DEfa0487Ebe</p>
                            <p className={style.input_label}>Duration</p>
                            <p className={style.data}>100</p>
                            <p className={style.input_label}>Transaction Hash</p>
                            <p className={style.data}>0xC9399199f40686cfacF7Ae7555Ef0DEfa0487Ebe</p>
                        </div>
                        <div className={style.input_form_div_left}>
                            <p className={style.input_label}>Duration</p>
                            <p className={style.data}>100</p>
                            <p className={style.input_label}>Cliff</p>
                            <p className={style.data}>100</p>
                            <p className={style.input_label}>Address Of Token</p>
                            <p className={style.data}>0xC9399199f40686cfacF7Ae7555Ef0DEfa0487Ebe</p>
                            <p className={style.input_label}>Beneficiaries</p>
                            <p className={style.data}>100</p>
                            <p className={style.input_label_green}>Withdrawable</p>
                            <p className={style.data_green}>NAN</p>
                        </div>
                    </div>


                </div>
                <div>
                    <button className={style.btn_withdraw}>Calculate</button>

                    <button className={style.btn_withdraw}>Withdraw</button>
                </div>
            </div>
        </div>
    )
}

export default VestingDetail