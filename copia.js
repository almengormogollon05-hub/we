/**
 * ==========================================================
 * SISTEMA DE COMEDOR UNIVERSITARIO
 * DASHBOARD.JS
 * PARTE 1/15
 * CONFIGURACIÓN GENERAL
 * ==========================================================
 */

"use strict";

//==========================================================
// LOCAL STORAGE
//==========================================================

function getStorage(clave) {

    const datos = localStorage.getItem(clave);

    if (datos === null) {
        return null;
    }

    try {

        return JSON.parse(datos);

    } catch (error) {

        console.error("Error leyendo LocalStorage:", clave);

        return null;

    }

}

function setStorage(clave, valor) {

    localStorage.setItem(clave, JSON.stringify(valor));

}

//==========================================================
// VARIABLES GLOBALES
//==========================================================

let usuario = {};

let carrito = [];

let monitoreo = [];

let productosSistema = [];

let carritoVisible = false;

//==========================================================
// INICIO DEL DASHBOARD
//==========================================================

document.addEventListener("DOMContentLoaded", iniciarDashboard);

//==========================================================
// FUNCIÓN PRINCIPAL
//==========================================================

function iniciarDashboard() {

    console.log("Dashboard iniciado correctamente");

    //------------------------------------
    // Verificar usuario
    //------------------------------------

    usuario = getStorage("usuario");

    if (!usuario) {

        alert("Primero debes completar el cuestionario.");

        window.location.href = "cuestionario.html";

        return;

    }

    //------------------------------------
    // Cargar datos guardados
    //------------------------------------

    carrito = getStorage("carrito") || [];

    monitoreo = getStorage("monitoreo") || [];

    //------------------------------------
    // Inicializar módulos
    //------------------------------------

    cargarPerfil();

    cargarRecomendaciones();

    generarPlanNutricional();

    cargarProductosRecomendados();

    inicializarIMC();

    cargarMonitoreo();

    inicializarCarrito();

    inicializarBotones();

    console.log("Sistema cargado correctamente.");

}
//==========================================================
// PARTE 2/15
// PERFIL DEL ESTUDIANTE
//==========================================================

//----------------------------------------------------------
// CARGAR PERFIL
//----------------------------------------------------------

function cargarPerfil() {

    asignarValor("input-nombre", usuario.nombre);
    asignarValor("input-codigo", usuario.codigo);
    asignarValor("input-carrera", usuario.carrera);
    asignarValor("input-edad", usuario.edad);
    asignarValor("input-peso", usuario.peso);
    asignarValor("input-altura", usuario.altura);

}

//----------------------------------------------------------
// ASIGNAR VALORES
//----------------------------------------------------------

function asignarValor(id, valor) {

    const elemento = document.getElementById(id);

    if (!elemento) return;

    elemento.value = valor || "";

}

//----------------------------------------------------------
// GUARDAR CAMBIOS
//----------------------------------------------------------

function guardarCambios() {

    actualizarCampo("nombre", "input-nombre");
    actualizarCampo("codigo", "input-codigo");
    actualizarCampo("carrera", "input-carrera");
    actualizarCampo("edad", "input-edad");
    actualizarCampo("peso", "input-peso");
    actualizarCampo("altura", "input-altura");

    setStorage("usuario", usuario);

    alert("Perfil actualizado correctamente.");

    inicializarIMC();

}

//----------------------------------------------------------
// ACTUALIZAR CAMPO
//----------------------------------------------------------

function actualizarCampo(propiedad, id) {

    const input = document.getElementById(id);

    if (!input) return;

    usuario[propiedad] = input.value;

}

//----------------------------------------------------------
// OBTENER NOMBRE DEL ESTUDIANTE
//----------------------------------------------------------

function obtenerNombre() {

    if (!usuario.nombre) {

        return "Estudiante";

    }

    return usuario.nombre;

}

//----------------------------------------------------------
// SALUDO PERSONALIZADO
//----------------------------------------------------------

function actualizarTituloBienvenida() {

    const titulo = document.querySelector(".header-txt h1");

    if (!titulo) return;

    titulo.textContent =
        "Bienvenido, " + obtenerNombre() + ". Disfruta de nuestros platillos.";

}

//----------------------------------------------------------
// ACTUALIZAR AL INICIAR
//----------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    actualizarTituloBienvenida();

});
//==========================================================
// PARTE 3/15
// RECOMENDACIONES PERSONALIZADAS
//==========================================================

function cargarRecomendaciones() {

    cargarObjetivo();

    cargarActividad();

    cargarAlergias();

    cargarEnfermedades();

}

//----------------------------------------------------------
// OBJETIVO
//----------------------------------------------------------

function cargarObjetivo() {

    const contenedor = document.getElementById("recomendacionObjetivo");

    if (!contenedor) return;

    const datos = {

        bajar: `
            <h4>🔻 Bajar de peso</h4>
            <p>Se recomienda un déficit calórico moderado,
            mayor consumo de verduras, proteínas magras y
            actividad física constante.</p>
        `,

        mantener: `
            <h4>⚖️ Mantener peso</h4>
            <p>Mantén una alimentación equilibrada,
            hidratación adecuada y actividad física regular.</p>
        `,

        ganar: `
            <h4>💪 Ganar masa muscular</h4>
            <p>Incrementa proteínas, carbohidratos complejos
            y entrenamiento de fuerza.</p>
        `

    };

    contenedor.innerHTML =
        datos[usuario.objetivo] || datos.mantener;

}

//----------------------------------------------------------
// ACTIVIDAD
//----------------------------------------------------------

function cargarActividad() {

    const contenedor =
        document.getElementById("recomendacionActividad");

    if (!contenedor) return;

    const datos = {

        sedentario:
        "🪑 Actividad muy baja. Se recomienda caminar al menos 30 minutos diarios.",

        ligera:
        "🚶 Actividad ligera. Continúa realizando ejercicio de 1 a 2 veces por semana.",

        moderada:
        "🏃 Excelente nivel. Mantén entre 3 y 5 sesiones semanales.",

        alta:
        "🏋️ Muy buen nivel físico. Recuerda priorizar recuperación e hidratación."

    };

    contenedor.innerHTML =
        `<p>${datos[usuario.actividad] || datos.sedentario}</p>`;

}

