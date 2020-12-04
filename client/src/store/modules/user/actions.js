import axios from 'axios';

export default {
  getUser({ commit }) {
    axios
      .get('/api/me')
      .then((response) => {
        if (!response.data.error) commit('SET_USER', response.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
