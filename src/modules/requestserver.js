import CryptoJS from "crypto-js"
import { caclOffset } from "./calcoffset"

export class ProductsServer {
    bodyCatalog = document.querySelector('.page_block')

    _password = 'Valantis'
    _timeStamp = new Date().toISOString().slice(0, 10).split('-').join('')
    _data = `${this._password}_${this._timeStamp}`
    _authotizedString = CryptoJS.MD5(this._data).toString()
    limit = 50
    curentPage = 1
    counterRequest = 0

    getProduct = async () => {
        
        this.bodyCatalog.innerHTML = `<p class="loading">Загружаем товары, секунду...</p>`

        try {
            const responseId = await fetch('https://api.valantis.store:41000/', {
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
    
            const responceProd = await fetch('https://api.valantis.store:41000/', {
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
            this.counterRequest++

            if( this.counterRequest <= 100){
                console.log(error.message)
                return this.getProduct()
            } else if(this.counterRequest > 100){
                alert('возникла ошибка, нажмите ок, для перезагрузки')
                location.reload()
            }
        }
    }

    filterProductBrand = async (paramVal) => {
        
        this.bodyCatalog.innerHTML = `<p class="loading">Загружаем товары, секунду...</p>`

        try {
            const responseId = await fetch('https://api.valantis.store:41000/', {
            method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth": this._authotizedString,
                },
                body: JSON.stringify({
                    "action": "filter",
                    "params": {
                        'brand' : paramVal,
                    }
                })
        })

        const idProd = await responseId.json()
        const productIds = idProd.result

        const responceProd = await fetch('https://api.valantis.store:41000/', {
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
            this.counterRequest++

            if( this.counterRequest <= 100){
                console.log(error.message)
                return this.filterProductBrand()
            } else if(this.counterRequest > 100){
                alert('возникла ошибка, нажмите ок, для перезагрузки')
                location.reload()
            }
        }
    }

    filterProductPrice = async (paramVal) => {
        
        this.bodyCatalog.innerHTML = `<p class="loading">Загружаем товары, секунду...</p>`
        
        try {
            const responseId = await fetch('https://api.valantis.store:41000/', {
            method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth": this._authotizedString,
                },
                body: JSON.stringify({
                    "action": "filter",
                    "params": {
                        'price' : paramVal,
                    }
                })
        })

        const idProd = await responseId.json()
        const productIds = idProd.result

        const responceProd = await fetch('https://api.valantis.store:41000/', {
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
            this.counterRequest++

            if( this.counterRequest <= 100){
                console.log(error.message)
                return this.filterProductPrice()
            } else if(this.counterRequest > 100){
                alert('возникла ошибка, нажмите ок, для перезагрузки')
                location.reload()
            }
        }
    }

    filterProductName = async (paramVal) => {
        
        this.bodyCatalog.innerHTML = `<p class="loading">Загружаем товары, секунду...</p>`
        
        try {
            const responseId = await fetch('https://api.valantis.store:41000/', {
            method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth": this._authotizedString,
                },
                body: JSON.stringify({
                    "action": "filter",
                    "params": {
                        'product' : paramVal,
                    }
                })
        })

        const idProd = await responseId.json()
        const productIds = idProd.result

        const responceProd = await fetch('https://api.valantis.store:41000/', {
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
            this.counterRequest++

            if( this.counterRequest <= 100){
                console.log(error.message)
                return this.filterProductName()
            } else if(this.counterRequest > 100){
                alert('возникла ошибка, нажмите ок, для перезагрузки')
                location.reload()
            }
        }
    }
}

