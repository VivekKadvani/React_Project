const ethers = require("ethers")
import ABI from './ABI.json'
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = '0x7a6494488C3A821E83cAa40c928697ea645C727B';

// Connect to Web3 provider
const getVesting = async () => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    const vestedSchedules = [];
    for (let i = 0; i < 1; i++) {
        const schedule = await contract.vestings(signer, i).call();
        vestedSchedules.push(schedule);
    }
    const vestedSchedulesJSON = JSON.stringify(vestedSchedules);
    console.log(vestedSchedulesJSON)
}
getVesting()

