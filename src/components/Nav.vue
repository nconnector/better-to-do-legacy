<template>
  <div class="nav">
    <span>
      <button @click="toggleMenu()">MENU</button>
    </span>
    <span>
      <button
        @click="setView('to-do')"
        :class="currentView === 'to-do' ? 'active' : ''"
      >
        To-Do
      </button>
    </span>
    <span>
      <button
        @click="setView('notes')"
        :class="currentView === 'notes' ? 'active' : ''"
      >
        Notes
      </button>
    </span>
    <span><button>FILTER</button></span>
    <span><button>SEARCH</button></span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { View } from '../store/index'

export default Vue.extend({
  name: 'Nav',
  computed: {
    currentView() { return this.$store.state.currentView }
  },
  methods: {
    toggleMenu() {
      this.$root.$emit('toggleSidebar');
    },
    setView(view: View) {
      this.$store.commit('setView', view)
    },
  },
});
</script>

<style scoped lang="scss">
.nav {
  border-top: .2em solid rgba(0, 0, 0, 0.1);
  border-bottom: .2em solid rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  & > span {
    width: 100%;
    & > button {
      width: 100%;
      padding: .5em 0;
      background: none;
      border: none;
      border-radius: .2em;
    }
  }
}
.active {
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.1) !important;
}
</style>
