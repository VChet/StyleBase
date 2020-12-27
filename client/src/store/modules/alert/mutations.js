export default {
  ADD_ALERT(state, payload) {
    state.alerts.push(payload);
  },
  REMOVE_ALERT(state, id) {
    state.alerts = state.alerts.filter((alert) => alert.id !== id);
  }
};
