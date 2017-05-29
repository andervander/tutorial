import appNav from './app-navigation'

class FirstPage {
    constructor() {
    }

    init() {
        this.appendGeminiImages().then((parent) => {
            this.animateLogo(parent)
        })
    }

    addImage(src, parent) {
        let imgElement = document.createElement('img')
        imgElement.src = src
        imgElement.style.opacity = 0
        parent.appendChild(imgElement)
    }

    generateUrls() {
        let arr = []
        for(let i = 0; i <= 120; i++) {
            arr.push(`assets/animation/${(`000${i}`).substr(-3)}.png`)
        }
        return arr
    }

    loadImage(url) {
        return new Promise((resolve, reject) => {
            let image = new Image()

            image.onload = () => {
                resolve(image)
            }

            image.onerror = () => {
                let msg = `There is no image by url ${url}`
                reject(new Error(msg))
            }

            image.src = url
        })
    }

    appendGeminiImages() {
        let parent = document.querySelector('#gemini-animation')
        let urls = this.generateUrls()

        return Promise.all(urls.map(url => this.loadImage(url))).then(images => {
            images.forEach(img => this.addImage(img.src, parent))
            return parent
        })
    }

    animateLogo(parentNode) {
        let tl = new TimelineLite({ onComplete: appNav.triggerBtnDisable })
        let images = parentNode.childNodes
        let duration = 0.03

        tl.staggerTo(images, 0, {autoAlpha: 1}, duration, 0)
            .staggerTo([...images].slice(0, -1), 0, {autoAlpha: 0}, duration, duration)
    }
}

export default new FirstPage()