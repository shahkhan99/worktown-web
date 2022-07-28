const set_current_user_data = (data) => {
  return (dispatch) => {
    dispatch({
      type: "set_current_user_data",
      data: data,
    });
  };
};
const set_nav_selection = (data) => {
  return (dispatch) => {
    dispatch({
      type: "set_nav_selection",
      data: data,
    });
  };
};

export { set_current_user_data, set_nav_selection };
