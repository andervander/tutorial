const appNavigation = () => {
    let currentPage = 0
    let nextBtn, currentPageNode, pagesNode

    return {
        init(cb) {
            nextBtn = document.querySelector('.next-btn')
            currentPageNode = document.querySelector('#current-page')
            pagesNode = document.querySelector('.pages')
            this.updateCurrentPageNode()

            nextBtn.addEventListener('click', () => {
                this.updateCurrentPageNode()
                this.triggerBtnDisable()
                cb(currentPage)
            })
        },

        updateCurrentPageNode() {
            if (currentPage < 5) currentPage += 1
            currentPageNode.textContent = currentPage
        },

        triggerBtnDisable() {
            nextBtn.disabled = !nextBtn.disabled
        },

        get currentPage() {
            return pagesNode.children[currentPage - 1]
        },

        get prevPage() {
            return pagesNode.children[currentPage - 2]
        }
    }
}

export default appNavigation()