document.addEventListener('DOMContentLoaded', () => {
  // Mostrar modal al hacer clic en "Abrir Invitación"
  document.getElementById('open-invitation').addEventListener('click', () => {
    const codeModal = document.getElementById('code-modal');
    if (codeModal) {
      codeModal.classList.remove('hidden');
    } else {
      console.error("El elemento 'code-modal' no existe en el DOM.");
    }
  });

  // Cerrar modal al hacer clic en el botón de cierre (×)
  document.getElementById('close-modal')?.addEventListener('click', () => {
    const codeModal = document.getElementById('code-modal');
    if (codeModal) {
      codeModal.classList.add('hidden');
    } else {
      console.error("El elemento 'code-modal' no existe en el DOM.");
    }
  });

  // Validar código de invitación
  document.getElementById('submit-code').addEventListener('click', () => {
    const code = document.getElementById('code-input').value.trim();
    const guests = [
      { nombre: "Familia López", codigo: "LOPEZ2025", personas_invitadas: 4 },
      { nombre: "Familia Martínez", codigo: "MARTINEZ2025", personas_invitadas: 2 }
    ];

    const guest = guests.find(g => g.codigo === code);
    if (guest) {
      const codeModal = document.getElementById('code-modal');
      if (codeModal) {
        codeModal.classList.add('hidden'); // Ocultar el modal
      } else {
        console.error("El elemento 'code-modal' no existe en el DOM.");
      }

      // Redirigir a la página de invitación después de unos segundos
setTimeout(() => {
  window.location.href = `invitation.html?name=${encodeURIComponent(guest.nombre)}`;
}, 3000); // Duración del efecto (3 segundos)

      // Activar el efecto de abejas voladoras y el sonido de zumbido
      const audio = new Audio('assets/zumbido.mp3'); // Cargar el archivo de sonido
      audio.loop = true; // Repetir el sonido en bucle
      audio.play(); // Reproducir el sonido
      startBees(audio); // Pasar el objeto de audio a la función

      // Redirigir a la página de invitación después de unos segundos
      setTimeout(() => {
        window.location.href = `invitation.html?name=${encodeURIComponent(guest.nombre)}`;
      }, 3000); // Duración del efecto (3 segundos)
    } else {
      alert('Código incorrecto. Por favor, intenta nuevamente.');
    }
  });

  // Función para iniciar el efecto de abejas voladoras
  function startBees(audio) {
    const beesContainer = document.getElementById('bees-container');

    for (let i = 0; i < 200; i++) { // Generar 200 abejas
      const bee = document.createElement('div');
      bee.classList.add('bee');

      // Posición inicial aleatoria en toda la pantalla
      const randomX = Math.random() * window.innerWidth;
      const randomY = Math.random() * window.innerHeight;
      bee.style.left = `${randomX}px`;
      bee.style.top = `${randomY}px`;

      // Dirección aleatoria para cada abeja
      const randomAngle = Math.random() * 2 * Math.PI; // Ángulo aleatorio entre 0 y 360 grados
      const randomDistance = Math.random() * 800 + 200; // Distancia aleatoria entre 200px y 1000px
      const targetX = randomX + randomDistance * Math.cos(randomAngle);
      const targetY = randomY + randomDistance * Math.sin(randomAngle);

      // Duración aleatoria de la animación
      const randomDuration = Math.random() * 5 + 2; // Entre 2 y 7 segundos
      bee.style.animationDuration = `${randomDuration}s`;

      // Aplicar la animación de vuelo
      bee.style.animationName = 'fly-random';
      bee.style.setProperty('--target-x', `${targetX - randomX}px`);
      bee.style.setProperty('--target-y', `${targetY - randomY}px`);

      beesContainer.appendChild(bee);

      // Eliminar el elemento después de la animación
      setTimeout(() => {
        bee.remove();
      }, randomDuration * 1000);
    }

    // Detener el sonido después de que terminen las abejas
    setTimeout(() => {
      audio.pause(); // Detener el sonido
      audio.currentTime = 0; // Reiniciar el tiempo del audio
    }, 3000); // Duración del efecto (3 segundos)
  }
});