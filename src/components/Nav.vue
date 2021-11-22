<template>
  <div class="nav">
    <span><button @click="toggleMenu()">MENU</button></span>
    <span>FILTER</span>
    <span>SEARCH</span>
    <span>+NEWTASK</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Nav',
  props: {
    msg: String,
  },
  methods: {
    toggleMenu() {
      this.$root.$emit('toggleSidebar');
    },
  },
});
</script>

<style scoped lang="scss">
.nav {
  border-bottom: 1px solid purple;
  width: 100%;
  padding: 5px 0 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
