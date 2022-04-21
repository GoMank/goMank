const errorHandler = (error, req, res, next) => {
    console.log('masuk')
    if (error.type === 'known') {
        res.status(error.code).json({
            message: error.message
        })
    } else if (error.name === 'SequelizeValidationError') {
        res.status(400).json({
            message: error.errors.map(e => e.message).join(',')
        })
    }
    // else if(error.name === 'SequelizeDatabaseError'){
    //     res.status(400).json({
    //         message: error.errors
    //     })
    // }
    // else{
    //     res.status(500).json({
    //         message:"internal server error"
    //     })
    // }
}

module.exports = {
    errorHandler
}