
export const caclOffset = (currentPage, limit) => {
    return currentPage > 0 ? (currentPage - 1) * limit : 0
}