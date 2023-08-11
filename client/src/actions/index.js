import axios from 'axios';

const config = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  }
};

export const getTasks = async () => {
  try {
    return await axios.get(`/task`, config);
  } catch (e) {
    console.log(e)
  }
}

export const getTask = async (taskId) => {
  try {
    return await axios.get(`/task/${taskId}`, config);
  } catch (e) {
    console.log(e)
  }
}

export const addTask = async (task) => {
  try {
    return await axios.post(`/task`, task, config);
  } catch (e) {
    console.log(e)
  }
}

export const editTask = async (taskId, task) => {
  try {
    return await axios.put(`/task/${taskId}`, task, config);
  } catch (e) {
    console.log(e)
  }
}

export const deleteTask = async (taskId) => {
  try {
    return await axios.delete(`/task/${taskId}`, config);
  } catch (e) {
    console.log(e)
  }
}