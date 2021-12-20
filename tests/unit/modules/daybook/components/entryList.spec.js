import { shallowMount } from "@vue/test-utils"
import { createStore } from "vuex"
import EntryList from '@/modules/daybook/components/EntryList'
import {getEntriesByTerm} from '@/modules/daybook/store/journal/getter'
import { journalState } from "../../../mock-data/test-journal-state"

describe('Pruebas en el EntryList', () => {

    const journalMockModule = {
        namespaced: true,
        getters: {
            // getEntriesByTerm: () => () => [] 
            getEntriesByTerm
        },
        state: () => ({
            isLoading: false,
            entries: journalState.entries
        })
    }

    const store = createStore({
        modules: {
            journal : {... journalMockModule}
        }
    })

    const wrapper = shallowMount(EntryList, {
        global: {
            mocks: {
                // $router: 
            },
            plugins: [store]
        }
    })


    test('debe de llamar el getEntriesByTerm sin termino y mostrar 2 entradas', () => {

        console.log(wrapper.html())

    })
})