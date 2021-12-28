import { shallowMount } from "@vue/test-utils"
import { createStore } from "vuex"
import EntryView from '@/modules/daybook/views/EntryView'
import journal from '@/modules/daybook/store/journal'
import { journalState } from "../../../mock-data/test-journal-state"
import Swal from 'sweetalert2'

const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: {
                    ...initialState
                }
            }
        }
    })

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('Pruebas en el EntryView', () => {

    const store = createVuexStore(journalState)
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryView, {
            props: {
                id: '-MoYuPkrHO0Vhd7SNvXM'
            },

            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })


    test('debe de sacar al usuario porque el id no existe', () => {

        const wrapper = shallowMount(EntryView, {
            props: {
                id: 'Este ID no exsite en el Store'
            },

            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store],
            }
        })

        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })

    })

    test('debe de mostrar la entrada correctamente', () => {

        expect(wrapper.html()).toMatchSnapshot()
        expect(mockRouter.push).not.toHaveBeenCalled()

    })

    test('debe de borrar la entrada y salir', (done) => {

        Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }))

        wrapper.find('.btn-danger').trigger('click')

        expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Está seguro',
            text: 'Una vez borrado, no se puede recuperar',
            showDenyButton: true,
            confirmButtonText: 'Si, estoy seguro'
        })

        setTimeout(() => {

            expect(mockRouter.push).toHaveBeenCalled()
            done()
        }, 1)

    })
})