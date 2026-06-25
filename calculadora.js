const display = document.getElementById("display");

function adicionar(valor) {
    display.value += valor;
}

function limpar() {
    display.value = "";
}

function apagar() {
    display.value = display.value.slice(0, -1);
}

function calcular() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Erro";
    }
}

document.addEventListener("keydown", function (evento) {
    const tecla = evento.key
    if("0123456789+-*/.".includes (tecla)){
    adicionar(tecla)
    }

    if(tecla === "Enter" || tecla === "="){
        calcular();
    }

    if (tecla === "Escape"){
        limpar();
    }

    if (tecla === "Backspace"){
        apagar();
    }

})