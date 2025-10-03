const urlParams = new URLSearchParams(window.location.search);
const dataFile = urlParams.get('file');

let seriesData = null;
let currentFriseIndex = 0;
let currentEpisodeIndex = 0;

fetch(dataFile)
  .then(res => res.json())
  .then(data => {
    seriesData = data;
    document.getElementById('serie-title').textContent = data.title;
    showFrise();
  })
  .catch(err => console.error("Erreur fetch série JSON :", err));

function showFrise() {
  const friseDiv = document.getElementById('frise');
  const bloc = seriesData.frise[currentFriseIndex];
  const episode = bloc.episodes[currentEpisodeIndex];

  friseDiv.innerHTML = `
    <h2>${bloc.title} (${bloc.type})</h2>
    <div>
      <h3>${episode.title}</h3>
      <img src="${episode.image}" width="200">
    </div>
    <button onclick="prevEpisode()">⬅️ Précédent</button>
    <button onclick="nextEpisode()">➡️ Suivant</button>
  `;
}

function nextEpisode() {
  const bloc = seriesData.frise[currentFriseIndex];
  if (currentEpisodeIndex < bloc.episodes.length - 1) {
    currentEpisodeIndex++;
  } else if (currentFriseIndex < seriesData.frise.length - 1) {
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
    currentEpisodeIndex = seriesData.frise[currentFriseIndex].episodes.length - 1;
  }
  showFrise();
}

function backToIndex() {
  window.location.href = "index.html";
}
