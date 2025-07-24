    const searchInput = document.getElementById("searchInput");
    const pharmacyCards = document.querySelectorAll(".pharmacy-card");
    const resultsHeader = document.getElementById("resultsHeader");

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      let found = false;
      pharmacyCards.forEach(card => {
        const location = card.getAttribute("data-location").toLowerCase();
        const match = location.includes(query);
        card.style.display = match ? "block" : "none";
        if (match) found = true;
      });
      resultsHeader.style.display = found ? "block" : "none";
    });

    function useGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village || "";
            searchInput.value = city;
            searchInput.dispatchEvent(new Event("input"));
            alert("Localisation détectée : " + city);
          } catch (e) {
            alert("Impossible de déterminer votre ville.");
          }
        }, error => {
          alert("Erreur de géolocalisation : " + error.message);
        });
      } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
      }
    }
