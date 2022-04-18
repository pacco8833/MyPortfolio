import React from 'react'

export default function Goal() {
    return (
        <div className="description">
            <Languages />
            <Goals />
        </div>
    )
}

function Goals() {
    return (
        <div className="standalone">
            <h4><span className="title">Development Goals...</span></h4>
            <p title="Oh but I will...">Here's some things I haven't done (yet)!</p>
            <ul className="list">
                <li>Security</li>
                <li>Senior Developer</li>
                <li>Contribute on Github</li>
                <li>Game Development</li>
                <li>Cloud Development</li>
                <li>Teach Programming</li>
            </ul>
        </div>
    )
}

function Languages() {
    return (
        <div className="standalone">
            <h4><span className="title">Languages I've Learned...</span></h4>
            <p title="Oh but I will...">Here's some programming skills I have!</p>
            <ul className="list">
                <li>Java</li>
                <li>Javascript</li>
                <li>(Microsoft) CMD</li>
                <li>HTML/CSS</li>
                <li title="Still practicing">React</li>
                <li title="Still practicing">SQL</li>
            </ul>
        </div>
    )
}