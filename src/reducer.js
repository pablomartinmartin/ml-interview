const initialState = {
  categories: [],
  showBreadcrumb: false,
};

export default function categoriesReducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        categories: action.payload?.values,
        showBreadcrumb: true,
      };

    case "SET_HIDE_BREADCRUMB":
      return {
        ...state,
        showBreadcrumb: false,
      };

    default:
      return initialState;
  }
}
