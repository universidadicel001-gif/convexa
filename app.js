const DB_NAME = "convexa";
const DB_VERSION = 2;
const STORE = "pictograms";
const PREFERENCES_STORE = "preferences";
const SETTINGS_KEY = "convexa-settings";
const tileShapes = new Set(["rounded", "square", "circle"]);
const tileSizes = new Set(["small", "medium", "large"]);
const fontSizes = new Set(["small", "medium", "large"]);
const backgroundFits = new Set(["cover", "contain", "fill"]);
const fontFamilies = {
  system: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  arial: "Arial, sans-serif",
  verdana: "Verdana, sans-serif",
  trebuchet: "'Trebuchet MS', sans-serif",
  georgia: "Georgia, serif",
  tahoma: "Tahoma, Geneva, sans-serif",
  comic: "'Comic Sans MS', 'Comic Sans', cursive",
  courier: "'Courier New', Courier, monospace",
  times: "'Times New Roman', Times, serif",
  monospace: "ui-monospace, SFMono-Regular, Consolas, monospace"
};
const fontSizeValues = { small: "0.68rem", medium: "0.82rem", large: "1rem" };
const iconChoices = [
  ["✨", "Brillo"], ["⭐", "Estrella"], ["❤️", "Corazón"], ["🙂", "Cara feliz"], ["👤", "Persona"],
  ["👪", "Familia"], ["🏠", "Casa"], ["🏫", "Escuela"], ["📚", "Libros"], ["🎨", "Arte"],
  ["🎵", "Música"], ["🎮", "Juegos"], ["⚽", "Deportes"], ["🍎", "Comida"], ["🥤", "Bebida"],
  ["💧", "Agua"], ["🛏️", "Descanso"], ["🚽", "Baño"], ["🧸", "Juguete"], ["🐶", "Animal"],
  ["🌳", "Naturaleza"], ["🚗", "Transporte"], ["🛒", "Compras"], ["🩺", "Salud"], ["🆘", "Ayuda"],
  ["✅", "Sí"], ["❌", "No"], ["💬", "Comunicación"], ["✋", "Mano"], ["🎁", "Otro"]
];

