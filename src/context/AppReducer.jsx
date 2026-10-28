const appReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_YHTEYSTIEDOT":
      return {
        ...state,
        yhteystiedot: payload,
      };
    case "GET_YHTEYSTIETO":
      return {
        ...state,
        yhteystiedot: payload,
      };
    case "DELETE_YHTEYSTIETO":
      return {
        ...state,
        yhteystiedot: state.yhteystiedot.filter(
          (yhteystieto) => yhteystieto.id !== action.payload,
        ),
      };
    case "ADD_YHTEYSTIETO":
      return {
        ...state,
        yhteystiedot: [action.payload, ...state.yhteystiedot],
      };
    case "EDIT_YHTEYSTIETO":
      return {
        ...state,
        yhteystiedot: state.yhteystiedot.map((yhteystieto) =>
          yhteystieto.id === action.payload.id ? action.payload : yhteystieto,
        ),
      };
    default:
      return state;
  }
};

export default appReducer;
