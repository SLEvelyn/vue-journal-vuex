import {createStore} from 'vuex'
import journal from '@/modules/daybook/store/journal'
import {journalState} from '../../../mock-data/test-journal-state'  


const createVuexStore = (initialState) => 
    createStore ({
        modules: {
            journal: {
                ...journal,
                state: {...initialState}
            }
        }
    })

describe('Vuex - Pruebas en el Journal Module', () => {

    //Basicas
    test('Este es el estado inicila, debe de tener este state', () => {

        const store = createVuexStore(journalState)
        const {isLoading, entries} = store.state.journal 

        expect(isLoading).toBeFalsy(),
        expect(entries).toEqual(journalState.entries)

    })

    //Mutations
    test('mutation: setEntries', () => {

        const store = createVuexStore({isLoading: true, entries: []})

        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(2)

        expect(store.state.journal.isLoading).toBeFalsy()

    })

    test('Mutation: updateEntry', () => {
        //create store con entries
        const store = createVuexStore(journalState)

        //updatedEntry
        const updatedEntry = {
            id: '-MoEI177zsJTzGQhcEGO',
            date : 1636639167856,
            text : "Hola mundo desde pruebas"
        }

        //commit de la mutacion
        store.commit('journal/updateEntry', updatedEntry)

        //Expects
        const storeEntries = store.state.journal.entries

        expect(storeEntries.length).toBe(2)

        expect(
            storeEntries.find(e => e.id === updatedEntry.id)
        ).toEqual(updatedEntry)

    })

    test('mutation: addEntry and deleteEntry', () => {

        const store = createVuexStore(journalState)
        
        store.commit('journal/addEntry', {id: 'ABC-123', text: 'Hola mundo'})
        
        const stateEntries = store.state.journal.entries

        expect(stateEntries.length).toBe(3)
        expect(stateEntries.find(e => e.id === 'ABC-123')).toBeTruthy()

        store.commit('journal/deleteEntry', 'ABC-123')
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === 'ABC-123')).toBeFalsy()
    })

    //Getter =================================
    test('getters: getEntriesByTerm, getEntryById', () => {

        const store = createVuexStore(journalState)

        const [entry1, entry2] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('vue').length).toBe(1)

        expect(store.getters['journal/getEntriesByTerm']('vue')).toEqual([entry2])

        expect(store.getters['journal/getEntryById']('-MoEI177zsJTzGQhcEGO')).toEqual(entry1)
        
    })
})