const categories = [
  { name: "Cuerpo", title: "Partes del cuerpo", icon: "🧍", color: "yellow", layout: "body", items: [
    ["Cabeza", "🙂", "Me duele la cabeza"], ["Ojos", "👀", "Me duelen los ojos"], ["Boca", "👄", "Me duele la boca"], ["Oídos", "👂", "Me duelen los oídos"],
    ["Brazos", "💪", "Me duelen los brazos"], ["Manos", "✋", "Me duelen las manos"], ["Estómago", "🤕", "Me duele el estómago"], ["Piernas", "🦵", "Me duelen las piernas"],
    ["Manos", "✋", "Quiero mover las manos"], ["Piernas", "🦵", "Quiero mover las piernas"], ["Pies", "🦶", "Me duelen los pies"]
  ] },
  { name: "Partes de la casa", title: "Casa", icon: "🏠", color: "blue", layout: "home", items: [
    ["Dormitorio", "🚪", "Quiero ir al dormitorio"], ["Cama", "🛏️", "Quiero descansar en mi cama"], ["Sofá", "🛋️", "Quiero sentarme en el sofá"], ["Sillón", "🛋️", "Quiero sentarme en el sillón"],
    ["Cocina", "🍳", "Quiero ir a la cocina"], ["Mesa", "🪑", "Quiero sentarme a la mesa"], ["Comedor", "🍽️", "Quiero ir al comedor"], ["Baño", "🚽", "Quiero ir al baño"],
    ["Patio", "🌳", "Quiero salir al patio"], ["Jardín", "🌷", "Quiero ir al jardín"]
  ] },
  { name: "¿Qué sigue?", title: "¿Qué sigue?", icon: "🕒", color: "teal", layout: "sequence", items: [
    ["Ahora", "➡️", "Ahora"], ["Después", "🕒", "Después"], ["Más tarde", "🕓", "Más tarde"],
    ["Primero", "1️⃣", "Primero"], ["Luego", "🔜", "Luego"], ["Terminar", "🏁", "Terminé"]
  ] },
  { name: "Partes de la escuela", title: "Escuela: zonas", icon: "🏫", color: "purple", layout: "school", items: [
    ["Entrada", "🚪", "Quiero ir a la entrada"], ["Comedor", "🍽️", "Quiero ir al comedor"], ["Gimnasio", "🏀", "Quiero ir al gimnasio"], ["Enfermería", "🩹", "Quiero ir a enfermería"],
    ["Biblioteca", "📚", "Quiero ir a la biblioteca"], ["Salón", "🏫", "Quiero ir al salón"], ["Patio", "🛝", "Quiero ir al patio"], ["Baño", "🚻", "Quiero ir al baño"]
  ] },
  { name: "Aula: objetos", title: "Aula: objetos", icon: "✏️", color: "green", layout: "classroom", items: [
    ["Silla", "🪑", "Quiero sentarme"], ["Escritorio", "🪑", "Quiero ir a mi escritorio"], ["Pizarrón", "🧑‍🏫", "Quiero ver el pizarrón"],
    ["Mochila", "🎒", "Necesito mi mochila"], ["Cuaderno", "📓", "Necesito mi cuaderno"], ["Lápiz", "✏️", "Necesito un lápiz"],
    ["Libro", "📖", "Quiero leer un libro"], ["Regla", "📏", "Necesito una regla"], ["Borrador", "🧽", "Necesito un borrador"], ["Colores", "🖍️", "Necesito mis colores"]
  ] },
  { name: "Bebidas", icon: "🥤", color: "teal", items: [
    ["Agua", "💧", "Quiero tomar agua"], ["Leche", "🥛", "Quiero tomar leche"]
  ] },
  { name: "Necesito", icon: "🧍", color: "yellow", items: [
    ["Ayuda", "🆘", "Necesito ayuda"], ["Descanso", "🛌", "Necesito descansar"], ["Alto", "🛑", "Quiero que pares"],
    ["Terminé", "🏁", "Terminé"], ["No quiero", "❌", "No quiero"], ["Espacio", "↔️", "Necesito espacio"],
    ["Me duele", "🤕", "Me duele"], ["Baño", "🚽", "Quiero ir al baño"], ["Agua", "💧", "Quiero agua"], ["Quiero", "💛", "Quiero"]
  ] },
  { name: "Siento", icon: "❤️", color: "pink", items: [
    ["Feliz", "🙂", "Estoy feliz"], ["Triste", "😢", "Estoy triste"], ["Enojado", "😠", "Estoy enojado"],
    ["Asustado", "😟", "Tengo miedo"], ["Nervioso", "😰", "Estoy nervioso"], ["Cansado", "😴", "Estoy cansado"],
    ["Molesto", "😣", "Estoy molesto"], ["Calmado", "😌", "Estoy tranquilo"], ["Me duele", "🤕", "Me duele"]
  ] },
  { name: "Me gusta", icon: "⭐", color: "green", items: [
    ["Música", "🎵", "Quiero escuchar música"], ["Tambor", "🥁", "Quiero tocar el tambor"], ["Audífonos", "🎧", "Quiero mis audífonos"],
    ["Videos", "📺", "Quiero ver un video"], ["Jugar", "🧸", "Quiero jugar"], ["Sensorial", "🪇", "Quiero jugar con esto"],
    ["Bailar", "💃", "Quiero bailar"], ["Instrumentos", "🎸", "Quiero tocar música"], ["Dibujar", "🎨", "Quiero dibujar"]
  ] },
  { name: "Personas", icon: "👥", color: "blue", items: [
    ["Mamá", "👩", "Quiero a mamá"], ["Papá", "👨", "Quiero a papá"], ["Maestra", "👩‍🏫", "Quiero hablar con mi maestra"], ["Compañeros", "🧑‍🤝‍🧑", "Quiero estar con mis compañeros"]
  ] },
  { name: "Escuela", icon: "🏫", color: "purple", items: [
    ["Trabajar", "🧑‍💻", "Quiero trabajar"], ["Jugar", "🧱", "Quiero jugar"], ["Recreo", "🛝", "Quiero ir al recreo"], ["Comer", "🥪", "Quiero comer"],
    ["Salir", "🚪", "Quiero salir"], ["Tarea", "📝", "Quiero hacer mi tarea"], ["Materiales", "🎒", "Necesito mis materiales"], ["Biblioteca", "📚", "Quiero ir a la biblioteca"]
  ] },
];

const board = document.querySelector("#board");
const phraseEl = document.querySelector("#phrase");
const voiceChoice = document.querySelector("#voiceChoice");
const voiceStatus = document.querySelector("#voiceStatus");
const tabButtons = [...document.querySelectorAll("[data-tab]")];
const tabPanels = [...document.querySelectorAll("[data-tab-panel]")];
let db;
let sentence = [];
let voices = [];
let installPrompt = null;
let customCategories = [];
let voiceTestRun = 0;
let settings = {
  displayMode: "both", speechMode: "word", voice: "", speed: 1,
  customTileColor: false, tileColor: "#f2d879", backgroundColor: "#f4f3ec",
  tileShape: "rounded", tileSize: "medium", tileFontSize: "medium",
  tileFontFamily: "system", backgroundImageFit: "cover", backgroundImageOpacity: 100
};
let backgroundImageUrl = null;
function selectTab(tabId) {
  for (const button of tabButtons) {
    const selected = button.dataset.tab === tabId;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  }
  for (const panel of tabPanels) {
    panel.hidden = panel.id !== tabId;
  }
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE)) database.createObjectStore(STORE, { keyPath: "id" });
      if (!database.objectStoreNames.contains(PREFERENCES_STORE)) database.createObjectStore(PREFERENCES_STORE, { keyPath: "key" });
    };
    request.onsuccess = () => { db = request.result; resolve(db); };
    request.onerror = () => reject(request.error);
  });
}

function preferenceRequest(mode, operation, value) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PREFERENCES_STORE, mode);
    const store = transaction.objectStore(PREFERENCES_STORE);
    const request = operation === "get" ? store.get(value)
      : operation === "put" ? store.put(value)
        : store.delete(value);
    let result;
    request.onsuccess = () => { result = request.result; };
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => resolve(result);
    transaction.onerror = () => reject(transaction.error || request.error);
    transaction.onabort = () => reject(transaction.error || new Error("La operación de preferencias se canceló."));
  });
}

