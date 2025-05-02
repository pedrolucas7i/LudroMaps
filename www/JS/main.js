const basemapList = [
    "dark-gray", "hybrid", "osm", "satellite", "streets", "terrain", "topo",
    "streets-navigation-vector", "streets-night-vector"
  ];
  
  
  function getSelectedMap() {
    const urlParams = new URLSearchParams(window.location.search);
    return (urlParams.get('basemap') || 'hybrid').toLowerCase();
  }
  
  function changeBasemap(basemap) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("basemap", basemap);
    window.location.href = newUrl.toString();
  }
  
  function renderBasemapButtons() {
    const container = document.getElementById("availableMaps");
    const selected = getSelectedMap();
    container.innerHTML = ""; // Limpa o conteúdo anterior
  
    basemapList.forEach((basemap) => {
      if (basemap === selected) return; // Pula o mapa selecionado
  
      const wrapper = document.createElement("div");
      wrapper.className = "map-thumb-wrapper";
      wrapper.onclick = () => changeBasemap(basemap);
  
      const img = document.createElement("img");
      img.src = `MAPS/${basemap}.png`;
      img.alt = `${basemap} thumbnail`;
      img.className = "map-thumb";
      img.id = `thumb-${basemap}`;
  
      wrapper.appendChild(img);
      container.appendChild(wrapper);
    });
  
    // Atualiza a visualização do mapa selecionado
    const topImage = document.getElementById("mapImage");
    if (topImage) {
      topImage.src = `MAPS/${selected}.png`;
      topImage.alt = `${selected} selected map`;
    }
  }
  
  function UpdateMap() {
    const basemap = getSelectedMap();
  
    require([
      "esri/Map",
      "esri/views/MapView",
      "esri/widgets/Search"
    ], function(Map, MapView, Search) {
  
      const map = new Map({ basemap });
  
      const mapView = new MapView({
        container: "viewDiv",  // O contêiner para exibir o mapa
        map: map,
        center: [-7.49087, 39.82219],  // Ajuste as coordenadas conforme necessário
        zoom: 15  // Nível de zoom
      });
  
      // Adiciona o widget de pesquisa
      const searchWidget = new Search({
        view: mapView,
        placeholder: "Pesquisar local ou endereço"
      });
  
      mapView.ui.add(searchWidget, { index: 0 });
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    renderBasemapButtons();
    UpdateMap();
  });
  
  function showMaps() {
    const mapsContainer = document.getElementById("maps-container");
  
    if (mapsContainer.classList.contains("hide") || mapsContainer.style.opacity === "0") {
      mapsContainer.classList.remove("hide");
      mapsContainer.classList.add("show");
    } else {
      mapsContainer.classList.remove("show");
      mapsContainer.classList.add("hide");
    }
  }
  


