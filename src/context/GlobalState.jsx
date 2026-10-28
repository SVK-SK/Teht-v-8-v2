import { createContext, useReducer } from "react";
import axios from "axios";

const API = "http://localhost:3001/api/urheilijat";

const GlobalContext = createContext();

const initialState = {
  urheilijat: [],
  urheilija: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "GET_URHEILIJAT":
      return {
        ...state,
        urheilijat: action.payload,
      };

    case "GET_URHEILIJA":
      return {
        ...state,
        urheilija: action.payload,
      };

    default:
      return state;
  }
}

function GlobalState({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUrheilijat = async () => {
    const res = await axios.get(API);
    dispatch({ type: "GET_URHEILIJAT", payload: res.data });
    return res.data;
  };

  const getUrheilija = async (id) => {
    const res = await axios.get(`${API}/${id}`);
    dispatch({ type: "GET_URHEILIJA", payload: res.data });
    return res.data;
  };

  const lisaaUrheilija = async (data) => {
    const res = await axios.post(API, data);
    await getUrheilijat();
    return res.data;
  };

  const paivitaUrheilija = async (id, data) => {
    const res = await axios.put(`${API}/${id}`, data);
    await getUrheilijat();
    return res.data;
  };

  const poistaUrheilija = async (id) => {
    const res = await axios.delete(`${API}/${id}`);
    await getUrheilijat();
    return res.data;
  };

  return (
    <GlobalContext.Provider
      value={{
        state,
        getUrheilijat,
        getUrheilija,
        lisaaUrheilija,
        paivitaUrheilija,
        poistaUrheilija,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext };
export { GlobalState as GlobalProvider };
export default GlobalState;
