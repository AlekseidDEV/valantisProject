import {renderProduct} from "./renderproduct"

export const paginationFunc = () => {
    const paginationBlock = document.querySelector('.pagination_catalog')
    const counterPage = document.querySelector('.pagination_number')
    const paginBlock = document.querySelector('.pagination_catalog_fill')
    const counterPageFilter = document.querySelector('.pagination_number_fill')

    let count = 1
    let countFilter = 1

    counterPage.textContent = count
    counterPageFilter.textContent = countFilter

    const prevPage = () => {
        --count

        if (count < 1) {
            count = 1
        } else {

            paginationBlock.style.display = 'none'
            counterPage.textContent = count
            productsServer.curentPage = count

            productsServer.getProduct().then((data) => {
                renderProduct(data.result)
                paginationBlock.style.display = 'flex'
            })
        }
    }

    const nextPage = () => {
        ++count

        counterPage.textContent = count
        productsServer.curentPage = count
        paginationBlock.style.display = 'none'

        productsServer.getProduct().then((data) => {
            renderProduct(data.result)

            paginationBlock.style.display = 'flex'

            if (data.result.length < 45) {
                count = 0
                productsServer.curentPage = count
            }
        })
    }

    const nextPageFilter = () => {
        ++countFilter

        if(countFilter > paginator.arrPage.length){
            countFilter = paginator.arrPage.length
        } else{
            paginator.nextPage(countFilter - 1)
            document.documentElement.scrollTop = 0
        }

        counterPageFilter.textContent = countFilter
    }

    const prevPageFilter = () => {
        --countFilter

        if(countFilter < 1){
            countFilter = 1
        } else{
            counterPageFilter.textContent = countFilter

            paginator.prevPage(countFilter - 1)
            document.documentElement.scrollTop = 0
        }
    }

    paginationBlock.addEventListener("click", (e) => {
        e.preventDefault()
        if (e.target.className === 'prev_page') {
            prevPage()
        } else if (e.target.className === 'next_page') {
            nextPage()
        }
    })

    paginBlock.addEventListener('click', (e) => {
        e.preventDefault()

        if(e.target.className === 'prev_page_fill'){
            prevPageFilter()
        } else if(e.target.className === 'next_page_fill'){
            nextPageFilter()
        }
    })
}