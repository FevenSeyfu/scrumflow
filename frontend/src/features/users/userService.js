import axios from "axios";

const API_URL = 'https://scrum-flow.onrender.com/api/users';

const getAllUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL,config);
    return response.data;
};

const getUserById = async (userId,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}/${userId}`,config);
    return response.data;
};

const updateUser = async (userId, userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(`${API_URL}/${userId}`, userData, config);
    return response.data;
};

const deleteUser = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(`${API_URL}/${userId}`, config);
    return response.data;
};

const userService = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};

export default userService;
