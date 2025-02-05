import axiosInstance from "./axiosIntance";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axiosInstance.post("/refresh-token");
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
