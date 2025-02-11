document.addEventListener('DOMContentLoaded', () => {
  // Obtener el nombre del invitado desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('name');

  if (guestName) {
    document.getElementById('welcome-message').textContent = `¡Bienvenidos, ${guestName}!`;

    // Generar el enlace para confirmar asistencia
    const confirmLink = document.getElementById('confirm-link');
    confirmLink.href = `confirmation.html?name=${encodeURIComponent(guestName)}`;
  } else {
    alert('No se ha proporcionado un nombre de invitado.');
  }
  

  // Contador regresivo
  function startCountdown() {
    const eventDate = new Date('March 8, 2025 13:00:00').getTime();
    const countdownElement = document.getElementById('countdown');

    setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance <= 0) {
        countdownElement.innerHTML = '<p>¡El evento ha comenzado!</p>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Mostrar las palabras completas
      countdownElement.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <span style="font-size: 2rem; font-family: 'Courier New', monospace; color: #FFC107;">${days}</span>
          <span style="font-size: 1rem; color: #333;">Días</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <span style="font-size: 2rem; font-family: 'Courier New', monospace; color: #FFC107;">${hours}</span>
          <span style="font-size: 1rem; color: #333;">Horas</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <span style="font-size: 2rem; font-family: 'Courier New', monospace; color: #FFC107;">${minutes}</span>
          <span style="font-size: 1rem; color: #333;">Minutos</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <span style="font-size: 2rem; font-family: 'Courier New', monospace; color: #FFC107;">${seconds}</span>
          <span style="font-size: 1rem; color: #333;">Segundos</span>
        </div>
      `;
    }, 1000);
  }

  // Reproducir música de fondo
  function playBackgroundMusic() {
    const audio = document.getElementById('background-music');
    audio.play();
  }

  startCountdown();
  playBackgroundMusic();
});