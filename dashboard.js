document.addEventListener("DOMContentLoaded", () => {

    const datos = JSON.parse(localStorage.getItem("usuario"));

    if (!datos) return;
        document.getElementById("input-nombre").value = datos.nombre || "";

        document.getElementById("input-codigo").value = datos.codigo || "";

        document.getElementById("input-carrera").value = datos.carrera || "";

        document.getElementById("input-sexo").value = datos.sexo || "";

        document.getElementById("input-peso").value = datos.peso || "";
        document.getElementById("input-altura").value = datos.altura || "";
        

    /*=========================
        OBJETIVO
    =========================*/

    const contenedor = document.getElementById("recomendacionObjetivo");

    switch(datos.objetivo){

        case "ganar":

            contenedor.innerHTML = `
                <h4>💪 Ganar masa muscular</h4>
                <p>Te recomendamos consumir alimentos ricos en proteínas.</p>
            `;
            break;

        case "bajar":

            contenedor.innerHTML = `
                <h4>🔥 Bajar de peso</h4>
                <p>Prioriza verduras y proteínas magras.</p>
            `;
            break;

        case "mantener":

            contenedor.innerHTML = `
                <h4>⚖️ Mantener peso</h4>
                <p>Mantén una alimentación equilibrada.</p>
            `;
            break;
    
            
    }
    /*==================================================
            DETALLE DEL OBJETIVO
==================================================*/

document.getElementById("btnObjetivo").addEventListener("click", function () {

    const detalle = document.getElementById("detalleObjetivo");
    const texto = document.getElementById("detalleObjetivoTexto");

    if (detalle.style.display === "block") {

        detalle.style.display = "none";
        this.textContent = "Ver detalles";
        return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) return;

    let informacion = "";

    switch (usuario.objetivo) {

        case "ganar":

            informacion = `
                <strong>💪 Objetivo: Ganar masa muscular</strong><br><br>

                Para aumentar la masa muscular es importante consumir una
                cantidad adecuada de proteínas, carbohidratos complejos y
                grasas saludables. Además, se recomienda realizar ejercicios
                de fuerza de manera constante.

                <br><br>

                <strong>Recomendaciones:</strong>

                <ul>
                    <li>✔ Consumir carnes magras, huevos y pescado.</li>
                    <li>✔ Incluir arroz, avena, papa y camote.</li>
                    <li>✔ Mantener una buena hidratación.</li>
                    <li>✔ Dormir entre 7 y 9 horas.</li>
                </ul>
            `;
            break;

        case "bajar":

            informacion = `
                <strong>🔥 Objetivo: Bajar de peso</strong><br><br>

                La pérdida de peso saludable se logra mediante una alimentación
                equilibrada y actividad física frecuente.

                <br><br>

                <strong>Recomendaciones:</strong>

                <ul>
                    <li>✔ Incrementar el consumo de frutas y verduras.</li>
                    <li>✔ Reducir bebidas azucaradas y frituras.</li>
                    <li>✔ Consumir proteínas magras.</li>
                    <li>✔ Realizar ejercicio regularmente.</li>
                </ul>
            `;
            break;

        case "mantener":

            informacion = `
                <strong>⚖️ Objetivo: Mantener el peso</strong><br><br>

                Mantener un peso saludable requiere conservar hábitos
                alimenticios adecuados y actividad física constante.

                <br><br>

                <strong>Recomendaciones:</strong>

                <ul>
                    <li>✔ Comer de forma balanceada.</li>
                    <li>✔ Evitar el exceso de azúcares.</li>
                    <li>✔ Mantener horarios regulares de alimentación.</li>
                    <li>✔ Realizar actividad física al menos 150 minutos por semana.</li>
                </ul>
            `;
            break;

        default:

            informacion = `
                <strong>No se encontró un objetivo registrado.</strong>
            `;
    }

    texto.innerHTML = informacion;

    detalle.style.display = "block";

    this.textContent = "Ocultar detalles";

});

    /*=========================
        ACTIVIDAD
    =========================*/

    const actividad = document.getElementById("recomendacionActividad");

    switch(datos.actividad){

        case "sedentario":

            actividad.innerHTML = `
                <h4>🪑 Actividad Sedentaria</h4>
                <p>Se recomienda comenzar con caminatas de 30 minutos.</p>
            `;
            break;

        case "ligera":

            actividad.innerHTML = `
                <h4>🚶 Actividad Ligera</h4>
                <p>Continúa realizando ejercicio regularmente.</p>
            `;
            break;

        case "moderada":

            actividad.innerHTML = `
                <h4>🏃 Actividad Moderada</h4>
                <p>Tu nivel de actividad es adecuado.</p>
            `;
            break;

        case "alta":

            actividad.innerHTML = `
                <h4>🏋️ Actividad Alta</h4>
                <p>Necesitas un mayor aporte energético.</p>
            `;
            break;
    }
    /*==================================================
        BOTÓN RENDIMIENTO
==================================================*/

document.getElementById("btnActividad").addEventListener("click", function () {

    const detalle = document.getElementById("detalleActividad");
    const texto = document.getElementById("detalleActividadTexto");

    if (detalle.style.display === "block") {

        detalle.style.display = "none";
        this.textContent = "Rendimiento";
        return;
    }

    let informacion = "";

    switch (datos.actividad) {

        case "sedentario":

            informacion = `
                <strong>🪑 Actividad Sedentaria</strong><br><br>

                Tu nivel de actividad física es bajo, por lo que es recomendable
                comenzar con ejercicios de intensidad ligera.

                <br><br>

                <strong>Recomendaciones:</strong>

                <ul>
                    <li>✔ Caminar 30 minutos al día.</li>
                    <li>✔ Levantarte y estirarte cada hora.</li>
                    <li>✔ Consumir una alimentación equilibrada.</li>
                    <li>✔ Mantener una adecuada hidratación.</li>
                </ul>
            `;
            break;

        case "ligera":

            informacion = `
                <strong>🚶 Actividad Ligera</strong><br><br>

                Mantienes una actividad física ocasional. Incrementarla
                progresivamente mejorará tu condición física.

                <br><br>

                <strong>Recomendaciones:</strong>

                <ul>
                    <li>✔ Realizar caminatas rápidas.</li>
                    <li>✔ Incorporar ejercicios de fuerza.</li>
                    <li>✔ Mantener horarios de descanso.</li>
                    <li>✔ Consumir suficientes proteínas.</li>
                </ul>
            `;
            break;

        case "moderada":

            informacion = `
                <strong>🏃 Actividad Moderada</strong><br><br>

                Tu nivel de actividad es adecuado para mantener una buena salud.

                <br><br>

                <strong>Recomendaciones:</strong>

                <ul>
                    <li>✔ Continúa con tu rutina.</li>
                    <li>✔ Mantén una buena hidratación.</li>
                    <li>✔ Consume carbohidratos complejos.</li>
                    <li>✔ Realiza estiramientos antes y después del ejercicio.</li>
                </ul>
            `;
            break;

        case "alta":

            informacion = `
                <strong>🏋️ Actividad Alta</strong><br><br>

                Tu gasto energético es elevado, por lo que necesitas una
                alimentación que cubra tus requerimientos nutricionales.

                <br><br>

                <strong>Recomendaciones:</strong>

                <ul>
                    <li>✔ Incrementar el consumo de proteínas.</li>
                    <li>✔ Consumir suficientes carbohidratos.</li>
                    <li>✔ Dormir entre 7 y 9 horas.</li>
                    <li>✔ Mantener una hidratación constante.</li>
                </ul>
            `;
            break;

        default:

            informacion = `
                <strong>No se encontró información sobre tu nivel de actividad física.</strong>
            `;
    }

    texto.innerHTML = informacion;

    detalle.style.display = "block";

    this.textContent = "Ocultar información";

});
   /*=========================
    ALERGIAS
=========================*/

const contenedorAlergias = document.getElementById("recomendacionAlergias");

if (!datos.alergias || datos.alergias.length === 0) {

    contenedorAlergias.innerHTML = `
        <h4>✅ No detectada </h4>
        <p>Puedes consumir el menú general del comedor universitario.</p>
    `;

} else {

    let html = `
        <h4>⚠️ Registrada</h4>
        <ul>
    `;

    datos.alergias.forEach(alergia => {

        switch (alergia) {

            case "Gluten":

                html += `<li><strong>Gluten:</strong> Evita pan, pasta y productos elaborados con trigo.</li>`;
                break;

            case "Lactosa":

                html += `<li><strong>Lactosa:</strong> Consume bebidas vegetales o productos deslactosados.</li>`;
                break;

            case "Mariscos":

                html += `<li><strong>Mariscos:</strong> Evita cualquier preparación que contenga mariscos.</li>`;
                break;

            case "Huevo":

                html += `<li><strong>Huevo:</strong> Revisa los ingredientes de panes, postres y mayonesas.</li>`;
                break;

            default:

                html += `<li><strong>${alergia}:</strong> Alergia registrada por el usuario.</li>`;

        }

    });

    html += `
        </ul>

        <p><strong>🍽️ El sistema adaptará las recomendaciones para evitar estos alimentos.</strong></p>
    `;

    contenedorAlergias.innerHTML = html;

    /*==================================================
            DETALLE DE ALERGIAS
==================================================*/

document.getElementById("btnAlergias").addEventListener("click", function () {

    const detalle = document.getElementById("detalleAlergias");
    const texto = document.getElementById("detalleAlergiasTexto");

    if (detalle.style.display === "block") {

        detalle.style.display = "none";
        this.textContent = "Alertas";
        return;

    }

    texto.innerHTML = `
        <strong>¿Qué son las alergias alimentarias?</strong><br><br>

        Las alergias alimentarias son reacciones del sistema inmunológico
        frente a determinados alimentos. Incluso una pequeña cantidad del
        alimento puede provocar síntomas que van desde leves hasta graves.
        <br><br>

        <strong>Recomendaciones:</strong>

        <ul>
            <li>✔ Lee siempre las etiquetas de los alimentos.</li>
            <li>✔ Evita consumir alimentos que contengan el alérgeno.</li>
            <li>✔ Consulta al personal del comedor sobre los ingredientes del menú.</li>
            <li>✔ Mantén informadas a las personas cercanas sobre tus alergias.</li>
            <li>✔ Ante una reacción grave, busca atención médica inmediatamente.</li>
        </ul>

        <strong>Importancia:</strong><br>

        El sistema del comedor utiliza esta información para personalizar las
        recomendaciones nutricionales y ayudarte a evitar alimentos que puedan
        afectar tu salud.
    `;

    detalle.style.display = "block";
    this.textContent = "Ocultar información";

});

}
/*=========================
    ENFERMEDADES
=========================*/

const contenedorEnfermedades = document.getElementById("recomendacionEnfermedades");

if (!datos.enfermedades || datos.enfermedades.length === 0) {

    contenedorEnfermedades.innerHTML = `
        <h4>✅ Sin enfermedades registradas</h4>

        <p>
            No se registraron enfermedades que requieran una alimentación
            especializada.
        </p>
    `;

} else {

    let html = `
        <h4>🏥 Registrada</h4>

        <ul>
    `;

    datos.enfermedades.forEach(enfermedad => {

        switch (enfermedad) {

            case "Diabetes":

                html += `
                    <li>
                        <strong>Diabetes:</strong>
                        Se recomienda reducir el consumo de azúcares simples,
                        bebidas azucaradas y postres. Prioriza alimentos
                        integrales y ricos en fibra.
                    </li>
                `;
                break;

            case "Hipertensión":

                html += `
                    <li>
                        <strong>Hipertensión:</strong>
                        Reduce el consumo de sal y alimentos procesados.
                        Incrementa frutas, verduras y agua.
                    </li>
                `;
                break;

            case "Colesterol Alto":

                html += `
                    <li>
                        <strong>Colesterol Alto:</strong>
                        Evita frituras y grasas saturadas. Consume pescado,
                        avena, frutas y verduras.
                    </li>
                `;
                break;

            default:

                html += `
                    <li>
                        <strong>${enfermedad}:</strong>
                        Condición registrada por el estudiante.
                    </li>
                `;

        }

    });

    html += `
        </ul>

        <p>
            <strong>
                🍎 El sistema tomará en cuenta estas condiciones para
                personalizar las recomendaciones nutricionales.
            </strong>
        </p>
    `;

    contenedorEnfermedades.innerHTML = html;

}
/*==================================================
        HISTORIAL DE SALUD
==================================================*/

document.getElementById("btnHistorial").addEventListener("click", function () {

    const detalle = document.getElementById("detalleSalud");
    const texto = document.getElementById("detalleSaludTexto");

    if (detalle.style.display === "block") {

        detalle.style.display = "none";
        this.textContent = "Historial";
        return;
    }

    let informacion = "";

    if (!datos.enfermedades || datos.enfermedades.length === 0) {

        informacion = `
            <strong>✅ Sin enfermedades registradas</strong><br><br>

            No se registraron enfermedades que requieran una alimentación
            especializada.

            <br><br>

            <strong>Recomendaciones:</strong>

            <ul>
                <li>✔ Mantener una alimentación equilibrada.</li>
                <li>✔ Consumir frutas y verduras diariamente.</li>
                <li>✔ Realizar actividad física de forma regular.</li>
                <li>✔ Acudir a controles médicos preventivos.</li>
            </ul>
        `;

    } else {

        informacion = `
            <strong>🏥 Historial de Salud</strong><br><br>

            <strong>Condiciones registradas:</strong>

            <ul>
        `;

        datos.enfermedades.forEach(enfermedad => {

            switch (enfermedad) {

                case "Diabetes":

                    informacion += `
                        <li>
                            <strong>Diabetes:</strong>
                            Controlar el consumo de azúcares simples y preferir alimentos ricos en fibra.
                        </li>
                    `;
                    break;

                case "Hipertensión":

                    informacion += `
                        <li>
                            <strong>Hipertensión:</strong>
                            Reducir el consumo de sal y alimentos procesados.
                        </li>
                    `;
                    break;

                case "Colesterol Alto":

                    informacion += `
                        <li>
                            <strong>Colesterol Alto:</strong>
                            Evitar grasas saturadas y aumentar el consumo de pescado, frutas y verduras.
                        </li>
                    `;
                    break;

                default:

                    informacion += `
                        <li>
                            <strong>${enfermedad}:</strong>
                            Condición registrada por el estudiante.
                        </li>
                    `;
            }

        });

        informacion += `
            </ul>

            <strong>🍎 Importancia</strong><br>

            Esta información permite que el sistema adapte las recomendaciones
            nutricionales y ayude a prevenir complicaciones relacionadas con tu
            estado de salud.
        `;
    }

    texto.innerHTML = informacion;

    detalle.style.display = "block";

    this.textContent = "Ocultar historial";

});
/*==========================================================
=            PRODUCTOS RECOMENDADOS                        =
==========================================================*/

function cargarProductos(objetivo) {

    let productos = [];

    switch (objetivo) {

        case "bajar":

            productos = [
                {img:"images/avena.png", nombre:"Avena Integral"},
                {img:"images/manzana.png", nombre:"Manzana"},
                {img:"images/pollo.png", nombre:"Pechuga de pollo"},
                {img:"images/agua.png", nombre:"Agua Mineral"}
            ];

            break;

        case "mantener":

            productos = [
                {img:"images/pan.png", nombre:"Pan Integral"},
                {img:"images/yogurt.png", nombre:"Yogurt Natural"},
                {img:"images/frutas.png", nombre:"Frutas"},
                {img:"images/arroz.png", nombre:"Arroz Integral"}
            ];

            break;

        case "ganar":

            productos = [
                {img:"images/huevo.png", nombre:"Huevos"},
                {img:"images/carne.png", nombre:"Carne Magra"},
                {img:"images/platano.png", nombre:"Plátano"},
                {img:"images/leche.png", nombre:"Leche"}
            ];

            break;

        default:

            productos = [
                {img:"images/frutas.png", nombre:"Frutas"},
                {img:"images/verduras.png", nombre:"Verduras"},
                {img:"images/agua.png", nombre:"Agua"},
                {img:"images/pollo.png", nombre:"Proteínas"}
            ];

    }

    for (let i = 0; i < 4; i++) {

        const img = document.getElementById(`prod${i+1}-img`);
        const texto = document.getElementById(`prod${i+1}-texto`);

        if (!img || !texto) continue;

        img.src = productos[i].img;
        img.alt = productos[i].nombre;
        texto.textContent = productos[i].nombre;
    }

}
/*==================================================
            PLAN NUTRICIONAL
==================================================*/

function cargarPlanNutricional(usuario){

    let desayuno = "";
    let media = "";
    let almuerzo = "";
    let tarde = "";
    let cena = "";

    switch(usuario.objetivo){

        case "bajar":

            desayuno = "Avena con leche descremada y una manzana.";
            media = "Yogurt natural bajo en grasa.";
            almuerzo = "Pechuga de pollo con arroz integral y ensalada.";
            tarde = "Fruta de temporada.";
            cena = "Ensalada con atún y verduras.";

        break;

        case "ganar":

            desayuno = "Huevos revueltos, avena y plátano.";
            media = "Yogurt griego con frutos secos.";
            almuerzo = "Carne magra, arroz y camote.";
            tarde = "Sándwich integral con pollo.";
            cena = "Pescado con puré y verduras.";

        break;

        case "mantener":

            desayuno = "Pan integral con queso y fruta.";
            media = "Frutos secos.";
            almuerzo = "Pollo a la plancha con arroz y ensalada.";
            tarde = "Yogurt natural.";
            cena = "Crema de verduras con tortilla.";

        break;

        default:

            desayuno = "Desayuno saludable.";
            media = "Fruta.";
            almuerzo = "Almuerzo balanceado.";
            tarde = "Snack saludable.";
            cena = "Cena ligera.";

    }

    /*=====================================
        ADAPTAR POR ACTIVIDAD FÍSICA
    =====================================*/

    if(usuario.actividad==="alta"){

        desayuno += " Agrega una porción extra de avena.";
        almuerzo += " Incrementa la porción de arroz.";
        cena += " Incluye una fruta.";

    }

    if(usuario.actividad==="sedentario"){

        almuerzo += " Reduce las frituras.";
        cena += " Prefiere verduras.";

    }

    /*=====================================
        DIABETES
    =====================================*/

    if(usuario.enfermedades.includes("Diabetes")){

        desayuno = desayuno.replace("plátano","manzana");

        media = "Yogurt sin azúcar.";

        tarde = "Fruta baja en azúcar.";

    }

    /*=====================================
        HIPERTENSIÓN
    =====================================*/

    if(usuario.enfermedades.includes("Hipertensión")){

        almuerzo += " Sin sal añadida.";

        cena += " Baja en sodio.";

    }

    /*=====================================
        COLESTEROL
    =====================================*/

    if(usuario.enfermedades.includes("Colesterol Alto")){

        desayuno += " Evita mantequilla.";

        almuerzo = almuerzo.replace("Carne","Pescado");

    }

    /*=====================================
        ALERGIAS
    =====================================*/

    if(usuario.alergias.includes("Lactosa")){

        desayuno = desayuno.replace("leche","bebida vegetal");

        media = "Fruta.";

    }

    if(usuario.alergias.includes("Gluten")){

        desayuno = desayuno.replace("Pan integral","Pan sin gluten");

    }

    if(usuario.alergias.includes("Huevo")){

        desayuno = desayuno.replace("Huevos revueltos","Avena");

    }

    document.getElementById("planDesayuno").textContent = desayuno;
    document.getElementById("planMedia").textContent = media;
    document.getElementById("planAlmuerzo").textContent = almuerzo;
    document.getElementById("planTarde").textContent = tarde;
    document.getElementById("planCena").textContent = cena;

}
cargarProductos(datos.objetivo);

cargarPlanNutricional(datos);


});
/*=========================================
        MONITOREO CORPORAL
=========================================*/

