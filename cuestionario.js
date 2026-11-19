/**
 * ==========================================================
 * SISTEMA DE COMEDOR UNIVERSITARIO
 * cuestionario.js
 * ==========================================================
 * Guarda la información del estudiante para ser utilizada
 * posteriormente por tt.html (dashboard).
 * ==========================================================
 */

"use strict";

/*==========================================================
=            INICIALIZACIÓN                                =
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formulario");

    if (!formulario) return;

    formulario.addEventListener("submit", guardarFormulario);

});


/*==========================================================
=            GUARDAR FORMULARIO                            =
==========================================================*/

function guardarFormulario(evento) {

    evento.preventDefault();

    // =========================
    // ALERGIAS
    // =========================

    const alergias = [];

    document.querySelectorAll(".alergia:checked").forEach(item => {

        alergias.push(item.value);

    });

    const otraAlergia = document
        .getElementById("alergia_otra")
        .value
        .trim();

    if (otraAlergia !== "") {

        alergias.push(otraAlergia);

    }

    // =========================
    // ENFERMEDADES
    // =========================

    const enfermedades = [];

    document.querySelectorAll(".enfermedad:checked").forEach(item => {

        enfermedades.push(item.value);

    });

    const otraEnfermedad = document
        .getElementById("enfermedad_otra")
        .value
        .trim();

    if (otraEnfermedad !== "") {

        enfermedades.push(otraEnfermedad);

    }

    // =========================
    // OBJETO DEL USUARIO
    // =========================

    const usuario = {

        nombre:
            obtenerValor("nombre"),

        carrera:
            obtenerValor("carrera"),

        codigo:
            obtenerValor("codigo"),

        sexo:
            obtenerValor("sexo"),

        peso:
            convertirNumero("peso"),

        altura:
            convertirNumero("altura"),

        objetivo:
            obtenerValor("objetivo"),

        actividad:
            obtenerValor("actividad"),

        // Se podrán editar en el dashboard


        edad: "",

        preferencia: "",

        otros: "",

        alergias,

        enfermedades,

        fechaRegistro:
            new Date().toISOString()

    };

    // =========================
    // GUARDAR
    // =========================

    localStorage.setItem(

        "usuario",

        JSON.stringify(usuario)

    );

    // =========================
    // IR AL DASHBOARD
    // =========================

    window.location.href = "tt.html";

}


/*==========================================================
=            FUNCIONES AUXILIARES                          =
==========================================================*/

function obtenerValor(id) {

    const elemento = document.getElementById(id);

    if (!elemento) return "";

    return elemento.value.trim();

}


function convertirNumero(id) {

    const valor = parseFloat(obtenerValor(id));

    return isNaN(valor) ? 0 : valor;

}