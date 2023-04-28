import React from 'react'
import { NavLink } from 'react-router-dom'
import ethLogo from '../images/ethLogo.png'
import polygonLogo from '../images/polygonLogo.png'

const LockForm = () => {
    const style = {
        outer_div: `flex min-h-fit items-center px-24`,
        div_inner: `h-[calc(100vh-20vh)] w-full bg-grey m-12 rounded-xl  `,
        title_text: `font-vesting text-pink text-3xl justify-self-start`,
        title_div: `flex m-6`,
        form_div: `m-11`,
        input_form_div: `flex justify-center `,
        btn_landing: `bg-pink font-vesting rounded-full px-6 h-10 box-border  `,
        input_field: `bg-white_text rounded font-form mb-10 w-full h-8 p-2`,
        input_label: `font-form text-white_text justify-self-start mt-2 text-xl`,
        input_form_div_left: `flex flex-col items-start rounded-xl m-9 p-11 w-full`,
        network_div: `rounded-xl bg-white_text h-12 w-full mx-9 flex items-center pl-4`,
        cmp_network: `px-11`,
        networkLogo: `h-8 px-4`,
        network_name: `font-form pl-2`
    }

    return (
        <div className={style.outer_div}>
            <div className={style.div_inner}>
                <div className={style.title_div}>
                    <p className={style.title_text}>New Vesting</p>
                </div>
                <div className={style.form_div}>
                    <div className={style.input_form_div}>
                        <div className={style.input_form_div_left}>
                            <p className={style.input_label}>Amount</p>
                            <input type='text' className={style.input_field} />
                            <p className={style.input_label}>Slice Period</p>
                            <input type='text' className={style.input_field} />
                            <p className={style.input_label}>Beneficiaries</p>
                            <input type='text' className={style.input_field} />
                        </div>
                        <div className={style.input_form_div_left}>
                            <p className={style.input_label}>Duration</p>
                            <input type='text' className={style.input_field} />
                            <p className={style.input_label}>Cliff</p>
                            <input type='text' className={style.input_field} />
                            <p className={style.input_label}>Address Of Token</p>
                            <input type='text' className={style.input_field} />
                        </div>
                    </div>
                    <div className={style.cmp_network}>
                        <div className={style.input_form_div}>
                            <div className={style.network_div}>
                                <input type="radio" name="topping" value="Sepolia Testnet" id="regular" />
                                <label htmlFor="regular"></label>
                                <img className={style.networkLogo} src={ethLogo} alt="ETH" />
                                <p className={style.network_name}>Goreli Testnet</p>
                            </div>
                            <div className={style.network_div}>
                                <input type="radio" name="topping" value="Polygon Mumbai" id="regular" />
                                <label htmlFor="regular"></label>
                                <img className={style.networkLogo} src={polygonLogo} alt="MTC" />
                                <p className={style.network_name}>Polygon Mumbai</p>
                            </div>
                            <div className={style.network_div}>
                                <input type="radio" name="topping" value="Ethereum Mainnet" id="regular" />
                                <label htmlFor="regular"></label>
                                <img className={style.networkLogo} src={ethLogo} alt="ETH" />
                                <p className={style.network_name}>Ethereum Mainnet</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <NavLink to="/new">
                        <button className={style.btn_landing}>Lock Tocken</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default LockForm