function guardarTablaMonitoreo(){

    const monitoreo = {};

    document.querySelectorAll(".edit-cell").forEach(input=>{

        const campo = input.dataset.campo;
        const fila = input.dataset.f;

        if(!monitoreo[fila]){
            monitoreo[fila]={};
        }

        monitoreo[fila][campo]=input.value;

    });

    localStorage.setItem(
        "monitoreoCorporal",
        JSON.stringify(monitoreo)
    );

    alert("Historial guardado");
}

function cargarTablaMonitoreo(){

    const monitoreo=JSON.parse(localStorage.getItem("monitoreoCorporal"));

    if(!monitoreo) return;

    document.querySelectorAll(".edit-cell").forEach(input=>{

        const campo=input.dataset.campo;
        const fila=input.dataset.f;

        if(monitoreo[fila]){
            input.value=monitoreo[fila][campo] || "";
        }

    });

}

document.addEventListener("DOMContentLoaded", cargarTablaMonitoreo);

/*==================================================
                    IMC
==================================================*/

function calcularIMC() {

    const peso = parseFloat(document.getElementById("imc-peso").value);
    const altura = parseFloat(document.getElementById("imc-altura").value);

    const resultado = document.getElementById("resultado-imc");
    const detalle = document.getElementById("detalleIMC");
    const texto = document.getElementById("detalleIMCTexto");

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {

        alert("Ingrese un peso y una altura válidos.");

        resultado.value = "";
        detalle.style.display = "none";

        return;
    }

    // Cálculo del IMC
    const alturaMetros = altura / 100;
    const imc = peso / (alturaMetros * alturaMetros);

    resultado.value = imc.toFixed(2);

    let categoria = "";
    let recomendacion = "";

    if (imc < 18.5) {

        categoria = "Bajo peso";
        recomendacion = "Se recomienda aumentar el consumo de alimentos nutritivos y ricos en proteínas.";

    } else if (imc < 25) {

        categoria = "Peso normal";
        recomendacion = "Mantén una alimentación equilibrada y continúa realizando actividad física.";

    } else if (imc < 30) {

        categoria = "Sobrepeso";
        recomendacion = "Reduce el consumo de azúcares y grasas, e incrementa la actividad física.";

    } else if (imc < 35) {

        categoria = "Obesidad grado I";
        recomendacion = "Es recomendable acudir a un nutricionista para recibir un plan alimenticio.";

    } else if (imc < 40) {

        categoria = "Obesidad grado II";
        recomendacion = "Existe un riesgo elevado para la salud. Se recomienda atención médica.";

    } else {

        categoria = "Obesidad grado III";
        recomendacion = "Se recomienda atención médica especializada y seguimiento profesional.";

    }

    // Mostrar información

    detalle.style.display = "block";

    texto.innerHTML = `
        <strong>✔ Cálculo realizado correctamente</strong><br><br>

        <strong>Peso:</strong> ${peso} kg<br>
        <strong>Altura:</strong> ${altura} cm<br><br>

        <strong>Resultado del IMC:</strong> ${imc.toFixed(2)}<br>

        <strong>Clasificación:</strong> ${categoria}<br><br>

        <strong>Recomendación:</strong><br>

        ${recomendacion}
    `;

    // Guardar datos actualizados

    let usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {

        usuario.peso = peso;
        usuario.altura = altura;
        usuario.imc = imc.toFixed(2);
        usuario.clasificacionIMC = categoria;

        localStorage.setItem("usuario", JSON.stringify(usuario));

    }

}
/*=========================================
        GUARDAR PERFIL
=========================================*/



