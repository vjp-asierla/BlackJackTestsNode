'use strict';
//Para manejar el prompt desde consola:
let prompt = require('prompt-sync')();

//BLACKJACK


/**
 * Devuelve el mazo con todas las cartas ordenadas
 * Para implementarlo se emplea un doble for con los posibles palos y valores
 */
function construirMazo() {
    let mazo = [];

    for(let palo of ["Corazones","Picas","Tréboles","Diamantes"]){
        for(let valor of [1,2,3,4,5,6,7,8,9,10,"Jota","Reina","Rey"]){
            mazo.push([palo,valor]);
        }
    }
    return mazo;
}


/**
 * Dado un conjunto de cartas calcula su valor, sin pasarse de 21 (si es posible).
 * IMPORTANTE: Si hay varios ASES todos valen 1 excepto el último que puede valer 1 ú 11 dependiendo si nos pasamos o no.
 * @param cartas Un array con las cartas
 * @returns {number} El valor de esas cartas sin pasasrse de 21 (si es posible)
 */
function calcularValorMano(cartas){
    let ases = cartas.filter(carta => carta[1]===1);

    let restoCartas = cartas.filter(carta => carta[1]!==1);
    //Para calcular el valor primero sumamos todas las cartas que no son ases:
    let valorTotal = restoCartas.reduce((acum,elemento)=> acum + (isNaN(elemento[1]) ? 10 : elemento[1]), 0);

    //ahora vamos sumando sin intentar pasarnos los Ases, si tenemos
    if(ases.length > 0){
        //Si tenemos más de un AS, todos deben valer 1 excepto el último, que es variable.
        valorTotal = valorTotal + ases.length-1;
        //Nos queda un AS, ¿¿¿vale 11 o 1????
        valorTotal = valorTotal + 11 > 21 ? valorTotal+1 : valorTotal +11
    }
    //Devolvemos el valor final:
    return valorTotal;
}


function pintarMano(cartas) {
    for(let carta of cartas){
        console.log("["+carta[0]+", "+carta[1]+"]");
    }
}

/**
 * Saca una carta aleatoria y la elimina del mazo
 * @param mazo
 */
function getAleatoria(mazo) {
    return mazo.splice( Math.random()*mazo.length, 1)[0];
}


/**
 * Pide cartas hasta que el usuario decide parar.
 * @param mazo
 */
function turnoJugador(mazo) {
    let cartasJugador = [];

    do{
        cartasJugador.push(getAleatoria(mazo));
        console.log("Tu mano actual es: ");
        pintarMano(cartasJugador);
    }while(prompt("¿Quieres una carta más? (S/N)") === "S")
    console.log("Tras tu turno tu mano es:");
    pintarMano(cartasJugador);
    console.log("Y su valor es: "+calcularValorMano(cartasJugador) );

    prompt("Pulsa aceptar para continuar...");
    return cartasJugador;
}


function pintarInfoFinalJuego(cartasJugador, cartasMaquina) {
    let valorManoJugador = calcularValorMano(cartasJugador);
    let valorManoMaquina = calcularValorMano(cartasMaquina);

    if(valorManoMaquina <= 21 && valorManoJugador  < valorManoMaquina){
        console.log("Has perdido la partida, la máquina tiene una puntuación mayor")
    } else{
        console.log("Has ganado la partida a la máquina, enhorabuena")
    }

    //INFO FINAL DE LAS CARTAS:
    console.log("CARTAS DEL JUGADOR FINAL -- VALOR : "+ valorManoJugador +":");
    pintarMano(cartasJugador);
    console.log("CARTAS DE lA MÁQUINA FINAL-- VALOR : "+ valorManoMaquina +":")
    pintarMano(cartasMaquina)

}

/**
 * Realiza el turno de la mano. Pide cartas hasta que supere el valorJugador o supere 21
 * @param mazo El mazo de juego
 * @param valorManoJugador El valor de la mano del jugador
 * @returns {*[]} Un array con las cartas que ha seleccionado la máquina
 */
function turnoMaquina(mazo, valorManoJugador){
    let cartasMaquina = [];
    let valorManoMaquina = 0;
    do{
        cartasMaquina.push(getAleatoria(mazo));
        valorManoMaquina = calcularValorMano(cartasMaquina);

    }while(valorManoMaquina < 21 && valorManoMaquina <= valorManoJugador);
    return cartasMaquina;
}


/**
 * Función para lanzar un juego de blackjack
 */
function blackJack(){
    console.log("Creando el mazo...");
    let mazo = construirMazo();

    let cartasJugador = turnoJugador(mazo);
    let valorManoJugador = calcularValorMano(cartasJugador);

    if(valorManoJugador > 21){
        console.log("Has perdido la partida, has superado 21 puntos");
    } else{ //Si no te pasas de 21:
        let cartasMaquina = turnoMaquina(mazo, valorManoJugador);
        pintarInfoFinalJuego(cartasJugador, cartasMaquina);
    }
}

//Debemos definir qué modulos queremos exportar.
module.exports = {
    construirMazo : construirMazo,
    calcularValorMano : calcularValorMano,
    getAleatoria : getAleatoria,
    turnoMaquina: turnoMaquina,
    blackJack : blackJack
}




