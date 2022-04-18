import "./style.css"
import React from 'react'
import ReactDOM from 'react-dom'
import Info from './components/Info'
import Desc from "./components/Desc"
import Goal from "./components/Goal"
import Footer from './components/Footer'

const pageContent =
(
    <div>
    <Info/>
    <Desc/>
    <Goal/>
    <Footer/>
    </div>
)

const container = document.getElementById('root');
ReactDOM.render(pageContent, container);