function guardarCambios() {

    let usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        usuario = {};
    }

    usuario.nombre = document.getElementById("input-nombre").value.trim();
    usuario.codigo = document.getElementById("input-codigo").value.trim();
    usuario.carrera = document.getElementById("input-carrera").value.trim();
    usuario.sexo = document.getElementById("input-sexo").value.trim();
    usuario.peso = parseFloat(document.getElementById("input-peso").value) || 0;
    usuario.altura = parseFloat(document.getElementById("input-altura").value) || 0;

    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("✅ Perfil guardado correctamente");
}

/*=========================================
        CARRITO GENERAL
=========================================*/

const carritoBody = document.querySelector("#lista-carrito tbody");
const btnVaciar = document.getElementById("vaciar-carrito");

let carrito = [];

/*=========================================
        INICIALIZAR
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    cargarCarrito();

    activarMenuComidas();

    activarPremium();

});



/*=========================================
        MENÚ DESAYUNO - ALMUERZO - CENA
=========================================*/

function activarMenuComidas(){

    const botones = document.querySelectorAll(".add-to-cart");

    botones.forEach((boton,index)=>{

        boton.addEventListener("click",function(e){

            e.preventDefault();

            const card=this.closest(".breakfast-1,.lunch-1,.dinner-1");

            if(!card) return;

            agregarProducto({

                id:"menu"+index,

                nombre:card.querySelector("h3").textContent,

                precio:card.querySelector(".price").textContent,

                imagen:card.querySelector("img").src

            });

        });

    });

}



