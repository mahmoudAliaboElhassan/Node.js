  import { useEffect } from "react";
  import useRefreshToken from "./useRefreshToken";
  import axiosInstance from "./axiosIntance";

  const useAxiosPrivate = () => {
    const refresh = useRefreshToken();

    useEffect(() => {
      const requestIntercept = axiosInstance.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem("accessToken");
          console.log("config",config)
          if (token) {
            config.headers["authorization"] = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      const responseIntercept = axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error?.config;
          if ((error.response?.status === 401||error.response?.status === 403) && !prevRequest?.sent) {
            prevRequest.sent = true; // Prevent infinite loop
            const newAccessToken = await refresh();
            console.log("refresh added")
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosInstance(prevRequest);
          }
          return Promise.reject(error);
        }
      );

      return () => {
        axiosInstance.interceptors.request.eject(requestIntercept);
        axiosInstance.interceptors.response.eject(responseIntercept);
      };
    }, [refresh]);

    return axiosInstance;
  };

  export default useAxiosPrivate;