//----------------------------------------------------------
// ALERGIAS
//----------------------------------------------------------

function cargarAlergias() {

    const contenedor =
        document.getElementById("recomendacionAlergias");

    if (!contenedor) return;

    if (!usuario.alergias || usuario.alergias.length === 0) {

        contenedor.innerHTML = `
            <p style="color:green;">
                ✅ No registra alergias alimentarias.
            </p>
        `;

        return;

    }

    let html = "<ul>";

    usuario.alergias.forEach(alergia => {

        html += `<li>⚠️ ${alergia}</li>`;

    });

    html += "</ul>";

    contenedor.innerHTML = html;

}

//----------------------------------------------------------
// ENFERMEDADES
//----------------------------------------------------------

function cargarEnfermedades() {

    const contenedor =
        document.getElementById("recomendacionEnfermedades");

    if (!contenedor) return;

    if (!usuario.enfermedades || usuario.enfermedades.length === 0) {

        contenedor.innerHTML = `
            <p style="color:green;">
                ✅ No registra enfermedades.
            </p>
        `;

        return;

    }

    let html = "<ul>";

    usuario.enfermedades.forEach(enfermedad => {

        html += `<li>🩺 ${enfermedad}</li>`;

    });

    html += "</ul>";

    contenedor.innerHTML = html;

}

//----------------------------------------------------------
// BOTONES "VER MÁS"
//----------------------------------------------------------

function inicializarBotones() {

    configurarBoton(
        "btnObjetivo",
        "detalleObjetivo"
    );

    configurarBoton(
        "btnActividad",
        "detalleActividad"
    );

    configurarBoton(
        "btnAlergias",
        "detalleAlergias"
    );

    configurarBoton(
        "btnHistorial",
        "detalleSalud"
    );

}

//----------------------------------------------------------
// MOSTRAR / OCULTAR
//----------------------------------------------------------

function configurarBoton(idBoton, idDetalle) {

    const boton = document.getElementById(idBoton);

    const detalle = document.getElementById(idDetalle);

    if (!boton || !detalle) return;

    boton.addEventListener("click", function () {

        if (detalle.style.display === "block") {

            detalle.style.display = "none";

            return;

        }

        detalle.style.display = "block";

    });

}
//==========================================================
// PARTE 4/15
// PLAN NUTRICIONAL PERSONALIZADO
//==========================================================

function generarPlanNutricional() {

    let plan = obtenerPlanBase();

    adaptarPorAlergias(plan);

    adaptarPorEnfermedades(plan);

    mostrarPlan(plan);

}

//----------------------------------------------------------
// PLAN BASE
//----------------------------------------------------------

function obtenerPlanBase() {

    const planes = {

        bajar: {

            desayuno: "🥣 Avena con leche descremada y frutas.",
            media: "🍎 Manzana.",
            almuerzo: "🍗 Pollo a la plancha con quinua y ensalada.",
            tarde: "🥛 Yogurt griego light.",
            cena: "🥗 Ensalada de atún."

        },

        mantener: {

            desayuno: "🍳 Huevos revueltos con pan integral.",
            media: "🍌 Plátano.",
            almuerzo: "🍛 Lentejas con arroz integral.",
            tarde: "🥜 Frutos secos.",
            cena: "🥦 Pollo con verduras."

        },

        ganar: {

            desayuno: "🥤 Batido de avena con proteína.",
            media: "🥪 Sándwich de pollo.",
            almuerzo: "🍝 Pasta integral con carne.",
            tarde: "🥣 Yogurt con granola.",
            cena: "🥩 Filete con camote."

        }

    };

    return structuredClone(
        planes[usuario.objetivo] || planes.mantener
    );

}

//----------------------------------------------------------
// ADAPTAR POR ALERGIAS
//----------------------------------------------------------

function adaptarPorAlergias(plan) {

    if (!usuario.alergias) return;

    if (usuario.alergias.includes("Lactosa")) {

        plan.desayuno =
            "🥣 Avena con bebida de almendras.";

        plan.tarde =
            "🍊 Fruta fresca.";

    }

    if (usuario.alergias.includes("Gluten")) {

        plan.almuerzo =
            plan.almuerzo.replace(
                "Pasta integral",
                "Arroz integral"
            );

    }

    if (usuario.alergias.includes("Mariscos")) {

        plan.cena =
            plan.cena.replace(
                "atún",
                "pollo"
            );

    }

    if (usuario.alergias.includes("Huevo")) {

        plan.desayuno =
            "🥣 Avena con frutas.";

    }

}

//----------------------------------------------------------
// ADAPTAR POR ENFERMEDADES
//----------------------------------------------------------

function adaptarPorEnfermedades(plan) {

    if (!usuario.enfermedades) return;

    if (usuario.enfermedades.includes("Diabetes")) {

        plan.media =
            "🥝 Fruta con bajo índice glucémico.";

    }

    if (usuario.enfermedades.includes("Hipertensión")) {

        plan.cena +=
            " (Baja en sodio).";

    }

    if (usuario.enfermedades.includes("Colesterol Alto")) {

        plan.almuerzo =
            "🐟 Pescado al horno con verduras.";

    }

}

//----------------------------------------------------------
// MOSTRAR PLAN
//----------------------------------------------------------

function mostrarPlan(plan) {

    escribirTexto("planDesayuno", plan.desayuno);

    escribirTexto("planMedia", plan.media);

    escribirTexto("planAlmuerzo", plan.almuerzo);

    escribirTexto("planTarde", plan.tarde);

    escribirTexto("planCena", plan.cena);

}

//----------------------------------------------------------
// ESCRIBIR TEXTO
//----------------------------------------------------------

function escribirTexto(id, texto) {

    const elemento = document.getElementById(id);

    if (!elemento) return;

    elemento.textContent = texto;

}
//==========================================================
// PARTE 5/15
// PRODUCTOS RECOMENDADOS
//==========================================================

