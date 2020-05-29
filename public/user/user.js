import EditableText from "./EditableText.js";


class App {
   constructor() {
      this._user = null;

      this._loginForm = null;

      this._onLogin = this._onLogin.bind(this);
      this._onNameChange = this._onNameChange.bind(this);
      
      this._nameComponent = '';

      
   }

   setup() {
      this._loginForm = document.querySelector("#loginForm");
      this._loginForm.login.addEventListener("click", this._onLogin);
      this._loginForm.listUsers.addEventListener("click", this._onListUsers);

      this._postForm = document.querySelector("#postForm");

      //TODO: Complete the setup of remaining components
      //adding the name
      this._nameComponent = new EditableText('nameInput');
      this._nameComponent.addToDOM(document.querySelector("#nameContainer"), this._onNameChange);

      console.log('setting up ');
      
   }

   async _loadProfile() {
      /* Reset the feed */

      /* Update the avatar, name, and user ID in the new post form */
      this._postForm.querySelector(".name").textContent = this._user.name;
      this._nameComponent.setValue(this._user.name);
   }

   async _onLogin(event) {
      event.preventDefault();
      //TODO: Complete this function. You should set this._user and call loadProfile
      let user_input = document.querySelector("div.widthContainer input[name='userid']");
      console.log('the user input is', user_input);
      this._user = await User.loadOrCreate(user_input.value);
      
      this._loadProfile();
   }

   _onNameChange(event) {
      // update name 
      this._displayName = event.value;
      this._user.name = event.value;
//      this._user = new User(this._user);
//      this._user.save();
      this._loadProfile();
   }

}




let app = new App();
app.setup();