function storeRequest(mode, operation, value) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE, mode);
    const store = transaction.objectStore(STORE);
    const request = operation === "all" ? store.getAll()
      : operation === "put" ? store.put(value)
        : store.delete(value);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function allCategories() {
  return [...categories, ...customCategories];
}

function renderCategoryOptions() {
  for (const selector of ["#itemCategory", "#actionCategory"]) {
    const categorySelect = document.querySelector(selector);
    categorySelect.replaceChildren();
    for (const category of allCategories()) categorySelect.add(new Option(category.name, category.name));
  }
}

function populateIconChoices() {
  for (const selector of ["#categoryIcon", "#actionIcon"]) {
    const iconSelect = document.querySelector(selector);
    iconSelect.replaceChildren();
    for (const [icon, label] of iconChoices) iconSelect.add(new Option(`${icon} ${label}`, icon));
  }
  document.querySelector("#categoryIcon").value = "✨";
  document.querySelector("#actionIcon").value = "🙂";
}

function renderCustomCategories() {
  const list = document.querySelector("#customCategories");
  list.replaceChildren();
  for (const category of customCategories) {
    const item = document.createElement("li");
    item.textContent = `${category.icon} ${category.name}`;
    list.append(item);
  }
}

function speak(text) {
  if (!("speechSynthesis" in window) || !text) {
    voiceStatus.textContent = "La voz no está disponible en este navegador. La comunicación visual sigue funcionando.";
    return;
  }
  voiceTestRun += 1;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const selected = voices.find(voice => voice.voiceURI === settings.voice);
  utterance.lang = selected?.lang || "es-MX";
  utterance.rate = Number(settings.speed) || 1;
  if (selected) utterance.voice = selected;
  window.speechSynthesis.speak(utterance);
}

function testAllVoices() {
  if (!("speechSynthesis" in window)) {
    voiceStatus.textContent = "Este navegador no ofrece síntesis de voz.";
    return;
  }
  loadVoices();
  const available = [...voices];
  if (!available.length) {
    voiceStatus.textContent = "No hay voces disponibles para probar. Actualiza la lista o instala voces en el dispositivo.";
    return;
  }
  const run = ++voiceTestRun;
  let index = 0;
  window.speechSynthesis.cancel();
  const speakNext = () => {
    if (run !== voiceTestRun) return;
    if (index >= available.length) {
      voiceStatus.textContent = `Prueba terminada: se probaron las ${available.length} voces disponibles.`;
      return;
    }
    const voice = available[index++];
    const utterance = new SpeechSynthesisUtterance(`Hola. Esta es la voz ${voice.name}.`);
    utterance.voice = voice;
    utterance.lang = voice.lang || "es-MX";
    utterance.rate = Number(settings.speed) || 1;
    voiceStatus.textContent = `Probando voz ${index} de ${available.length}: ${voice.name} (${voice.lang}).`;
    utterance.onend = speakNext;
    utterance.onerror = event => {
      if (run !== voiceTestRun) return;
      if (event.error !== "canceled" && event.error !== "interrupted") {
        console.error(`No se pudo reproducir la voz ${voice.name}.`, event.error);
      }
      speakNext();
    };
    window.speechSynthesis.speak(utterance);
  };
  speakNext();
}

function itemLabel(item) {
  return settings.speechMode === "phrase" && item.phrase ? item.phrase : item.name;
}

function renderBoard(customItems) {
  board.replaceChildren();
  const custom = customItems || [];
  const all = allCategories();
  const selectedOrder = ["Cuerpo", "Partes de la casa", "Partes de la escuela", "Aula: objetos", "Bebidas"];
  const selected = selectedOrder.map(name => all.find(category => category.name === name)).filter(Boolean);
  const selectedNames = new Set(selectedOrder);
  const orderedCategories = [...selected, ...all.filter(category => !selectedNames.has(category.name))];
  for (const category of orderedCategories) {
    const section = document.createElement("section");
    section.className = "category";
    section.dataset.color = category.color;
    section.dataset.category = category.name;
    if (category.layout) section.dataset.layout = category.layout;
    const heading = document.createElement("div");
    heading.className = "category-head";
    const icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = category.icon;
    const title = document.createElement("span");
    title.textContent = category.title || category.name;
    heading.append(icon, title);
    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.setAttribute("aria-label", `Agregar pictograma a ${category.name}`);
    addButton.textContent = "→";
    addButton.addEventListener("click", () => {
      document.querySelector("#itemCategory").value = category.name;
      selectTab("library");
      document.querySelector("#itemName").focus();
    });
    heading.append(addButton);
    const tiles = document.createElement("div");
    tiles.className = "tiles";
    const items = (category.items || []).map(([name, emoji, phrase]) => ({ id: `${category.name}-${name}-${phrase}`, name, emoji, phrase, category: category.name }));
    for (const item of [...items, ...custom.filter(entry => entry.category === category.name)]) {
      tiles.append(createTile(item));
    }
    section.append(heading, tiles);
    board.append(section);
  }
}

