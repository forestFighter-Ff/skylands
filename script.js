// Datenbank aller Skylanders
const skylandersDatabase = [
  {
    id: "blast_zone",
    name: "Blast Zone",
    series: "Swap Force",
    element: "Feuer",
    mainImage: "https://via.placeholder.com/250?text=Blast+Zone",
    prices: { loose: 3.50, nib: 14.99 },
    moves: {
      action1: { 
        description: "Flame Thrower: Spuckt einen kontinuierlichen Feuerstrahl.", 
        image: "https://via.placeholder.com/250?text=Flame+Thrower+Attack" 
      },
      action2: { 
        description: "Flame Dash: Prescht nach vorne und verbrennt Gegner.", 
        image: "https://via.placeholder.com/250?text=Flame+Dash+Attack" 
      },
      action3: { 
        description: "Bomb Toss: Wirft eine feurige Bombe.", 
        image: "https://via.placeholder.com/250?text=Bomb+Toss+Attack" 
      }
    },
    combos: ["Flame Dash + Bomb Toss: Brennende Spur mit Explosion."],
    buttonLabels: {
      switch: { action1: "Taste Y", action2: "Taste B", action3: "Taste A" },
      ps: { action1: "Square ⬛", action2: "Cross ✖️", action3: "Circle 🔴" },
      xbox: { action1: "Taste X", action2: "Taste A", action3: "Taste B" },
      pc: { action1: "Linksklick", action2: "Rechtsklick", action3: "Leertaste" }
    }
  },
  {
    id: "wash_buckler",
    name: "Wash Buckler",
    series: "Swap Force",
    element: "Wasser",
    mainImage: "https://via.placeholder.com/250?text=Wash+Buckler",
    prices: { loose: 2.50, nib: 11.00 },
    moves: {
      action1: { 
        description: "Cutlass Swipe: Schlägt mit dem Säbel zu.", 
        image: "https://via.placeholder.com/250?text=Cutlass+Swipe" 
      },
      action2: { 
        description: "Bubble Gun: Schießt eine Blase, die Gegner einfängt.", 
        image: "https://via.placeholder.com/250?text=Bubble+Gun" 
      },
      action3: { 
        description: "Tentacle Dash: Saust auf Tentakeln nach vorne.", 
        image: "https://via.placeholder.com/250?text=Tentacle+Dash" 
      }
    },
    combos: ["Bubble + Cutlass: Gefangene Gegner erleiden doppelten Schaden."],
    buttonLabels: {
      switch: { action1: "Taste Y", action2: "Taste B", action3: "Taste A" },
      ps: { action1: "Square ⬛", action2: "Cross ✖️", action3: "Circle 🔴" },
      xbox: { action1: "Taste X", action2: "Taste A", action3: "Taste B" },
      pc: { action1: "Linksklick", action2: "Rechtsklick", action3: "Leertaste" }
    }
  }
];

let activeSkylander = skylandersDatabase[0];

// DOM-Elemente
const searchInput = document.getElementById("search-input");
const datalist = document.getElementById("skylanders-list");
const seriesFilter = document.getElementById("series-filter");
const elementFilter = document.getElementById("element-filter");
const consoleSelect = document.getElementById("console-select");

const nameEl = document.getElementById("skylander-name");
const imgEl = document.getElementById("skylander-img");
const infoEl = document.getElementById("skylander-info");
const moveDescEl = document.getElementById("move-description");
const ctrlButtons = document.querySelectorAll(".btn-ctrl");
const comboUl = document.getElementById("combo-ul");
const notesTextarea = document.getElementById("skylander-notes");

// Suchvorschläge & Filter aktualisieren
function updateSearchSuggestions() {
  const selectedSeries = seriesFilter.value;
  const selectedElement = elementFilter.value;
  datalist.innerHTML = "";

  skylandersDatabase.forEach(item => {
    const matchSeries = selectedSeries === "all" || item.series === selectedSeries;
    const matchElement = selectedElement === "all" || item.element === selectedElement;

    if (matchSeries && matchElement) {
      const option = document.createElement("option");
      option.value = item.name;
      datalist.appendChild(option);
    }
  });
}

// Skylander in der UI anzeigen
function loadSkylander(skylander) {
  activeSkylander = skylander;
  nameEl.textContent = skylander.name;
  imgEl.src = skylander.mainImage;
  infoEl.textContent = `${skylander.series} | Element: ${skylander.element}`;
  
  document.getElementById("price-loose").textContent = skylander.prices.loose.toFixed(2) + " €";
  document.getElementById("price-nib").textContent = skylander.prices.nib.toFixed(2) + " €";

  moveDescEl.textContent = "Klicke auf einen Button, um die Attacke zu sehen!";
  updateButtonLabels();

  comboUl.innerHTML = "";
  skylander.combos.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    comboUl.appendChild(li);
  });

  notesTextarea.value = localStorage.getItem(`${skylander.id}_notes`) || "";
}

function updateButtonLabels() {
  const currentConsole = consoleSelect.value;
  ctrlButtons.forEach(btn => {
    const btnKey = btn.getAttribute("data-btn");
    btn.textContent = activeSkylander.buttonLabels[currentConsole][btnKey];
  });
}

// Event-Listener
searchInput.addEventListener("input", (e) => {
  const found = skylandersDatabase.find(s => s.name.toLowerCase() === e.target.value.toLowerCase());
  if (found) loadSkylander(found);
});

seriesFilter.addEventListener("change", updateSearchSuggestions);
elementFilter.addEventListener("change", updateSearchSuggestions);
consoleSelect.addEventListener("change", updateButtonLabels);

ctrlButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const btnKey = btn.getAttribute("data-btn");
    const move = activeSkylander.moves[btnKey];
    moveDescEl.textContent = move.description;
    imgEl.src = move.image; // Wechselt das Bild zur Attacke
  });
});

document.getElementById("save-notes-btn").addEventListener("click", () => {
  localStorage.setItem(`${activeSkylander.id}_notes`, notesTextarea.value);
  alert("Notiz gespeichert!");
});

// Start-Initialisierung
updateSearchSuggestions();
loadSkylander(skylandersDatabase[0]);
