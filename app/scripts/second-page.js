import appNav from './app-navigation'

class SecondPage {
    constructor() {
    }

    init() {
        this.animateTransition()
    }

    animateTransition() {
        let tl = new TimelineLite({ onComplete: appNav.triggerBtnDisable })
        let text = appNav.currentPage.querySelector('.product-info')

        tl.set(appNav.currentPage, { css: { className: '-=is-hidden' } })
            .to(appNav.prevPage, 0.8, { ease: Power2.easeIn, xPercent: -100 }, 0)
            .to('#gemini-animation', 0.7, { ease: Power2.easeIn, scale: 0.8 }, 0)
            .fromTo(appNav.currentPage, 0.6, { xPercent: 100 }, { ease: Sine.easeIn, xPercent: 0}, 0.4, 0)
            .fromTo(text, 0.5, { xPercent: 60 }, { xPercent: 0 }, "-=0.2")
            .staggerTo('.shadow', 0.5, {
                cycle: { y: index => (index + 1) * 4 }
            }, 0, '-=0.1')
    }
}

export default new SecondPage()