// main.js
document.addEventListener('DOMContentLoaded', function() {
    const userId = sessionStorage.getItem('loggedInUser');
    if (!userId) {
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('userId').textContent = userId;

    document.getElementById('verificarSueldo').addEventListener('click', function() {
        const id = prompt('Ingrese su ID:');
        const contrasena = prompt('Ingrese su contraseña:');
        fetch('../assets/excel/database.xlsx')
            .then(response => response.arrayBuffer())
            .then(data => {
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const users = XLSX.utils.sheet_to_json(worksheet);
                const user = users.find(u => u.id === id && u.contrasena === contrasena);
                if (user) {
                    alert('Su sueldo es: $1000'); // Aquí puedes agregar la lógica para verificar el sueldo
                } else {
                    alert('ID o contraseña incorrectos');
                }
            });
    });

    document.getElementById('transferirDinero').addEventListener('click', function() {
        const id = prompt('Ingrese su ID:');
        const contrasena = prompt('Ingrese su contraseña:');
        fetch('../assets/excel/database.xlsx')
            .then(response => response.arrayBuffer())
            .then(data => {
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const users = XLSX.utils.sheet_to_json(worksheet);
                const user = users.find(u => u.id === id && u.contrasena === contrasena);
                if (user) {
                    const cuentaDestino = prompt('Ingrese la cuenta destino:');
                    const monto = prompt('Ingrese el monto a transferir:');
                    alert('Transferencia de $' + monto + ' a la cuenta ' + cuentaDestino + ' realizada con éxito'); // Aquí puedes agregar la lógica para transferir dinero
                } else {
                    alert('ID o contraseña incorrectos');
                }
            });
    });

    document.getElementById('depositarDinero').addEventListener('click', function() {
        const id = prompt('Ingrese su ID:');
        const monto = prompt('Ingrese el monto a depositar:');
        const codigo = 'DEP' + Math.random().toString(36).substr(2, 9);
        alert('Depósito de $' + monto + ' generado con éxito. Su código es: ' + codigo); // Aquí puedes agregar la lógica para generar el código de depósito
    });

    document.getElementById('solicitarTarjeta').addEventListener('click', function() {
        const id = prompt('Ingrese su ID:');
        const contrasena = prompt('Ingrese su contraseña:');
        fetch('../assets/excel/database.xlsx')
            .then(response => response.arrayBuffer())
            .then(data => {
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const users = XLSX.utils.sheet_to_json(worksheet);
                const user = users.find(u => u.id === id && u.contrasena === contrasena);
                if (user) {
                    alert('Solicitud de tarjeta de crédito/débito realizada con éxito. Tendrá una respuesta en 72 horas'); // Aquí puedes agregar la lógica para solicitar la tarjeta
                } else {
                    alert('ID o contraseña incorrectos');
                }
            });
    });

    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetPage = this.getAttribute('href');
            loadPage(targetPage);
        });
    });

    function loadPage(page) {
        fetch(page)
            .then(response => response.text())
            .then(html => {
                document.getElementById('content').innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading page:', error);
            });
    }
});