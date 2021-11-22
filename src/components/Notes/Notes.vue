<template>
  <div class="notes">
    <transition name="active">
        <Overlay
          v-if="currentNote"
          @hide-overlay="clearCurrentNote"
        >
          <!-- <NoteExpanded :ticket="currentNote" /> -->
        </Overlay>
      </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Note } from '../../store/index';
import Overlay from '../Overlay.vue';

export default Vue.extend({
  name: 'ToDo',
  components: {
    Overlay,
  },
  data () {
    return {
      currentNote: null as Note | null
    }
  },
  computed: {
  },
  methods: {
    setCurrentNote(note: Note) {
      this.currentNote = note;
    },
    clearCurrentNote() {
      this.currentNote = null;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.to-do {
  padding: 0.5em;
  width: 100%;
  display: grid;
  grid-template-columns: 30px 1fr 1fr;
  grid-template-rows: 30px 1fr 1fr;
  grid-gap: 0.5em;

  > .task-box {
    border-radius: 0.5em;

    &.green {
      background-color: #a4d39d;
    }
    &.red {
      background-color: #ffacacb8;
    }
  }
  > .label {
    // background-color: rgb(216, 216, 216);
    display: flex;
    justify-content: center;
    align-items: center;

    &.v {
      writing-mode: vertical-lr;
      text-orientation: sideways;
    }
  }
}
</style>
