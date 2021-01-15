import axios from 'axios';

function lockScroll(isActive) {
  const $body = document.body;
  isActive ? $body.classList.add('no-scroll') : $body.classList.remove('no-scroll');
}

function setPageUrl({ selectedStyle, ownerFilter, searchQuery }) {
  if (selectedStyle.styleId) {
    window.history.replaceState({}, `${selectedStyle.styleId} | StyleBase`, `/style/${selectedStyle.styleId}`);
  } else if (ownerFilter) {
    window.history.replaceState({}, `Styles by ${ownerFilter} | StyleBase`, `/user/${ownerFilter}`);
  } else if (searchQuery) {
    window.history.replaceState({}, `${searchQuery} | StyleBase`, `/search/${searchQuery}`);
  } else {
    window.history.replaceState({}, document.title, '/');
  }
}

export default {
  getStyles({ state, commit, dispatch }) {
    setPageUrl(state);
    commit('SET_LOADING', true);

    const params = {};
    params.page = state.pagination.page;
    params.sort = state.sortOrder;

    let url = '/api/styles/';
    if (state.ownerFilter) url += state.ownerFilter;
    if (state.searchQuery) params.query = state.searchQuery;

    axios
      .get(url, { params })
      .then((response) => {
        const styles = state.pagination.page === 1 ? response.data.styles : state.styles.concat(response.data.styles);
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
    if (state.showStyleInfoModal) dispatch('closeStyleModal');
    commit('SET_SEARCH_QUERY', query);
    commit('SET_PAGE', 1);
    dispatch('getStyles');
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
    lockScroll(isActive);
  },
  openStyleModal({ state, commit, dispatch }, style) {
    commit('SET_SELECTED_STYLE', style);
    dispatch('setStyleModalVisibility', true);
    setPageUrl(state);
  },
  closeStyleModal({ state, commit, dispatch }) {
    commit('SET_SELECTED_STYLE', {});
    dispatch('setStyleModalVisibility', false);
    setPageUrl(state);
  }
};
