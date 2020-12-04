let timeout;

export default {
  flashAlert({ commit }, { type, message }) {
    clearTimeout(timeout);
    if (type) commit('SET_TYPE', type);
    commit('SET_MESSAGE', message);
    commit('SET_VISIBILITY', true);
    timeout = setTimeout(() => {
      commit('SET_VISIBILITY', false);
    }, 5000);
  },
  close({ commit }) {
    clearTimeout(timeout);
    commit('SET_VISIBILITY', false);
  }
};