function createTile(item) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "tile";
  button.setAttribute("aria-label", `${item.name}${item.phrase ? `: ${item.phrase}` : ""}`);
  if (item.image instanceof Blob) {
    const image = document.createElement("img");
    image.src = URL.createObjectURL(item.image);
    image.alt = "";
    button.append(image);
  } else {
    const symbol = document.createElement("span");
    symbol.className = "symbol";
    symbol.setAttribute("aria-hidden", "true");
    symbol.textContent = item.emoji || "🖼️";
    button.append(symbol);
  }
  const mode = settings.displayMode;
  if (mode !== "image") {
    const name = document.createElement("strong");
    name.textContent = item.name;
    button.append(name);
  }
  if (mode === "phrase" && item.phrase) {
    const phrase = document.createElement("small");
    phrase.textContent = item.phrase;
    button.append(phrase);
  }
  button.addEventListener("click", () => {
    sentence.push(item);
    renderSentence();
    speak(itemLabel(item));
  });
  return button;
}

function renderSentence() {
  phraseEl.replaceChildren();
  if (!sentence.length) {
    const empty = document.createElement("span");
    empty.className = "phrase-empty";
    empty.textContent = "Selecciona un pictograma para comenzar.";
    phraseEl.append(empty);
    return;
  }
  for (const item of sentence) {
    const token = document.createElement("span");
    token.className = "phrase-item";
    const symbol = document.createElement("span");
    symbol.setAttribute("aria-hidden", "true");
    symbol.textContent = item.emoji || "🖼️";
    const text = document.createElement("span");
    text.textContent = item.name;
    token.append(symbol, text);
    phraseEl.append(token);
  }
}

function renderLibrary(items) {
  const list = document.querySelector("#libraryItems");
  list.replaceChildren();
  for (const item of items) {
    const card = document.createElement("article");
    card.className = "library-item";
    if (item.image instanceof Blob) {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(item.image);
      image.alt = "";
      card.append(image);
    }
    const label = document.createElement("strong");
    label.textContent = item.name;
    const category = document.createElement("span");
    category.className = "note";
    category.textContent = item.category;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Eliminar";
    remove.setAttribute("aria-label", `Eliminar ${item.name}`);
    remove.addEventListener("click", async () => {
      try {
        await storeRequest("readwrite", "delete", item.id);
        await refreshItems();
        document.querySelector("#libraryMessage").textContent = `${item.name} se eliminó de este dispositivo.`;
      } catch (error) {
        showError("#libraryMessage", "No se pudo eliminar la imagen.", error);
      }
    });
    card.append(label, category, remove);
    list.append(card);
  }
}

function validColor(value, fallback) {
  return /^#[\da-f]{6}$/i.test(value) ? value : fallback;
}

function applyAppearance() {
  const root = document.documentElement;
  root.style.setProperty("--paper", validColor(settings.backgroundColor, "#f4f3ec"));
  if (settings.customTileColor) root.style.setProperty("--tile-custom", validColor(settings.tileColor, "#f2d879"));
  else root.style.removeProperty("--tile-custom");
  root.dataset.tileShape = tileShapes.has(settings.tileShape) ? settings.tileShape : "rounded";
  root.dataset.tileSize = tileSizes.has(settings.tileSize) ? settings.tileSize : "medium";
  const fontSize = fontSizes.has(settings.tileFontSize) ? settings.tileFontSize : "medium";
  const fontFamily = fontFamilies[settings.tileFontFamily] || fontFamilies.system;
  root.style.setProperty("--tile-font-size", fontSizeValues[fontSize]);
  root.style.setProperty("--tile-font-family", fontFamily);
  const backgroundFit = backgroundFits.has(settings.backgroundImageFit) ? settings.backgroundImageFit : "cover";
  root.style.setProperty("--board-background-size", backgroundFit === "fill" ? "100% 100%" : backgroundFit);
  const preview = document.querySelector("#backgroundImagePreview");
  preview.style.objectFit = backgroundFit === "fill" ? "fill" : backgroundFit;
  const imageOpacity = Math.min(100, Math.max(20, Number(settings.backgroundImageOpacity) || 100));
  root.style.setProperty("--board-background-opacity", String(imageOpacity / 100));
  document.querySelector("#backgroundImageOpacity").value = String(imageOpacity);
  document.querySelector("#backgroundImageOpacityValue").value = `${imageOpacity}%`;
}

function applyBackgroundImage(image) {
  if (backgroundImageUrl) URL.revokeObjectURL(backgroundImageUrl);
  backgroundImageUrl = image instanceof Blob ? URL.createObjectURL(image) : null;
  const preview = document.querySelector("#backgroundImagePreview");
  if (backgroundImageUrl) {
    document.documentElement.style.setProperty("--board-background-image", `url("${backgroundImageUrl}")`);
    preview.src = backgroundImageUrl;
    preview.hidden = false;
  } else {
    document.documentElement.style.removeProperty("--board-background-image");
    preview.removeAttribute("src");
    preview.hidden = true;
  }
}

