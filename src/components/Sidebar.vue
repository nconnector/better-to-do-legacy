<template>
  <div class="sidebar">
    <div
      id="menu-to-do"
      v-show="$store.state.currentView === 'to-do'"
    >
      <input v-model="newTicketName" placeholder="New ticket name" />
      <div class="group">
        <label for="reduce"><input type="radio" v-model="newTicketGroup" id="reduce" value="reduce" />reduce</label>
        <label for="schedule"><input type="radio" v-model="newTicketGroup" id="schedule" value="schedule" />schedule</label>
        <label for="delegate"><input type="radio" v-model="newTicketGroup" id="delegate" value="delegate" />delegate</label>
        <label for="declutter"><input type="radio" v-model="newTicketGroup" id="declutter" value="declutter" />declutter</label>
      </div>
      <span><button @click="submitNewTicket">Submit new ticket</button></span>
      <span><button @click="logTickets">Log Tickets</button></span>
      <span><button @click="clearTickets">(!) Clear Tickets</button></span>
      <span><button @click="undoTicketCommit">(?) Undo deletion</button></span>
    </div>
    <div
      id="menu-notes"
      v-show="$store.state.currentView === 'notes'"
    >
      <input v-model="newNoteName" placeholder="New note name" />
      <div class="group">
        <label for="daily"><input type="radio" v-model="newNoteGroup" id="daily" value="daily" />Daily</label>
        <label for="person"><input type="radio" v-model="newNoteGroup" id="person" value="person" />Person</label>
        <label for="event"><input type="radio" v-model="newNoteGroup" id="event" value="event" />Event</label>
      </div>
      <span><button @click="submitNewNote">Submit new note</button></span>
      <span><button @click="logNotes">Log notes</button></span>
      <span><button @click="clearNotes">(!) Clear notes</button></span>
      <span><button @click="undoNoteCommit">(?) Undo deletion</button></span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Sidebar',
  data() {
    return {
      newTicketName: '',
      newTicketGroup: '',
      newNoteName: '',
      newNoteGroup: '',
    }
  },
  methods: {
    submitNewTicket(){
      const name = this.newTicketName
      const group = this.newTicketGroup
      if (name && group) {
        this.$store.commit('addTicket', { name, group })
      }
    },
    logTickets() {
      console.log(this.$store.state.tickets)
    },
    clearTickets() {
      this.$store.commit('clearTickets')
    },
    undoTicketCommit() {
      this.$store.commit('undoTicketCommit')
    },
    
    submitNewNote(){
      const name = this.newNoteName
      const group = this.newNoteGroup
      if (name && group) {
        this.$store.commit('addNote', { name, group })
      }
    },
    logNotes() {
      console.log(this.$store.state.tickets)
    },
    clearNotes() {
      this.$store.commit('clearNotes')
    },
    undoNoteCommit() {
      this.$store.commit('undoNoteCommit')
    },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$sidebar-width: 250px;

.sidebar {
  position: absolute;
  transition: 0.3s;
  left: 0;
  top: calc(30px + 0.4em);
  width: $sidebar-width;
  z-index: 1;

  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.75);

  &.active-enter,
  &.active-leave-to {
    left: -$sidebar-width !important;
  }
}
</style>
