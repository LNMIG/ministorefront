export const errorHandler = (error) => {
    console.log(error)
    throw new Error('Server Fails')
}