async function refreshItems() {
  const items = await storeRequest("readonly", "all");
  renderBoard(items);
  renderLibrary(items);
  renderCustomCategories();
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    settings = { ...settings, ...saved };
  } catch (error) {
    console.error("No se pudieron leer las preferencias guardadas.", error);
  }
  document.querySelector("#displayMode").value = settings.displayMode;
  document.querySelector("#speechMode").value = settings.speechMode;
  document.querySelector("#voiceSpeed").value = settings.speed;
  document.querySelector("#customTileColor").checked = Boolean(settings.customTileColor);
  document.querySelector("#tileColor").value = validColor(settings.tileColor, "#f2d879");
  document.querySelector("#tileColor").disabled = !settings.customTileColor;
  document.querySelector("#backgroundColor").value = validColor(settings.backgroundColor, "#f4f3ec");
  if (!tileShapes.has(settings.tileShape)) settings.tileShape = "rounded";
  document.querySelector("#tileShape").value = settings.tileShape;
  if (!tileSizes.has(settings.tileSize)) settings.tileSize = "medium";
  document.querySelector("#tileSize").value = settings.tileSize;
  if (!fontSizes.has(settings.tileFontSize)) settings.tileFontSize = "medium";
  document.querySelector("#tileFontSize").value = settings.tileFontSize;
  if (!Object.prototype.hasOwnProperty.call(fontFamilies, settings.tileFontFamily)) settings.tileFontFamily = "system";
  document.querySelector("#tileFontFamily").value = settings.tileFontFamily;
  if (!backgroundFits.has(settings.backgroundImageFit)) settings.backgroundImageFit = "cover";
  document.querySelector("#backgroundImageFit").value = settings.backgroundImageFit;
  settings.backgroundImageOpacity = Math.min(100, Math.max(20, Number(settings.backgroundImageOpacity) || 100));
  applyAppearance();
}

function saveSettings(refreshBoard = true) {
  settings.displayMode = document.querySelector("#displayMode").value;
  settings.speechMode = document.querySelector("#speechMode").value;
  settings.voice = voiceChoice.value;
  settings.speed = Number(document.querySelector("#voiceSpeed").value);
  settings.customTileColor = document.querySelector("#customTileColor").checked;
  settings.tileColor = validColor(document.querySelector("#tileColor").value, "#f2d879");
  settings.backgroundColor = validColor(document.querySelector("#backgroundColor").value, "#f4f3ec");
  settings.tileShape = tileShapes.has(document.querySelector("#tileShape").value)
    ? document.querySelector("#tileShape").value
    : "rounded";
  settings.tileSize = tileSizes.has(document.querySelector("#tileSize").value)
    ? document.querySelector("#tileSize").value
    : "medium";
  settings.tileFontSize = fontSizes.has(document.querySelector("#tileFontSize").value)
    ? document.querySelector("#tileFontSize").value
    : "medium";
  settings.tileFontFamily = Object.prototype.hasOwnProperty.call(fontFamilies, document.querySelector("#tileFontFamily").value)
    ? document.querySelector("#tileFontFamily").value
    : "system";
  settings.backgroundImageFit = backgroundFits.has(document.querySelector("#backgroundImageFit").value)
    ? document.querySelector("#backgroundImageFit").value
    : "cover";
  settings.backgroundImageOpacity = Number(document.querySelector("#backgroundImageOpacity").value);
  document.querySelector("#tileColor").disabled = !settings.customTileColor;
  applyAppearance();
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  if (refreshBoard) {
    refreshItems().catch(error => showError("#libraryMessage", "No se pudo actualizar el tablero.", error));
  }
}

function loadVoices() {
  if (!("speechSynthesis" in window)) {
    voiceChoice.disabled = true;
    voiceStatus.textContent = "Este navegador no ofrece síntesis de voz.";
    return;
  }
  voices = window.speechSynthesis.getVoices();
  const previous = settings.voice;
  voiceChoice.replaceChildren(new Option("Voz predeterminada", ""));
  const spanishVoices = voices.filter(entry => entry.lang.toLowerCase().startsWith("es"))
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
  const otherVoices = voices.filter(entry => !entry.lang.toLowerCase().startsWith("es"))
    .sort((a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name));
  for (const [label, available] of [["Español", spanishVoices], ["Otros idiomas disponibles", otherVoices]]) {
    if (!available.length) continue;
    const group = document.createElement("optgroup");
    group.label = label;
    for (const voice of available) {
      const option = new Option(`${voice.name} (${voice.lang})${voice.default ? " · predeterminada" : ""}`, voice.voiceURI);
      group.append(option);
    }
    voiceChoice.append(group);
  }
  voiceChoice.value = voices.some(voice => voice.voiceURI === previous) ? previous : "";
  settings.voice = voiceChoice.value;
  if (!voices.length) {
    voiceStatus.textContent = "No se encontraron voces disponibles. Instala más voces en la configuración de voz del dispositivo y pulsa “Actualizar voces disponibles”.";
  } else if (!spanishVoices.length) {
    voiceStatus.textContent = `${voices.length} voces disponibles en el dispositivo. No se encontró una voz en español; instala una en la configuración de voz del dispositivo.`;
  } else {
    voiceStatus.textContent = `${voices.length} voces disponibles en el dispositivo; ${spanishVoices.length} en español. Para añadir más, instala voces en el sistema y pulsa “Actualizar voces disponibles”. Algunas requieren conexión.`;
  }
}

