document.addEventListener("DOMContentLoaded", function() {
    crearClient();
});

function crearClient() {
    const createProductForm = document.querySelector('#createClient'); // Asegúrate de que el id del form sea correcto
    
    createProductForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del form
        
        // Captura el valor del nombre del producto desde el formulario
        const name = e.target.name.value; // Asegúrate de que el input del nombre tenga el atributo `name="productName"`
        const type = e.target.tipo.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const loan = e.target.loan.value;
        const interest = e.target.interest.value;
        const total = e.target.total.value;
        const balance = total;

        console.log(name, type, phone, address, loan, interest, total, balance)
        try {
            console.log("Creando Client...");
            console.log(name, type, phone, address, loan, interest, total, balance)
            const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado
            const url = 'https://presta-backend-production.up.railway.app/prestaapi/v1/clients/create';

            // Realizar la solicitud POST con Axios
            const response = await axios.post(url, {
                name:name, 
                phone:phone,
                address:address,
                loan:loan, 
                interest:interest, 
                total:total,
                balance:balance,
                type:type
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Pasar el Bearer Token en el header
                    'Content-Type': 'application/json' // Asegurarse de que el Content-Type sea JSON
                }
            });

            const data = response.data; // Obtener los datos de la respuesta
            console.log(data); // Ver la respuesta en la consola
            alert("Se agrego el cliente.");

            // Redirigir al usuario después de crear el producto
            window.location.href = '/dashboard.html';

        } catch (error) {
            // Si hay un error, mostrar una alerta o manejar el error
            alert("Error al crear el cliente. Por favor, inténtalo de nuevo.");
            console.error("Error al intentar crear el producto:", error); // Imprime el error para depuración
        }
    });
}