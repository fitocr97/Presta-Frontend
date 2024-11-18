document.addEventListener("DOMContentLoaded", function() {
    cargarClient();
    editarCliente();
});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


function cargarClient(){
    const cud = getQueryParam('cud');

    if (cud) {
        const token = localStorage.getItem('token'); // Obtenemos el token del localStorage

        if (!token) {
            console.error("No se encontró el token. Por favor, inicia sesión.");
        } else {
            const url = `https://presta-backend-production.up.railway.app/prestaapi/v1/clients/id?cud=${cud}`;

            // Hacer una solicitud GET para obtener los datos del cliente
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Enviar el token en los headers
                    'Content-Type': 'application/json'  // Especificar el tipo de contenido
                }
            })
            .then(response => {
                const client = response.data.msg;

                // Asignar los valores obtenidos a los inputs del formulario
                document.querySelector('input[name="name"]').value = client.name;
                document.querySelector('input[name="phone"]').value = client.phone;
                document.querySelector('input[name="address"]').value = client.address;
                document.querySelector('input[name="loan"]').value = client.loan;
                document.querySelector('input[name="interest"]').value = client.interest;
                document.querySelector('input[name="total"]').value = client.total;
                document.querySelector('select[name="tipo"]').value = client.type; // Para el tipo de préstamo
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
            });
        }
    } else {
        console.error('No se pasó un cud en la URL.');
    }
}



function editarCliente(){
    console.log("entro al editar")
    const token = localStorage.getItem('token'); // Obtenemos el token del localStorage

    if (!token) {
        console.error("No se encontró el token. Por favor, inicia sesión.");
    } else {
        document.getElementById('editClient').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir la recarga de la página
            const cud = getQueryParam('cud');
            console.log("estoy en edutar al ekecutar")
            console.log(cud)
        
            const updatedClient = {
                cud:cud,
                name: document.querySelector('input[name="name"]').value,
                phone: document.querySelector('input[name="phone"]').value,
                address: document.querySelector('input[name="address"]').value,
                loan: document.querySelector('input[name="loan"]').value,
                interest: document.querySelector('input[name="interest"]').value,
                total: document.querySelector('input[name="total"]').value,
                balance: document.querySelector('input[name="total"]').value,
                type: document.querySelector('select[name="tipo"]').value
            };
            


            axios.post(`https://presta-backend-production.up.railway.app/prestaapi/v1/clients/update`, updatedClient, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                alert('Cliente actualizado correctamente');
                window.location.href = '/dashboard.html'; // Redireccionar después de actualizar
            })
            .catch(error => {
                console.error('Error al actualizar el cliente:', error);
            });
        });
    }
}