function showError(target, message, error) {
  console.error(message, error);
  document.querySelector(target).textContent = `${message} ${error?.message || ""}`.trim();
}

function setConnection() {
  const online = navigator.onLine;
  document.querySelector("#connection").textContent = online ? "● En línea" : "● Sin conexión";
}

async function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function dataUrlToBlob(dataUrl) {
  const [metadata, data] = dataUrl.split(",");
  const mime = metadata.match(/data:(.*?);base64/)?.[1] || "application/octet-stream";
  const binary = atob(data);
  const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
  return new Blob([bytes], { type: mime });
}

async function initialize() {
  selectTab("communicator");
  loadSettings();
  populateIconChoices();
  renderCategoryOptions();
  renderSentence();
  renderBoard([]);
  try {
    await openDatabase();
    const savedCategories = await preferenceRequest("readonly", "get", "custom-categories");
    if (Array.isArray(savedCategories?.categories)) {
      const names = new Set(categories.map(category => category.name.toLocaleLowerCase()));
      customCategories = savedCategories.categories.filter(category => {
        if (!category || typeof category.name !== "string" || !category.name.trim() ||
            category.name.length > 40 || typeof category.icon !== "string" ||
            category.icon.length > 8 || !["yellow", "blue", "pink", "green", "purple", "teal"].includes(category.color)) return false;
        const normalized = category.name.trim().toLocaleLowerCase();
        if (names.has(normalized)) return false;
        names.add(normalized);
        category.name = category.name.trim();
        category.title = category.name;
        return true;
      });
    }
    renderCategoryOptions();
    try {
      const savedBackground = await preferenceRequest("readonly", "get", "background-image");
      if (savedBackground?.image instanceof Blob) applyBackgroundImage(savedBackground.image);
    } catch (error) {
      showError("#backgroundImageStatus", "No se pudo cargar la imagen de fondo guardada.", error);
    }
    await refreshItems();
  } catch (error) {
    showError("#libraryMessage", "No se pudo abrir la biblioteca local.", error);
  }
  if ("speechSynthesis" in window) {
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    window.setTimeout(loadVoices, 1000);
    window.setTimeout(loadVoices, 3000);
  }
  setConnection();
  window.addEventListener("online", setConnection);
  window.addEventListener("offline", setConnection);
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./sw.js").catch(error => {
      console.error("No se pudo activar el modo sin conexión.", error);
      voiceStatus.textContent = "No se pudo preparar la caché sin conexión. Comprueba que la app se sirva mediante HTTPS o localhost.";
    });
  }
}

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  installPrompt = event;
  document.querySelector("#installApp").classList.remove("hidden");
  document.querySelector("#installStatus").textContent = "Convexa se puede instalar en este dispositivo.";
});
window.addEventListener("appinstalled", () => {
  installPrompt = null;
  document.querySelector("#installApp").classList.add("hidden");
  document.querySelector("#installStatus").textContent = "Convexa quedó instalada en este dispositivo.";
});
document.querySelector("#installApp").addEventListener("click", async () => {
  if (!installPrompt) return;
  await installPrompt.prompt();
  const choice = await installPrompt.userChoice;
  document.querySelector("#installStatus").textContent =
    choice.outcome === "accepted" ? "Se inició la instalación de Convexa." : "La instalación se canceló; puedes intentarlo desde el menú del navegador.";
  installPrompt = null;
  document.querySelector("#installApp").classList.add("hidden");
});

tabButtons.forEach(button => {
  button.addEventListener("click", () => selectTab(button.dataset.tab));
  button.addEventListener("keydown", event => {
    const currentIndex = tabButtons.indexOf(button);
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabButtons.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabButtons.length - 1;
    else return;
    event.preventDefault();
    selectTab(tabButtons[nextIndex].dataset.tab);
    tabButtons.find(tab => tab.getAttribute("aria-selected") === "true").focus();
  });
});

document.querySelector("#addForm").addEventListener("submit", async event => {
  event.preventDefault();
  const file = document.querySelector("#imageFile").files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    document.querySelector("#libraryMessage").textContent = "Selecciona un archivo de imagen válido.";
    return;
  }
  const item = {
    id: crypto.randomUUID(),
    name: document.querySelector("#itemName").value.trim(),
    phrase: document.querySelector("#itemPhrase").value.trim(),
    category: document.querySelector("#itemCategory").value,
    image: file
  };
  if (!item.name) return;
  try {
    await storeRequest("readwrite", "put", item);
    event.target.reset();
    document.querySelector("#libraryMessage").textContent = `${item.name} se guardó para usar sin conexión.`;
    await refreshItems();
  } catch (error) {
    showError("#libraryMessage", "No se pudo guardar la imagen. Revisa el espacio disponible.", error);
  }
});

