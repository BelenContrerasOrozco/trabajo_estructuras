//----------------VARIEBLES GLOBALES----------------

let list = document.getElementById('list');
let nodes = document.getElementsByClassName('node');
let pointers = document.getElementsByClassName('pointer');
let error = document.getElementById('error');

//----------------TIEMPO ANIMACION----------------
let tiempo_animacion;

function valorvelocidad(tiempo){
    tiempo_animacion = tiempo;
}

let errorCircle = '<i class="fas fa-exclamation-circle"></i> ';

function nodo_animado(i) {
    return new Promise(resolve => {
        nodes[i].style.animation = "highlightNode " + tiempo_animacion + "s ease";
        setTimeout(() => {
            nodes[i].style.animation = null;
            resolve();
        }, tiempo_animacion);
    });
}

function flecha_animacion(i) {
    return new Promise(resolve => {
        pointers[i].style.animation = "highlightPointer " + tiempo_animacion + "s ease";
        setTimeout(() => {
            pointers[i].style.animation = null;
            resolve();
        }, tiempo_animacion);
    });
}

function borrar_nodos(i) {
    return new Promise(resolve => {
        nodes[i].style.animation = "deleteNode " + tiempo_animacion + "s ease";
		pointers[i].style.animation = "deletePointer " + tiempo_animacion + "s ease";
		setTimeout(() => {
			list.removeChild(nodes[i]);
            list.removeChild(pointers[i]);
            resolve();
		}, tiempo_animacion);
    });
}

async function animacion_nodos(from, to) {
    for (let i = from; i <= to; i++) {
        await nodo_animado(i);
        await flecha_animacion(i);
    }
}

function animacion_despues (from) {
    return new Promise(resolve => {
        for (let i = from; i < nodes.length; i++) {

            nodes[i].style.animation = "moveLeftNode " + tiempo_animacion + "s ease";

            pointers[i].style.animation = "moveLeftNode " + tiempo_animacion + "s ease";

            setTimeout(() => {
                nodes[i].style.animation = null;
                pointers[i].style.animation = null;
            }, tiempo_animacion)
        }

        setTimeout(() => resolve(), tiempo_animacion)
    })
}

function animacion_antes_de_colocar (from, to) {
    return new Promise(resolve => {
        for (let i = from; i < to; i++) {
            console.log('length3', nodes.length)

            nodes[i].style.animation = "moveRightNode " + tiempo_animacion + "s ease";

            pointers[i].style.animation = "moveRightNode " + tiempo_animacion + "s ease";

            setTimeout(() => {
                nodes[i].style.animation = null;
                pointers[i].style.animation = null;
            }, tiempo_animacion)
        }

        setTimeout(() => resolve(), tiempo_animacion)
    })
}

//----------------AGREGAR----------------
async function agregar(i, data) {

    let node = document.createElement('div');
    node.classList.add('node');

    let number = document.createElement('p');
    number.classList.add('number');

    let text = document.createTextNode(data);

    number.appendChild(text);
    node.appendChild(number);

    let pointer = document.createElement('div');
    pointer.classList.add('pointer');
    pointer.style.opacity = "0";

    let img = document.createElement('img');
    img.src = "flecha_sola.png";

    pointer.appendChild(img);

    if (i === nodes.length) {
        await animacion_nodos(0, nodes.length - 1);
        list.appendChild(node);
        list.appendChild(pointer);
    }
    else {
        await animacion_nodos(0, i - 1);
        await animacion_antes_de_colocar(i, nodes.length)
        list.insertBefore(pointer, nodes[i]);
        list.insertBefore(node, pointer);
    }

    node.style.animation = "grow " + tiempo_animacion + "s ease";

    setTimeout(() => {
        pointer.style.opacity = 1;
        pointer.style.animation = "slide " + tiempo_animacion + "s ease";
    }, tiempo_animacion);

    console.log(list);
}

//----------------ACTUALIZAR----------------
async function actualizar(data, i) {

    let tiempo_animacion = 1;

    await animacion_nodos(0, i - 1);

    nodes[i].firstChild.style.animation = "fadeNumberOut " + tiempo_animacion + "s ease";

    setTimeout(() => {
        nodes[i].firstChild.innerHTML = data;
        nodes[i].firstChild.style.animation = "fadeNumberIn " + tiempo_animacion + "s ease";
    }, tiempo_animacion);

    setTimeout(() => {
        nodes[i].firstChild.style.animation = null;
    }, tiempo_animacion * 2);
}


//----------------ELIMINAR----------------
function eliminar(data) {
    quitar(0, data);
}

async function quitar(i, data) {
    if (i >= nodes.length) {
        return;
    }
    else if (nodes[i].firstChild.innerHTML == data) {
        await borrar_nodos(i);
        await animacion_despues(i)
        quitar(i, data);
    }
    else {
        await nodo_animado(i);
		await flecha_animacion(i);
		quitar(i + 1, data);
    }
}

//----------------BUSCAR----------------
function buscar_dato(data) {
    encontrar(0, data);
}

async function encontrar(i, data) {

    if (i >= nodes.length) {
        return;
    }
    else if (nodes[i].firstChild.innerHTML == data) {
        let inputError = false;
        error.innerHTML =  errorCircle + "El dato " + data + " esta en el nodo numero " + i;
        inputError = true;
    }
    else {
        await nodo_animado(i);
		await flecha_animacion(i);
		encontrar(i + 1, data);
    }
}