import App from "./app.js";


const main = () => {

    let signIn = document.getElementById("signInLink");
    let create = document.getElementById("createLink");

    signIn.addEventListener('click', (even) => {
        document.getElementById("log").classList.add('hidden');
        document.getElementById("create").classList.remove('hidden');
    })
    create.addEventListener('click', (even) => {
        document.getElementById("log").classList.remove('hidden');
        document.getElementById("create").classList.add('hidden');
    })
   
   
   let app = new App();
   app.setup();
}

main();