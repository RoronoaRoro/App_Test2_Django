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
        boton_cierre.style.color = '#111';
        linea.style.color = 'white';
        linea.style.opacity = '0.75';
    }
}