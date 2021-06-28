const firebase = require('firebase')
const db = firebase.firestore().collection("/userLogin");

createUsers = (req, res) =>{
   db.add({req}).then((ref) => {
    res.status(200).json({ res : "Usuário criado com sucesso!"})
  }).catch(err => {
    err.send().json({err : "Erro ao criar o usuário!"})
  })
}

verifyUsernameLogin = (req, res)=> {
  db.where('username', '==', req.params.username).get().then(snapshot =>{
    if(!snapshot.empty){
      res.status(200).json({ result: true})
    }else res.status(200).json({ result: false})
}).catch(err => {
  err.send().json({err : "Estamos com problemas na conexão!"})
})}

loginWithEmail = (req, res)=>{
  console.log(req.body)
  firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
  .then((userCredential) => {
    res.status(200).json({ userCredential }) 
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    error.send().json({errorCode, errorMessage })

  });
}


module.exports = {
    createUsers,
    verifyUsernameLogin,
    loginWithEmail
}