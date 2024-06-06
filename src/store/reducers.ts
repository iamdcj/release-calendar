import { isVisible } from "@testing-library/user-event/dist/utils";

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
    case "SET_EVENT":
      return {
        ...state,
        events: [...state.events, action.value],
        release: null,
        isLoading: false,
        notice: {
          isVisible: true,
          type: "success",
          content: `${action.value.version} has been scheduled for ${action.value.release_type} on ${action.value.friendlyDate}`,
        },
      };
    case "SET_EVENTS":
      return {
        ...state,
        events: action.value,
        release: null,
        isLoading: false,
      };
    case "SET_ACTIVE_EVENT":
      return {
        ...state,
        release: {
          ...action.value,
          readOnly: true,
        },
      };
    case "EDIT_EVENT":
      return {
        ...state,
        release: {
          ...state.release,
          readOnly: false,
        },
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
    case "SET_NOTICE":
      return {
        ...state,
        notice: {
          isVisible: true,
          ...action.value,
        },
      };
    case "CLEAR_NOTICE":
      return {
        ...state,
        notice: {
          ...state.notice,
          isVisible: false,
        },
      };
    default:
      return state;
  }
};
