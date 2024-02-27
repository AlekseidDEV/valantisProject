import { renderProduct } from "./renderproduct"

export const paginationFunc = () => {
    const bodyCatalogPage = document.querySelector('.page_block')
    const paginationBlock = document.querySelector('.pagination_catalog')
    const counterPage = document.querySelector('.pagination_number')

    let count = 1

    const prevPage = () => {
       --count

        if(count < 1){
         count = 1
       } else{
        counterPage.textContent = count
        
        productsServer.curentPage = count

        productsServer.getProduct().then((data) => {
            bodyCatalogPage.innerHTML = `<p class="loading">Загружаем товары, секунду...</p>`
            renderProduct(data.result)
        })
       }
    }

    const nextPage = () => {
        ++count

        counterPage.textContent = count
        productsServer.curentPage = count

        productsServer.getProduct().then((data) => {
            bodyCatalogPage.innerHTML = `<p class="loading">Загружаем товары, секунду...</p>`
            renderProduct(data.result)

            if(data.result.length < 45){
                count = 0
                productsServer.curentPage = count
            }
        })
    }

    paginationBlock.addEventListener("click", (e) => {
        e.preventDefault()
        if(e.target.className === 'prev_page'){
            prevPage()
        } else if(e.target.className === 'next_page'){
            nextPage()
        }
    })
}