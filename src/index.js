import { paginationFunc } from "./modules/pagination";
import { renderProduct } from "./modules/renderproduct";
import { ProductsServer } from "./modules/requestserver";

const bodyCatalogPage = document.querySelector('.page_block')

window.productsServer = new ProductsServer

productsServer.getProduct().then((data) => {
    bodyCatalogPage.innerHTML = `<p class="loading">Загружаем товары, секунду...</p>`
    renderProduct(data.result)
    paginationFunc()
})



