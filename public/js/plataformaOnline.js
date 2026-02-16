function cargarUsuarios() {
    fetch('/api/registro')
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById('registro');
            contenedor.innerHTML = '';

            data.forEach(registro => {
                const card = document.createElement('div');

                card.style.border = '1px solid #5C636D';
                card.style.padding = '15px';
                card.style.margin = '15px 0';
                card.style.backgroundColor = '#F4F4F4';

                card.innerHTML = `
                    <strong>${registro.nombre}</strong><br>
                    Correo: ${registro.correo}<br>
                `;

                contenedor.appendChild(card);
            });
        })
        .catch(error => {
            document.getElementById('registro').textContent =
                'Error al cargar registros';
        });
}
