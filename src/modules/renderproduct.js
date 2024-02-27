
import { delDuplicate } from "./delduplicate"

export const renderProduct = (data) => {
    const bodyCatalogPage = document.querySelector('.page_block')
    const arrProduct = delDuplicate(data)

    bodyCatalogPage.innerHTML = ''

    arrProduct.forEach((item) => {
        bodyCatalogPage.insertAdjacentHTML('beforeend', 
        `
        <div class="card_product">
            <img src="./img/nophoto.png" alt="img" class="img_card_product">
            <div class="cont_card_product">
                <p class="product_name">${item.product}</p>
                <p class="brand_product">${item.brand === null ? `` : `Бренд: ${item.brand}`}</p>
                <p class="price_product">${item.price} ₽</p>
                <p class="product_id">id: ${item.id}</p>
            </div>
        </div>
        `
        )
    })
}