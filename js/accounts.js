function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const aid = getQueryParam('cud'); // Obtenemos el valor de cud de la URL
console.log('cud:' + aid)


const token = localStorage.getItem('token');
if (!token) {
    console.error("No se encontró el token. Por favor, inicia sesión.");
} else {
    const url = `http://localhost:3000/prestaapi/v1/accounts/id?aid=${aid}`;
    axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response.data.msg);
        const accounts = response.data.msg;
        const tableBody = document.getElementById('AcountInfo');
        tableBody.innerHTML = ''; // Limpiar la tabla

        accounts.forEach(acount => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${acount.payment}</td>
                <td>${acount.balance}</td>
                <td>${acount.date}</td>
            `;
            tableBody.appendChild(row);
        });

        // Asignar el evento al botón después de crear las filas
        document.querySelectorAll('.view-contact-btn').forEach(button => {
            button.addEventListener('click', function() {
                const cud = this.getAttribute('data-cud');
                window.location.href = `cliente.html?cud=${cud}`;
            });
        });
    })
    .catch(error => {
        console.error('Error al hacer la solicitud:', error);
    });
}