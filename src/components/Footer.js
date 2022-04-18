import React from 'react'

export default function Footer() {

    return (
        <footer>
            <div className='flex'>
                <ul className="social-icons">
                    <li><a href="https://github.com/pacco8833"><img src="mygithub.jpg" alt="github link" className='icon' /></a></li>
                    <li><a href="https://www.linkedin.com/in/carl-programmer-clarke"><img src="mylinkedin.jpg" alt="linked in link" className='icon' /></a></li>
                    <li><a href="https://portfolium.com/carlmalcolm-clarke"><img src="myportfolium.jpg" alt="portfolium link" className='icon' /></a></li>
                </ul>
                <span title="If it looks like I've only taken one day to do it... Well...">&copy; Carl Malcolm-Clarke's React Portfolio!</span>
            </div>
        </footer>
    )

}