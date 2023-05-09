import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';

const Footer = () => {

    const style = {
        div_footer: `h-10 bg-pink  mt-auto w-full `
    }
    return (
        <>
            <Player src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" className='player' />
        </>
    )
}

export default Footer