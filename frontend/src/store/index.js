import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: localStorage.getItem("user") || "",
    message: {},
    getAllMessages: {},
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
  },
  actions: {
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/auth/register",
          data: user,
          method: "POST",
        })
          .then((res) => {
            const userName = res.data.name;
            const token = res.data.token;
            const id = res.data.id;
            localStorage.setItem("userName", userName);
            localStorage.setItem("token", token);
            localStorage.setItem("id", id);

            // Add the following line:
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token);
            resolve(res);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
            console.log(err.message);
            console.log("Erreur lors de la création!");
          });
      });
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/auth/login",
          data: user,
          method: "POST",
        })
          .then((res) => {
            const userName = res.data.name;
            const token = res.data.token;
            const id = res.data.id;
            localStorage.setItem("userName", userName);
            localStorage.setItem("token", token);
            localStorage.setItem("id", id);

            // Add the following line:
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token);
            resolve(res);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            console.log(err);
            reject(err);
          });
      });
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    getUserData({ commit }, userId) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:3000/api/auth/get/" + userId,
          method: "GET",
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    updateUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/auth/update/",
          data: user,
          method: "PUT",
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    deleteUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        console.log(user);
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/auth/delete/",
          data: user,
          method: "DELETE",
        })
          .then((res) => {
            localStorage.removeItem("token");
            commit("logout");
            resolve(res);
          })
          .catch((err) => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    envoiMessage({ commit }, message) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:3000/api/message",
          data: message,
          method: "POST",
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    deleteMessage({ commit }, message) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/message/delete/" + message.id,
          data: message,
          method: "DELETE",
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    getAllMessages({ commit }, allMessages) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:3000/api/message/all")
          .then((response) => {
            allMessages = response.data;
            resolve(allMessages);
          })
          .catch((err) => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
});
