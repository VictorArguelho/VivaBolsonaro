export function saveData(key, data) {
  try {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
  } catch (err) {
    console.error('Erro ao salvar:', err);
  }
}

export function loadData(key, defaultValue = null) {
  try {
    const json = localStorage.getItem(key);

    if (!json) return defaultValue;

    return JSON.parse(json);
  } catch (err) {
    console.error('Erro ao carregar:', err);
    return defaultValue;
  }
}
