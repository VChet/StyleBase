export default {
  SET_STYLES(state, styles) {
    state.styles = styles;
  },
  SET_SELECTED_STYLE(state, style) {
    state.selectedStyle = style;
  },
  SET_CUSTOM_NAME(state, name) {
    state.selectedStyle.customName = name;
  },
  SET_CUSTOM_DESCRIPTION(state, description) {
    state.selectedStyle.customDescription = description;
  },
  SET_CUSTOM_PREVIEW(state, preview) {
    state.selectedStyle.customPreview = preview;
  },
  SET_LOADING(state, loading) {
    state.isLoading = loading;
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = pagination;
  },
  SET_PAGE(state, page) {
    state.pagination.page = page;
  },
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query;
  },
  SET_OWNER_FILTER(state, filter) {
    state.ownerFilter = filter;
  },
  SET_SORT_ORDER(state, orderId) {
    state.sortOrder = orderId;
  },
  SET_MODAL_VISIBILITY(state, value) {
    state.showStyleInfoModal = value;
  }
};
