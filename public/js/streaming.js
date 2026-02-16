// ===== LISTA DE VIDEOS YOUTUBE =====


const videos = [
    { titulo: "Dinosaurios en México 1", videoId: "8_OxJNMvxuI" },
    { titulo: "Dinosaurios en México 2", videoId: "_mHqBX5myE4" },
    { titulo: "Dinosaurios en México 3", videoId: "2At2_RAFqpk" },
    { titulo: "Dinosaurios en México 4", videoId: "FZbIoT-5PgI" }
];

const lista = document.getElementById("video-list");
const player = document.getElementById("youtube-player");

// Cargar lista
videos.forEach((video, index) => {
    const li = document.createElement("li");
    li.textContent = "▶ " + video.titulo;
    li.className = "video-item";

    li.onclick = () => reproducirVideo(video.videoId);

    lista.appendChild(li);

    // Cargar el primero automáticamente
    if (index === 0) {
        reproducirVideo(video.videoId);
    }
});

function reproducirVideo(videoId) {
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}
