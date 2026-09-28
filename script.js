// =========================================================================
// ARCHIVO: script.js (O dentro de las etiquetas <script> en tu HTML)
// Función: Enviar datos, mostrar mensaje, limpiar formulario y redirigir.
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Identificamos el formulario y la etiqueta donde mostraremos el mensaje
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    // [NUEVO] Identificamos el botón de envío
    const submitButton = form.querySelector('button[type="submit"]');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evitamos que la página se recargue de golpe

            // [NUEVO] 1. Bloqueamos el botón temporalmente para evitar spam humano
            submitButton.disabled = true;
            const textoOriginal = submitButton.textContent; // Guardamos el texto original
            submitButton.textContent = 'Enviando...';
            submitButton.style.opacity = '0.7';

            // 2. Mostramos el mensaje inicial mientras se envían los datos
            formStatus.textContent = 'Procesando envío...';
            formStatus.style.color = '#00f2fe';

            try {
                // 3. Enviamos los datos a Google Apps Script
                await fetch(form.action, {
                    method: 'POST',
                    mode: 'no-cors', // [CLAVE] Evita que el navegador bloquee la petición por seguridad
                    body: new FormData(form)
                });

                // 4. Mostramos tu mensaje de éxito personalizado en color verde
                formStatus.textContent = 'Registramos con éxito tu solicitud. Conoce más de nosotros...';
                formStatus.style.color = '#00ff88';

                // 5. Vaciamos todos los campos del formulario para que quede en blanco
                form.reset();

                // 6. Esperamos 3 segundos (3000 ms) y redirigimos a la página principal
                setTimeout(() => {
                    window.location.href = 'https://qubits-ia.com/';
                }, 3000);

            } catch (error) {
                // Este mensaje de error solo aparecerá si el cliente se queda sin internet
                formStatus.textContent = 'Revisa tu conexión a internet e intenta nuevamente.';
                formStatus.style.color = '#ff6b6b';

                // [NUEVO] Restauramos el botón si hubo un error para que intente de nuevo
                submitButton.disabled = false;
                submitButton.textContent = textoOriginal;
                submitButton.style.opacity = '1';
            }
        });
    }
});