document.addEventListener('DOMContentLoaded', () => {
  // Mostrar modal al hacer clic en "Abrir Invitación"
  const openInvitationButton = document.getElementById('open-invitation');
  if (openInvitationButton) {
    openInvitationButton.addEventListener('click', () => {
      const codeModal = document.getElementById('code-modal');
      if (codeModal) {
        codeModal.classList.remove('hidden');
      } else {
        console.error("El elemento 'code-modal' no existe en el DOM.");
      }
    });
  }

  // Cerrar modal al hacer clic en el botón de cierre (×)
  const closeModalButton = document.getElementById('close-modal');
  if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
      const codeModal = document.getElementById('code-modal');
      if (codeModal) {
        codeModal.classList.add('hidden');
      } else {
        console.error("El elemento 'code-modal' no existe en el DOM.");
      }
    });
  }

  // Validar código de invitación
  const submitCodeButton = document.getElementById('submit-code');
  if (submitCodeButton) {
    submitCodeButton.addEventListener('click', async () => {
      const codeInput = document.getElementById('code-input');
      if (!codeInput) {
        console.error("El elemento 'code-input' no existe en el DOM.");
        return;
      }

      const code = codeInput.value.trim();

      try {
        // Cargar dinámicamente los datos de los invitados desde data.json
        const response = await fetch('data.json'); // Asegúrate de que este archivo esté en la misma carpeta o ruta correcta
        if (!response.ok) {
          throw new Error(`Error al cargar el archivo JSON: ${response.status}`);
        }
        const guests = await response.json(); // Parsear los datos JSON

        // Buscar al invitado por su código
        const guest = guests.find(g => g.codigo === code);
        if (guest) {
          const codeModal = document.getElementById('code-modal');
          if (codeModal) {
            codeModal.classList.add('hidden'); // Ocultar el modal
          } else {
            console.error("El elemento 'code-modal' no existe en el DOM.");
          }

          // Activar el efecto de abejas voladoras y el sonido de zumbido
          const audio = new Audio('assets/zumbido.mp3'); // Cargar el archivo de sonido
          audio.loop = true; // Repetir el sonido en bucle
          audio.play(); // Reproducir el sonido

          startBees(audio); // Pasar el objeto de audio a la función

          // Redirigir a la página de invitación después de unos segundos
          setTimeout(() => {
            window.location.href = `invitation.html?name=${encodeURIComponent(guest.nombre)}&invitados=${guest.personas_invitadas}`;
          }, 3000); // Duración del efecto (3 segundos)
        } else {
          alert('Código incorrecto. Por favor, intenta nuevamente.');
        }
      } catch (error) {
        console.error("Error al cargar o procesar el archivo JSON:", error);
        alert("Ocurrió un error al validar tu código. Por favor, inténtalo más tarde.");
      }
    });
  }

  // Función para iniciar el efecto de abejas voladoras
  function startBees(audio) {
    const beesContainer = document.getElementById('bees-container');
    if (!beesContainer) {
      console.error("El elemento 'bees-container' no existe en el DOM.");
      return;
    }

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

  // Abrir el modal de la galería
  const openGalleryButton = document.getElementById('open-gallery');
  if (openGalleryButton) {
    openGalleryButton.addEventListener('click', () => {
      const galleryModal = document.getElementById('gallery-modal');
      if (galleryModal) {
        galleryModal.classList.remove('hidden');
      }
    });
  }

  // Cerrar el modal de la galería
  const closeGalleryButton = document.getElementById('close-gallery');
  if (closeGalleryButton) {
    closeGalleryButton.addEventListener('click', () => {
      const galleryModal = document.getElementById('gallery-modal');
      if (galleryModal) {
        galleryModal.classList.add('hidden');
      }
    });
  }

  // Carrusel de fotos con efecto 3D
  const track = document.querySelector('.carousel-track');
  const items = track ? Array.from(track.children) : [];
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const fullscreenButton = document.getElementById('fullscreen-btn');
  const exitFullscreenButton = document.getElementById('exit-fullscreen-btn');
  const fullscreenClose = document.getElementById('fullscreen-close');

  if (track && items.length > 0 && prevButton && nextButton) {
    let currentIndex = 1; // Índice de la imagen central

    function updateCarousel(index) {
      const offset = -index * 100; // Desplazamiento basado en el índice
      track.style.transform = `translateX(${offset}%)`;

      // Aplicar efectos 3D
      items.forEach((item, i) => {
        if (i === index - 1) {
          item.style.transform = 'translateX(-100%) rotateY(30deg) scale(0.8)';
          item.style.opacity = '0.7';
          item.style.filter = 'blur(2px)';
        } else if (i === index) {
          item.style.transform = 'translateX(0) rotateY(0deg) scale(1)';
          item.style.opacity = '1';
          item.style.filter = 'blur(0)';
        } else if (i === index + 1) {
          item.style.transform = 'translateX(100%) rotateY(-30deg) scale(0.8)';
          item.style.opacity = '0.7';
          item.style.filter = 'blur(2px)';
        }
      });
    }

    // Botón "Anterior"
    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel(currentIndex);
      }
    });

    // Botón "Siguiente"
    nextButton.addEventListener('click', () => {
      if (currentIndex < items.length - 1) {
        currentIndex++;
        updateCarousel(currentIndex);
      }
    });

    // Pantalla completa solo para la imagen activa
    if (fullscreenButton) {
      fullscreenButton.addEventListener('click', () => {
        const activeImage = items[currentIndex].querySelector('.carousel-photo');
        if (activeImage.requestFullscreen) {
          activeImage.requestFullscreen();
        } else if (activeImage.mozRequestFullScreen) {
          activeImage.mozRequestFullScreen(); // Firefox
        } else if (activeImage.webkitRequestFullscreen) {
          activeImage.webkitRequestFullscreen(); // Chrome, Safari, Opera
        } else if (activeImage.msRequestFullscreen) {
          activeImage.msRequestFullscreen(); // IE/Edge
        }

        // Mostrar el botón de salida de pantalla completa
        fullscreenClose.classList.remove('hidden');
      });
    }

    // Salir del modo pantalla completa
    if (exitFullscreenButton) {
      exitFullscreenButton.addEventListener('click', () => {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen(); // Firefox
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen(); // Chrome, Safari, Opera
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen(); // IE/Edge
        }

        // Ocultar el botón de salida de pantalla completa
        fullscreenClose.classList.add('hidden');
      });
    }

    // Detectar cambios en el modo de pantalla completa
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        fullscreenClose.classList.add('hidden'); // Ocultar el botón si salimos del modo completo
      }
    });

    // Deslizamiento táctil
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;

      if (diff > 50 && currentIndex < items.length - 1) {
        currentIndex++;
        updateCarousel(currentIndex);
        isDragging = false;
      } else if (diff < -50 && currentIndex > 0) {
        currentIndex--;
        updateCarousel(currentIndex);
        isDragging = false;
      }
    });

    track.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Inicializar el carrusel
    updateCarousel(currentIndex);
  } else {
    console.error("El carrusel o sus botones no están presentes en el DOM.");
  }
});
