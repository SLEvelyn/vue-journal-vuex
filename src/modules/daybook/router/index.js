

export default {

    name: 'daybook',
    component: () => import(/* webpackChunkName: "dayBook" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
    children: [
        {
            path: '',
            name: 'no-entry',
            component: () => import(/* webpackChunkName: "dayBook-no-entry" */ '@/modules/daybook/views/NoEntrySelected.vue'),

        },
        {
            path: ':id',
            name: 'entry',
            component: () => import(/* webpackChunkName: "EntryView" */ '@/modules/daybook/views/EntryView.vue'),
            props: (route) => {
                return {
                    id: route.params.id
                }
            }
        }
    ]


} 