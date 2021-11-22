<template>
  <div class="notes">
    <div class="label">
      DAILY
    </div>
    <div class="label">
      PEOPLE
    </div>
    <div class="label">
      EVENTS
    </div>
    <div
      class="notes-group daily"
    >
      <NoteDraggable
        v-for="note in notesDaily"
        @click="setCurrentNote(note)"
        :key="note.id"
        :item="note"
      />
    </div>
    <div
      class="notes-group people"
    >
      <NoteDraggable
        v-for="note in notesPeople"
        @click="setCurrentNote(note)"
        :key="note.id"
        :item="note"
      />
    </div>
    <div
      class="notes-group events"
    >
      <NoteDraggable
        v-for="note in notesEvents"
        @click="setCurrentNote(note)"
        :key="note.id"
        :item="note"
      />
    </div>
    <transition name="active">
      <Overlay
        v-if="currentNote"
        @hide-overlay="clearCurrentNote"
      >
        <NoteExpanded :note="currentNote" />
      </Overlay>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Note } from '../../store/index';
import Overlay from '../Overlay.vue';
import NoteDraggable from './NoteDraggable.vue'
import NoteExpanded from './NoteExpanded.vue'

export default Vue.extend({
  name: 'ToDo',
  components: {
    Overlay,
    NoteDraggable,
    NoteExpanded
  },
  data () {
    return {
      currentNote: null as Note | null
    }
  },
  computed: {
    notesDaily (): Note[] {
      return this.$store.state.notes.filter((note: Note) => note.group === 'daily');
    },
    notesEvents (): Note[] {
      return this.$store.state.notes.filter((note: Note) => note.group === 'event');
    },
    notesPeople (): Note[] {
      return this.$store.state.notes.filter((note: Note) => note.group === 'person');
    },
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
.container {
  width: 100%;
}
.notes {
  padding: 0.5em;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 30px 1fr;
  grid-gap: 0.5em;

  > .notes-group {
    gap: 0.5em;
    padding: 0.5em;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;

    &.daily, &.people, &.events {
      background-color: rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
  }
}
.label {
  // background-color: rgb(216, 216, 216);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  grid-row: 1;

  &.v {
    writing-mode: vertical-lr;
    text-orientation: sideways;
  }
}
</style>
