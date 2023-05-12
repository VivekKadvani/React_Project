const [cliff_error, setCliffError] = useState('')
const [duration_error, setDurationError] = useState('')
const duration = form.duration;
const lockToken = async (amount, duration, slice, cliff, Beneficiaries, addressoftoken) => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const acc = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        const locked = await contract.lock(amount, duration, slice, cliff, Beneficiaries, addressoftoken);
        setLoading(true)
        await locked.wait()
        setLoading(false)
        toast.success('Transaction successful', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: whitemod_flag ? "light" : "dark",
        })
    }
    catch (e) {
        ((e.toString()).includes('user rejected transaction'))
            ?
            toast.error('User Reject Transaction', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: whitemod_flag ? "light" : "dark",
            })
            :
            console.log(e)
    }
}

    // const tx_allowance = await Tokencontract.allowance(wallet_add[0], contractAddress)
                // const allowance = parseInt(tx_allowance);
                // if (allowance < amount) {
                //     const tx_approve = await Tokencontract.approve(contractAddress, amount)

                // }
                // await lockToken(amount, duration, slice, cliff, Beneficiaries, addressoftoken);
                // navigate("/currentVesting")