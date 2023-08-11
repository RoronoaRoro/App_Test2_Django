// Código para confirmaciones de modificación y eliminación
let erroresInput = document.getElementById('errores');
let errores = erroresInput.value;  // Se obtienen errores del form   
document.getElementById('modi').addEventListener('click', function(event) {
    // Id de 'cambio' será 1 luego de que surge primer msj de error, y es 3 solo al principio
    if (document.getElementById('cambio').value == '1' || document.getElementById('cambio').value == '3') {
        Swal.fire({
            title: '¿Confirmas?',
            text: '¿Estás seguro de realizar dicha modificación?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, quiero modificarla',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('cambio').value = '2';
                document.getElementById('modi').type = 'submit';
                document.getElementById('modi').click();
            }
        });
    }
});        
document.getElementById('del').addEventListener('click', function(event) {
    if (document.getElementById('cambio').value == '1' || document.getElementById('cambio').value == '3') {
        Swal.fire({
            title: '¿Confirmas?',
            text: '¿Estás seguro de eliminar la transacción?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, quiero borrarla',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('cambio').value = '2';
                document.getElementById('del').type = 'submit';
                document.getElementById('del').click();
            }
        });
    }
});
// --------------------------------------------------------------------------------------------------------------------------------------
// Código para dar formato a página para temas oscuro y claro

// Se obtiene botón que muestra tipo de modo (claro/oscuro)
let buttonTheme = document.getElementById('bd-theme');  
// Se obtienen elementos body y msj de alerta
let body = document.body;
let alerta = document.getElementById('alerta');
let h1 = document.getElementById('titulo');
let h5 = document.getElementById('descripcion'); 
// Se crea un observador de atributos para el botón
const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        // Se ve si el atributo cambiado es aria-label
        if (mutation.attributeName === 'aria-label') {
            // Se obtiene el nuevo valor del atributo aria-label
            const theme = buttonTheme.getAttribute('aria-label');        
            // Dependiendo del tema, se ajustan color de fondo y de elementos
            if (theme === 'Toggle theme (dark)') {
                body.style.background = 'radial-gradient(circle, #581D00 , rgb(33, 37, 41))';
                if (document.getElementById('cambio').value == '1') {
                    alerta.style.backgroundColor = 'rgb(44, 11, 14)';
                    alerta.style.border = '0.8px solid #842029';
                    alerta.style.color = '#ea868f';
                }
                h1.style.color = 'rgb(173, 181, 189)';
                h5.style.color = 'rgb(173, 181, 189)';
            } else {
                body.style.background = 'linear-gradient(180deg, #ff3131, #ff914d)';
                if (document.getElementById('cambio').value == '1') {
                    alerta.style.backgroundColor = '#000D4D';
                    alerta.style.border = '0.8px solid #3E58DE';
                    alerta.style.color = '#BFC9FC';
                }
                h1.style.color = '#FFFFFF';
                h5.style.color = '#FFFFFF';
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
        body.style.background = 'radial-gradient(circle, #581D00 , rgb(33, 37, 41))';
        if (document.getElementById('cambio').value == '1') {
            alerta.style.backgroundColor = 'rgb(44, 11, 14)';
            alerta.style.border = '0.8px solid #842029';
            alerta.style.color = '#ea868f';
        }
        h1.style.color = 'rgb(173, 181, 189)';
        h5.style.color = 'rgb(173, 181, 189)';
    } else {
        body.style.background = 'linear-gradient(180deg, #ff3131, #ff914d)';
        if (document.getElementById('cambio').value == '1') {
            alerta.style.backgroundColor = '#000D4D';
            alerta.style.border = '0.8px solid #3E58DE';
            alerta.style.color = '#BFC9FC';
        }
        h1.style.color = '#FFFFFF';
        h5.style.color = '#FFFFFF';
    }
}