/*=========================================
        PRODUCTOS PREMIUM
=========================================*/

function activarPremium(){

    const contenedor = document.querySelector("#productos");

    if(!contenedor) return;

    contenedor.addEventListener("click",function(e){

        e.preventDefault();

        if(!e.target.classList.contains("agregar-carrito")) return;

        const card=e.target.closest(".box");

        if(!card) return;

        agregarProducto({

            id:e.target.dataset.id,

            nombre:card.querySelector("h3").textContent,

            precio:card.querySelector(".precio").textContent,

            imagen:card.querySelector("img").src

        });

    });

}



/*=========================================
        AGREGAR PRODUCTO
=========================================*/

function agregarProducto(producto){

    const existe=carrito.find(item=>item.id===producto.id);

    if(existe){

        existe.cantidad++;

    }else{

        producto.cantidad=1;

        carrito.push(producto);

    }

    mostrarCarrito();

}



/*=========================================
        MOSTRAR CARRITO
=========================================*/

function mostrarCarrito(){

    carritoBody.innerHTML="";

    carrito.forEach(producto=>{

        const fila=document.createElement("tr");

        fila.innerHTML=`

            <td>

                <img src="${producto.imagen}" width="70">

            </td>

            <td>${producto.nombre}</td>

            <td>${producto.precio}</td>

            <td>

                ${producto.cantidad}

                <br><br>

                <button
                    class="eliminar"
                    data-id="${producto.id}">
                    ❌
                </button>

            </td>

        `;

        carritoBody.appendChild(fila);

    });

    guardarCarrito();

}



