import appNav from './app-navigation'

class ThirdPage {
    constructor() {
    }

    init() {

        this.animateTransition()
    }

    animateTransition() {
        let tl = new TimelineLite({ onComplete: appNav.triggerBtnDisable })

        let title = appNav.prevPage.querySelector('.title')
        let prevText = appNav.prevPage.querySelector('.product-info')
        let imgWrap = appNav.prevPage.querySelector('.img-wrap')
        let currentText = appNav.currentPage.querySelector('.product-info')

        tl.to(title, 0.4, {autoAlpha: 0})
            .call(() => title.textContent = 'Now, It Even...')
            .to(title, 0.4, {autoAlpha: 1})
            .staggerTo(imgWrap.children, 0.9, {
                cycle: { ease: Expo.easeIn, yPercent: (index) => index < 2 ? -130 : -130 + 6 * index }
            })
            .to(prevText, 0.3, { autoAlpha: 0 }, '-=0.7')
            .to(imgWrap, 0.3, { autoAlpha: 0 }, '-=0.3')
            .call(() => appNav.currentPage.classList.remove('is-hidden'))
            .fromTo(currentText, 0.8, {y: -15, autoAlpha: 0}, {y: 0, autoAlpha: 1})
            .staggerFromTo('.similar-photos > img', 0.8, { cycle: {
                yPercent: index => {
                    switch (index) {
                        case 0: return -160
                        case 1: return -145
                        case 2: return -160
                    }
                },
                xPercent: index => {
                    switch (index) {
                        case 0: return 70
                        case 1: return 0
                        case 2: return -70
                    }
                },
                rotation: index => {
                    switch (index) {
                        case 0: return 10
                        case 1: return -15
                        case 2: return -25
                    }
                }}}, {yPercent: 0, xPercent: 0, cycle: {rotation: index => {
                switch (index) {
                    case 0: return -5
                    case 1: return 5
                    case 2: return -5
                }
            }}}, 0, '-=0.6')
    }
}

export default new ThirdPage()