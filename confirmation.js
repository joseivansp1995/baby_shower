document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const guestNameInput = document.getElementById('guest-name');
    const maxPlacesSpan = document.getElementById('max-places');
    const placesContainer = document.getElementById('places-container');
    const placesCheckboxes = document.getElementById('places-checkboxes');
    const confirmYesButton = document.getElementById('confirm-yes');
    const confirmNoButton = document.getElementById('confirm-no');
    const submitConfirmationButton = document.getElementById('submit-confirmation');
    const confirmationForm = document.getElementById('confirmation-form');
  
    let selectedGuest = null;
    let selectedPlaces = [];
  
    // Obtener los datos de los invitados desde el archivo JSON
    fetch('data.json') // Asegúrate de que la ruta al archivo JSON sea correcta
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error al cargar el archivo JSON: ${response.status}`);
        }
        return response.json();
      })
      .then(guests => {
        // Obtener el nombre del invitado desde la URL
        const urlParams = new URLSearchParams(window.location.search);
        const guestName = urlParams.get('name');
  
        if (guestName) {
          selectedGuest = guests.find(g => g.nombre.toLowerCase() === decodeURIComponent(guestName).toLowerCase());
          if (selectedGuest) {
            guestNameInput.value = selectedGuest.nombre;
          } else {
            alert('Invitado no encontrado.');
            window.close();
          }
        } else {
          alert('No se ha proporcionado un nombre de invitado.');
          window.close();
        }
      })
      .catch(error => {
        console.error('Error al cargar los datos de los invitados:', error);
        alert('Ocurrió un error al cargar los datos. Por favor, inténtalo nuevamente.');
        window.close();
      });
  
    // Confirmar asistencia
    confirmYesButton.addEventListener('click', () => {
      if (selectedGuest) {
        maxPlacesSpan.textContent = selectedGuest.personas_invitadas;
        placesContainer.style.display = 'block';
        submitConfirmationButton.style.display = 'block';
  
        // Generar checkboxes para los lugares asignados
        placesCheckboxes.innerHTML = '';
        for (let i = 1; i <= selectedGuest.personas_invitadas; i++) {
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = `place-${i}`;
          checkbox.value = i;
  
          const label = document.createElement('label');
          label.htmlFor = `place-${i}`;
          label.textContent = `${i}`;
  
          placesCheckboxes.appendChild(checkbox);
          placesCheckboxes.appendChild(label);
          placesCheckboxes.appendChild(document.createElement('br'));
        }
      }
    });
  
    confirmNoButton.addEventListener('click', () => {
      if (selectedGuest) {
        const message = `La ${selectedGuest.nombre} ha cancelado su asistencia al Baby Shower de José Antonio.`;
        alert(message);
  
        // Enviar mensaje al organizador
        const messageToOrganizer = encodeURIComponent(message);
        window.open(`https://wa.me/9321111304?text=${messageToOrganizer}`, '_blank');
  
        window.close(); // Cierra la pestaña
      }
    });
  
    // Enviar confirmación
    confirmationForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Obtener los lugares seleccionados
      selectedPlaces = [];
      document.querySelectorAll('#places-checkboxes input[type="checkbox"]:checked').forEach(checkbox => {
        selectedPlaces.push(parseInt(checkbox.value, 10));
      });
  
      if (selectedPlaces.length === 0) {
        alert('Por favor, selecciona al menos un lugar.');
        return;
      }
  
      const totalPlaces = selectedPlaces.reduce((sum, place) => sum + place, 0);
      const message = `La ${selectedGuest.nombre} ha confirmado su asistencia al Baby Shower de José Antonio. Ocupará ${totalPlaces} lugares.`;
      alert(message);
  
      // Enviar mensaje al organizador
      const messageToOrganizer = encodeURIComponent(message);
      window.open(`https://wa.me/9321111304?text=${messageToOrganizer}`, '_blank');
  
      window.close(); // Cierra la pestaña
    });
  });