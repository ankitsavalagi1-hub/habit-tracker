import React, { useState, useEffect } from 'react'
import HabitForm from './components/HabitForm'
import HabitList from './components/HabitList'
import Heatmap from './components/Heatmap'
import Analytics from './components/Analytics'
import { getHabits, createHabit, updateHabit, deleteHabit, logHabit } from './services/api'

function App() {
  const [habits, setHabits] = useState([])
  const [selectedHabit, setSelectedHabit] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchHabits()
  }, [])

  const fetchHabits = async () => {
    try {
      const data = await getHabits()
      setHabits(data)
    } catch (error) {
      console.error('Error fetching habits:', error)
    }
  }

  const handleCreateHabit = async (habitData) => {
    try {
      await createHabit(habitData)
      await fetchHabits()
      setShowForm(false)
    } catch (error) {
      console.error('Error creating habit:', error)
    }
  }

  const handleUpdateHabit = async (id, habitData) => {
    try {
      await updateHabit(id, habitData)
      await fetchHabits()
      setSelectedHabit(null)
    } catch (error) {
      console.error('Error updating habit:', error)
    }
  }

  const handleDeleteHabit = async (id) => {
    try {
      await deleteHabit(id)
      await fetchHabits()
    } catch (error) {
      console.error('Error deleting habit:', error)
    }
  }

  const handleLogHabit = async (id, date) => {
    try {
      await logHabit(id, date)
      await fetchHabits()
    } catch (error) {
      console.error('Error logging habit:', error)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>AI Habit Heatmap Tracker</h1>
        <p>Track your habits with GitHub-style heatmaps and analytics</p>
      </header>

      <div className="grid">
        <div className="card">
          <h2>My Habits</h2>
          <button 
            className="btn" 
            onClick={() => setShowForm(true)}
            style={{ marginBottom: '1rem' }}
          >
            + Add New Habit
          </button>
          
          {showForm && (
            <HabitForm 
              onSubmit={handleCreateHabit}
              onCancel={() => setShowForm(false)}
            />
          )}
          
          {selectedHabit && (
            <HabitForm 
              habit={selectedHabit}
              onSubmit={(data) => handleUpdateHabit(selectedHabit.id, data)}
              onCancel={() => setSelectedHabit(null)}
            />
          )}
          
          <HabitList 
            habits={habits}
            onEdit={setSelectedHabit}
            onDelete={handleDeleteHabit}
            onLog={handleLogHabit}
          />
        </div>

        <div className="card">
          <h2>Analytics Dashboard</h2>
          <Analytics habits={habits} />
        </div>
      </div>

      <div className="heatmap-container">
        <h2>Habit Heatmap</h2>
        <Heatmap habits={habits} />
      </div>
    </div>
  )
}

export default App