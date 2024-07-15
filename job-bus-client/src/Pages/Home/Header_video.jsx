import React from 'react'
import video from '../../../public/images/video-1.mp4'
import buss from '../../../public/images/Logo-home.png'

const Header_video = () => {
  return (
    <div className='home flex container'>
        <div className="mainText">
          <h1 className="font-mono">
            <span class="text-red-600">HÀNH TRÌNH </span>
            của bạn là
            <br />
            <span class="text-green-600">TƯƠNG LAI </span>
            của chúng tôi
          </h1> 
        </div>

        <div className="homeImages flex">

            <div className="videoDiv">
                <video src={video} autoPlay muted loop className='video'></video>
            </div>

            <img src={buss} className='bus' />
        </div>

    </div>
  )
}

export default Header_video