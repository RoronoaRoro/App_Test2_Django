let buttonTheme = document.getElementById('bd-theme');  
// Se obtienen elementos body y todos aquellos cuyo formato debe cambiar acorde al modo actual
let body = document.body;
let sidebar = document.getElementById('Sidebar'); // Barra lateral
let main = document.getElementById("main"); // Contenido de la página como tal (todo lo ajeno al sidebar)
let topdiv = document.getElementById('topdiv'); // Zona correspondiente al div del botón de abrir la sidebar
let boton = document.getElementById('boton'); // Botón para abrir sidebar
let header_saldo= document.getElementById('header'); // Header del saldo
let header_borde = document.getElementById('borde_header'); // Borde del saldo
let header_texto = document.getElementById('texto_header'); // Texto del saldo
let username = document.getElementById('nameuser'); // Texto del usuario
let pagename = document.getElementById('pagename'); // Texto del nombre de la página
let boton_cierre = document.getElementById('boton_cierre'); // Botón para cerrar sidebar
let linea = document.getElementById('linea'); // Línea divisora (<hr>)
let texto_gradiente = document.querySelectorAll('.gradient-text'); // Clase para modificar color de texto de agregar y ver transacciones en sidebar
let texto_normal = document.querySelectorAll('.normal-text'); // Clase para modificar color de texto adicional de la sidebar
let sidebackground = document.querySelectorAll('.sidebackground'); // Clase para modificar fondo de agregar y ver transacciones de sidebar
let modificadores = document.querySelectorAll('.modificadores');
let seleccionadores = document.querySelectorAll('.seleccionadores');
let ths = document.querySelectorAll('.ths');
// Se crea un observador de atributos para el botón
const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        // Se ve si el atributo cambiado es aria-label
        if (mutation.attributeName === 'aria-label') {
            // Se obtiene el nuevo valor del atributo aria-label
            const theme = buttonTheme.getAttribute('aria-label');        
            // Dependiendo del tema, se ajustan color de fondo y de elementos
            if (theme === 'Toggle theme (dark)') {
                sidebar.style.background = 'linear-gradient(360deg, #581D00 , rgb(33, 37, 41))';  
                boton.style.background = 'linear-gradient(to right, #581D00 , rgb(33, 37, 41))';              
                header_saldo.style.background='linear-gradient(360deg, #581D00 , rgb(33, 37, 41))';
                header_borde.style.border='2px solid #360808e3';
                header_texto.style.color='rgb(173, 181, 189)';
                main.style.background= 'linear-gradient(to right, rgb(33, 37, 41), rgb(33, 37, 41))';
                // Recorre todos los elementos con la clase gradient-text y modifica el color
                texto_gradiente.forEach(function(elemento) {
                    elemento.style.color = 'white';
                });
                texto_normal.forEach(function(elemento) {
                    elemento.style.color = 'white';
                });
                sidebackground.forEach(function(elemento) {
                    elemento.style.backgroundColor = '#818181';
                });
                modificadores.forEach(function(elemento) {
                    elemento.classList.remove('modificar');
                    elemento.classList.add('modificar_oscuro');
                });
                seleccionadores.forEach(function(elemento) {
                    elemento.classList.remove('seleccionador');
                    elemento.classList.add('seleccionador_oscuro');
                });
                ths.forEach(function(elemento) {
                    elemento.style.background = 'linear-gradient(360deg, #581D00 , rgb(33, 37, 41))';
                });
                boton_cierre.style.color = '#ffffff';
                linea.style.color = 'rgb(173, 181, 189)';
                linea.style.opacity = '0.25';
            } 
            else {
                sidebar.style.background = 'linear-gradient(180deg, #ff3131, #ff914d)';
                boton.style.background = 'linear-gradient(to right, #ff3131, #ff914d)';
                topdiv.style.background = 'linear-gradient(to right, rgb(33, 37, 41), rgb(33, 37, 41))';
                header_saldo.style.background='linear-gradient(360deg, #ff3131, #ff914d)';
                header_borde.style.border='2px solid #d66134';
                header_texto.style.color='white';
                main.style.background = 'rgb(255,255,255)';
                texto_gradiente.forEach(function(elemento) {
                    elemento.style.color = '#ff5900d7';
                });
                texto_normal.forEach(function(elemento) {
                    elemento.style.color = '#ffffff';
                });
                sidebackground.forEach(function(elemento) {
                    elemento.style.backgroundColor = 'white';
                });
                modificadores.forEach(function(elemento) {
                    elemento.classList.remove('modificar_oscuro');
                    elemento.classList.add('modificar');
                });
                seleccionadores.forEach(function(elemento) {
                    elemento.classList.remove('seleccionador_oscuro');
                    elemento.classList.add('seleccionador');
                });
                ths.forEach(function(elemento) {
                    elemento.style.background = 'linear-gradient(180deg, #ff3131, #ff914d)';
                });
                boton_cierre.style.color = '#111';
                linea.style.color = 'white';
                linea.style.opacity = '0.75';
            }
        }
    }
});
// Se observan cambios en el atributo aria-label del botón
observer.observe(buttonTheme, { attributes: true });
applyThemeStyle();
// Función para aplicar estilo según el valor inicial del atributo aria-label
function applyThemeStyle() {
    const theme = buttonTheme.getAttribute('aria-label');
    if (theme === 'Toggle theme (dark)') {
        sidebar.style.background = 'linear-gradient(360deg, #581D00 , rgb(33, 37, 41))';
        boton.style.background = 'linear-gradient(to right, #581D00 , rgb(33, 37, 41))';      
        header_saldo.style.background='linear-gradient(360deg, #581D00 , rgb(33, 37, 41))';
        header_borde.style.border='2px solid #360808e3';
        header_texto.style.color='rgb(173, 181, 189)';
        main.style.background= 'linear-gradient(to right, rgb(33, 37, 41), rgb(33, 37, 41))';
        texto_gradiente.forEach(function(elemento) {
            elemento.style.color = 'white';
        });
        texto_normal.forEach(function(elemento) {
            elemento.style.color = 'white';
        });
        sidebackground.forEach(function(elemento) {
            elemento.style.backgroundColor = '#818181';
        });
        modificadores.forEach(function(elemento) {
            elemento.classList.remove('modificar');
            elemento.classList.add('modificar_oscuro');
        });
        seleccionadores.forEach(function(elemento) {
            elemento.classList.remove('seleccionador');
            elemento.classList.add('seleccionador_oscuro');
        });
        ths.forEach(function(elemento) {
            elemento.style.background = 'linear-gradient(360deg, #581D00 , rgb(33, 37, 41))';
        });
        boton_cierre.style.color = '#ffffff';
        linea.style.color = 'rgb(173, 181, 189)';
        linea.style.opacity = '0.25';
    } 
    else {
        sidebar.style.background = 'linear-gradient(180deg, #ff3131, #ff914d)';
        boton.style.background = 'linear-gradient(to right, #ff3131, #ff914d)';
        topdiv.style.background = 'linear-gradient(to right, rgb(33, 37, 41), rgb(33, 37, 41))';
        header_saldo.style.background='linear-gradient(360deg, #ff3131, #ff914d)';
        header_borde.style.border='2px solid #d66134';
        header_texto.style.color='white';
        main.style.background = 'rgb(255,255,255)';
        texto_gradiente.forEach(function(elemento) {
            elemento.style.color = '#ff5900d7';
        });    
        texto_normal.forEach(function(elemento) {
            elemento.style.color = '#ffffff';
        });
        sidebackground.forEach(function(elemento) {
            elemento.style.backgroundColor = 'white';
        });
        modificadores.forEach(function(elemento) {
            elemento.classList.remove('modificar_oscuro');
            elemento.classList.add('modificar');
        });
        seleccionadores.forEach(function(elemento) {
            elemento.classList.remove('seleccionador_oscuro');
            elemento.classList.add('seleccionador');
        });
        ths.forEach(function(elemento) {
            elemento.style.background = 'linear-gradient(180deg, #ff3131, #ff914d)';
        });
        boton_cierre.style.color = '#111';
        linea.style.color = 'white';
        linea.style.opacity = '0.75';
    }
}

