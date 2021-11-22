<template>
  <div 
    class="note-expanded"
    @keydown.ctrl.enter="modifyNote"
    @keydown.ctrl.s.prevent="modifyNote"
    @keydown.tab.prevent="tabulate($event)"
  >
    <span class="header">
      <input 
        v-model="noteModified.name"
        :placeholder="noteModified.name"
        :size="noteModified.name.length"
        @keydown.enter="modifyNote"
      />
      <div class="help">
        <span>✔️</span>
        <span>❌</span>
      </div>
    </span>
    <div class='content-box'>
      <span :class="['tooltip', showCheckMark ? 'active' : '']">
        ✅ changes saved
      </span>
      <textarea
        ref="content"
        class="content"
        v-model="noteModified.content"
        :placeholder="noteModified.content"
      />
    </div>
    <div class="buttons">
      <button @click="modifyNote">
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Note } from '../../store/index';

export default Vue.extend({
  name: 'NoteExpanded',
  props: {
    note: { type: Object as () => Note, required: true },
  },
  data () {
    return {
      noteModified: this.note,
      showCheckMark: false,
    };
  },
  mounted() {
    const contentArea = this.$refs.content as HTMLInputElement;
    contentArea.focus()
  },
  methods: {
    modifyNote() {
      this.$store.commit('modifyNote', this.noteModified)
      this.showCheckMark = true;
      setTimeout(() => {
        this.showCheckMark = false;
      }, 1000)
    },
    tabulate(event: KeyboardEvent) {
        let text = this.noteModified.content
        if (event.target && text) {
          const target: Partial<HTMLInputElement> = event.target 
          const originalSelectionStart: number = target.selectionStart || 0
          const textStart = text.slice(0, originalSelectionStart)
          const textEnd =  text.slice(originalSelectionStart)

          this.noteModified.content = `${textStart}    ${textEnd}`
          target.selectionEnd = target.selectionStart = originalSelectionStart + 1
        }
    },
  },
});
</script>

<style scoped lang="scss">

$padding: 2em;
$borderThickness: 1px;
$border: $borderThickness solid rgb(174, 174, 174);

.note-expanded {
  background: white;
  height: 60vw;
  width: 60vw;
  border-radius: 0.2em;
  padding: 2em 1em;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 6fr 1fr;
  align-items: center;
  justify-content: stretch;
}
.header{
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  & input {
    font-size: 1.5em;
    margin: .8em 0;
    border: none;
    outline: none;
    font-weight: bold;
    width: min-content;
  }
  & .help{
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
  }
}
.content-box{
  align-self: stretch;
  position: relative;
}
.content {
  resize: none;
  padding: $padding;
  width: calc(100% - 2 * ($padding + $borderThickness));
  height: calc(100% - 2 * ($padding + $borderThickness));
  border: $border;
  border-radius: 0.2em;
  &:focus {
    outline: none;
  }
}
.tooltip{
  position: absolute;
  font-size: 0.7em;
  bottom: 100%;
  left: 0;
  transition: 0.3s ease-in;
  visibility: hidden;
  opacity: 0;
  &.active{
    visibility: visible;
    opacity: 1;
  }
}
.buttons{
  align-self: stretch;
  & > button {
    height: 100%;
    width: 100%;
    border: $border;
  }
}
</style>
