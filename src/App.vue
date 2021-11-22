<template>
  <div id="app">
    <div class="row">
      <Nav />
    </div>
    <div class="row main">
      <transition name="active">
        <Sidebar v-if="showSidebar" />
      </transition>
      <component :is="mainContentComponent" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Nav from './components/Nav.vue';
import Sidebar from './components/Sidebar.vue';
import ToDo from './components/ToDo/ToDo.vue';
import Notes from './components/Notes/Notes.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Nav,
    Sidebar,
    ToDo,
    Notes,
  },
  data () {
    return {
      showSidebar: false,
    };
  },
  computed: {
      mainContentComponent() {
        switch(this.$store.state.currentView) {
          case 'to-do':
            return ToDo;
          case 'notes':
            return Notes;
          default:
            return ToDo;
        }
      },
  },
  mounted () {
    this.$root.$on('toggleSidebar', () => {
      this.showSidebar = !this.showSidebar;
    });
  },
});
</script>

<style lang="scss">
body {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: auto;
  position: relative;
}
.row {
  display: flex;
  flex-direction: row;
  &.main {
    height: 100%;
  }
}
</style>
