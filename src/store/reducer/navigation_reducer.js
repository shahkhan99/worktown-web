const INITIAL_STATE = {
  set_nav_selection: "",
};

export default (state = INITIAL_STATE, action) => {
  // console.log("auth_reducer=> ", action.data);

  switch (action.type) {
    case "set_nav_selection":
      return {
        ...state,
        set_nav_selection: action.data,
      };
  }

  return state;
};
