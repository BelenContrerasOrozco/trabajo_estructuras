document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    function obtener_datos(parentNode) {
        let inputs = parentNode.getElementsByTagName('input');
        let valores = {};
        if (inputs.length === 8) {
            if (inputs[0].placeholder === "Ingrese elemento" && inputs[1].placeholder === "Nodo numero"){
                valores.data = inputs[0].value;
                valores.index = inputs[1].value;
            }
            return valores;
        }
        return valores;
    }

    let tiempo_animacion = 1;
    valorvelocidad(tiempo_animacion);

    function obtener_velocidad(parentNode) {
        let inputs = parentNode.getElementsByTagName('input');
        let valores = {};
        if (inputs.length === 8) {
            if (inputs[3].placeholder === "Velocidad"){
                valores.velo = inputs[0].valueAsNumber;
            }
            return valores;
        }
        return valores;
    }

    //----------------VELICIDAD----------------
    document.getElementById('velocidad').addEventListener('click', function() {
        let valores = obtener_velocidad(this.parentNode);
        valorvelocidad(valores.velo);
        document.getElementById("num_velocidad").value = "";
    });

    //----------------AGREGAR----------------
    document.getElementById('agregar').addEventListener('click', function() {
        let valores = obtener_datos(this.parentNode);
        agregar(nodes.length, valores.data);
        document.getElementById("elemento").value = "";
        console.log(list);
    });

    //----------------ACTUALIZAR----------------
    document.getElementById('actualizar').addEventListener('click', function() {
        let valores = obtener_datos(this.parentNode);
        actualizar(valores.data,valores.index);
        document.getElementById("elemento").value = "";
        document.getElementById("nuevo_elemento").value = "";
        console.log(list);
    });


    //----------------ELIMINAR----------------
    document.getElementById('eliminar').addEventListener('click', function() {
        let valores = obtener_datos(this.parentNode);
        eliminar(valores.data);
        document.getElementById("elemento").value = "";
    });

    //----------------BUSCAR----------------
    document.getElementById('buscar').addEventListener('click', function() {
        let valores = obtener_datos(this.parentNode);
        buscar_dato(valores.data);
        document.getElementById("elemento").value = "";
    });
     
});