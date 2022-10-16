const updateProductInCart = (postedProducts, idForDeletion, modifiedAttribute) => {

    const modifiedPackage = postedProducts.map(eachProduct => {

        if (eachProduct.idForDeletion === idForDeletion) {
            eachProduct = {...eachProduct, ...modifiedAttribute}
        }
    
        return eachProduct
    })

    return modifiedPackage
}
export default updateProductInCart