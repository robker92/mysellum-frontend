/* eslint-disable prettier/prettier */
const state = {
    //     type: null,
    //     message: null,
    alertArray: []
}

const actions = {
    /*     success({
            commit
        }, message) {
            commit('success', message)
        },
        error({
            commit
        }, message) {
            commit('error', message)
        },
        clear({
            commit
        }) {
            commit('clear')
        }, */

    successAlert({
        commit
    }, message) {
        commit('successAlert', message)
    },
    errorAlert({
        commit
    }, message) {
        commit('errorAlert', message)
    },
    clearAlert({
        commit
    }) {
        commit('clearAlert')
    }
}

const mutations = {
    /*     success(state, message) {
            state.type = 'alert-success'
            state.message = message
        },
        error(state, message) {
            state.type = 'alert-danger'
            state.message = message
        },
        clear(state) {
            state.type = null
            state.message = null
        }, */
    successAlert(state, message) {
        state.alertArray.push({
            type: "success",
            message
        });
    },
    errorAlert(state, message) {
        state.alertArray.push({
            type: "error",
            message
        });
    },
    clearAlert(state) {
        state.alertArray.shift();
    }

}

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
}