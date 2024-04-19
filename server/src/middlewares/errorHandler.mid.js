function errorHandler (error,_req,res,_next) {
    console.log(error);
    return res.json({
        statusCode: error.statusCode || 500,
        message: error.message || "CODER API ERROR"
    })
}


export default errorHandler