'use strict'
let assert = require('assert');
//Una manera de importar
let construirMazo = require('../blackjack').construirMazo;

//Otra manera mejor de importar:
let {getAleatoria, calcularValorMano, turnoMaquina} = require('../blackjack');

/** Nombre de este juego de pruebas **/
describe('Testeando el funcionamiento de los métodos del Blackjack',()=> {
    //Se pueden usar hooks para preparar las pruebas
    /*
    beforeEach(()=>{
        //Código que se ejecutaría antes de cada una.
    });
    */
    //afterEach()

    //Probar que un mazo está bien formado:
    //Es necesario comprobar que el array tiene todos los valores posibles.
    describe('Comprobando que el mazo esté bien formado', () => {
        /** Prueba de un método **/
        it("Están todas las cartas y no hay duplicados", () => {
            /** Subcomprobaciones sobre el método (al menos 1) **/
            let mazo = construirMazo();
            for (let valor of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jota", "Reina", "Rey"]) {
                for (let palo of ["Corazones", "Picas", "Tréboles", "Diamantes"]) {
                    //Hay una sola carta que tiene ese valor:
                    let contadorCarta = 0; //Inicialmente no hay ninguna
                    for (let carta of mazo) {
                        if (carta[0] === palo && carta[1] === valor) {
                            contadorCarta++;
                        }
                    }
                    assert.equal(contadorCarta, 1);

                    //¿POR QUÉ ESTO NO FUNCIONA?
                    //mazo.includes([palo,valor])
                }
            }
        })
    });


    //Probar que se extrae una carta aleatoria correctamente:
    //Es necesario ver que la carta estaba antes en el array, después no está.
    describe('Comprobando que se extrae correctamente una carta aleatoria del mazo', () => {
        let mazo = construirMazo();
        let copiaMazoOriginal = mazo.map(x=>x);
        let cartaSeleccionada = getAleatoria(mazo);
        it("La carta estaba en el mazo originario", () => {
            assert.ok(copiaMazoOriginal.includes(cartaSeleccionada)); //Aquí si funciona porque es la referencia
        })
        it("La carta no está en el mazo actual", () => {
            assert.ok(!mazo.includes(cartaSeleccionada)); //Aquí si funciona porque es la referencia
        })
        it("Nos aseguramos que sólo hemos robado una carta", ()=>{
            assert.equal(copiaMazoOriginal.length-mazo.length, 1);
        })
    })


    //TODO:
    //Compobar que la cuenta de las manos funciona correctamente:
    //Es necesario probar con distintos casos que puedan ser "complejos".


    //TODO:
    //Comprobar que la máquina pide cartas correctamente:
    //El valor al finalizar tiene que ser mayor que la mano del jugador

})









