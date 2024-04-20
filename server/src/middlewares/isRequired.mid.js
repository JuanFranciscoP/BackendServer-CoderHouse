function isRequired (req,res,next) {
    try {
        const {title, price} = req.body;
        if(!title || !price) {
            const err = new Error ("ingrese el titulo del producto y su precio")
            err.statusCode = 400;
            throw err
        } 
        return next()
    } catch (error) {
        return next(error)
    }
}


export default isRequired