import axios from 'axios';

export default {
  getUser({ commit }) {
    axios
      .get('/api/me')
      .then(({ data }) => {
        if (!data.error) commit('SET_USER', data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  getStats({ dispatch, commit }, { githubId, codebergId }) {
    const params = { githubId, codebergId };
    return axios
      .get('/api/stats', { params })
      .then(({ data }) => {
        if (data.error) {
          return dispatch('alert/flashAlert', { type: 'error', message: data.error }, { root: true });
        }
        commit('SET_STATS', data.stats);
      })
      .catch(({ response }) => {
        dispatch('alert/flashAlert', { type: 'error', message: response.data.error }, { root: true });
      });
  }
};
