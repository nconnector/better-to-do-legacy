import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LATEST_EDIT_FROM_DB = 0


type ToDoGroup = 'reduce' | 'schedule' | 'delegate' | 'declutter'
type NoteGroup = 'daily' | 'person' | 'event'
type NoteTag = ''

interface Item {
  id: number,
  name: string,
  content?: string,
}

export interface Note extends Item {
  group: NoteGroup,
  tags?: NoteTag[],
}
export interface Ticket extends Item {
  group: ToDoGroup,
}

interface State {
  latestEdit: number,
  tickets: Ticket[],
  maxTicketId: number,
  notes: Note[],
  maxNoteId: number,
}


const tickets = JSON.parse(localStorage.getItem('tickets') || '[]')
const notes = JSON.parse(localStorage.getItem('notes') || '[]')

console.log(tickets)

const initialState: State = {
  latestEdit: JSON.parse(localStorage.getItem('latestEdit') || '0'),
  tickets: tickets,
  maxTicketId: Math.max(...tickets.map((el:Ticket) => el.id), 0),
  notes: notes,
  maxNoteId: Math.max(...notes.map((el:Note) => el.id), 0),
}
console.log(`max id: ${initialState.maxTicketId}`)

export default new Vuex.Store({
  state: initialState,  

  mutations: {

    addTicket(state: State, ticketInput: Omit<Ticket, "id">): void {
      state.maxTicketId++
      const id = state.maxTicketId
      const ticket = Object.assign({ id }, ticketInput)
      state.tickets.push(ticket)
      console.log({ creating: ticket, id })
      localStorage.setItem('tickets', JSON.stringify(state.tickets))
      localStorage.setItem('maxTicketId', `${state.maxTicketId}`)
    },
    modifyTicket(state: State, payload: Pick<Ticket, 'id'> & Partial<Ticket>): void {
      const ticket = state.tickets.find(el => el.id === payload.id)
      console.log({ modifying: ticket, payload })
      if (ticket) {
        Object.assign(ticket, payload)
        localStorage.setItem('tickets', JSON.stringify(state.tickets))
      }
    },
    deleteTicket(state: State, id: Ticket["id"]): void {
      localStorage.setItem('tickets_backup', JSON.stringify(state.tickets))
      const ticket = state.tickets.find(el => el.id === id)
      console.log({ removing: ticket })
      if (ticket) {
        state.tickets = state.tickets.filter(el => el.id !== id)
        localStorage.setItem('tickets', JSON.stringify(state.tickets))
      }
    },
    clearTickets(state: State): void {
      localStorage.setItem('tickets_backup', JSON.stringify(state.tickets))
      state.tickets = []
      state.maxTicketId = 0
      localStorage.setItem('tickets', JSON.stringify(state.tickets))
      localStorage.setItem('maxTicketId', `${state.maxTicketId}`)
    },
    undoTicketCommit(state: State): void {
      const currentTickets = state.tickets
      state.tickets = JSON.parse(localStorage.getItem('tickets_backup') || '[]')    
      state.maxTicketId = Math.max(...state.tickets.map((el:Ticket) => el.id), 0)  
      localStorage.setItem('tickets_backup', JSON.stringify(currentTickets))
    },

  },

  actions: {
      // bring async mutation calls here
      // return error if bad data received!
      // move localstorage calls here!
      // move backup call here
  },

  modules: {
  }
})