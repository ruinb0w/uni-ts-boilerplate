import { defineStore } from "pinia";
import { reactive, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  const state = reactive({
    count: 0,
  });

  function increment() {
    state.count++;
  }

  function get(key) {
    if (state[key] == undefined) throw `there is no ${key} in counter's state`;
    return computed(() => state[key]);
  }

  return { state, increment, get };
});
