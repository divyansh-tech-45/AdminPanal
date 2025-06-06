import axios from "axios";
import { getToken } from "./token";
import { apis } from "./constant";
import toast from "react-hot-toast";

const getAuthHeaders = () => ({
  Authorization: getToken(),
});

const getCall = async (endPoint: string) => {
  try {
    const response = await axios.get(`${apis.admin}${endPoint}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};

const postCall = async (endPoint: string, payload: Record<string, any>) => {
  try {
    const response = await axios.post(`${apis.admin}${endPoint}`, payload, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("POST request failed:", error);
    throw error;
  }
};

const putCall = async (endPoint: string, payload: Record<string, any>) => {
  try {
    const response = await axios.put(`${apis.admin}${endPoint}`, payload, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("PUT request failed:", error);
    throw error;
  }
};

const patchCall = async (endPoint: string, payload: Record<string, any>) => {
  try {
    const response = await axios.patch(`${apis.admin}${endPoint}`, payload, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("PATCH request failed:", error);
    throw error;
  }
};

const deleteCall = async (endPoint: string) => {
  try {
    const response = await axios.delete(`${apis.admin}${endPoint}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("DELETE request failed:", error);
    throw error;
  }
};

const postFormCall = async (endPoint: string, payload: FormData) => {
  try {
    const response = await axios.post(`${apis.admin}${endPoint}`, payload, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("POST FormData request failed:", error);
    throw error;
  }
};

const postCallNoToken = async (
  endPoint: string,
  payload: Record<string, any>
) => {
  try {
    const response = await axios.post(`${apis.admin}${endPoint}`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export {
  getCall,
  postCall,
  putCall,
  patchCall,
  deleteCall,
  postFormCall,
  postCallNoToken,
};
