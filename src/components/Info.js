import React from 'react'
import Butns from './Butns'

export default function Info() {
    return (
        <header>
            <div className='info-intro'>
                <h1>Hi there, You've Reached Carl. </h1>
                <h4>I'm unable to answer the phone right now but... </h4>
                <h4>Feel free to look around my portfolio while you're here! </h4>
            </div>
            <div className="img-container">
                <img
                    title="Please excuse the mess, I'm new to React."
                    onClick={faceClick}
                    className="info-img" src="myface.jpg" alt="my face" />
            </div>
            <div className="info-description">
                <h1><span className="title"> Carl A. Malcolm-Clarke</span></h1>
                <h3><span className='subtitle'>Full-stack Java Developer</span></h3>
                <h3><span className='subtitle' title="Not a real website [ yet... ]">Thee-Rawest.com</span></h3>
                <Butns />
            </div>
        </header>
    )

    function faceClick(e) {
        playSound();
        getAngry();

        function playSound() {
            document.getElementById("denied").play();
        }

        function getAngry() {
            alert("Why would you click someone's face?\nI wouldn't click your face!\n...Actually I probably would.")
        }
    }
}