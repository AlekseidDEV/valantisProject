import { paginationFunc } from "./pagination"
import { renderProduct } from "./renderproduct"

export class Paginator {
    arrPage = []

    countWander(data, chunkSize){
        this.arrPage = []

        let i = 0

        while(i < data.length){
            const chunk = data.slice(i , i + chunkSize)

            i += chunkSize

            this.arrPage.push(chunk)
        }

        renderProduct(this.arrPage[0])
        paginationFunc()
    }

    nextPage(step){
        renderProduct(this.arrPage[step])
    }

    prevPage(step){
        renderProduct(this.arrPage[step])
    }
}
