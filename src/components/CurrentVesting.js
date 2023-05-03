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
        vesting_data: `grid grid-cols-7 mt-4 gap-4 font-form bg-white_text rounded-xl h-10 items-center mx-10`

    }
    const [data, setData] = useState([]);


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = '0x7a6494488C3A821E83cAa40c928697ea645C727B';
    useEffect(() => {
        const getVesting = async () => {
            const w_add = await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            console.log(w_add[0])
            const contract = new ethers.Contract(contractAddress, ABI, signer);
            const vestedSchedules = [];
            for (let i = 0; i < 3; i++) {
                const schedule = await contract.vestings(w_add[0], i);
                // if (schedule.beneficiaries.toLowerCase() == w_add[0].toLowerCase())
                vestedSchedules.push(schedule);
            }
            setData(vestedSchedules);
            console.log(await vestedSchedules[0].amount.toNumber());
            // console.log(vestedSchedules[1].amount.toNumber());
            // const vestedSchedulesJSON = JSON.stringify(vestedSchedules);
            // console.log(vestedSchedulesJSON[0].beneficiaries)
        }
        getVesting()


    }, [])

    console.log(data)
    // const [data, setData] = useState()
    // const writeContract = async () => {
    //     await provider.send("eth_requestAccounts", []);
    //     const signer = provider.getSigner();
    //     const contract = new ethers.Contract(contractAddress, ABI, signer)
    //     const tx = await contract.vestings('0xc96Be35EbBdCB7aCa63FE4Ef47E9f3aA14cDfB6e', 0);
    //     console.log(tx.amount);
    //     const w_amount = await contract.calculate_available_withdraw_token(0);
    //     data = { amount: tx.amount.toNumber(), duration: tx.amount.toNumber(), id: 1, withdrawable: w_amount.toNumber() }
    // }
    // writeContract()






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

                <NavLink to={`/vestingDetail/${88}`}>
                    <div className={style.vesting_data}>
                        <div>{1}</div>
                        <div class='col-span-2'>a</div>
                        <div>{data[0].amount.toNumber()}</div>
                        <div>{data[0].duration}</div>
                        <div>{data[0].cliff}</div>
                        <div>sepolia</div>
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