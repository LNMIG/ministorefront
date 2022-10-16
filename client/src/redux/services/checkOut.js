const checkOut = (checkoutProducts, currentCurrency) => {

const checkoutPackage = checkoutProducts.map(eachProduct => {
 
    if (eachProduct.attributes.length > 0 ) {
        let prices = eachProduct.prices.filter(each => each.currency.symbol === currentCurrency[0].symbol)
        eachProduct = {...eachProduct, prices}
    }
    return eachProduct
})

    return checkoutPackage
}
export default checkOut