'use strict';

let prompt = require('prompt-sync')();
let {blackJack} = require("./blackjack");


//Ejecución
while( prompt("¿Quieres jugar al BlackJack? (S/N)") === "S"){
    blackJack();
}