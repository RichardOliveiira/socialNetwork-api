const httpStatus = require("http-status-codes")
const errorHandler = (err, req, res, next)=>{
    console.log(err);

    if(!err.status || !err.message){
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .send("Erro inesperado")
        return
    }
    
    res.status(err.status)
    .send(err.message)
}

const notFoundHandler = (req, res)=>{
    res.status(httpStatus.NOT_FOUND)
    .send({"Mensagem": "Não encontrado!"});
}

module.exports = {
    errorHandler,
    notFoundHandler
}