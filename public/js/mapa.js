let mapa;
let ubicacionActual;
let marcadorActual;
let lineas = [];

/* ======== UBICACIONES DE DINOSAURIOS ======== */
const ubicaciones = [
  { nombre: "Syntarsus", ubicacion: "Tamaulipas", lat: 23.7400, lon: -99.1450 },
  { nombre: "Gorgosaurus", ubicacion: "Sonora", lat: 29.2972, lon: -110.3309 },
  { nombre: "Labocania aguillonae", ubicacion: "Coahuila", lat: 27.0587, lon: -101.7068 },
  { nombre: "Labocania anomala", ubicacion: "Baja California", lat: 30.8406, lon: -115.2838 },
  { nombre: "Quetzalcoatlus", ubicacion: "Texas (referencia cercana)", lat: 31.9686, lon: -99.9018 }
];

/* ======== INICIALIZAR MAPA ======== */
mapa = L.map("mapa").setView([23.6345, -102.5528], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(mapa);

/* ======== MARCADORES INICIALES ======== */
ubicaciones.forEach(u => {
  L.marker([u.lat, u.lon])
    .addTo(mapa)
    .bindPopup(`<strong>${u.nombre}</strong><br>${u.ubicacion}`);
});

/* ======== OBTENER UBICACIÓN ======== */
function obtenerUbicacion() {
  navigator.geolocation.getCurrentPosition(
    posicion => {
      ubicacionActual = [
        posicion.coords.latitude,
        posicion.coords.longitude
      ];

      document.getElementById("info-ubicacion").innerHTML =
        `Latitud: ${ubicacionActual[0].toFixed(6)}<br>
         Longitud: ${ubicacionActual[1].toFixed(6)}`;

      if (marcadorActual) mapa.removeLayer(marcadorActual);

      marcadorActual = L.marker(ubicacionActual)
        .addTo(mapa)
        .bindPopup("Tu ubicación actual")
        .openPopup();

      marcarDinosauriosConDistancia();
      calcularDistancias();
    },
    () => alert("No se pudo obtener tu ubicación")
  );
}

/* ======== MARCAR CON DISTANCIA ======== */
let marcadoresDinos = [];

function marcarDinosauriosConDistancia() {
  marcadoresDinos.forEach(m => mapa.removeLayer(m));
  marcadoresDinos = [];

  ubicaciones.forEach(u => {
    const distancia = haversine(
      ubicacionActual[0],
      ubicacionActual[1],
      u.lat,
      u.lon
    ).toFixed(2);

    const marcador = L.marker([u.lat, u.lon])
      .addTo(mapa)
      .bindPopup(`<strong>${u.nombre}</strong><br>Distancia: ${distancia} km`);

    marcadoresDinos.push(marcador);
  });
}

/* ======== CALCULAR DISTANCIAS ======== */
function calcularDistancias() {
  lineas.forEach(l => mapa.removeLayer(l));
  lineas = [];

  let texto = "<strong>Distancias desde tu ubicación:</strong><br>";

  ubicaciones.forEach(u => {
    const distancia = haversine(
      ubicacionActual[0],
      ubicacionActual[1],
      u.lat,
      u.lon
    );

    texto += `${u.nombre}: ${distancia.toFixed(2)} km<br>`;

    const linea = L.polyline(
      [ubicacionActual, [u.lat, u.lon]],
      { color: "#5C636D" }
    ).addTo(mapa);

    lineas.push(linea);
  });

  document.getElementById("resultado").innerHTML = texto;

  mapa.fitBounds([
    ubicacionActual,
    ...ubicaciones.map(u => [u.lat, u.lon])
  ]);
}

/* ======== HAVERSINE ======== */
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

setTimeout(() => {
  mapa.invalidateSize();
}, 500);