function cargarProductosRecomendados() {

    //------------------------------------------------------
    // BASE DE PRODUCTOS
    //------------------------------------------------------

    const productos = {

        bajar: [

            {
                nombre: "Avena Integral",
                imagen: "images/avena.png"
            },

            {
                nombre: "Yogurt Griego Light",
                imagen: "images/skyr.png"
            },

            {
                nombre: "Quinua",
                imagen: "images/quinua.png"
            },

            {
                nombre: "Té Verde",
                imagen: "images/teverde.png"
            }

        ],

        mantener: [

            {
                nombre: "Yogurt Skyr",
                imagen: "images/skyr.png"
            },

            {
                nombre: "Queso Quark",
                imagen: "images/quark.png"
            },

            {
                nombre: "Vakimu",
                imagen: "images/vakimu.png"
            },

            {
                nombre: "Plato Saludable",
                imagen: "images/plato.png"
            }

        ],

        ganar: [

            {
                nombre: "Proteína Whey",
                imagen: "images/proteina.png"
            },

            {
                nombre: "Mantequilla de Maní",
                imagen: "images/mani.png"
            },

            {
                nombre: "Granola",
                imagen: "images/granola.png"
            },

            {
                nombre: "Avena Premium",
                imagen: "images/avena.png"
            }

        ]

    };

    //------------------------------------------------------
    // LISTA SEGÚN OBJETIVO
    //------------------------------------------------------

    let lista = [...(productos[usuario.objetivo] || productos.mantener)];

    //------------------------------------------------------
    // ALERGIAS
    //------------------------------------------------------

    if (usuario.alergias) {

        if (usuario.alergias.includes("Lactosa")) {

            lista = lista.filter(producto =>

                !producto.nombre.toLowerCase().includes("yogurt") &&
                !producto.nombre.toLowerCase().includes("quark")

            );

            lista.push({

                nombre: "Bebida de Almendras",
                imagen: "images/almendras.png"

            });

        }

        if (usuario.alergias.includes("Gluten")) {

            lista.push({

                nombre: "Avena Sin Gluten",
                imagen: "images/avena_sg.png"

            });

        }

    }

    //------------------------------------------------------
    // ENFERMEDADES
    //------------------------------------------------------

    if (usuario.enfermedades) {

        if (usuario.enfermedades.includes("Diabetes")) {

            lista.push({

                nombre: "Stevia",
                imagen: "images/stevia.png"

            });

        }

        if (usuario.enfermedades.includes("Hipertensión")) {

            lista.push({

                nombre: "Sal Baja en Sodio",
                imagen: "images/sal.png"

            });

        }

        if (usuario.enfermedades.includes("Colesterol Alto")) {

            lista.push({

                nombre: "Aceite de Oliva",
                imagen: "images/aceite.png"

            });

        }

    }

    //------------------------------------------------------
    // SOLO MOSTRAR 4 PRODUCTOS
    //------------------------------------------------------

    lista = lista.slice(0, 4);

    //------------------------------------------------------
    // MOSTRAR EN EL HTML
    //------------------------------------------------------

    lista.forEach((producto, index) => {

        const numero = index + 1;

        const imagen = document.getElementById(`prod${numero}-img`);

        const texto = document.getElementById(`prod${numero}-texto`);

        if (imagen) {

            imagen.src = producto.imagen;

            imagen.alt = producto.nombre;

        }

        if (texto) {

            texto.textContent = producto.nombre;

        }

    });

}

//==========================================================
// FIN PARTE 5
//==========================================================
//==========================================================
// PARTE 6/15
// IMC INTELIGENTE
//==========================================================

//----------------------------------------------------------
// INICIALIZAR IMC
//----------------------------------------------------------

function inicializarIMC() {

    const peso = document.getElementById("input-peso");
    const altura = document.getElementById("input-altura");

    if (!peso || !altura) return;

    //------------------------------------------------------
    // Cargar datos del usuario
    //------------------------------------------------------

    peso.value = usuario.peso || "";

    altura.value = usuario.altura || "";

    //------------------------------------------------------
    // Calcular automáticamente
    //------------------------------------------------------

    calcularIMC();

    //------------------------------------------------------
    // Recalcular al escribir
    //------------------------------------------------------

    peso.addEventListener("input", calcularIMC);

    altura.addEventListener("input", calcularIMC);

}

//----------------------------------------------------------
// CALCULAR IMC
//----------------------------------------------------------

function calcularIMC() {

    const peso = parseFloat(document.getElementById("input-peso").value);

    const altura = parseFloat(document.getElementById("input-altura").value);

    const resultado = document.getElementById("resultado-imc");

    const detalle = document.getElementById("detalleIMC");

    const texto = document.getElementById("detalleIMCTexto");

    if (!resultado) return;

    //------------------------------------------------------

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {

        resultado.value = "";

        if (detalle) {

            detalle.style.display = "none";

        }

        return;

    }

    //------------------------------------------------------

    const alturaMetros = altura / 100;

    const imc = peso / (alturaMetros * alturaMetros);

    resultado.value = imc.toFixed(2);

    //------------------------------------------------------
    // CLASIFICACIÓN
    //------------------------------------------------------

    let estado = "";

    let recomendacion = "";

    if (imc < 18.5) {

        estado = "Bajo peso";

        recomendacion =
            "Se recomienda aumentar la ingesta calórica de forma saludable y acudir a una evaluación nutricional.";

    }

    else if (imc < 25) {

        estado = "Peso normal";

        recomendacion =
            "Excelente. Mantén una alimentación equilibrada y actividad física constante.";

    }

    else if (imc < 30) {

        estado = "Sobrepeso";

        recomendacion =
            "Se recomienda disminuir el consumo de azúcares y grasas, además de realizar ejercicio.";

    }

    else {

        estado = "Obesidad";

        recomendacion =
            "Es recomendable acudir a un profesional de nutrición y seguir un plan alimenticio personalizado.";

    }

    //------------------------------------------------------
    // DETALLE
    //------------------------------------------------------

    if (texto) {

        texto.innerHTML = `
            <strong>Clasificación:</strong> ${estado}<br><br>
            ${recomendacion}
        `;

    }

}

