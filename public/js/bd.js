// Obtener patrocinadores
fetch('/api/patrocinadores')
  .then(res => res.json())
  .then(data => {
    const lista = document.getElementById('patrocinadores');

    data.forEach(p => {
      const li = document.createElement('li');
      li.textContent = p.nombre_patrocinador;
      lista.appendChild(li);
    });
  });


// Enviar registro
function enviarRegistro() {
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;

  fetch('/api/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo })
  })
  .then(res => res.json())
  .then(data => alert(data.mensaje));
}
