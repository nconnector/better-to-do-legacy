<template>
    <div
        class="ticket-expanded"
        @keydown.ctrl.enter="modifyTicket"
        @keydown.ctrl.s.prevent="modifyTicket"
        @keydown.tab.prevent="tabulate($event)"
    >
        <span class="header">
            <input
                v-model="ticketModified.name"
                :placeholder="ticketModified.name"
                :size="ticketModified.name.length"
                @keydown.enter="modifyTicket"
            />
            <div class="help">
                <span>✔️</span>
                <span>❌</span>
            </div>
        </span>
        <div class="content-box">
            <span :class="['tooltip', showCheckMark ? 'active' : '']">
                ✅ changes saved
            </span>
            <textarea
                ref="content"
                class="content"
                v-model="ticketModified.content"
                :placeholder="ticketModified.content"
            />
        </div>
        <div class="buttons">
            <button @click="modifyTicket">Submit</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Ticket } from "../../store/index";

export default Vue.extend({
    name: "TicketExpanded",
    props: {
        ticket: { type: Object as () => Ticket, required: true },
    },
    data() {
        return {
            ticketModified: this.ticket,
            showCheckMark: false,
        };
    },
    mounted() {
        const contentArea = this.$refs.content as HTMLInputElement;
        contentArea.focus();
    },
    methods: {
        modifyTicket() {
            this.$store.commit("modifyTicket", this.ticketModified);
            this.showCheckMark = true;
            setTimeout(() => {
                this.showCheckMark = false;
            }, 1000);
        },
        tabulate(event: KeyboardEvent) {
            let text = this.ticketModified.content;
            if (event.target && text) {
                const target: Partial<HTMLInputElement> = event.target;
                const originalSelectionStart: number =
                    target.selectionStart || 0;
                const textStart = text.slice(0, originalSelectionStart);
                const textEnd = text.slice(originalSelectionStart);

                this.ticketModified.content = `${textStart}    ${textEnd}`;
                target.selectionEnd = target.selectionStart =
                    originalSelectionStart + 1;
            }
        },
    },
});
</script>

<style scoped lang="scss">
$padding: 2em;
$borderThickness: 1px;
$border: $borderThickness solid rgb(174, 174, 174);

.ticket-expanded {
    background: white;
    height: 75vh;
    width: min(80vw, 1200px);
    border-radius: 0.2em;
    padding: 2em 1em;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 6fr 1fr;
    align-items: center;
    justify-content: stretch;
}
.header {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    & input {
        font-size: 1.5em;
        margin: 0.8em 0;
        border: none;
        outline: none;
        font-weight: bold;
        width: min-content;
    }
    & .help {
        position: absolute;
        right: 0;
        display: flex;
        flex-direction: column;
    }
}
.content-box {
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
.tooltip {
    position: absolute;
    font-size: 0.7em;
    bottom: 100%;
    left: 0;
    transition: 0.3s ease-in;
    visibility: hidden;
    opacity: 0;
    &.active {
        visibility: visible;
        opacity: 1;
    }
}
.buttons {
    align-self: stretch;
    & > button {
        height: 100%;
        width: 100%;
        border: $border;
    }
}
</style>