//----------------------------------------------------------
// BOTÓN VER DETALLE IMC
//----------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("btnCalcularIMC");

    const detalle = document.getElementById("detalleIMC");

    if (!boton || !detalle) return;

    boton.addEventListener("click", () => {

        calcularIMC();

        detalle.style.display = "block";

    });

});
//==========================================================
// PARTE 7/15
// MONITOREO CORPORAL
//==========================================================

//----------------------------------------------------------
// CARGAR HISTORIAL
//----------------------------------------------------------

function cargarMonitoreo() {

    monitoreo = getStorage("monitoreo") || [];

    if (monitoreo.length === 0) {

        return;

    }

    monitoreo.forEach((registro, indice) => {

        const f = indice + 1;

        if (f > 12) return;

        cargarCampo("fecha", f, registro.fecha);
        cargarCampo("peso", f, registro.peso);
        cargarCampo("talla", f, registro.talla);
        cargarCampo("abdomen", f, registro.abdomen);
        cargarCampo("cadera", f, registro.cadera);
        cargarCampo("muslo", f, registro.muslo);
        cargarCampo("brazo", f, registro.brazo);

    });

    actualizarResumenPeso();

}

//----------------------------------------------------------
// CARGAR UN CAMPO
//----------------------------------------------------------

function cargarCampo(campo, fila, valor) {

    const input = document.querySelector(

        `[data-campo="${campo}"][data-f="${fila}"]`

    );

    if (!input) return;

    input.value = valor || "";

}

//----------------------------------------------------------
// GUARDAR HISTORIAL
//----------------------------------------------------------

function guardarTablaMonitoreo() {

    monitoreo = [];

    for (let i = 1; i <= 12; i++) {

        monitoreo.push({

            fecha: obtenerValor("fecha", i),

            peso: obtenerValor("peso", i),

            talla: obtenerValor("talla", i),

            abdomen: obtenerValor("abdomen", i),

            cadera: obtenerValor("cadera", i),

            muslo: obtenerValor("muslo", i),

            brazo: obtenerValor("brazo", i)

        });

    }

    setStorage("monitoreo", monitoreo);

    actualizarResumenPeso();

    alert("Historial guardado correctamente.");

}

//----------------------------------------------------------
// OBTENER VALOR
//----------------------------------------------------------

function obtenerValor(campo, fila) {

    const input = document.querySelector(

        `[data-campo="${campo}"][data-f="${fila}"]`

    );

    if (!input) return "";

    return input.value;

}

//----------------------------------------------------------
// LIMPIAR HISTORIAL
//----------------------------------------------------------

function limpiarMonitoreo() {

    if (!confirm("¿Deseas borrar todo el historial?")) {

        return;

    }

    monitoreo = [];

    setStorage("monitoreo", monitoreo);

    document.querySelectorAll(".edit-cell").forEach(celda => {

        celda.value = "";

    });

    actualizarResumenPeso();

}

//----------------------------------------------------------
// RESUMEN DEL PESO
//----------------------------------------------------------

function actualizarResumenPeso() {

    const resumen = document.getElementById("resumenPeso");

    if (!resumen) return;

    const pesos = monitoreo
        .map(r => parseFloat(r.peso))
        .filter(p => !isNaN(p));

    if (pesos.length === 0) {

        resumen.innerHTML = `
            <strong>No existen registros de peso.</strong>
        `;

        return;

    }

    const inicial = pesos[0];

    const actual = pesos[pesos.length - 1];

    const diferencia = actual - inicial;

    let mensaje = "";

    if (diferencia > 0) {

        mensaje =
            `📈 Has aumentado ${diferencia.toFixed(1)} kg desde el primer control.`;

    }

    else if (diferencia < 0) {

        mensaje =
            `📉 Has disminuido ${Math.abs(diferencia).toFixed(1)} kg desde el primer control.`;

    }

    else {

        mensaje =
            `⚖️ Tu peso se mantiene estable.`;

    }

    resumen.innerHTML = `
        <strong>Peso inicial:</strong> ${inicial} kg<br>
        <strong>Peso actual:</strong> ${actual} kg<br><br>
        ${mensaje}
    `;

}

//----------------------------------------------------------
// GUARDADO AUTOMÁTICO
//----------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".edit-cell").forEach(input => {

        input.addEventListener("change", guardarTablaMonitoreo);

    });

});
//==========================================================
// PARTE 8/15
// CARRITO INTELIGENTE
//==========================================================

//----------------------------------------------------------
// INICIALIZAR CARRITO
//----------------------------------------------------------

function inicializarCarrito() {

    const listaProductos = document.getElementById("lista-1");
    const carritoHTML = document.querySelector("#lista-carrito tbody");
    const vaciarBtn = document.getElementById("vaciar-carrito");
    const iconoCarrito = document.getElementById("img-carrito");

    if (listaProductos) {

        listaProductos.addEventListener("click", agregarProducto);

    }

    if (carritoHTML) {

        carritoHTML.addEventListener("click", eliminarProducto);

    }

    if (vaciarBtn) {

        vaciarBtn.addEventListener("click", vaciarCarrito);

    }

    if (iconoCarrito) {

        iconoCarrito.addEventListener("click", mostrarOcultarCarrito);

    }

    actualizarCarrito();

}

//----------------------------------------------------------
// MOSTRAR / OCULTAR CARRITO
//----------------------------------------------------------

function mostrarOcultarCarrito(e) {

    e.preventDefault();

    const carritoUI = document.getElementById("carrito");

    if (!carritoUI) return;

    carritoVisible = !carritoVisible;

    carritoUI.style.display = carritoVisible ? "block" : "none";

}

//----------------------------------------------------------
// AGREGAR PRODUCTO
//----------------------------------------------------------

function agregarProducto(e) {

    e.preventDefault();

    if (!e.target.classList.contains("agregar-carrito")) return;

    const producto = e.target.parentElement.parentElement;

    leerProducto(producto);

}

//----------------------------------------------------------
// LEER PRODUCTO
//----------------------------------------------------------

