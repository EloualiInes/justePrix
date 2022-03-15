//Elements du DOM
let input = document.querySelector('#prix');
let btn = document.querySelector(".btn");
let error = document.querySelector('small');
let formulaire = document.querySelector('#formulaire');
let btnRejouer = document.querySelector(".div_btn");
let tab_instructions = document.querySelector('#instructions');
const borne = 10;
let nbrAleatoire = Math.floor(Math.random() *1001);
let coups = 0;
let nombreChoisis;



// Cache le div l'erreur et le btn qui permet de rejouer
error.hidden = true;
btnRejouer.style.display = "none";

// Génération d'un nombre aléatoire

nbrAleatoire = Math.floor(Math.random() *(borne+1));
coups = 0;
nombreChoisis;


// Vérifie si le nombre saisi par l'uti est correcte. Sinon lui indique que le chiffre est plus ou moins grand
function verifier(nbr){
    let instruction = document.createElement('div');
    if(nbr < nbrAleatoire){
        instruction.textContent = "#" + coups + " : " + nbr + " C'est plus !";
        instruction.className = "instruction plus";
        
    }

    else if(nbr > nbrAleatoire){
        instruction.textContent = "#" + coups + " : " + nbr + " C'est moins !";
        instruction.className = "instruction moins" ;
    }
    else{
        instruction.textContent = "#" + coups + " : " + nbr + " Félicitation, vous avez trouvé le juste prix !";
        instruction.className = "instruction fini";
        input.disabled = true;
        btn.disabled = true;
        btnRejouer.style.display = "inline";
    }

    tab_instructions.prepend(instruction);
}


// ------------------------- EVENEMENTS !!! -------------------------------------------
// Si on clique sur le btn rejouer, on met à jour le nombre que l'utilisateur essaie de deviner, le nbr de coup
// et 
btnRejouer.addEventListener("click", (event) =>{
    nbrAleatoire = Math.floor(Math.random() *(borne+1));
    coups = 0;
    nombreChoisis =-1;  
    while(tab_instructions.firstChild){
        tab_instructions.removeChild(tab_instructions.firstChild);
    }
    input.disabled = false;
    btn.disabled = false;
    btnRejouer.style.display = "none";
});
// Vérifier que l'utilisateur donne bien un nombre
input.addEventListener('keyup', () => {

    if(isNaN(input.value)){
        error.hidden = false;
    }
    else if(input.value < 0 || input.value > borne){
        error.hidden = false;
        error.innerHTML = "Entrez un nombre entre 0 et " + borne;
        
    }
    else{
        error.hidden = true;
    }
});

// Agir à l'envoi du formulaire
formulaire.addEventListener("submit", (event) =>{
    event.preventDefault(); //annuler l'envoie du formulaire ds une autre page

    if(isNaN(input.value) || input.value == '' || input.value < 0 || input.value > borne){
        input.style.borderColor = "red";
    }
    
    else{
        coups++;
        input.style.borderColor = "silver";
        nombreChoisis = input.value;
        input.value = "";
        verifier(nombreChoisis);
    }
});



