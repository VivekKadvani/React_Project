const { ethers } = require("ethers");
const { toast } = require("react-toastify");

let provider = new ethers.providers.Web3Provider(window.ethereum);
const wallet_add = await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
provider = provider.provider

const headers = {
    "Content-type": "application/json; charset=UTF-8"
}

export const addToWhitelistDB = async (tokenAddress, whitemod_flag) => {

    let Tokencontract, tokenName, tokenSymbol,decimals;
    const networkId = provider.chainId;

    try {
        if (networkId === "0x13881")
            Tokencontract = await fetch(
                `https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${tokenAddress}&apikey=6Z536YUCYRCIDW1CR53QAS1PYZ41X2FA7K`
            );
        else if (networkId === "0xaa36a7")
            Tokencontract = await fetch(
                `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=WSG13CQU7C9GAHQIRH3J51BPRDYDSC835B`
            );
        const respo = await Tokencontract.json();
        const Tcontract = new ethers.Contract(tokenAddress, respo.result, signer);
        tokenName = await Tcontract.name();
        tokenSymbol = await Tcontract.symbol();
        decimals = await Tcontract.decimals();
    } catch (error) {
        console.log(error);
        if (error.message.includes("Cannot read properties of undefined")) {
            toast.error(
                "invalid token Address, please check your token address as well the network",
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: whitemod_flag ? "light" : "dark",
                }
            );
            return;
        }
    }
    await fetch(
        "/api/whitelist/modification/addtolist",
        {
            method: "POST",
            body: JSON.stringify({
                tokenAddress,
                tokenName,
                tokenSymbol,
                networkId,
                decimals
            }),
            headers
        }
    );
};

export const removeFromWhitelistDB = async (tokenAddress, whitemod_flag) => {

    const networkId = provider.chainId;

    try {
        const tx = await fetch(
            "/api/whitelist/modification/deletefromlist",
            {
                method: "POST",
                body: JSON.stringify({
                    tokenAddress,
                    networkId
                }),
                headers
            }
        )

        if (tx.data.message === "unmatch") toast.error("invalid tokenAddress or network", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: whitemod_flag ? "light" : "dark",
        })

    } catch (error) {
        // if(error.message.includes("Cannot read properties of undefined"))
    }
}

export const addvestingToDB = async(startTime,cliff,slicePeriod,endTime,tokenAddress,amount,whitemod_flag)=>{

    
    const networkId = provider.chainId;

    try {
        const currentTime = new Date().getTime();
        const postObj = {
            startTime : ((startTime * 1000)+ currentTime),
            cliff : ((cliff * 1000) + currentTime),
            slicePeriod,
            endTime : ((endTime * 1000 )+ currentTime),
            networkId,
            tokenAddress,
            amount : Number(amount)/(10**18),
            recieveOnInterval: ((slicePeriod * amount) / (endTime-startTime))/(10**18),
            beneficiaryAddress : wallet_add[0]
        }

        console.log(postObj , ((endTime * 1000 )+ currentTime));
        const response = await fetch(
            "/api/vestnew/locktoken",
            {
                method:"POST",
                body: JSON.stringify(postObj),
                headers
            }
        )
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export const userRegistration = async(messageObj,signedMessage) =>{

    const userRegistrationStatus = await fetch("/api/register",{
        method:"POST",
        body : JSON.stringify({
            signedMessage , messageObj:messageObj
        }),
        headers
    })
}