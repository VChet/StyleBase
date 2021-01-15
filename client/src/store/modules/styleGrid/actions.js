import axios from 'axios';

function lockScroll(isActive) {
  const $body = document.body;
  isActive ? $body.classList.add('no-scroll') : $body.classList.remove('no-scroll');
}

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
  window.history.replaceState({}, title, url);
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
    setPageData(state);
  },
  closeStyleModal({ state, commit, dispatch }) {
    commit('SET_SELECTED_STYLE', {});
    dispatch('setStyleModalVisibility', false);
    setPageData(state);
  }
};
