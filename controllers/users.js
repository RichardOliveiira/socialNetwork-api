const firebase = require('firebase');
const db = firebase.firestore().collection("/userLogin");


createUsers = async (req, res) =>{
  user =  (req.body || req)
  try{
      db.add({user})
      res.status(200).json({ res : "Usuário criado com sucesso!"})
  }catch{((error) => {
    return error.json("Erro ao criar o usuário!")
  })
  }
}

verifyUsernameLogin = (req, res)=> {
  db.where('user.username', '==', req.params.username).get().then(snapshot =>{
  console.log(req.params.username)
    if(!snapshot.empty){
      res.status(200).json({ result: true})
    }else res.status(200).json({ result: false})
}).catch(error => {
  return ({error : "Estamos com problemas na conexão!"})
})}

registerWithEmail = async (req, res) =>{
  const userCredentials = req.body
  try{
    var login = await firebase.auth().createUserWithEmailAndPassword(userCredentials.email, userCredentials.password)
    user = await JSON.parse((JSON.stringify(login)))
    if(user.additionalUserInfo.isNewUser){
        userInfo = {
          email: userCredentials.email,
          username: userCredentials.user
          }
        await createUsers(userInfo)
      }
    res.status(200).json({ login }) 
  }catch(error) {
        res.status(500).json({ response: error }) 
  }
}

loginWithEmail = async (req, res)=> {
  try{
  var login = await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    res.status(200).json({ login })     
  }catch(error) {
    res.status(500).json({ response: error }) 
  }    
}

module.exports = {
    createUsers,
    verifyUsernameLogin,
    registerWithEmail,
    loginWithEmail
}