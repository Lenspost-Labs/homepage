import { removeFromLocalStorage } from './localStorage';

// remove all data from localstorage

export const clearAllLocalStorageData = () => {
  removeFromLocalStorage('jwt');
  removeFromLocalStorage('userId');
  removeFromLocalStorage('username');
  removeFromLocalStorage('jwtTimestamp');
};
