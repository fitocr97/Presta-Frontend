// Llamada a la API para obtener el total de balance usando Axios
const fetchTotalBalance = async () => {
    try {
        const response = await axios.get('https://presta-backend-production.up.railway.app/prestaapi/v1/accounts/balances');
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