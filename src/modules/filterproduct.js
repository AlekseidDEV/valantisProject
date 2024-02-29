import { renderProduct } from "./renderproduct";
import { filterRes } from "./resetfilter";
import { validInput } from "./validinput";

export const filterProduct = () => {
    const filterAside = document.querySelector('.fillter_panel')
    const bodyCatalogPage = document.querySelector('.page_block')
    const pagination = document.querySelector('.pagination_catalog')
    const paginationFilter = document.querySelector('.pagination_catalog_fill')
    const btnRes = filterAside.querySelector('#button')

    const filterBrand = (targetValue) => {
        pagination.style.display = 'none'
        paginationFilter.style.display = 'none'
    
        const trimValue = targetValue.trim()

        if(validInput(trimValue)){
            productsServer.filterProductBrand(trimValue).then((data) => {
                if(data.result.length > 0 && data.result.length < 50){
                    renderProduct(data.result)
                } else if(data.result.length === 0){
                    bodyCatalogPage.innerHTML = `<p class="loading">Товаров не найдено</p>`
                } else{
                    paginator.countWander(data.result, 50)
                    paginationFilter.style.display = 'flex'
                }
            })
        } else if(!validInput(trimValue) && trimValue !== ''){
            alert('Введите название Бренда')
        }
    }

    const filterName = (targetValue) => {
        pagination.style.display = 'none'
        paginationFilter.style.display = 'none'

        const trimValue = targetValue.trim()

        if(validInput(trimValue)){
            productsServer.filterProductName(trimValue).then((data) => {
                if(data.result.length > 0 && data.result.length < 50){
                    renderProduct(data.result)
                } else if(data.result.length === 0){
                    bodyCatalogPage.innerHTML = `<p class="loading">Товаров не найдено</p>`
                } else{
                    paginator.countWander(data.result, 50)
                    paginationFilter.style.display = 'flex'
                }
            })
        } else if(!validInput(trimValue) && trimValue !== ''){
            alert('Введите корректное название')
        }
    }

    const filterPrice = (targetValue) => {
        pagination.style.display = 'none'
        paginationFilter.style.display = 'none'

        productsServer.filterProductPrice(+targetValue).then(data => {
            if(data.result.length > 0 && data.result.length < 50){
                renderProduct(data.result)
            } else if(data.result.length === 0){
                bodyCatalogPage.innerHTML = `<p class="loading">Товаров не найдено</p>`
            } else{
                paginator.countWander(data.result, 50)
                paginationFilter.style.display = 'flex'
            }
        })
    }

    filterAside.addEventListener('change', (e) => {
        e.preventDefault()
        
        if(e.target.className  === "brand_input"){
            filterBrand(e.target.value)
        } else if(e.target.className === 'price_input'){
            filterPrice(e.target.value)
        } else if(e.target.className === 'product_name_input'){
            filterName(e.target.value)
        }
    })

    btnRes.addEventListener('click', (e) => {
        e.preventDefault()

        if(e.target.id === "button"){
            filterRes()
        }
    })
}