//Inicialización de variables
let uncoveredCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let hits = 0;
let timer = false;
let timerBegin = 30;
let timerStarted = 30;
let countdown = null;

//Apuntando al documento html
let showMovements = document.getElementById('movements');
let showHits = document.getElementById('hits');
let showTimer = document.getElementById('t-remaining');

// Generación de números aleatorios
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
numbers = numbers.sort(()=>{return Math.random()-0.5});
console.log (numbers);

//Funciones complementarias
function countTime(){
    countdown = setInterval(()=>{
        timerStarted--;
        showTimer.innerHTML = `Tiempo: ${timerStarted} seg`;
        if(timerStarted == 0){
            clearInterval(countdown);
            blockCards();
        }
    },1000);
}

function blockCards(){
    for(let i=0; i<=15 ; i++){
        let blockedCards = document.getElementById(i);
        blockedCards.innerHTML = numbers[i];
        blockedCards.disabled = true;  
    }
}

//Función principal
function uncover(id){
    //Agregar temporizador al juego
    if(timer == false){
        countTime();
        timer = true;
    }

    uncoveredCards++;
    console.log (uncoveredCards);

    if(uncoveredCards == 1){
        //Mostrar el primer número
        card1 = document.getElementById(id);
        firstResult = numbers[id];
        card1.innerHTML = firstResult;
        //Desabilitar el primer boton
        card1.disabled = true;

    } else if(uncoveredCards == 2){ 
        //Mostrar el segundo número
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = secondResult;
        //Desabilitar el segundo boton
        card2.disabled = true;
        //Movimientos
        movements++;
        showMovements.innerHTML = `Movimientos: ${movements}`;
        if(firstResult == secondResult){
            //Reiniciar contador de tarjetas destapadas
            uncoveredCards = 0;
            //Aumentar aciertos
            hits++;
            showHits.innerHTML = `Aciertos: ${hits}`;

            if(hits == 8){
            clearInterval(countdown);
            showHits.innerHTML = `Aciertos: ${hits} 😎`;
            showTimer.innerHTML = `Fantastico solo te demoraste ${timerBegin - timerStarted} seg`;
            showMovements.innerHTML = `Movimientos: ${movements} 🤟🤑`;
            } 
        } else {
            //Mostrar momentaniamente las tarjetas y voltearlas de nuevo
            setTimeout(()=>{
                card1.innerHTML = ` `;
                card2.innerHTML = ` `;
                card1.disabled = false;
                card2.disabled = false;
                uncoveredCards = 0;
                },500);
        }
    }
}
