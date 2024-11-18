function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', function () {
    const cudDelete = getQueryParam('cud'); // Obtener el cud de la URL

    const deleteButton = document.getElementById('btn-del');  // Seleccionamos el botón eliminar

    if (deleteButton) {
        deleteButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

            // Confirmación antes de eliminar
            const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este cliente?");
            if (!confirmDelete) {
                return;
            }

            const token = localStorage.getItem('token'); // Obtener el token de autenticación

            if (!token) {
                console.error("No se encontró el token. Por favor, inicia sesión.");
                return;
            }

            // URL del endpoint para eliminar (POST)
            const url = 'https://presta-backend-production.up.railway.app/prestaapi/v1/clients/delete';

            // Realizar la solicitud POST con axios
            axios.post(url, { cud: cudDelete }, {  // Enviamos el cud en el cuerpo de la solicitud
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.data.ok) {
                    alert("Cliente eliminado con éxito.");
                    // Redirigir a otra página o actualizar la vista
                    window.location.href = '/dashboard.html';
                } else {
                    alert("Error al eliminar el cliente.");
                }
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
                alert("Ocurrió un error al eliminar el cliente.");
            });
        });
    } else {
        console.error("No se encontró el botón Eliminar.");
    }
});