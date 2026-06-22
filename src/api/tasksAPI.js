export const URL = "http://localhost:3002/tasks";

const headers = {
  "Content-Type": "application/json",
};

const tasksAPI = {
  getAll: async () => {
    return fetch(`${URL}`).then((response) => response.json());
  },
  getById: async (id) => {
    return fetch(`${URL}/${id}`).then((response) => response.json());
  },

  add: async (task) => {
    return fetch(`${URL}`, {
      method: "POST",
      headers,
      body: JSON.stringify(task),
    }).then((response) => response.json());
  },
  delete: async (id) => {
    fetch(`${URL}/${id}`, { method: "DELETE" });
  },
  deleteAll: async (tasks) => {
    Promise.all(
      tasks.map(({ id }) => {
        tasksAPI.delete(id);
      }),
    );
  },
  toggleComplete: async (id, isDone) => {
    fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone }),
    });
  },
};

export default tasksAPI;
