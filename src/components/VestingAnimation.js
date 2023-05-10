import React from 'react'
import vesting from '../images/vesting.json'
import Lottie from 'react-lottie'
const VestingAnimation = () => {
    const defaultOptions = {
        loop: true,
        speed: '2x',
        autoplay: true,
        animationData: vesting,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const style = {
        div_footer: `h-10 bg-pink  mt-auto w-full `
    }
    return (
        <>
            <Lottie options={defaultOptions}
                height={300}
                width={300} />
        </>
    )
}

export default VestingAnimation