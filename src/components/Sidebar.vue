<template>
    <Overlay @hide-overlay="$emit('hide-sidebar')">
    <div class="sidebar">
        <div
            id="menu-to-do"
            class="menu"
            v-show="$store.state.currentView === 'to-do'"
        >
            <div class="name-input">
                <input v-model="newTicketName" placeholder="New ticket name" />
            </div>
            <div class="group radio">
                <label for="reduce"><input type="radio" v-model="newTicketGroup" id="reduce" value="reduce" />reduce</label>
                <label for="schedule"><input type="radio" v-model="newTicketGroup" id="schedule" value="schedule" />schedule</label>
                <label for="delegate"><input type="radio" v-model="newTicketGroup" id="delegate" value="delegate" />delegate</label>
                <label for="declutter"><input type="radio" v-model="newTicketGroup" id="declutter" value="declutter" />declutter</label>
            </div>
            <div class="group buttons">
                <span><button @click="submitNewTicket">Submit new ticket</button></span>
                <span><button @click="logTickets">Log Tickets</button></span>
                <span><button @click="clearTickets">(!) Clear Tickets</button></span>
                <span><button @click="undoTicketCommit">(?) Undo deletion</button></span>
                <span><button @click="exportData">Export</button></span>
            </div>
        </div>
        <div
            id="menu-notes"
            class="menu"
            v-show="$store.state.currentView === 'notes'"
        >
            <div class="name-input">
                <input v-model="newNoteName" placeholder="New note name" />
            </div>
            <div class="group radio">
                <label for="daily"><input type="radio" v-model="newNoteGroup" id="daily" value="daily" />Daily</label>
                <label for="person"><input type="radio" v-model="newNoteGroup" id="person" value="person" />Person</label>
                <label for="event"><input type="radio" v-model="newNoteGroup" id="event" value="event" />Event</label>
            </div>
            <div class="group buttons">
                <button @click="submitNewNote">Submit new note</button>
                <button @click="logNotes">Log notes</button>
                <button @click="clearNotes">(!) Clear notes</button>
                <button @click="undoNoteCommit">(?) Undo deletion</button>
                <button @click="exportData">Export</button>
            </div>
        </div>
    </div>
    </Overlay>
</template>

<script lang="ts">
import Vue from 'vue';
import Overlay from './Overlay.vue';

export default Vue.extend({
  name: 'Sidebar',
  components: { Overlay },
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
        console.log(this.$store.state.notes)
    },
    exportData() {
        const { tickets, notes } = this.$store.state
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ tickets, notes }))
        const anchor = document.createElement("a");
        anchor.download = 'better-to-do-backup.json';
        anchor.href = dataStr;
        anchor.click();
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

<style scoped lang="scss">
$sidebar-width: 250px;

.sidebar {
  position: absolute;
  transition: 0.3s;
  left: 0;
  top: calc(30px + 0.4em);
  width: $sidebar-width;
  z-index: 1;
  padding: 1em;

  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.75);
}

.active-enter > .sidebar,
.active-leave-to > .sidebar{
    left: -$sidebar-width !important;
}

.menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
}
.name-input {
    border: 1px solid rgba(1, 1, 1, 0.2);
    border-radius: 4px;
    width: 100%;
    & > input{        
        padding: 0.5em 1em;
        border: none;
        width: calc(100% - 2em);
    }
}
.group {
    display: grid;
    justify-items: start;
    gap: 0.5em;
    width: 100%;
    &.radio {
        grid-template: 1fr 1fr / 1fr 1fr;
            border: 1px solid rgba(1, 1, 1, 0.2);
            border-radius: 4px;
        & > label {            
            padding: 0.2em 0.2em;
        }
    }
    &.buttons {
        grid-template-columns: 1fr 1fr;
        & > button {
            width: 100%;
            border-color: rgba(1, 1, 1, 0.2);
            border-radius: 4px;
            background: none;
            padding: 0.2em 0.2em;
        }
    }
}
</style>