function leerProducto(producto) {

    const info = {

        id: producto.querySelector(".agregar-carrito").dataset.id,

        nombre: producto.querySelector("h3").textContent,

        precio: producto.querySelector(".precio").textContent,

        imagen: producto.querySelector("img").src,

        cantidad: 1

    };

    const existe = carrito.find(item => item.id === info.id);

    if (existe) {

        existe.cantidad++;

    } else {

        carrito.push(info);

    }

    setStorage("carrito", carrito);

    actualizarCarrito();

}

//----------------------------------------------------------
// ACTUALIZAR TABLA
//----------------------------------------------------------

function actualizarCarrito() {

    limpiarTabla();

    const tbody = document.querySelector("#lista-carrito tbody");

    if (!tbody) return;

    carrito.forEach(producto => {

        const fila = document.createElement("tr");

        fila.innerHTML = `

            <td>
                <img src="${producto.imagen}" width="70">
            </td>

            <td>${producto.nombre}</td>

            <td>${producto.precio}</td>

            <td>${producto.cantidad}</td>

            <td>
                <a href="#"
                   class="borrar-producto"
                   data-id="${producto.id}">
                   X
                </a>
            </td>

        `;

        tbody.appendChild(fila);

    });

}

//----------------------------------------------------------
// ELIMINAR PRODUCTO
//----------------------------------------------------------

function eliminarProducto(e) {

    e.preventDefault();

    if (!e.target.classList.contains("borrar-producto")) return;

    const id = e.target.dataset.id;

    carrito = carrito.filter(producto => producto.id !== id);

    setStorage("carrito", carrito);

    actualizarCarrito();

}

//----------------------------------------------------------
// VACIAR CARRITO
//----------------------------------------------------------

function vaciarCarrito(e) {

    e.preventDefault();

    carrito = [];

    setStorage("carrito", carrito);

    actualizarCarrito();

}

//----------------------------------------------------------
// LIMPIAR TABLA
//----------------------------------------------------------

function limpiarTabla() {

    const tbody = document.querySelector("#lista-carrito tbody");

    if (!tbody) return;

    while (tbody.firstChild) {

        tbody.removeChild(tbody.firstChild);

    }

}
//==============================================================
// PARTE 9
// RECOMENDACIONES PERSONALIZADAS
//==============================================================

function renderizarRecomendaciones(usuario) {

    //------------------------------------------
    // OBJETIVO
    //------------------------------------------

    const objetivos = {
        bajar: {
            titulo: "🔻 Bajar de peso",
            detalle: "Se recomienda un déficit calórico moderado, consumir proteínas magras, verduras y realizar actividad física constante."
        },
        mantener: {
            titulo: "⚖️ Mantener peso",
            detalle: "Mantén una alimentación equilibrada y evita excesos de azúcar y grasas saturadas."
        },
        ganar: {
            titulo: "💪 Ganar masa muscular",
            detalle: "Incrementa el consumo de proteínas, carbohidratos complejos y realiza entrenamiento de fuerza."
        }
    };

    const actividad = {
        sedentario: {
            texto: "Actividad física muy baja.",
            detalle: "Procura caminar al menos 30 minutos diarios."
        },
        ligera: {
            texto: "Actividad ligera.",
            detalle: "Continúa aumentando gradualmente la intensidad."
        },
        moderada: {
            texto: "Actividad moderada.",
            detalle: "Excelente nivel para mantener una buena salud."
        },
        alta: {
            texto: "Actividad intensa.",
            detalle: "Asegura una correcta hidratación y recuperación."
        }
    };

    //------------------------------------------
    // OBJETIVO
    //------------------------------------------

    const cajaObjetivo = document.getElementById("recomendacionObjetivo");

    if (cajaObjetivo) {

        cajaObjetivo.innerHTML =
        `
            <strong>${objetivos[usuario.objetivo].titulo}</strong>
            <p>${objetivos[usuario.objetivo].detalle}</p>
        `;

    }

    //------------------------------------------
    // ACTIVIDAD
    //------------------------------------------

    const cajaActividad = document.getElementById("recomendacionActividad");

    if (cajaActividad) {

        cajaActividad.innerHTML =
        `
            <strong>${actividad[usuario.actividad].texto}</strong>
            <p>${actividad[usuario.actividad].detalle}</p>
        `;

    }

    //------------------------------------------
    // ALERGIAS
    //------------------------------------------

    const cajaAlergias = document.getElementById("recomendacionAlergias");

    if (cajaAlergias) {

        if (usuario.alergias.length === 0) {

            cajaAlergias.innerHTML =
            "<p>✅ No se registran alergias alimentarias.</p>";

        } else {

            cajaAlergias.innerHTML =
            `
                <ul>
                    ${usuario.alergias.map(a => `<li>${a}</li>`).join("")}
                </ul>
            `;

        }

    }

    //------------------------------------------
    // ENFERMEDADES
    //------------------------------------------

    const cajaSalud = document.getElementById("recomendacionEnfermedades");

    if (cajaSalud) {

        if (usuario.enfermedades.length === 0) {

            cajaSalud.innerHTML =
            "<p>✅ No se registran enfermedades.</p>";

        } else {

            cajaSalud.innerHTML =
            `
                <ul>
                    ${usuario.enfermedades.map(e => `<li>${e}</li>`).join("")}
                </ul>
            `;

        }

    }

}
//==============================================================
// PARTE 10
// PLAN NUTRICIONAL PERSONALIZADO
//==============================================================

