const set_current_user_data = (data) => {
  return (dispatch) => {
    dispatch({
      type: "set_current_user_data",
      data: data,
    });
  };
};

export { set_current_user_data };
