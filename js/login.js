document.addEventListener("DOMContentLoaded", function() {
    checkAuthToken();
});

function checkAuthToken() {
    const loginForm = document.querySelector('#loginForm');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del form
        
        // Captura los valores de email y password del formulario
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        try {
            console.log("Iniciando solicitud de login...");
            
            // Enviar la solicitud POST a la API
            //https://ticoapi-production.up.railway.app/tico/v1/users/login
            const response = await axios.post('https://presta-backend-production.up.railway.app/prestaapi/v1/users/login', { 
                email,
                password
            });

            const data = response.data; // Obtener los datos de la respuesta

            console.log(data); // Asegúrate de ver la respuesta en consola

            // Almacenar el token en localStorage
            localStorage.setItem('token', data.msg.token);

            window.location.href = '/dashboard.html'

        } catch (error) {
            // Si hay un error (como un login fallido)
            alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
            console.error("Error al intentar autenticar:", error); // Imprime el error para depuración
        }
    });
}