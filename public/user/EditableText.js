/* A DOM component that displays text and allows the user to edit it, turning into an input. */
export default class EditableText {
   constructor(id) {
      this.id = id;
      this.value = "";
      //TODO: Add instance variables, bind event handlers, etc.
      this.onChange = null;
      

      /* Bind event handlers */
      this._createDisplay = this._createDisplay.bind(this);
      this._createInput = this._createInput.bind(this);
      this._display = this._display.bind(this);
      this._input = this._input.bind(this);
      

   }

   /* Add the component (in display state) to the DOM under parent. When the value changes, onChange
      is called with a reference to this object. */
   addToDOM(parent, onChange) {
      //TODO
      this.onChange = onChange;
      //let input = this._createInput();
      let obj = this._createDisplay();
      // replace with here. 
      //firstChild.replaceWith(input);
      parent.appendChild(obj);
      
      //let input = this._createInput();

   }

   /* Set the value of the component and switch to display state if necessary. Does not call onChange */
   setValue(value) {
      //TODO
      this.value = value;
      let id = document.getElementById(this.id);
      let obj = this._createDisplay();
      id.replaceWith(obj);
//      this.value = value;
      //this._input();


      
   }

   _createDisplay() {
      let container = document.createElement("div");
      container.id = this.id;
      container.classList.add("editableText");

      let text = document.createElement("span");
      text.textContent = this.value;
      container.appendChild(text);

      let button = document.createElement("button");
      button.type = "button";
      button.textContent = "Edit";
      //TODO: Add event handler to edit button
      button.addEventListener("click", this._input);
      container.appendChild(button);
      
      return container;
   }

   _createInput() {
      let input = document.createElement("input");
      input.classList.add("editableInput");
      input.type = "text";
      input.id = this.id;
      input.value = this.value;
      //TODO: Add event handler to input

      input.addEventListener('blur', this._display);
      //this.setValue(this.value);//added this
      return input;
   }
   
   _input(event){
      let id = document.getElementById(this.id)
      let obj = this._createInput();
//      this.setValue(this.value);
      id.replaceWith(obj)
      obj.focus();
   }
   
   _display(event){
      let id = document.getElementById(this.id);
//      this.setValue(id.value)
//      let obj = this._createDisplay();
//      id.replaceWith(obj);
      this.setValue(id.value)
      if(this.onChange){
         this.onChange(this);
      }
   }

}
