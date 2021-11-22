<template>
  <div class="sidebar">
    <input v-model="newTicketName" placeholder="New ticket name" />
    <div class="group">
      <label for="reduce"><input type="radio" v-model="newTicketGroup" value="reduce" />reduce</label>
      <label for="schedule"><input type="radio" v-model="newTicketGroup" value="schedule" />schedule</label>
      <label for="delegate"><input type="radio" v-model="newTicketGroup" value="delegate" />delegate</label>
      <label for="declutter"><input type="radio" v-model="newTicketGroup" value="declutter" />declutter</label>
    </div>
    <span><button @click="submitNewTicket">Submit new ticket</button></span>
    <span><button @click="logTickets">Log Tickets</button></span>
    <span><button @click="clearTickets">(!) Clear Tickets</button></span>
    <span><button @click="undoCommit">(?) Undo deletion</button></span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Sidebar',
  props: {
    msg: String,
  },
  data() {
    return {
      newTicketName: '',
      newTicketGroup: '',
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
    undoCommit() {
      this.$store.commit('undoTicketCommit')
    }
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
  width: $sidebar-width;

  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.75);

  &.active-enter,
  &.active-leave-to {
    left: -$sidebar-width;
  }
}
</style>
