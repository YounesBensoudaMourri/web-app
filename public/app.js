import EditableText from "./user/EditableText.js";
import GoogleSignin from "./GoogleSignin.js";


// Globals

/* Make sure to get your own client ID. This one will be deleted soon */
const CLIENT_ID = "723067440195-8unb39sobjavlo60d873s74mufgsdfr7.apps.googleusercontent.com";


export default class App {
   constructor() {
      /* Handling login information */
      this._gs = null;

      this._onError = this._onError.bind(this);
      this._onSignOut = this._onSignOut.bind(this);
      this._loadProfile = this._loadProfile.bind(this);

      this._user = null;
      this.loggedIn = false;

      this._onLogin = this._onLogin.bind(this);
      this._onCreate = this._onCreate.bind(this);

   }

   async setup() {
      console.log('setting up ');
      // this._gs = await GoogleSignin.init(CLIENT_ID);
      // document.querySelector("#signout").addEventListener("click", this._onSignOut);

      // this._gs.renderSignIn("signin", {
      //    longtitle: true,
      //    theme: "dark",
      //    onsuccess: this._onSignIn,
      //    onfailure: this._onError
      // });

      // First we initialize the login create page
      let signIn = document.getElementById("signInLink");
      let create = document.getElementById("createLink");

      signIn.addEventListener('click', (even) => {
         document.getElementById("login-form").classList.add('hidden');
         document.getElementById("create-form").classList.remove('hidden');
      })
      create.addEventListener('click', (even) => {
         document.getElementById("login-form").classList.remove('hidden');
         document.getElementById("create-form").classList.add('hidden');
      })


      // now we connect the login and create buttons
      let login_btn = document.getElementById("login-btn");
      let create_btn = document.getElementById("create-btn");

      login_btn.addEventListener('click', this._onLogin);
      create_btn.addEventListener('click', this._onCreate);




   }

   async _loadProfile(username, password) {
      /* Reset the feed */
      /* Update the avatar, name, and user ID in the new post form */
      console.log('the profile is being loaded');

   }

   _onError() {
      alert("Error while signing in");
   }

   _onLogin() {
      event.preventDefault();
      let _loginForm = document.getElementById("login-form");
      let (
         username = _loginForm.username.value,
         password = _loginForm.password.value
      );

      if (await this._checkUserExists(username, password))
         this._loadProfile();
      else {
         this._onError();
      }
   }

   async _onSignOut() {
      await this._gs.signOut();
      document.querySelector("#loginForm").classList.remove("hidden");
      document.querySelector("#profile").classList.add("hidden");
   }

   _onCreate() {
      event.preventDefault();
      let _createForm = document.getElementById("create-form");
      let (
         username = _createForm.username.value,
         password = _createForm.password.value,
         email = _createForm.email.value
      );
      if (await this._checkUserExists(username, password))
         this._onError(ERRORS.LOAD_USER);
      else {
         await this._createNewUser(username, password, email);
      }

   }
   async _checkUserExists(username, password) {
      this._user = User.loadUser(username, password);
      if (this._user)
         return true;
      return false;
   }

   async _createNewUser(username, password, email) {
      this._user = User.createNewUser(username, password, email);
      if (!this._user)
         this._onError(ERRORS.CREATE_USER)
   }
}