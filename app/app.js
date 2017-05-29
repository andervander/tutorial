import './styles/index.scss'

import { TimelineLite } from "gsap"

import appNav from './scripts/app-navigation'
import firstPage from './scripts/first-page'
import secondPage from './scripts/second-page'
import thirdPage from './scripts/third-page'
import fourthPage from './scripts/fourth-page'
import fifthPage from './scripts/fifth-page'



const pages = [firstPage, secondPage, thirdPage, fourthPage, fifthPage]

const clickCb = currentPage => {
    pages[currentPage - 1].init()
}

document.addEventListener('DOMContentLoaded', function() {
    appNav.init(clickCb)
    pages[0].init()
});


