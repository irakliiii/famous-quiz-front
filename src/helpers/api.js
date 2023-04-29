import { axiosInstance } from "./axios";

export async function authenticate(authData, authContext) {
  return axiosInstance
    .post("authenticate", authData)
    .then(({ data }) => {
      data = {
        token: data.token,
        name: data.name,
        email: authData.email,
        isAuthenticated: true,
      };

      authContext.setIsAuthenticated(true);
      authContext.setData(data);
      localStorage.setItem("authData", JSON.stringify(data));
      return Promise.resolve(data);
    })
    .catch((data) => {
      return Promise.reject(data.response.data.message);
    });
}

export const logout = (authContext, navigate) => {
  localStorage.removeItem("authData");
  authContext.setData(null);
  navigate("/");
};
