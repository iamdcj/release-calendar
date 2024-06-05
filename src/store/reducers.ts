export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SHOW_SIDEBAR":
      return {
        ...state,
        showSidebar: action.value,
      };
    case "SET_THEME":
      return {
        ...state,
        theme: action.value,
      };
    case "SET_EVENTS":
      return {
        ...state,
        events: action.value,
        release: null,
        loading: false,
      };
    case "SET_ACTIVE_EVENT":
      return {
        ...state,
        release: action.value,
        readOnly: true,
      };
    case "SET_TENTATIVE_EVENT":
      return {
        ...state,
        release: action.value,
        readOnly: false,
      };
    case "CLEAR_EVENT":
      return {
        ...state,
        release: null,
      };
      case "SET_VIEW":
        return {
          ...state,
          currentView: action.value,
        };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.value,
      };
    default:
      return state;
  }
};
