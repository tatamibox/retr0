const getTotal = (products) => {
    console.log(products)
    let totalPrice = 0;
    for (let product of products) {
        totalPrice += parseInt(product.price)
    }
    return totalPrice
}
export default getTotal