import fetch from "node-fetch";

const loadData = (data) => {

    const ProductInput = {
        input: {
            setId: data.setId,
            name: data.name,
            inStock: data.inStock,
            gallery: data.gallery,
            description: data.description,
            category: data.category,
            attributes: data.attributes,
            prices: data.prices,
            brand: data.brand,
        }
    }

    fetch('http://localhost:4000/api/graphql_ministorefront', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        mutation: `
            postAllProducts($input: ProductInput) {
                postProducts(
                    setId: $input.setId
                    name: $input.name
                    inStock: $input.inStock
                    gallery: $input.gallery
                    description: $input.description
                    category: $input.category
                    attributes: $input.attributes
                    prices: $input.prices
                    brand: $input.brand
                )
            } {
                setId,
                name
            }
        `,
        variables: ProductInput
    }),
    })
    .then(res => res.json())
    .then(json => console.log('Loading Data: ',json.data))
}

export default loadData