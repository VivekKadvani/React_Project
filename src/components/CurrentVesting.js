import React, { useEffect, useState, useContext } from 'react'
import { Dna } from 'react-loader-spinner'
import { AppContext } from '../App'
import { NavLink } from 'react-router-dom'
import ABI from '../ABI/ABI.json'
import Popup from './Popup'
const ethers = require("ethers")

const CurrentVesting = () => {

    const { WalletConnection, setWalletConnection } = useContext(AppContext)
    const { whitemod_flag, setWhitemodflag } = useContext(AppContext);
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [flag, setFlag] = useState(0)
    const contractAddress = '0x5444e45e8F82c9379B1843e77658AE1D6f2aC258';

    const style = {
        outer_div: `flex min-h-fit items-center px-24`,
        div_inner: !whitemod_flag ? `h-fit pb-10 w-full bg-grey m-12 rounded-xl ` : `h-fit pb-10 w-full h-72 bg-light_pink m-12 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_0px_10px] `,
        title_text: `font-vesting text-pink text-3xl justify-self-start`,
        title_div: `flex m-6`,
        title_data: `grid grid-cols-6 gap-4 mb-2 font-bold font-form bg-pink rounded-xl h-12 items-center mx-10`,
        vesting_data: whitemod_flag ? `grid grid-cols-6 mt-4 gap-4  bg-white_text rounded-xl h-10 items-center mx-10` : `grid grid-cols-6 mt-4 gap-4  bg-dim_black text-white rounded-xl h-10 items-center mx-10`,

    }


    useEffect(() => {
        const getVesting = async () => {
            setLoading(true)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const wallet_add = await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ABI, signer);
            const vestedSchedules = [];
            const len_vesting = parseInt(await contract.getTotalVesting());

            for (let i = 0; i < len_vesting; i++) {
                let tempschedule = await contract.vestings(wallet_add[0], i);
                let calculate_withdrawable = await contract.calculate_available_withdraw_token(i)
                const schedule = { ...tempschedule, withdrawable: calculate_withdrawable };
                vestedSchedules.push(await schedule);
            }
            setData(vestedSchedules);
            setLoading(false);
        }
        getVesting()
    }, [flag])

    window.addEventListener('load', () => {
        setFlag(1);
    });

    window.ethereum.on("accountsChanged", (accounts) => {
        setFlag(flag + 1)
        if (accounts.length === 0) {
            setWalletConnection(false)
        }
    })

    return (<>
        <div className={style.outer_div}>
            {WalletConnection
                ?
                <div className={style.div_inner} >
                    <div className={style.title_div}>
                        <p className={style.title_text}>Current Vesting</p>
                    </div>
                    <div className={style.title_data}>
                        <div>Id</div>
                        <div class='col-span-2 '>Beneficiaries</div>
                        <div>Amount</div>
                        <div>Duration</div>
                        <div>Withdrawable</div>
                    </div>

                    {loading
                        ?
                        <div className='flex justify-center'><Dna /></div>
                        :
                        data
                        &&
                        data.map((e, index) => {
                            return (
                                <NavLink to={`/vestingDetail/${index}`} key={index}>
                                    <div className={style.vesting_data}>
                                        <div>{index}</div>
                                        <div class='col-span-2'>{e.beneficiaries}</div>
                                        <div>{e.amount.toNumber()}</div>
                                        <div>{e.duration.toNumber()}</div>
                                        <div>{e.withdrawable.toNumber()}</div>
                                    </div>
                                </NavLink>
                            )
                        })
                    }
                </div>
                :
                <Popup />
            }
        </div>
    </>
    )
}

export default CurrentVesting