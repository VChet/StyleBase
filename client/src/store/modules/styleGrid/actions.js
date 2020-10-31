import axios from 'axios';

function setPageData({ selectedStyle: style, ownerFilter, searchQuery }) {
  let title = 'Collection of UserCSS styles | StyleBase';
  let description = 'Website styles from various authors. Find and share your UserCSS style at StyleBase.cc';
  let url = '/';

  if (style.styleId) {
    title = `${style.customName || style.name} by ${style.owner.login} | StyleBase`;
    description = style.customDescription || style.description;
    url = `/style/${style.styleId}`;
  } else if (ownerFilter) {
    title = `Styles by ${ownerFilter} | StyleBase`;
    url = `/user/${ownerFilter}`;
  } else if (searchQuery) {
    title = `${searchQuery} | StyleBase`;
    url = `/search/${searchQuery}`;
  }

  document.title = title;
  document.head.querySelector('meta[name=description]').content = description;
  window.history.replaceState(history.state, title, url);
}

export default {
  getStyles({ state, commit, dispatch }) {
    setPageData(state);
    commit('SET_LOADING', true);

    const params = {};
    params.page = state.pagination.page;
    params.sort = state.sortOrder;

    let url = '/api/styles/';
    if (state.ownerFilter) url += state.ownerFilter;
    if (state.searchQuery) params.query = state.searchQuery;
    if (state.pagination.page === 1) commit('SET_STYLES', []);

    axios
      .get(url, { params })
      .then((response) => {
        const styles = state.styles.concat(response.data.styles);
        commit('SET_STYLES', styles);
        commit('SET_PAGINATION', {
          page: response.data.page,
          hasNextPage: response.data.hasNextPage
        });
      })
      .catch((error) => {
        dispatch('alert/flashAlert', { type: 'error', message: error.response.data.error }, { root: true });
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
  getStyle({ dispatch }, { styleId }) {
    const params = { styleId };
    axios
      .get('/api/style', { params })
      .then((response) => {
        dispatch('openStyleModal', response.data.style);
      })
      .catch((error) => {
        dispatch('alert/flashAlert', { type: 'error', message: error.response.data.error }, { root: true });
      });
  },
  editStyle({ state, dispatch }, payload) {
    return axios
      .patch('/api/style/edit', payload)
      .then((response) => {
        const name = response.data.style.customName || response.data.style.name;
        dispatch('alert/flashAlert', { type: 'success', message: `"${name}" style updated` }, { root: true });
        if (state.showStyleInfoModal) dispatch('getStyle', response.data.style);
      })
      .catch((error) => {
        dispatch('alert/flashAlert', { type: 'error', message: error.response.data.error }, { root: true });
      });
  },
  deleteStyle({ state, dispatch }, _id) {
    return axios
      .delete('/api/style/delete', { data: { _id } })
      .then((response) => {
        const name = response.data.style.customName || response.data.style.name;
        dispatch('alert/flashAlert', { type: 'success', message: `"${name}" style deleted` }, { root: true });
        if (state.showStyleInfoModal) dispatch('closeStyleModal');
      })
      .catch((error) => {
        dispatch('alert/flashAlert', { type: 'error', message: error.response.data.error }, { root: true });
      });
  },
  setPage({ commit, dispatch }, page) {
    commit('SET_PAGE', page);
    dispatch('getStyles');
  },
  setSortOrder({ commit, dispatch }, sortOption) {
    commit('SET_SORT_ORDER', sortOption);
    commit('SET_PAGE', 1);
    dispatch('getStyles');
  },
  setQuery({ state, commit, dispatch }, query) {
    commit('SET_SEARCH_QUERY', query);
    if (query.length && query.length < 3) return;

    commit('SET_PAGE', 1);
    dispatch('getStyles');
    if (state.showStyleInfoModal) dispatch('closeStyleModal');
  },
  setOwnerFilter({ state, commit, dispatch }, filter) {
    if (state.showStyleInfoModal) dispatch('closeStyleModal');
    if (filter) {
      commit('SET_OWNER_FILTER', filter);
      commit('SET_PAGE', 1);
      dispatch('getStyles');
    }
  },
  resetFilters({ commit, dispatch }) {
    commit('SET_SEARCH_QUERY', '');
    commit('SET_SORT_ORDER', 'stargazers');
    commit('SET_OWNER_FILTER', '');
    commit('SET_PAGE', 1);
    dispatch('getStyles');
  },
  setStyleModalVisibility({ commit }, isActive) {
    commit('SET_MODAL_VISIBILITY', isActive);
  },
  openStyleModal({ state, commit, dispatch }, style) {
    commit('SET_SELECTED_STYLE', style);
    dispatch('setStyleModalVisibility', true);
    setPageData(state);
  },
  closeStyleModal({ state, commit, dispatch }) {
    commit('SET_SELECTED_STYLE', {});
    dispatch('setStyleModalVisibility', false);
    setPageData(state);
  }
};
