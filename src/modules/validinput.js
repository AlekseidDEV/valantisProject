export const validInput = (targetValue) => {
    let succes = false

    if(isNaN(targetValue)){
        succes = true
    } else{
        succes = false
    }

    return succes
}