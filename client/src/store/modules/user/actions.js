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
  getUserStyles({ state, dispatch, commit }) {
    if (!state.user) return;
    const params = { githubId: state.user.githubId, codebergId: state.user.codebergId };
    return axios
      .get('/api/user/styles', { params })
      .then(({ data }) => {
        if (data.error) {
          return dispatch('alert/flashAlert', { type: 'error', message: data.error }, { root: true });
        }
        commit('SET_STYLES', data.styles);
      })
      .catch(({ response }) => {
        dispatch('alert/flashAlert', { type: 'error', message: response.data.error }, { root: true });
      });
  }
};
