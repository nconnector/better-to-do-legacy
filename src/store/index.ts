import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


type ToDoGroup = 'reduce' | 'schedule' | 'delegate' | 'declutter'
type NoteGroup = 'daily' | 'person' | 'event'
type NoteTag = ''

interface Item {
  id: number,
  name: string,
  content?: string,
}

export type View = 'to-do' | 'notes'
export interface Note extends Item {
  group: NoteGroup,
  tags?: NoteTag[],
}
export interface Ticket extends Item {
  group: ToDoGroup,
}

interface State {
  currentView: View
  tickets: Ticket[],
  maxTicketId: number,
  notes: Note[],
  maxNoteId: number,
}


const tickets = JSON.parse(localStorage.getItem('tickets') || '[]')
const notes = JSON.parse(localStorage.getItem('notes') || '[]')

console.log({ tickets, notes })

const initialState: State = {
  currentView: localStorage.getItem('currentView') as View || 'to-do',
  tickets: tickets,
  maxTicketId: Math.max(...tickets.map((el:Ticket) => el.id), 0),
  notes: notes,
  maxNoteId: Math.max(...notes.map((el:Note) => el.id), 0),
}
console.log({ page: initialState.currentView, maxTicketId: initialState.maxTicketId, maxNoteId: initialState.maxNoteId })

export default new Vuex.Store({
  state: initialState,  

  mutations: {
    setView(state: State, newView: View) {
      console.log(`switching to page: ${newView}`)
      state.currentView = newView
      localStorage.setItem('currentView', `${state.currentView}`)
    },

    // TO-DO TICKETS
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
   
    // NOTES
    addNote(state: State, noteInput: Omit<Note, "id">): void {
      state.maxNoteId++
      const id = state.maxNoteId
      const note = Object.assign({ id }, noteInput)
      state.notes.push(note)
      console.log({ creating: note, id })
      localStorage.setItem('notes', JSON.stringify(state.notes))
      localStorage.setItem('maxNoteId', `${state.maxNoteId}`)
    },
    modifyNote(state: State, payload: Pick<Note, 'id'> & Partial<Note>): void {
      const note = state.notes.find(el => el.id === payload.id)
      console.log({ modifying: note, payload })
      if (note) {
        Object.assign(note, payload)
        localStorage.setItem('notes', JSON.stringify(state.notes))
      }
    },
    deleteNote(state: State, id: Note["id"]): void {
      localStorage.setItem('notes_backup', JSON.stringify(state.notes))
      const note = state.notes.find(el => el.id === id)
      console.log({ removing: note })
      if (note) {
        state.notes = state.notes.filter(el => el.id !== id)
        localStorage.setItem('notes', JSON.stringify(state.notes))
      }
    },
    clearNotes(state: State): void {
      localStorage.setItem('notes_backup', JSON.stringify(state.notes))
      state.notes = []
      state.maxNoteId = 0
      localStorage.setItem('notes', JSON.stringify(state.notes))
      localStorage.setItem('maxNoteId', `${state.maxNoteId}`)
    },
    undoNoteCommit(state: State): void {
      const currentNotes = state.notes
      state.notes = JSON.parse(localStorage.getItem('notes_backup') || '[]')    
      state.maxNoteId = Math.max(...state.notes.map((el:Note) => el.id), 0)  
      localStorage.setItem('notes_backup', JSON.stringify(currentNotes))
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