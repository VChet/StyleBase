export default {
  flashAlert({ commit }, payload) {
    const id = Math.random().toString(36).substr(2, 9);
    commit('ADD_ALERT', { ...payload, id });
    setTimeout(() => {
      commit('REMOVE_ALERT', id);
    }, 10000);
  },
  close({ commit }, id) {
    commit('REMOVE_ALERT', id);
  }
};
