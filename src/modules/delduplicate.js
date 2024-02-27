export const delDuplicate = (data) => {
    const uniqueIdProd = new Set()
    
   const uniqueArr = data.filter((item) => {
        if(!uniqueIdProd.has(item.id)){
            uniqueIdProd.add(item.id)
            return true
        } else{
            return false
        }
    })

    return uniqueArr
}