import EditableText from "./user/EditableText.js";
import GoogleSignin from "./GoogleSignin.js";

/* Make sure to get your own client ID. This one will be deleted soon */
const CLIENT_ID = "723067440195-8unb39sobjavlo60d873s74mufgsdfr7.apps.googleusercontent.com";

export default class App {
   constructor() {
      /* Handling login information */
      this._gs = null;

      this._onError = this._onError.bind(this);
      this._onSignIn = this._onSignIn.bind(this);
      this._onSignOut = this._onSignOut.bind(this);
      this._loadProfile = this._loadProfile.bind(this);
      


      this._user = null;
      this.loggedIn = false;
      this._loginForm = null;

   }

   async setup() {
      console.log('setting up ');
      this._gs = await GoogleSignin.init(CLIENT_ID);
      document.querySelector("#signout").addEventListener("click", this._onSignOut);

      this._gs.renderSignIn("signin", {
         longtitle: true,
         theme: "dark",
         onsuccess: this._onSignIn,
         onfailure: this._onError
      });
      
      
      this._loginForm = document.querySelector("#log");
      this._loginForm.login.addEventListener("click", this._onSignIn);
      


      //TODO: Complete the setup of remaining components
      //adding the name



   }

   async _loadProfile() {
      /* Reset the feed */
      /* Update the avatar, name, and user ID in the new post form */
      console.log('the profile is being loaded');

   }
   
  _onError() {
    alert("Error while signing in");
  }

  _onSignIn() {
    event.preventDefault();
    this._loadProfile();
  }

  async _onSignOut() {
    await this._gs.signOut();
    document.querySelector("#loginForm").classList.remove("hidden");
    document.querySelector("#profile").classList.add("hidden");
  }
   


}
