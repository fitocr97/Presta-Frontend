document.addEventListener('DOMContentLoaded', function() {
    logoutFunc(); // Asegura que la función se llame cuando la página esté lista
});

function logoutFunc() {
    const logout = document.querySelector('#logout'); // Busca el botón de logout
    
    if (logout) {
        // Solo añade el eventListener si el botón existe
        logout.addEventListener('click', () => {
            console.log("click en logout");
            
            // Eliminar el token del localStorage
            localStorage.removeItem('token');
            console.log("redirigiendo")
            // Redirigir al usuario a la página de login
            window.location.href = "index.html";
        });
    } else {
        console.error("No se encontró el botón de logout");
    }
}