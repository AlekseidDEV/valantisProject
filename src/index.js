import { Paginator } from "./modules/countwander";
import { filterProduct } from "./modules/filterproduct";
import { paginationFunc } from "./modules/pagination";
import { renderProduct } from "./modules/renderproduct";
import { ProductsServer } from "./modules/requestserver";

const paginationBlock = document.querySelector('.pagination_catalog')

window.productsServer = new ProductsServer
window.paginator = new Paginator

productsServer.getProduct().then((data) => {
    paginationBlock.style.display = 'flex'
    renderProduct(data.result)
    paginationFunc()
    filterProduct()
})







