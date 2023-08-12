let buttonTheme = document.getElementById('bd-theme');  
// Se obtienen elementos body y todos aquellos cuyo formato debe cambiar acorde al modo actual
let body = document.body;
let topdiv = document.getElementById('topdiv'); // Zona correspondiente al div del botón de abrir la sidebar
let boton = document.getElementById('boton'); // Botón para abrir sidebar
let header_saldo= document.getElementById('header'); // Header del saldo
let header_borde = document.getElementById('borde_header'); // Borde del saldo
let inputs = document.querySelectorAll('.inputs'); // Cajas de inputs
// Se crea un observador de atributos para el botón
const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        // Se ve si el atributo cambiado es aria-label
        if (mutation.attributeName === 'aria-label') {
            // Se obtiene el nuevo valor del atributo aria-label
            const theme = buttonTheme.getAttribute('aria-label');        
            // Dependiendo del tema, se ajustan color de fondo y de elementos
            if (theme === 'Toggle theme (dark)') { 
                boton.style.background = 'linear-gradient(to right, #581D00 , rgb(33, 37, 41))';              
                header_saldo.style.background='linear-gradient(360deg, #581D00 , rgb(33, 37, 41))';
                header_borde.style.border='2px solid #360808e3';
                inputs.forEach(function(elemento) {
                    elemento.style.border = '1px solid rgb(73, 80, 87) !important';
                });
            } 
            else {
                boton.style.background = 'linear-gradient(to right, #ff3131, #ff914d)';
                topdiv.style.background = 'linear-gradient(to right, rgb(33, 37, 41), rgb(33, 37, 41))';
                header_saldo.style.background='linear-gradient(360deg, #ff3131, #ff914d)';
                header_borde.style.border='2px solid #d66134';
                inputs.forEach(function(elemento) {
                    elemento.style.border = '1px solid black !important';
                });
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
        boton.style.background = 'linear-gradient(to right, #581D00 , rgb(33, 37, 41))';      
        header_saldo.style.background='linear-gradient(360deg, #581D00 , rgb(33, 37, 41))';
        header_borde.style.border='2px solid #360808e3';
        inputs.forEach(function(elemento) {
            elemento.style.border = '1px solid rgb(73, 80, 87) !important';
        });
        
    } 
    else {
        boton.style.background = 'linear-gradient(to right, #ff3131, #ff914d)';
        topdiv.style.background = 'linear-gradient(to right, rgb(33, 37, 41), rgb(33, 37, 41))';
        header_saldo.style.background='linear-gradient(360deg, #ff3131, #ff914d)';
        header_borde.style.border='2px solid #d66134';
        inputs.forEach(function(elemento) {
            elemento.style.border = '1px solid black !important';
        });
    }
}