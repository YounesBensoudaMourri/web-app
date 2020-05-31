import EditableText from "./EditableText.js";

export default class User {
   constructor(data) {
      this._username = data.username;
      this._password = data.password;
      this._email = data.email;
   }

   static async loadUser(username, password) {
      // first check user exists in database
      let [status, data] = await apiRequest("GET", `/users/${username}/${password}`);
      if (status !== 200) {
         return null
      }
      return new User(data);
   }

   static async createNewUser(username, password, email) {
      user = {
         username,
         password,
         email
      }
      let [status, data] = await apiRequest("POST", "/users/", user);
      if (status !== 200)
         return null;
      return new User(data);

   }
}