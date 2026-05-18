import React, { useState, useEffect } from 'react'

const HabitForm = ({ habit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#667eea'
  })

  useEffect(() => {
    if (habit) {
      setFormData({
        name: habit.name || '',
        description: habit.description || '',
        color: habit.color || '#667eea'
      })
    }
  }, [habit])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return
    
    onSubmit({
      ...formData,
      name: formData.name.trim()
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <h3>{habit ? 'Edit Habit' : 'Create New Habit'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Habit Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Exercise, Reading, Meditation"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional description of your habit"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="color"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            style={{ width: '50px', height: '50px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn">
            {habit ? 'Update' : 'Create'} Habit
          </button>
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default HabitForm