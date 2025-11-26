class Movimiento {
    constructor(tipo, cantidad) {
        this.tipo = tipo;
        this.cantidad = cantidad
    }
}

document.getElementById("formaMovimiento").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener datos
    const cantidad = parseFloat(document.getElementById("cantidad").value);
    const movimiento = new Movimiento("deposito", cantidad);

    // Guardar
    guardarMovimiento(movimiento);

    // Actualizar pantalla
    mostrarTotal();
    mostrarHistorial();
});

document.getElementById("formaRetiro").addEventListener("submit", function (e) {
    e.preventDefault();

    const cantidad = parseFloat(document.getElementById("cantidadRetiro").value);

    if (cantidad <= 0) {
        alert("Ingrese una cantidad valida.");
        return;
    }

    const movimiento = new Movimiento("retiro", cantidad);

    guardarMovimiento(movimiento);
    mostrarTotal();
    mostrarHistorial();
    document.getElementById("cantidadRetiro").value = "";
});

function guardarMovimiento(movimiento) {
    const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

    let totalActual = 0;
    movimientos.forEach(m => {
        if (m.tipo === "deposito") totalActual += m.cantidad;
        else totalActual -= m.cantidad;
    });

    if (movimiento.tipo === "retiro" && movimiento.cantidad > totalActual) {
        alert("Fondos insuficientes para este retiro");
        return;
    }

    movimientos.push(movimiento);
    localStorage.setItem("movimientos", JSON.stringify(movimientos));
    alert("Movimiento registrado");
}

function mostrarTotal() {
    const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

    let total = 0;
    movimientos.forEach(m => {
        if (m.tipo === "deposito") total += m.cantidad;
        else total -= m.cantidad;
    });

    document.getElementById("total").innerHTML = `$${total.toFixed(2)}`;
}

function mostrarHistorial() {
    const lista = document.getElementById("listaHistorial");
    const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

    let tabla = `
        <table border="1">
            <tr>
                <th>Tipo de Movimiento</th>
                <th>Cantidad</th>
            </tr>
    `;

    movimientos.forEach(m => {
        tabla += `
            <tr>
                <td>${m.tipo}</td>
                <td>$${m.cantidad}</td>
            </tr>
        `;
    });

    tabla += `</table>`;
    lista.innerHTML = tabla;
}

document.addEventListener("DOMContentLoaded", function () {
    mostrarTotal(); mostrarHistorial();
});