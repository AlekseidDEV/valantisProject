import { filterProduct } from "./filterproduct"
import { paginationFunc } from "./pagination"
import { renderProduct } from "./renderproduct"

export const filterRes = (aside) => {
    const pagination = document.querySelector('.pagination_catalog')
    const paginationFilter = document.querySelector('.pagination_catalog_fill')
    const form = aside.querySelector('form')
    const allInputs = aside.querySelectorAll('input')

    allInputs.forEach((input) => {
        if(input.value !== ''){
            paginationFilter.style.display = 'none'

            form.reset()

            productsServer.getProduct().then((data) => {
            pagination.style.display = 'flex'
            renderProduct(data.result)
            paginationFunc()
            filterProduct()
            })
        } else{
            return
        }
    })
}