import { defineStore } from 'pinia';

export const useStoreThemeSwitch = defineStore('storeThemeSwitch', {
  state: () => {
    return {
      darkMode: true
    };
  }
});
