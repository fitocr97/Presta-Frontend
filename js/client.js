// Función para obtener el parámetro de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const cud = getQueryParam('cud'); // Obtenemos el valor de cud de la URL
console.log('cud:' + cud)


if (cud) {  // Asegurarte de que 'cud' esté presente en la URL
    const token = localStorage.getItem('token');  // Obtener el token de localStorage

    if (!token) {
        console.error("No se encontró el token. Por favor, inicia sesión.");
    } else {
        const url = `http://localhost:3000/prestaapi/v1/clients/id?cud=${cud}`;  // Correcta interpolación del parámetro 'cud'

        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Enviar el token en los headers
                'Content-Type': 'application/json'  // Especificar el tipo de contenido
            }
        })
        .then(response => {
            const client = response.data.msg;
            const contactInfo = document.getElementById('contactInfo');

            console.log(response.data.msg);
            console.log(client.name)

            // Mostrar los datos del cliente
            contactInfo.innerHTML = `
                <p><strong>Nombre:</strong> ${client.name}</p>
                <p><strong>Teléfono:</strong> ${client.phone}</p>
                <p><strong>Dirección:</strong> ${client.address}</p>
                <p><strong>Préstamo:</strong> ${client.loan}</p>
                <p><strong>Intereses:</strong> ${client.interest}</p>
                <p><strong>Balance:</strong> ${client.balance}</p>
                <p><strong>Tipo:</strong> ${client.type}</p>
                <p><strong>Estado:</strong> ${client.status}</p>
            `;
        })
        .catch(error => {
            console.error('Error al hacer la solicitud:', error);
        });
    }
} else {
    console.error('No se pasó un cud en la URL.');
}