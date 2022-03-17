const INITIAL_STATE = {
  set_current_user_data: "",
};

export default (state = INITIAL_STATE, action) => {
  // console.log("auth_reducer=> ", action.data);

  switch (action.type) {
    case "set_current_user_data":
      return {
        ...state,
        set_current_user_data: action.data,
      };
  }

  return state;
};
