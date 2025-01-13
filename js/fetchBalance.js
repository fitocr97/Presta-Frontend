const fetchTotalBalance = async () => {
    try {
        const token = localStorage.getItem('token'); // Suponiendo que el token está almacenado en localStorage
        
        if (!token) {
            console.error('No se encontró un token en localStorage');
            return;
        }

        const response = await axios.get('https://presta-backend-production.up.railway.app/prestaapi/v1/accounts/balances', {
            headers: {
                'Authorization': `Bearer ${token}`, // Pasar el Bearer Token en el header
                'Content-Type': 'application/json', // Asegurar que el Content-Type sea JSON
            },
        });

        if (response.data.ok) {
            const totalBalance = parseInt(response.data.totalBalance);
            const balanceElement = document.getElementById('monto-prestado');
            balanceElement.textContent = `Monto Total Prestado: ₡${totalBalance.toLocaleString('es-CR')}`;
        } else {
            console.error('Error en la respuesta de la API:', response.data.msg);
        }
    } catch (error) {
        console.error('Error al llamar a la API:', error);
    }
};

// Llamar a la función después de cargar la página
document.addEventListener('DOMContentLoaded', fetchTotalBalance);