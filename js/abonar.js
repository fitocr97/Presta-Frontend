document.addEventListener("DOMContentLoaded", function() {
    redireccionar();
    abonar();
});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function redireccionar(){
    const volverBtn = document.getElementById('btn-volver-abo');
    const cud = getQueryParam('cud');
    if (volverBtn && cud ) {
        volverBtn.href = `/cliente.html?cud=${cud}`;
    } else {
        console.error('No se pudo asignar el valor de cud a los botones.');
    }
}

function abonar(){
    console.log("entro al editar")
    const token = localStorage.getItem('token'); // Obtenemos el token del localStorage

    if (!token) {
        console.error("No se encontró el token. Por favor, inicia sesión.");
    } else {
        document.getElementById('abonar').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir la recarga de la página
            const cud = getQueryParam('cud');
            console.log("estoy en edutar al abonar")
            console.log(cud)

            const date = new Date();  // La fecha actual

            // Extraer cada parte de la fecha
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');  // Meses van de 0 a 11
            const day = String(date.getDate()).padStart(2, '0');

            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            // Construir la fecha con el formato deseado
            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            
            const abonar = {
                aid:cud,
                payment: document.querySelector('input[name="payment"]').value,
                date:formattedDate
            };
            console.log(abonar)
            console.log("mostro")
            /
            axios.post(`https://presta-backend-production.up.railway.app/prestaapi/v1/accounts/create`, abonar, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                alert('Abono realizado');
                console.log(response)
                if(response.status == 201){
                    window.location.href = `cliente.html?cud=${cud}`; // Redireccionar después de actualizar
                }else if(response.status == 204){
                    alert('El cliente cancelo todo el prestamo, se eliminará del sistema');
                    window.location.href = `dashboard.html`; // Redireccionar después de actualizar
                }
                
            })
            .catch(error => {
                console.error('Error al actualizar el cliente:', error);
            });
        });
    }
}