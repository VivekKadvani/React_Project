import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import ABI from './ABI.json'
const ethers = require("ethers")

const WhiteList = () => {
    const style = {
        outer_div: `flex min-h-fit items-center px-24`,
        div_inner: `h-[calc(100vh-20vh)] w-full bg-grey m-12 rounded-xl  `,
        title_text: `font-vesting text-pink text-3xl justify-self-start`,
        title_div: `flex m-6`,
        title_data: `grid grid-cols-4 gap-4 mb-2 font-bold font-form bg-pink rounded-xl h-12 items-center mx-10`,
        vesting_data: `grid grid-cols-4 mt-4 gap-4  bg-white_text rounded-xl h-10 items-center mx-10`,
        addWhitelist_div: `flex  items-center mx-10`,
        input_field: `bg-white_text rounded font-form mb-10 w-full h-8 p-2 mr-10`,
        btn_lock: `bg-green font-vesting rounded-full px-6 mb-10 h-10 box-border  `,

    }
    const owner = "0x6051Dd0e7F5513b4bd73371780AEaa8bBe4130D4"
    const contractAddress = '0x5444e45e8F82c9379B1843e77658AE1D6f2aC258';
    const [AdminFlag, setAdminFlag] = useState(false);
    const [whiteListedToken, setData] = useState([])
    const [Flag, setFlag] = useState(0);
    const [loading, setLoading] = useState(false)
    const [w_add, setFormData] = useState()
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    useEffect(() => {
        const getVesting = async () => {
            setLoading(true)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const wallet_add = await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ABI, signer);

            (owner.toLowerCase() == wallet_add[0].toLowerCase()) ? setAdminFlag(true) : setAdminFlag(false)

            const whiteList = [];
            const len_whitelist = parseInt(await contract.getTotalWhitelist());

            for (let i = 0; i < len_whitelist; i++) {
                const tempContractAddress = await contract.WhiteListTokens(i)
                let deme = null;
                if (provider.provider.networkVersion == 80001)
                    deme = await fetch(`https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${tempContractAddress}&apikey=6Z536YUCYRCIDW1CR53QAS1PYZ41X2FA7K`)
                else if (provider.provider.networkVersion == 11155111)
                    deme = await fetch(`https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${tempContractAddress}&apikey=WSG13CQU7C9GAHQIRH3J51BPRDYDSC835B`)
                const respo = await deme.json()
                const Tcontract = new ethers.Contract(tempContractAddress, respo.result, signer);
                const name = await Tcontract.name()
                const symbol = await Tcontract.symbol()
                whiteList.push({ C_address: tempContractAddress, C_name: `${name} (${symbol})` });
            }
            setData(whiteList)
            setLoading(false)
        }
        getVesting()

    }, [Flag])
    window.addEventListener('load', () => {
        setFlag(Flag + 1);
    });
    const addToWhitelist = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        const tx = await contract.addWhitelist(w_add)
        tx.wait()
        setFlag(Flag + 1)
    }

    return (
        <div className={style.outer_div}>
            <div className={style.div_inner}>
                <div className={style.title_div}>
                    <p className={style.title_text}>Whitelisted Token</p>
                </div>
                {
                    AdminFlag
                        ?
                        <div className={style.addWhitelist_div}>
                            <input type='text' className={style.input_field} placeholder="Address of Token" onChange={(event) => { setFormData(event.target.value) }} />
                            <button className={style.btn_lock} onClick={addToWhitelist}>Add</button>
                        </div>
                        :
                        <> </>
                }
                <div className={style.title_data}>
                    <div>Id</div>
                    <div>Name</div>
                    <div class='col-span-2 '>Address</div>
                </div>
                {
                    loading
                        ?
                        <TailSpin />
                        :
                        whiteListedToken
                        &&
                        whiteListedToken.map((e, index) => {
                            return (
                                <div className={style.vesting_data} key={index}>
                                    <div>{index}</div>
                                    <div>{e.C_name}</div>
                                    <div class='col-span-2 '>{e.C_address}</div>
                                </div>)
                        })
                }



            </div>
        </div>
    )
}

export default WhiteList