/*=========================================
        ELIMINAR
=========================================*/

if(carritoBody){

carritoBody.addEventListener("click",function(e){

    if(!e.target.classList.contains("eliminar")) return;

    const id=e.target.dataset.id;

    const indice=carrito.findIndex(item=>item.id===id);

    if(indice==-1) return;

    if(carrito[indice].cantidad>1){

        carrito[indice].cantidad--;

    }else{

        carrito.splice(indice,1);

    }

    mostrarCarrito();

});

}



/*=========================================
        VACIAR
=========================================*/

if(btnVaciar){

btnVaciar.addEventListener("click",function(e){

    e.preventDefault();

    carrito=[];

    mostrarCarrito();

});

}



/*=========================================
        GUARDAR
=========================================*/

function guardarCarrito(){

    localStorage.setItem(

        "carritoPremium",

        JSON.stringify(carrito)

    );

}



/*=========================================
        CARGAR
=========================================*/

function cargarCarrito(){

    const datos=JSON.parse(

        localStorage.getItem("carritoPremium")

    );

    if(datos){

        carrito=datos;

        mostrarCarrito();

    }

}
/*=========================================
        CARGAR MÁS / MENOS PRODUCTOS
=========================================*/

const btnLoadMore = document.getElementById("load-more");
const productosExtra = document.getElementById("productos-extra");

