/* eslint-disable prettier/prettier */
const state = {
    snackbarObjct: {
        showSnackbar: false,
        type: "",
        message: "",
        closeButtonColor: "",
        timeout: 5000
    }
}

const actions = {
    addSuccessSnackbar({
        commit
    }, message) {
        commit('successSnackbar', message)
    },
    addErrorSnackbar({
        commit
    }, message) {
        commit('errorSnackbar', message)
    },
    addCloseSnackbar({
        commit
    }) {
        commit('closeSnackbar')
    }
    // removeSnackbar({
    //     commit
    // }, index) {
    //     commit('removeSnackbar', index)
    // },
    // clearSnackbar({
    //     commit
    // }) {
    //     commit('clearSnackbarArray')
    // },
}

const mutations = {
    successSnackbar(state, message) {
        state.snackbarObjct.type = "success";
        state.snackbarObjct.message = message;
        state.snackbarObjct.closeButtonColor = "green";
        state.snackbarObjct.timeout = randomTimeout();
        state.snackbarObjct.showSnackbar = true;
        // state.snackbarArray.push({
        //     type: "success",
        //     closeButtonColor: "green",
        //     message
        // });
        // var index = state.snackbarArray.length - 1;
        // setTimeout(() => {
        //     //console.log(state.snackbarArray)
        //     //state.snackbarArray.splice(index, 1);
        //     console.log(state.snackbarArray)
        //     state.snackbarArray.shift();
        // }, 5000);

    },
    errorSnackbar(state, message) {
        state.snackbarObjct.type = "error";
        state.snackbarObjct.message = message;
        state.snackbarObjct.closeButtonColor = "red";
        state.snackbarObjct.timeout = randomTimeout();
        state.snackbarObjct.showSnackbar = true;
    },
    // removeSnackbar(state, index) {
    //     state.snackbarArray.splice(index, 1);
    // },
    // clearSnackbarArray(state) {
    //     state.snackbarArray = []
    // },
    closeSnackbar(state) {
        state.snackbarObjct.showSnackbar = false;
        state.snackbarObjct.type = "";
        state.snackbarObjct.message = "";
        state.snackbarObjct.closeButtonColor = "";
        state.snackbarObjct.timeout = randomTimeout();
    }
};


function randomTimeout() {
    return Math.floor(Math.random() * (6000 - 4000 + 1)) + 4000;
};

export const snackbar = {
    namespaced: true,
    state,
    actions,
    mutations
}