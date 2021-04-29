import Baobab from 'baobab'

/* eslint-disable-next-line */
const user = window.KAWA_USER
/* eslint-disable-next-line */
const sync = window.KAWA_SYNC

const state = {
    follow: false,
    language: "en-US",

    // meta-data
    token: {
        value: undefined,
        error: undefined,
        loading: false,
    }, 

    user: {
    },

    // home data
    homePage: {
        data: [],
    },

    // global messages
    messages: {
        data: [],
    }
}

const tree = new Baobab(state)
if (window) {
    window.tree = tree
}
export default tree

