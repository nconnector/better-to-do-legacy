<template>
  <div class="to-do">
    <div />
    <div class="label">
      URGENT
    </div>
    <div class="label">
      NOT URGENT
    </div>
    <div class="label v">
      IMPORTANT
    </div>
    <TaskBox
      class="task-box green"
      header="DO & REDUCE"
      legend="Crisis management, reduce by doing more in SCHEDULE"
      group="reduce"
    >
      <TicketDraggable
        v-for="ticket in listReduce"
        @click="setCurrentTicket(ticket)"
        :key="ticket.id"
        :item="ticket"
      />
    </TaskBox>
    <TaskBox
      class="task-box green"
      header="SCHEDULE"
      legend="Future planning, strategic thinking, initiative"
      group="schedule"
    >
      <TicketDraggable
        v-for="ticket in listSchedule"
        @click="setCurrentTicket(ticket)"
        :key="ticket.id"
        :item="ticket"
      />
    </TaskBox>
    <div class="label v">
      NOT IMPORTANT
    </div>
    <TaskBox
      class="task-box red"
      header="DELEGATE"
      legend="Enable others to do independent decision making"
      group="delegate"
    >
      <TicketDraggable
        v-for="ticket in listDelegate"
        @click="setCurrentTicket(ticket)"
        :key="ticket.id"
        :item="ticket"
      />
    </TaskBox>
    <TaskBox
      class="task-box red"
      header="DECLUTTER"
      legend="Eliminate tasks that do not align with mission and goals"
      group="declutter"
    >
      <TicketDraggable
        v-for="ticket in listDeclutter"
        @click="setCurrentTicket(ticket)"
        :key="ticket.id"
        :item="ticket"
      />
    </TaskBox>
    <transition name="active">
        <Overlay
          v-if="currentTicket"
          @hide-overlay="clearCurrentTicket"
        >
          <TicketExpanded :ticket="currentTicket" />
        </Overlay>
      </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Ticket } from '../../store/index';
import Overlay from '../Overlay.vue';
import TaskBox from './TaskBox.vue';
import TicketDraggable from './TicketDraggable.vue';
import TicketExpanded from './TicketExpanded.vue';

export default Vue.extend({
  name: 'ToDo',
  components: {
    TaskBox,
    Overlay,
    TicketDraggable,
    TicketExpanded,
  },
  data () {
    return {
      currentTicket: null as Ticket | null,
    }
  },
  computed: {
    listReduce (): Ticket[] {
      return this.$store.state.tickets.filter((ticket: Ticket) => ticket.group === 'reduce');
    },
    listSchedule (): Ticket[] {
      return this.$store.state.tickets.filter((ticket: Ticket) => ticket.group === 'schedule');
    },
    listDelegate (): Ticket[] {
      return this.$store.state.tickets.filter((ticket: Ticket) => ticket.group === 'delegate');
    },
    listDeclutter (): Ticket[] {
      return this.$store.state.tickets.filter((ticket: Ticket) => ticket.group === 'declutter');
    },
  },
  methods: {
    setCurrentTicket(ticket: Ticket) {
      this.currentTicket = ticket;
    },
    clearCurrentTicket() {
      this.currentTicket = null;
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
