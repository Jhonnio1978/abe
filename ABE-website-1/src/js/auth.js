// auth.js
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const user = {
                id: 'ID' + Math.random().toString(36).substr(2, 9),
                nombre: formData.get('nombre'),
                apellido: formData.get('apellido'),
                telefono: formData.get('telefono'),
                edad: formData.get('edad'),
                escuela: formData.get('escuela'),
                correo: formData.get('correo'),
                contrasena: formData.get('contrasena'),
                tipoCuenta: formData.get('tipoCuenta')
            };

            // Leer el archivo Excel
            fetch('../assets/excel/database.xlsx')
                .then(response => response.arrayBuffer())
                .then(data => {
                    const workbook = XLSX.read(data, { type: 'array' });
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const users = XLSX.utils.sheet_to_json(worksheet);

                    // Agregar el nuevo usuario
                    users.push(user);

                    // Escribir de nuevo en el archivo Excel
                    const newWorksheet = XLSX.utils.json_to_sheet(users);
                    const newWorkbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Users');
                    const newExcelData = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });

                    // Descargar el archivo actualizado
                    const blob = new Blob([newExcelData], { type: 'application/octet-stream' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'database.xlsx';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);

                    alert('Registro exitoso. Su ID es: ' + user.id);
                    window.location.href = 'login.html';
                });
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const id = event.target.id.value;
            const contrasena = event.target.contrasena.value;

            // Leer el archivo Excel
            fetch('../assets/excel/database.xlsx')
                .then(response => response.arrayBuffer())
                .then(data => {
                    const workbook = XLSX.read(data, { type: 'array' });
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const users = XLSX.utils.sheet_to_json(worksheet);

                    const user = users.find(u => u.id === id && u.contrasena === contrasena);
                    if (user) {
                        sessionStorage.setItem('loggedInUser', id);
                        window.location.href = 'account.html';
                    } else {
                        alert('ID o contraseña incorrectos');
                    }
                });
        });
    }
});