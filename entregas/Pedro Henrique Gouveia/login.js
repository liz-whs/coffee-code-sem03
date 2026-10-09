const erroEmail = document.querySelector("#emailErro");
const erroSenha = document.querySelector("#senhaErro");

const formu = document.querySelector("#form-login");
formu.addEventListener("submit", (event) => {
    event.preventDefault();
    
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value;

    erroEmail.textContent = "";
    erroSenha.textContent = "";
    let valido = true;

    if (!email){
        erroEmail.textContent= "Digite seu E-mail."
        valido = false;
    }else if(!email.includes("@")){
        erroEmail.textContent= "Digite um E-mail válido."
        valido = false;
    }

    if (senha.length<8){
        erroSenha.textContent= "Sua senha deve ter no mínimo 8 caractéres."
        valido= false;
    }
    
    if (senha === email){
        erroSenha.textContent= "Sua senha não pode ser igual a seu E-mail."
        valido= false;
    }

    if (valido){
        console.log("Formulário válido.")
    }
})

