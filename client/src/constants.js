const base_url = "https://kanban-board-l6zn.onrender.com";

export const API = {
  AUTH: {
    ME: `${base_url}/auth/me`,
    REGISTER: `${base_url}/auth/register`,
    LOGIN: `${base_url}/auth/login`,
    LOGOUT: `${base_url}/auth/logout`,
  },
  TODOS: {
    GET_TODOS: `${base_url}/todos`,
    CREATE_TODO: `${base_url}/todos/create`,
    UPDATE_TODO: `${base_url}/todos/update`,
    DELETE_TODO: `${base_url}/todos/delete`,
  },
};

export const STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCEEDED: "SUCCEEDED",
  FAILED: "FAILED",
};
