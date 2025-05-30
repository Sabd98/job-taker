import axios from "axios";

let timer;

export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "http://localhost:3000/login";

    if (mode === "signup") {
      url = "http://localhost:3000/register";
    }
    const response = await axios.post(
      url,
      {
        email: payload.email,
        name: payload.name,
        password: payload.password,
        role: payload.role || "jobseeker",
      }
    );
    const responseData = await response.data;

    // if (response.status !== 201) {
    //   const error = new Error(
    //     responseData.message || "Failed to authenticate. Check your login data."
    //   );
    //   throw error;
    // }

    const expiresIn = 24 * 60 * 60 * 1000; // 1 hari (sesuaikan dengan backend)
    // const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;

 
    localStorage.setItem("token", responseData.token);
    localStorage.setItem("userId", responseData.userId); 
    localStorage.setItem("userRole", responseData.role);
    localStorage.setItem("tokenExpiration", expirationDate);

    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.token,
      userId: responseData.userId,
      role: responseData.role,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId && userRole) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        role: userRole,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
      role: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};