function generarPlan(usuario) {

    let plan = {};

    //----------------------------------------------------------
    // SEGÚN EL OBJETIVO
    //----------------------------------------------------------

    switch (usuario.objetivo) {

        case "bajar":

            plan = {

                desayuno: "🥣 Avena con leche descremada y fruta.",
                media: "🍎 Manzana o pera.",
                almuerzo: "🍗 Pechuga de pollo con quinua y ensalada.",
                tarde: "🥜 Frutos secos.",
                cena: "🥗 Ensalada con atún."

            };

            break;

        case "ganar":

            plan = {

                desayuno: "🥚 Huevos revueltos con avena.",
                media: "🥤 Yogurt con granola.",
                almuerzo: "🥩 Carne magra con arroz integral.",
                tarde: "🍌 Batido de plátano.",
                cena: "🍗 Pollo con camote."

            };

            break;

        default:

            plan = {

                desayuno: "🍞 Pan integral con queso fresco.",
                media: "🍊 Fruta de estación.",
                almuerzo: "🍛 Menú balanceado.",
                tarde: "🥛 Yogurt natural.",
                cena: "🥗 Ensalada con pollo."

            };

    }

    //----------------------------------------------------------
    // AJUSTE POR ALERGIAS
    //----------------------------------------------------------

    if (usuario.alergias.includes("Lactosa")) {

        plan.desayuno = plan.desayuno.replace(
            "leche descremada",
            "bebida de almendras"
        );

        plan.media = "🍎 Fruta fresca.";

    }

    if (usuario.alergias.includes("Gluten")) {

        plan.desayuno = "🥣 Avena certificada sin gluten.";

    }

    if (usuario.alergias.includes("Huevo")) {

        plan.desayuno = plan.desayuno.replace(
            "Huevos revueltos",
            "Avena con frutas"
        );

    }

    if (usuario.alergias.includes("Mariscos")) {

        plan.cena = plan.cena.replace(
            "atún",
            "pollo"
        );

    }

    //----------------------------------------------------------
    // AJUSTE POR ENFERMEDADES
    //----------------------------------------------------------

    if (usuario.enfermedades.includes("Diabetes")) {

        plan.media = "🥒 Pepino o fruta con bajo índice glucémico.";

    }

    if (usuario.enfermedades.includes("Hipertensión")) {

        plan.almuerzo += " (Sin sal añadida).";

    }

    if (usuario.enfermedades.includes("Colesterol Alto")) {

        plan.cena = "🐟 Pescado al horno con verduras.";

    }

    //----------------------------------------------------------
    // MOSTRAR PLAN
    //----------------------------------------------------------

    asignarTexto("planDesayuno", plan.desayuno);

    asignarTexto("planMedia", plan.media);

    asignarTexto("planAlmuerzo", plan.almuerzo);

    asignarTexto("planTarde", plan.tarde);

    asignarTexto("planCena", plan.cena);

}
//==============================================================
// PARTE 11
// LISTAS DINÁMICAS DEL PLAN NUTRICIONAL
//==============================================================

function cargarListasPlan(usuario) {

    //----------------------------------------------------------
    // LISTAS BASE
    //----------------------------------------------------------

    let alimentosReducir = [
        "Bebidas azucaradas",
        "Comida rápida",
        "Frituras",
        "Harinas refinadas",
        "Dulces industriales"
    ];

    let recomendaciones = [
        "💧 Beber entre 2 y 2.5 litros de agua al día.",
        "🥗 Consumir verduras en cada almuerzo.",
        "🍎 Consumir frutas diariamente.",
        "🏃 Realizar actividad física regularmente.",
        "😴 Dormir entre 7 y 8 horas."
    ];

    let alinios = [
        "Aceite de oliva + limón",
        "Vinagre balsámico",
        "Yogurt natural con hierbas"
    ];

    //----------------------------------------------------------
    // AJUSTES POR OBJETIVO
    //----------------------------------------------------------

    if (usuario.objetivo === "bajar") {

        recomendaciones.push("🔥 Mantener un déficit calórico moderado.");
        recomendaciones.push("🚶 Caminar al menos 30 minutos diarios.");

    }

    if (usuario.objetivo === "mantener") {

        recomendaciones.push("⚖️ Mantener horarios regulares de alimentación.");

    }

    if (usuario.objetivo === "ganar") {

        recomendaciones.push("💪 Consumir proteínas después del entrenamiento.");
        recomendaciones.push("🥛 Aumentar ligeramente las calorías saludables.");

    }

    //----------------------------------------------------------
    // AJUSTES POR ENFERMEDADES
    //----------------------------------------------------------

    if (usuario.enfermedades.includes("Hipertensión")) {

        alimentosReducir.push("Sal");
        alimentosReducir.push("Embutidos");

    }

    if (usuario.enfermedades.includes("Diabetes")) {

        alimentosReducir.push("Azúcar refinada");
        alimentosReducir.push("Postres");

    }

    if (usuario.enfermedades.includes("Colesterol Alto")) {

        alimentosReducir.push("Grasas saturadas");
        alimentosReducir.push("Mantequilla");

    }

    //----------------------------------------------------------
    // MOSTRAR ALIMENTOS A REDUCIR
    //----------------------------------------------------------

    const reducir = document.getElementById("listaReducir");

    if (reducir) {

        reducir.innerHTML = "";

        alimentosReducir.forEach(item => {

            reducir.innerHTML += `<li>${item}</li>`;

        });

    }

    //----------------------------------------------------------
    // MOSTRAR RECOMENDACIONES
    //----------------------------------------------------------

    const consejos = document.getElementById("listaRecomendaciones");

    if (consejos) {

        consejos.innerHTML = "";

        recomendaciones.forEach(item => {

            consejos.innerHTML += `<li>${item}</li>`;

        });

    }

    //----------------------------------------------------------
    // MOSTRAR ALIÑOS
    //----------------------------------------------------------

    const aderezos = document.getElementById("listaAderezos");

    if (aderezos) {

        aderezos.innerHTML = "";

        alinios.forEach(item => {

            aderezos.innerHTML += `<li>${item}</li>`;

        });

    }

}
//==============================================================
// PARTE 12
// PRODUCTOS RECOMENDADOS
//==============================================================

