const token = localStorage.getItem('token');
if (!token) {
    console.error("No se encontró el token. Por favor, inicia sesión.");
} else {
    const url = 'http://localhost:3000/prestaapi/v1/clients/biweekly';
    axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response.data.msg);
        const users = response.data.msg;
        const tableBody = document.getElementById('clientsbiWeekly');
        tableBody.innerHTML = ''; // Limpiar la tabla

        users.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.name}</td>
                <td>${client.phone}</td>
                <td>${client.status}</td>
                <td>
                  <button class="btn btn-primary view-contact-btn" data-cud="${client.cud}">
                    Abrir
                  </button>
                </td>
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