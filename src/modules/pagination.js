import { renderProduct } from "./renderproduct"

export const paginationFunc = () => {
    const bodyCatalogPage = document.querySelector('.page_block')
    const paginationBlock = document.querySelector('.pagination_catalog')
    const counterPage = document.querySelector('.pagination_number')

    let count = 1
    paginationBlock.style.display = 'flex'

    const prevPage = () => {
       --count

       paginationBlock.style.display = 'none'

        if(count < 1){
         count = 1
       } else{
        counterPage.textContent = count
        
        productsServer.curentPage = count

        productsServer.getProduct().then((data) => {
            bodyCatalogPage.innerHTML = `<p class="loading">Загружаем товары, секунду...</p>`
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
            bodyCatalogPage.innerHTML = `<p class="loading">Загружаем товары, секунду...</p>`
            renderProduct(data.result)

            paginationBlock.style.display = 'flex'

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