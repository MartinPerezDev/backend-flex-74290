import crypto from "crypto";

const secretKey = "miclavesecreta";

class UsersManager{
  static users = [];

  static hashPassword(password){
    const hashedPassword = crypto.createHmac("sha256", secretKey).update(password).digest("hex");
    return hashedPassword;
  }

  static createUser(user){
    const hashedPassword = this.hashPassword(user.password);
    const newUser = { ...user, password: hashedPassword };

    this.users.push(newUser);
    console.log("Nuevo usuario creado");
  }

  static showUsers(){
    console.table(this.users);
  }

  static login(username, password){
    const userFind = this.users.find((user)=> user.username === username );
    if(!userFind) return "Usuario no encontrado";

    const hashedPassword = this.hashPassword(password);
    if( hashedPassword !== userFind.password ) return "Error, contraseña incorrecta";

    return "Logueado correctamente";
  }
};

UsersManager.createUser( { fullname: "Eliana Carrizo", username: "elianaDev", password: "qwerty1234" } );
UsersManager.createUser( { fullname: "Tobias Cortazar", username: "tobiasDev", password: "contraseña01" } );

UsersManager.showUsers();

console.log( UsersManager.login("elianaDev", "qwerty1234") );