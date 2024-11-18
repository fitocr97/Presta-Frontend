const token = localStorage.getItem('token');
if (!token) {
    console.error("No se encontró el token. Por favor, inicia sesión.");
} else {
    const url = 'http://localhost:3000/prestaapi/v1/clients/weekly';
    axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response.data.msg);
        const users = response.data.msg;
        const tableBody = document.getElementById('clientsWeekly');
        tableBody.innerHTML = ''; // Limpiar la tabla


        users.forEach(client => {
            const row = document.createElement('tr');

            let rowClass = '';
            if (client.status === 'Pago') {
                rowClass = 'status-pago';
            } else if (client.status === 'Falta') {
                rowClass = 'status-falta';
            } else {
                // Asignar clase predeterminada si el estado no es "Pago" ni "Falta"
                rowClass = 'status-default';
            }

            row.classList.add(rowClass);



            row.innerHTML = `
                <td>${client.name}</td>
                <td>${client.balance}</td>
                <td>${client.status}</td>
                <td>
                  <button class="btn btn-primary view-abonar-btn" data-cud="${client.cud}">
                    Abonar
                  </button>

                  <button class="btn btn-dark view-contact-btn" data-cud="${client.cud}">
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

        document.querySelectorAll('.view-abonar-btn').forEach(button => {
            button.addEventListener('click', function() {
                const cud = this.getAttribute('data-cud');
                window.location.href = `abonar.html?cud=${cud}`;
            });
        });
    })
    .catch(error => {
        console.error('Error al hacer la solicitud:', error);
    });
}