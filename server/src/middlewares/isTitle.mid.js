function isTitle (req,res,next) {
    try {
        const {title} = req.body;
        if(!title) {
            const err = new Error ("ingrese el titulo del producto")
            err.statusCode = 400;
            throw err
        } 
        return next()
    } catch (error) {
        return next(error)
    }
}


export default isTitle