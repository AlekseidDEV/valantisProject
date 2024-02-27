import CryptoJS from "crypto-js"
import { caclOffset } from "./calcoffset"

export class ProductsServer {
    _password = 'Valantis'
    _timeStamp = new Date().toISOString().slice(0, 10).split('-').join('')
    _data = `${this._password}_${this._timeStamp}`
    _authotizedString = CryptoJS.MD5(this._data).toString()
    limit = 50
    curentPage = 1
    bodyCatalog = document.querySelector('.page_block')

    getProduct = async () => {
        this.bodyCatalog.innerHTML = `<p class="loading">Загружаем товары, секунду...</p>`

        try {
            const responseId = await fetch('http://api.valantis.store:40000/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth": this._authotizedString,
                },
                body: JSON.stringify({
                    "action": "get_ids",
                    "params": {
                        'offset': caclOffset(this.curentPage, this.limit),
                        "limit": this.limit
                    }
                }, )
            })
    
            const idProd = await responseId.json()
            const productIds = idProd.result
    
            const responceProd = await fetch('http://api.valantis.store:40000/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth": this._authotizedString,
                },
                body: JSON.stringify({
                    "action": "get_items",
                    "params": {
                        "ids": productIds
                    }
                })
            })
    
            const productData = await responceProd.json()
    
            return productData
        } catch (error) {
            console.log(error.message)
            return this.getProduct()
        }
    }
}