function cargarProductosRecomendados(usuario) {

    //----------------------------------------------------------
    // BASE DE PRODUCTOS
    //----------------------------------------------------------

    const productos = {

        bajar: [
            {
                nombre: "Avena Integral",
                imagen: "images/avena.png"
            },
            {
                nombre: "Yogurt Griego Light",
                imagen: "images/skyr.png"
            },
            {
                nombre: "Quinua",
                imagen: "images/quinua.png"
            },
            {
                nombre: "Té Verde",
                imagen: "images/teverde.png"
            }
        ],

        mantener: [
            {
                nombre: "Yogurt Skyr",
                imagen: "images/skyr.png"
            },
            {
                nombre: "Queso Quark",
                imagen: "images/quark.png"
            },
            {
                nombre: "Vakimu Protein",
                imagen: "images/vakimu.png"
            },
            {
                nombre: "Plato Saludable",
                imagen: "images/plato.png"
            }
        ],

        ganar: [
            {
                nombre: "Proteína Whey",
                imagen: "images/proteina.png"
            },
            {
                nombre: "Mantequilla de Maní",
                imagen: "images/mani.png"
            },
            {
                nombre: "Granola",
                imagen: "images/granola.png"
            },
            {
                nombre: "Avena Premium",
                imagen: "images/avena.png"
            }
        ]

    };

    //----------------------------------------------------------
    // OBTENER LISTA SEGÚN OBJETIVO
    //----------------------------------------------------------

    let lista = [...(productos[usuario.objetivo] || productos.mantener)];

    //----------------------------------------------------------
    // AJUSTES POR ALERGIAS
    //----------------------------------------------------------

    if (usuario.alergias.includes("Lactosa")) {

        lista = lista.filter(producto =>
            !producto.nombre.toLowerCase().includes("yogurt") &&
            !producto.nombre.toLowerCase().includes("quark")
        );

        lista.push({
            nombre: "Bebida de Almendras",
            imagen: "images/almendras.png"
        });

    }

    if (usuario.alergias.includes("Gluten")) {

        lista.push({
            nombre: "Avena Sin Gluten",
            imagen: "images/avena_sg.png"
        });

    }

    //----------------------------------------------------------
    // AJUSTES POR ENFERMEDADES
    //----------------------------------------------------------

    if (usuario.enfermedades.includes("Diabetes")) {

        lista.push({
            nombre: "Stevia",
            imagen: "images/stevia.png"
        });

    }

    if (usuario.enfermedades.includes("Hipertensión")) {

        lista.push({
            nombre: "Sal Baja en Sodio",
            imagen: "images/sal.png"
        });

    }

    if (usuario.enfermedades.includes("Colesterol Alto")) {

        lista.push({
            nombre: "Aceite de Oliva",
            imagen: "images/aceite.png"
        });

    }

    //----------------------------------------------------------
    // MOSTRAR SOLO LOS PRIMEROS 4
    //----------------------------------------------------------

    lista = lista.slice(0, 4);

    lista.forEach((producto, index) => {

        const numero = index + 1;

        const imagen = document.getElementById(`prod${numero}-img`);
        const texto = document.getElementById(`prod${numero}-texto`);

        if (imagen) {

            imagen.src = producto.imagen;
            imagen.alt = producto.nombre;

        }

        if (texto) {

            texto.textContent = producto.nombre;

        }

    });

}
//==============================================================
// PARTE 13
// MONITOREO CORPORAL
//==============================================================

//--------------------------------------------------------------
// CARGAR HISTORIAL
//--------------------------------------------------------------

function cargarMonitoreo() {

    const historial = getStorage("monitoreo") || [];

    historial.forEach((registro, indice) => {

        const fila = indice + 1;

        if (fila > 12) return;

        asignarValorMonitoreo("fecha", fila, registro.fecha);
        asignarValorMonitoreo("peso", fila, registro.peso);
        asignarValorMonitoreo("talla", fila, registro.talla);
        asignarValorMonitoreo("abdomen", fila, registro.abdomen);
        asignarValorMonitoreo("cadera", fila, registro.cadera);
        asignarValorMonitoreo("muslo", fila, registro.muslo);
        asignarValorMonitoreo("brazo", fila, registro.brazo);

    });

    actualizarResumenPeso();

}

//--------------------------------------------------------------
// GUARDAR HISTORIAL
//--------------------------------------------------------------

function guardarTablaMonitoreo() {

    let historial = [];

    for (let i = 1; i <= 12; i++) {

        historial.push({

            fecha: obtenerValorMonitoreo("fecha", i),

            peso: obtenerValorMonitoreo("peso", i),

            talla: obtenerValorMonitoreo("talla", i),

            abdomen: obtenerValorMonitoreo("abdomen", i),

            cadera: obtenerValorMonitoreo("cadera", i),

            muslo: obtenerValorMonitoreo("muslo", i),

            brazo: obtenerValorMonitoreo("brazo", i)

        });

    }

    setStorage("monitoreo", historial);

    actualizarResumenPeso();

    alert("Historial de monitoreo guardado correctamente.");

}

//--------------------------------------------------------------
// OBTENER VALOR
//--------------------------------------------------------------

function obtenerValorMonitoreo(campo, fila) {

    const input = document.querySelector(
        `[data-campo="${campo}"][data-f="${fila}"]`
    );

    return input ? input.value : "";

}

//--------------------------------------------------------------
// ASIGNAR VALOR
//--------------------------------------------------------------

function asignarValorMonitoreo(campo, fila, valor) {

    const input = document.querySelector(
        `[data-campo="${campo}"][data-f="${fila}"]`
    );

    if (input) {

        input.value = valor || "";

    }

}

//--------------------------------------------------------------
// RESUMEN DEL PESO
//--------------------------------------------------------------

function actualizarResumenPeso() {

    const resumen = document.getElementById("resumenPeso");

    if (!resumen) return;

    const historial = getStorage("monitoreo") || [];

    const pesos = historial
        .map(item => parseFloat(item.peso))
        .filter(peso => !isNaN(peso));

    if (pesos.length === 0) {

        resumen.innerHTML =
            "<strong>Aún no existen registros de peso.</strong>";

        return;

    }

    const inicial = pesos[0];
    const actual = pesos[pesos.length - 1];
    const diferencia = (actual - inicial).toFixed(1);

    let mensaje = "";

    if (diferencia > 0) {

        mensaje = `Has aumentado ${diferencia} kg desde el primer control.`;

    } else if (diferencia < 0) {

        mensaje = `Has disminuido ${Math.abs(diferencia)} kg desde el primer control.`;

    } else {

        mensaje = "Tu peso se mantiene estable.";

    }

    resumen.innerHTML = `
        <strong>Peso inicial:</strong> ${inicial} kg<br>
        <strong>Peso actual:</strong> ${actual} kg<br>
        <strong>Resumen:</strong> ${mensaje}
    `;

}
//==============================================================
// PARTE 14
// CARRITO DE COMPRAS
//==============================================================

