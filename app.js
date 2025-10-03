let data = {};
let currentSeries = null;
let currentEpisodeIndex = 0;
let currentFriseIndex = 0;

// Charger les séries
fetch("series.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    showSeriesList();
  });

// Afficher la liste des séries
function showSeriesList() {
  const container = document.getElementById("series-selection");
  container.innerHTML = "<h2>Choisis ta série</h2>";
  Object.keys(data).forEach(seriesName => {
    const btn = document.createElement("button");
    btn.textContent = seriesName;
    btn.onclick = () => selectSeries(seriesName);
    container.appendChild(btn);
  });
}

// Sélectionner une série
function selectSeries(name) {
  currentSeries = data[name].frise;
  currentFriseIndex = 0;
  currentEpisodeIndex = 0;
  document.getElementById("series-selection").style.display = "none";
  document.getElementById("frise").style.display = "block";
  showFrise();
}

// Afficher la frise
function showFrise() {
  const friseDiv = document.getElementById("frise");
  const bloc = currentSeries[currentFriseIndex];
  const episode = bloc.episodes[currentEpisodeIndex];

  friseDiv.innerHTML = `
    <h2>${bloc.title} (${bloc.type})</h2>
    <div>
      <h3>${episode.title}</h3>
      <img src="${episode.image}" width="200">
    </div>
    <button onclick="prevEpisode()">⬅️ Précédent</button>
    <button onclick="nextEpisode()">➡️ Suivant</button>
    <br><br>
    <button onclick="backToMenu()">⬅️ Retour aux séries</button>
  `;
}

// Navigation entre épisodes
function nextEpisode() {
  const bloc = currentSeries[currentFriseIndex];
  if (currentEpisodeIndex < bloc.episodes.length - 1) {
    currentEpisodeIndex++;
  } else if (currentFriseIndex < currentSeries.length - 1) {
    currentFriseIndex++;
    currentEpisodeIndex = 0;
  }
  showFrise();
}

function prevEpisode() {
  if (currentEpisodeIndex > 0) {
    currentEpisodeIndex--;
  } else if (currentFriseIndex > 0) {
    currentFriseIndex--;
    currentEpisodeIndex = currentSeries[currentFriseIndex].episodes.length - 1;
  }
  showFrise();
}

// Retour au menu
function backToMenu() {
  document.getElementById("series-selection").style.display = "block";
  document.getElementById("frise").style.display = "none";
}

