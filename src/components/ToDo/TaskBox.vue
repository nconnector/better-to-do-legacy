<template>
  <div
    @drop="drop($event)"
    @dragover.prevent
    @dragenter.prevent
  >
    <div class="header">
      {{ header }}
    </div>
    <div class="legend">
      {{ legend }}
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Taskbox',
  props: {
    header: { type: String, required: true },
    legend: { type: String, required: true },
    group: { type: String, required: true }
  },
  methods: {
    drop (e:DragEvent ) {
      const id: number = parseInt(e?.dataTransfer?.getData('itemID') || '0')
      this.$store.commit('modifyTicket', { id, group: this.group })
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  font-size: 18px;
  font-weight: 700;
  padding-top: 1em;
}
.legend {
  font-size: 14px;
  padding: 0.6em 0 0.4em 0;
}
.content {
  font-size: 14px;
  margin-top: 0.5em;
  padding: 0 0.5em 0.5em 0.5em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5em;
}
</style>