//--------------------------------------------------------------
// VARIABLES
//--------------------------------------------------------------

const carrito = document.getElementById("carrito");
const listaProductos = document.getElementById("lista-1");
const cuerpoCarrito = document.querySelector("#lista-carrito tbody");
const btnVaciar = document.getElementById("vaciar-carrito");

//--------------------------------------------------------------
// INICIALIZAR CARRITO
//--------------------------------------------------------------

function inicializarCarrito() {

    if (!listaProductos) return;

    listaProductos.addEventListener("click", agregarProducto);

    if (cuerpoCarrito) {

        cuerpoCarrito.addEventListener("click", eliminarProducto);

    }

    if (btnVaciar) {

        btnVaciar.addEventListener("click", vaciarCarrito);

    }

    actualizarCarritoVisual();

}

//--------------------------------------------------------------
// AGREGAR PRODUCTO
//--------------------------------------------------------------

function agregarProducto(e) {

    e.preventDefault();

    const boton = e.target.closest(".agregar-carrito");

    if (!boton) return;

    const producto = boton.parentElement.parentElement;

    leerProducto(producto);

}

//--------------------------------------------------------------
// LEER PRODUCTO
//--------------------------------------------------------------

function leerProducto(producto) {

    const info = {

        id: producto.querySelector(".agregar-carrito").dataset.id,

        nombre: producto.querySelector("h3").textContent,

        precio: producto.querySelector(".precio").textContent,

        imagen: producto.querySelector("img").src,

        cantidad: 1

    };

    if (carritoCompras[info.id]) {

        carritoCompras[info.id].cantidad++;

    } else {

        carritoCompras[info.id] = info;

    }

    guardarCarrito();

    actualizarCarritoVisual();

}

//--------------------------------------------------------------
// ACTUALIZAR TABLA
//--------------------------------------------------------------

function actualizarCarritoVisual() {

    if (!cuerpoCarrito) return;

    cuerpoCarrito.innerHTML = "";

    Object.values(carritoCompras).forEach(producto => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="60">
            </td>

            <td>${producto.nombre}</td>

            <td>${producto.precio}</td>

            <td>${producto.cantidad}</td>

            <td>
                <a href="#"
                   class="borrar-producto"
                   data-id="${producto.id}">
                   ✖
                </a>
            </td>
        `;

        cuerpoCarrito.appendChild(fila);

    });

}

//--------------------------------------------------------------
// ELIMINAR PRODUCTO
//--------------------------------------------------------------

function eliminarProducto(e) {

    e.preventDefault();

    if (!e.target.classList.contains("borrar-producto")) return;

    const id = e.target.dataset.id;

    delete carritoCompras[id];

    guardarCarrito();

    actualizarCarritoVisual();

}

//--------------------------------------------------------------
// VACIAR CARRITO
//--------------------------------------------------------------

function vaciarCarrito(e) {

    e.preventDefault();

    carritoCompras = {};

    guardarCarrito();

    actualizarCarritoVisual();

}

//--------------------------------------------------------------
// GUARDAR
//--------------------------------------------------------------

function guardarCarrito() {

    setStorage("carritoComedor", carritoCompras);

}
//==============================================================
// PARTE 15
// FUNCIONES FINALES E INICIALIZACIÓN
//==============================================================

//--------------------------------------------------------------
// VERIFICAR STOCK (SIMULADO)
//--------------------------------------------------------------

function verificarStockInicial() {

    document.querySelectorAll(".box").forEach(producto => {

        const boton = producto.querySelector(".agregar-carrito");

        if (!boton) return;

        boton.classList.remove("agotado");
        boton.textContent = "Agregar";

    });

}

//--------------------------------------------------------------
// BOTONES "VER DETALLES"
//--------------------------------------------------------------

function inicializarBotonesDetalles() {

    configurarDetalle(
        "btnObjetivo",
        "detalleObjetivo"
    );

    configurarDetalle(
        "btnActividad",
        "detalleActividad"
    );

    configurarDetalle(
        "btnAlergias",
        "detalleAlergias"
    );

    configurarDetalle(
        "btnHistorial",
        "detalleSalud"
    );

}

function configurarDetalle(idBoton, idDetalle) {

    const boton = document.getElementById(idBoton);
    const detalle = document.getElementById(idDetalle);

    if (!boton || !detalle) return;

    boton.addEventListener("click", function () {

        if (detalle.style.display === "block") {

            detalle.style.display = "none";
            boton.textContent = "Ver detalles";

        } else {

            detalle.style.display = "block";
            boton.textContent = "Ocultar";

        }

    });

}

//--------------------------------------------------------------
// EVENTOS DEL IMC
//--------------------------------------------------------------

function inicializarEventos() {

    const btnIMC = document.getElementById("btnCalcularIMC");

    if (btnIMC) {

        btnIMC.addEventListener("click", calcularIMC);

    }

}

//--------------------------------------------------------------
// RECARGAR DATOS DEL USUARIO
//--------------------------------------------------------------

function refrescarDashboard() {

    usuario = getStorage("usuario");

    if (!usuario) return;

    renderizarPerfil(usuario);

    renderizarRecomendaciones(usuario);

    generarPlan(usuario);

    cargarProductosRecomendados(usuario);

    inicializarIMC();

    cargarMonitoreo();

    actualizarCarritoVisual();

}

//--------------------------------------------------------------
// INICIALIZACIÓN GENERAL
//--------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    usuario = getStorage("usuario");

    if (!usuario) {

        alert("Debe completar primero el cuestionario.");

        window.location.href = "cuestionario.html";

        return;

    }

    renderizarPerfil(usuario);

    renderizarRecomendaciones(usuario);

    generarPlan(usuario);

    cargarProductosRecomendados(usuario);

    inicializarIMC();

    cargarMonitoreo();

    inicializarCarrito();

    verificarStockInicial();

    inicializarBotonesDetalles();

    inicializarEventos();

    actualizarCarritoVisual();

});

console.log("✅ Dashboard cargado correctamente.");