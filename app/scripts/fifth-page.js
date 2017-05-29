import appNav from './app-navigation'

class FifthPage {
    constructor() {
    }

    init() {
        if (this.fadeOutApp) {
            this.fadeOutApp()
            return
        }

        this.fadeOutApp = this.animateTransition()
    }

    animateTransition() {
        let tl = new TimelineLite({ onComplete: appNav.triggerBtnDisable })

        let wrap = document.querySelector('.wrap')

        let prevImages = appNav.prevPage.querySelectorAll('.img-wrap > img')
        let prevText = appNav.prevPage.querySelector('.product-info')
        let currentText = appNav.currentPage.querySelector('.product-info')
        let mainLogo = appNav.currentPage.querySelector('.main-logo')
        let imgGroups = appNav.currentPage.querySelectorAll('.img-group')
        let selectedImages = appNav.currentPage.querySelectorAll('img.selected')

        let leftGroupChildren = imgGroups[0].children
        let rightGroupChildren = imgGroups[1].children
        let prevDuration = 0.5


        tl.to(appNav.prevPage, prevDuration, { autoAlpha: 0 }, 0)
            .staggerTo(prevImages, prevDuration, { scale: 0.8,cycle: {
                x: index => !index ? '60' : '-60',
                rotation: index => index && '-90'
            } }, 0, 0)
            .to(prevText, prevDuration, { y: '-20' }, 0)
            .set(appNav.currentPage, { className: '-=is-hidden' })
            .set([currentText, mainLogo, leftGroupChildren, rightGroupChildren], { autoAlpha: 0 })
            .fromTo(mainLogo, 0.4, { scale: 0.5 }, { ease: Back.easeOut, scale: 1, autoAlpha: 1 })
            .fromTo(currentText, 0.4, { y: '-30' }, { y: 0, autoAlpha: 1 }, '-=0.2')
            .set([leftGroupChildren, rightGroupChildren], { ease: Circ.easeOut })
            .add('scene', '-=0.2')
            .to(leftGroupChildren[0], 0.8, {autoAlpha: 1}, 'scene', 0)
            .staggerTo([...leftGroupChildren].slice(3,5), 0.8, {autoAlpha: 1}, 0, 'scene+=0.1')
            .staggerTo([...leftGroupChildren].slice(1,3), 0.8, {autoAlpha: 1}, 0, 'scene+=0.2')
            .to(rightGroupChildren[1], 0.8, {autoAlpha: 1}, 'scene', 0)
            .staggerTo([...rightGroupChildren].filter((item, key) => /0|2|3/.test(key)), 0.8, {autoAlpha: 1}, 0, 'scene+=0.1')
            .to(rightGroupChildren[4], 0.8, {autoAlpha: 1}, 'scene+=0.2', 0)
            .staggerTo(selectedImages, 0.6, { ease: Sine.easeIn, autoAlpha: 1 })

        // Exit App
        return () => {
            let tl = new TimelineLite()
            const duration = 0.6

             tl.set([appNav.currentPage, mainLogo, currentText, leftGroupChildren, rightGroupChildren], { ease: Expo.easeIn })
                 .to(appNav.currentPage, duration, { autoAlpha: 0 }, 0)
                 .to(mainLogo, duration, { transformOrigin: '50% 0%', scale: 0.4 }, 0)
                 .to(currentText, duration, { y: '-40' }, 0)
                 .staggerTo(leftGroupChildren, duration, { transformOrigin: '100% 0%', rotation: '-9', x: '40', y: '-40'}, 0, 0)
                 .staggerTo(rightGroupChildren, duration, { transformOrigin: '0% 0%', rotation: '9', x: '-40', y: '-40'}, 0, 0)
                 .set(wrap, {css: { className: '+=hide' } })

        }
    }
}

export default new FifthPage()