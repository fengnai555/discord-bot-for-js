import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    bot: null,
    commandsActionMap: null,
  }),
  getters: {
  },
  actions: {
  },
})