import appNav from './app-navigation'

class FourthPage {
    constructor() {
    }

    init() {
        this.animateTransition()
    }

    animateTransition() {
        let tl = new TimelineLite({ onComplete: appNav.triggerBtnDisable })
        let prevText = appNav.prevPage.querySelector('.product-info')
        let images = appNav.prevPage.querySelectorAll('.similar-photos > img')
        let lightBg = document.querySelector('.light-bg')
        let imgWrap = appNav.currentPage.querySelector('.img-wrap')

        const ease = Power1.easeIn

        tl.set(appNav.currentPage, { css: { className: '-=is-hidden' } })
            .to(prevText, 0.8, { ease, xPercent: -100}, 0, 0)
            .staggerTo([...images].reverse(), 0.7, { ease, cycle: {
                x: index => !index ? -730 : -950 / (index + 1),
                rotation: index => index < 2 ? 60 : -60
            }}, 0.2, 0)
            .set(lightBg, { css:{ className:'+=-active' } })
            .to(lightBg, 0.85, { ease, x: -100, rotation: 0 }, 0.15, 0)
            .fromTo(appNav.currentPage, 0.8, { xPercent: 100 }, { ease, xPercent: 0 }, 0.4, 0)
            .from(imgWrap.children[1], 0.5, { rotation: 90 }, '-=0.3')
            .to(lightBg, 0.3, { autoAlpha: 0.9 }, '-=0.1')

    }
}

export default new FourthPage()