document.querySelector("#addActionForm").addEventListener("submit", async event => {
  event.preventDefault();
  const item = {
    id: crypto.randomUUID(),
    name: document.querySelector("#actionName").value.trim(),
    phrase: document.querySelector("#actionPhrase").value.trim(),
    category: document.querySelector("#actionCategory").value,
    emoji: document.querySelector("#actionIcon").value,
    image: null
  };
  if (!item.name || !allCategories().some(category => category.name === item.category) ||
      !iconChoices.some(([icon]) => icon === item.emoji)) {
    document.querySelector("#actionMessage").textContent = "Revisa el nombre, tablero y el icono de la acción.";
    return;
  }
  try {
    await storeRequest("readwrite", "put", item);
    event.target.reset();
    document.querySelector("#actionIcon").value = "🙂";
    document.querySelector("#actionMessage").textContent = `Se añadió “${item.name}” al tablero ${item.category}.`;
    await refreshItems();
  } catch (error) {
    showError("#actionMessage", "No se pudo añadir la acción. Revisa el espacio disponible.", error);
  }
});

document.querySelector("#addCategoryForm").addEventListener("submit", async event => {
  event.preventDefault();
  const name = document.querySelector("#categoryName").value.trim();
  const normalizedName = name.toLocaleLowerCase();
  const nameExists = allCategories().some(category => category.name.toLocaleLowerCase() === normalizedName);
  if (!name || nameExists) {
    document.querySelector("#categoryMessage").textContent = name
      ? "Ya existe un tablero con ese nombre."
      : "Escribe un nombre para el tablero.";
    return;
  }
  const category = {
    name,
    title: name,
    icon: document.querySelector("#categoryIcon").value.trim() || "✨",
    color: document.querySelector("#categoryColor").value
  };
  try {
    customCategories.push(category);
    await preferenceRequest("readwrite", "put", { key: "custom-categories", categories: customCategories });
    renderCategoryOptions();
    await refreshItems();
    event.target.reset();
    document.querySelector("#categoryIcon").value = "✨";
    document.querySelector("#categoryMessage").textContent = `Se creó el tablero “${name}”.`;
  } catch (error) {
    customCategories = customCategories.filter(entry => entry !== category);
    showError("#categoryMessage", "No se pudo guardar el tablero.", error);
  }
});

