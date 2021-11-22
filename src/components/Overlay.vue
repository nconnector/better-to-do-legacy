<template>
  <div
    class="overlay"
    @click="click($event.target)"
    @keydown.esc="$emit('hide-overlay')"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Overlay',
  methods: {
    // Hide overlay on click to gray area 
    click(target: Element) {
      if (target.className === 'overlay') {
        this.$emit('hide-overlay')
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.overlay{
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(1, 1, 1, 0.3);
  z-index: 1;
}
</style>