//Envio del formulario
function submitForm() {
    document.getElementById('filtro-form').submit();
}

//Función para resetear los filtros
function resetFilters() {
    document.getElementById('tipo_filtro').value = "";
    document.getElementById('categoria_filtro').value = "";
    document.getElementById('fecha_inicio').value = "";
    document.getElementById('fecha_fin').value = "";
    submitForm();
}

//Eliminar las transacciones por las checkboxes
function deleteTransactions() {
    const checkboxes = document.querySelectorAll('input[name="transaction_ids"]:checked');
    const transactionIds = Array.from(checkboxes).map(checkbox => checkbox.value);
    if (transactionIds.length === 0) {
        Swal.fire({
            title: 'Atención',
            text: 'Selecciona al menos una transacción para borrar.',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Entendido',
        })
        return;
    }
    
    Swal.fire({
        title: '¿Confirmas?',
        text: '¿Estás seguro de que deseas borrar las transacciones seleccionadas?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, quiero borrarlas',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const form = document.getElementById('filtro-form');
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'delete_ids';
            hiddenInput.value = JSON.stringify(transactionIds);
            form.appendChild(hiddenInput);
            form.submit();
        }
    });
}

//Aplica el filtro de las fechas 
function applyDateFilter() {
    submitForm();
}

//Marca todas las checkboxes
function selectAllTransactions() {
    const checkboxes = document.querySelectorAll('input[name="transaction_ids"]');
    checkboxes.forEach(checkbox => checkbox.checked = true);
}

//Desmarca todas las checkboxes
function deselectAllTransactions() {
    const checkboxes = document.querySelectorAll('input[name="transaction_ids"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("Sidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("boton").style.display = "none";
}
  
/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("Sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("boton").style.display = "block";
}