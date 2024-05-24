// save data to local storage
export const saveToLocalStorage = (key: string, value: string) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {}
};
// get data from local storage
export const getFromLocalStorage = (key: string) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) return undefined;
    return JSON.parse(serializedValue);
  } catch (error) {
    return undefined;
  }
};

// remove data from local storage
export const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {}
};