document.querySelector("#displayMode").addEventListener("change", saveSettings);
document.querySelector("#speechMode").addEventListener("change", () => saveSettings(false));
document.querySelector("#voiceSpeed").addEventListener("input", () => saveSettings(false));
document.querySelector("#customTileColor").addEventListener("change", () => saveSettings(false));
document.querySelector("#tileColor").addEventListener("input", () => saveSettings(false));
document.querySelector("#backgroundColor").addEventListener("input", () => saveSettings(false));
document.querySelector("#tileShape").addEventListener("change", () => saveSettings(false));
document.querySelector("#tileSize").addEventListener("change", () => saveSettings(false));
document.querySelector("#tileFontSize").addEventListener("change", () => saveSettings(false));
document.querySelector("#tileFontFamily").addEventListener("change", () => saveSettings(false));
document.querySelector("#backgroundImageFit").addEventListener("change", () => saveSettings(false));
document.querySelector("#backgroundImageOpacity").addEventListener("input", () => saveSettings(false));
document.querySelector("#backgroundImageFile").addEventListener("change", async event => {
  const image = event.target.files[0];
  if (!image) return;
  if (!image.type.startsWith("image/")) {
    document.querySelector("#backgroundImageStatus").textContent = "Selecciona un archivo de imagen válido.";
    event.target.value = "";
    return;
  }
  try {
    await preferenceRequest("readwrite", "put", { key: "background-image", image });
    applyBackgroundImage(image);
    document.querySelector("#backgroundImageStatus").textContent = "La imagen de fondo se guardó en este dispositivo.";
  } catch (error) {
    showError("#backgroundImageStatus", "No se pudo guardar la imagen de fondo. Revisa el espacio disponible.", error);
  }
});
document.querySelector("#removeBackgroundImage").addEventListener("click", async () => {
  try {
    await preferenceRequest("readwrite", "delete", "background-image");
    applyBackgroundImage(null);
    document.querySelector("#backgroundImageFile").value = "";
    document.querySelector("#backgroundImageStatus").textContent = "Se quitó la imagen de fondo.";
  } catch (error) {
    showError("#backgroundImageStatus", "No se pudo quitar la imagen de fondo.", error);
  }
});
document.querySelector("#resetAppearance").addEventListener("click", async () => {
  settings.customTileColor = false;
  settings.tileColor = "#f2d879";
  settings.backgroundColor = "#f4f3ec";
  settings.tileShape = "rounded";
  settings.tileSize = "medium";
  settings.tileFontSize = "medium";
  settings.tileFontFamily = "system";
  settings.backgroundImageFit = "cover";
  settings.backgroundImageOpacity = 100;
  document.querySelector("#customTileColor").checked = false;
  document.querySelector("#tileColor").value = settings.tileColor;
  document.querySelector("#backgroundColor").value = settings.backgroundColor;
  document.querySelector("#tileShape").value = settings.tileShape;
  document.querySelector("#tileSize").value = settings.tileSize;
  document.querySelector("#tileFontSize").value = settings.tileFontSize;
  document.querySelector("#tileFontFamily").value = settings.tileFontFamily;
  document.querySelector("#backgroundImageFit").value = settings.backgroundImageFit;
  document.querySelector("#backgroundImageOpacity").value = String(settings.backgroundImageOpacity);
  document.querySelector("#backgroundImageFile").value = "";
  try {
    await preferenceRequest("readwrite", "delete", "background-image");
    applyBackgroundImage(null);
    document.querySelector("#backgroundImageStatus").textContent = "Se restauró la apariencia original.";
  } catch (error) {
    showError("#backgroundImageStatus", "No se pudo quitar la imagen de fondo.", error);
  }
  saveSettings(false);
});
voiceChoice.addEventListener("change", () => saveSettings(false));
document.querySelector("#testVoice").addEventListener("click", () => speak("Hola, esta es la voz de Convexa."));
document.querySelector("#testAllVoices").addEventListener("click", testAllVoices);
document.querySelector("#refreshVoices").addEventListener("click", () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.getVoices();
    loadVoices();
  }
});
voiceChoice.addEventListener("focus", loadVoices);
document.querySelector("#welcomeHome").addEventListener("click", () => selectTab("communicator"));
document.querySelector("#settingsOpen").addEventListener("click", () => selectTab("preferences"));
document.querySelector("#speakPhrase").addEventListener("click", () => speak(sentence.map(itemLabel).join(" ")));
document.querySelector("#undoPhrase").addEventListener("click", () => { sentence.pop(); renderSentence(); });
document.querySelector("#clearPhrase").addEventListener("click", () => { sentence = []; renderSentence(); });
document.querySelectorAll("[data-quick]").forEach(button => button.addEventListener("click", () => {
  const text = button.dataset.quick;
  if (text === "Inicio") {
    selectTab("communicator");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  else if (text === "Hablar") speak(sentence.map(itemLabel).join(" "));
  else {
    sentence.push({ name: text, emoji: button.querySelector(".symbol").textContent, phrase: text });
    renderSentence();
    speak(text);
  }
}));

document.querySelector("#exportData").addEventListener("click", async () => {
  try {
    const items = await storeRequest("readonly", "all");
    const portable = await Promise.all(items.map(async item => ({
      ...item,
      image: item.image instanceof Blob ? await blobToDataUrl(item.image) : null
    })));
    const data = new Blob([JSON.stringify({ version: 2, categories: customCategories, items: portable })], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(data);
    link.download = "convexa-respaldo.json";
    link.click();
    URL.revokeObjectURL(link.href);
    document.querySelector("#backupMessage").textContent = "Respaldo descargado.";
  } catch (error) {
    showError("#backupMessage", "No se pudo crear el respaldo.", error);
  }
});

document.querySelector("#importData").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const backup = JSON.parse(await file.text());
    if (![1, 2].includes(backup.version) || !Array.isArray(backup.items) ||
        (backup.version === 2 && !Array.isArray(backup.categories))) {
      throw new Error("Formato de respaldo no compatible.");
    }
    const importedCategories = backup.version === 2 ? backup.categories : [];
    const validColors = new Set(["yellow", "blue", "pink", "green", "purple", "teal"]);
    const importedNames = new Set();
    for (const category of importedCategories) {
      const normalizedName = typeof category?.name === "string" ? category.name.trim().toLocaleLowerCase() : "";
      if (!normalizedName || normalizedName.length > 40 || typeof category.icon !== "string" ||
          category.icon.length > 8 || !validColors.has(category.color) ||
          categories.some(entry => entry.name.toLocaleLowerCase() === normalizedName) ||
          importedNames.has(normalizedName)) {
        throw new Error("El respaldo contiene un tablero con datos no válidos.");
      }
      category.name = category.name.trim();
      category.title = category.name;
      importedNames.add(normalizedName);
    }
    const mergedCategories = [...customCategories];
    for (const category of importedCategories) {
      const index = mergedCategories.findIndex(entry => entry.name.toLocaleLowerCase() === category.name.toLocaleLowerCase());
      if (index < 0) mergedCategories.push(category);
      else mergedCategories[index] = category;
    }
    const acceptedNames = new Set([...categories, ...mergedCategories].map(category => category.name));
    for (const item of backup.items) {
      if (typeof item.name !== "string" || !item.name.trim() ||
          typeof item.category !== "string" || !acceptedNames.has(item.category)) {
        throw new Error("El respaldo contiene un pictograma con datos no válidos.");
      }
      if (typeof item.image === "string") item.image = dataUrlToBlob(item.image);
      else if (!(item.image instanceof Blob)) item.image = null;
      item.id = typeof item.id === "string" ? item.id : crypto.randomUUID();
    }
    if (importedCategories.length) {
      await preferenceRequest("readwrite", "put", { key: "custom-categories", categories: mergedCategories });
      customCategories = mergedCategories;
      renderCategoryOptions();
    }
    for (const item of backup.items) await storeRequest("readwrite", "put", item);
    document.querySelector("#backupMessage").textContent = "Vocabulario restaurado.";
    await refreshItems();
  } catch (error) {
    showError("#backupMessage", "No se pudo restaurar el respaldo.", error);
  } finally {
    event.target.value = "";
  }
});

initialize();
