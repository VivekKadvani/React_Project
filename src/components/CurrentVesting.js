import { TailSpin } from 'react-loader-spinner'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ABI from './ABI.json'
import VestingDetail from './VestingDetail';


const ethers = require("ethers")
let data;
const CurrentVesting = () => {
    const style = {
        outer_div: `flex min-h-fit items-center px-24`,
        div_inner: `h-[calc(100vh-20vh)] w-full bg-grey m-12 rounded-xl  `,
        title_text: `font-vesting text-pink text-3xl justify-self-start`,
        title_div: `flex m-6`,
        title_data: `grid grid-cols-7 gap-4 mb-2 font-bold font-form bg-pink rounded-xl h-12 items-center mx-10`,
        vesting_data: `grid grid-cols-7 mt-4 gap-4  bg-white_text rounded-xl h-10 items-center mx-10`

    }
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState(0)
    const [flag, setFlag] = useState(0)


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = '0x7a6494488C3A821E83cAa40c928697ea645C727B';
    useEffect(() => {
        const getVesting = async () => {
            setLoading(true)
            const w_add = await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ABI, signer);
            const vestedSchedules = [];
            for (let i = 0; i < 3; i++) {
                let tempschedule = await contract.vestings(w_add[0], i);
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

    return (
        <div className={style.outer_div}>
            <div className={style.div_inner}>
                <div className={style.title_div}>
                    <p className={style.title_text}>Current Vesting</p>
                </div>


                <div className={style.title_data}>
                    <div>Id</div>
                    <div class='col-span-2 '>Beneficiaries</div>
                    <div>Amount</div>
                    <div>Duration</div>
                    <div>Withdrawable</div>
                    <div>Network</div>
                </div>
                {loading ?
                    <TailSpin />
                    :
                    data &&
                    data.map((e, index) => {
                        console.log(e.amount)
                        return (
                            <NavLink to={`/vestingDetail/${index}`} key={index}>
                                <div className={style.vesting_data}>
                                    <div>{index}</div>
                                    <div class='col-span-2'>{e.beneficiaries}</div>
                                    <div>{e.amount.toNumber()}</div>
                                    <div>{e.duration.toNumber()}</div>
                                    <div>{e.withdrawable.toNumber()}</div>
                                    <div>sepolia</div>
                                </div>
                            </NavLink>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CurrentVesting