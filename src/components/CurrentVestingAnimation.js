import React from 'react'
import currentVesting from '../images/CurrentVesting.json'
import Lottie from 'react-lottie'
const CurrentVestingAnimation = () => {
    const defaultOptions = {
        loop: true,
        speed: '2x',
        autoplay: true,
        animationData: currentVesting,
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

export default CurrentVestingAnimation