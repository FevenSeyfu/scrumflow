import axios from 'axios'

const API_URL = 'https://scrum-flow.onrender.com/';
const AUTH_URL = `${API_URL}/users/`;

const register = async(userData)=>{
    const response =await axios.post(AUTH_URL,userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

const login = async(userData)=>{
    const response =await axios.post(AUTH_URL + 'login',userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout
}

export default authService