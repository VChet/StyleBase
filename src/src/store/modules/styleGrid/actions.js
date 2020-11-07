import axios from 'axios';

function lockScroll(isActive) {
  const $body = document.body;
  isActive ? $body.classList.add('no-scroll') : $body.classList.remove('no-scroll');
}

export default {
  async getStyles({ state, commit }) {
    commit('SET_LOADING', true);

    const params = {};
    params.page = state.pagination.page;

    let url = '/api/styles/';
    if (state.searchQuery) {
      params.query = state.searchQuery;
      window.history.replaceState({}, `${state.searchQuery} | StyleBase`, `/search/${state.searchQuery}`);
    }
    if (state.ownerFilter) {
      url += state.ownerFilter;
      window.history.replaceState({}, `Styles by ${state.ownerFilter} | StyleBase`, `/${state.ownerFilter}`);
    }

    switch (state.selectedSort) {
      case 1:
        params.sort = 'update';
        break;
      case 2:
        params.sort = 'stars';
        break;
    }

    await axios
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
        console.error(error);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
    return true;
  },
  getStyle({ dispatch }, { owner, name }) {
    const params = { owner, name };
    axios
      .get('/api/style', { params })
      .then((response) => {
        dispatch('openStyleModal', response.data.style);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  setPage({ commit, dispatch }, page) {
    commit('SET_PAGE', page);
    dispatch('getStyles');
  },
  setSorting({ commit, dispatch }, sortOption) {
    commit('SET_SORTING', sortOption);
    commit('SET_PAGE', 1);
    dispatch('getStyles');
  },
  setQuery({ state, commit, dispatch }, query) {
    if (state.showStyleInfoModal) dispatch('setStyleModalVisibility', false);
    commit('SET_SEARCH_QUERY', query);
    commit('SET_PAGE', 1);
    dispatch('getStyles');
  },
  setOwnerFilter({ state, commit, dispatch }, filter) {
    if (state.showStyleInfoModal) dispatch('setStyleModalVisibility', false);
    if (filter) {
      commit('SET_OWNER_FILTER', filter);
      commit('SET_PAGE', 1);
      dispatch('getStyles');
    }
  },
  resetFilters({ commit, dispatch }) {
    window.history.replaceState({}, document.title, '/');
    commit('SET_SEARCH_QUERY', '');
    commit('SET_SORTING', 0);
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
    window.history.replaceState(
      {},
      `${state.selectedStyle.name} | StyleBase`,
      `/${state.selectedStyle.owner}/${state.selectedStyle.name}`
    );
  },
  closeStyleModal({ commit, dispatch }) {
    commit('SET_SELECTED_STYLE', {});
    dispatch('setStyleModalVisibility', false);
    window.history.replaceState({}, document.title, '/');
  }
};
