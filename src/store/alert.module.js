/* eslint-disable prettier/prettier */
const state = {
  //     type: null,
  //     message: null,
  alertArray: []
};

const actions = {
  successAlert({ commit }, message) {
    commit("successAlert", message);
  },
  errorAlert({ commit }, message) {
    commit("errorAlert", message);
  },
  clearAlert({ commit }) {
    commit("clearAlert");
  }
};

const mutations = {
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
};

export const alert = {
  namespaced: true,
  state,
  actions,
  mutations
};