if (btnLoadMore && productosExtra) {

    btnLoadMore.addEventListener("click", function () {

        if (productosExtra.style.display === "grid") {

            // Ocultar productos
            productosExtra.style.display = "none";
            btnLoadMore.textContent = "Cargar más";

        } else {

            // Mostrar productos
            productosExtra.style.display = "grid";
            btnLoadMore.textContent = "Mostrar menos";

        }

    });

}
/*=========================================
        MÁS INFORMACIÓN HERO
=========================================*/

function mostrarInformacion(){

    const info = document.getElementById("infoExtra");

    const boton = document.querySelector(".header-txt .btn-1");

    if(info.style.display === "block"){

        info.style.display = "none";

        boton.textContent = "Más información";

    }else{

        info.style.display = "block";

        boton.textContent = "Ocultar información";

        info.scrollIntoView({

            behavior:"smooth",

            block:"nearest"

        });

    }

}
/*=========================================
    INFORMACIÓN DEL COMEDOR
=========================================*/

function mostrarInfoComedor(boton){

    const info = document.getElementById("infoComedor");

    if(info.style.display === "block"){

        info.style.display = "none";

        boton.textContent = "Más información";

    }else{

        info.style.display = "block";

        boton.textContent = "Ocultar información";

        info.scrollIntoView({

            behavior:"smooth",

            block:"nearest"

        });

    }

}
