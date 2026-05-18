import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Habits CRUD operations
export const getHabits = async () => {
  const response = await api.get('/habits')
  return response.data
}

export const createHabit = async (habitData) => {
  const response = await api.post('/habits', habitData)
  return response.data
}

export const updateHabit = async (id, habitData) => {
  const response = await api.put(`/habits/${id}`, habitData)
  return response.data
}

export const deleteHabit = async (id) => {
  const response = await api.delete(`/habits/${id}`)
  return response.data
}

// Habit logging
export const logHabit = async (id, date) => {
  const response = await api.post(`/habits/${id}/log`, { date })
  return response.data
}

export const getHabitLogs = async (id) => {
  const response = await api.get(`/habits/${id}/logs`)
  return response.data
}

// Analytics
export const getAnalytics = async () => {
  const response = await api.get('/analytics')
  return response.data
}

export default api