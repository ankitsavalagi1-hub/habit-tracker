import React from 'react'

const HabitList = ({ habits, onEdit, onDelete, onLog }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getCurrentStreak = (habit) => {
    if (!habit.logs || habit.logs.length === 0) return 0
    
    const sortedLogs = [...habit.logs].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    )
    
    let streak = 0
    let currentDate = new Date()
    
    for (const log of sortedLogs) {
      const logDate = new Date(log.date)
      if (
        logDate.toDateString() === currentDate.toDateString() ||
        logDate.toDateString() === new Date(currentDate.setDate(currentDate.getDate() - 1)).toDateString()
      ) {
        streak++
        currentDate = logDate
      } else {
        break
      }
    }
    
    return streak
  }

  const handleLogToday = (habitId) => {
    const today = new Date().toISOString().split('T')[0]
    onLog(habitId, today)
  }

  if (habits.length === 0) {
    return (
      <div className="card">
        <p>No habits yet. Create your first habit to get started!</p>
      </div>
    )
  }

  return (
    <div>
      {habits.map((habit) => (
        <div key={habit.id} className="card" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h4 style={{ 
                color: habit.color,
                marginBottom: '0.5rem'
              }}>
                {habit.name}
              </h4>
              {habit.description && (
                <p style={{ 
                  color: '#666', 
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}>
                  {habit.description}
                </p>
              )}
              
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{ 
                  background: '#f0f9ff', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  📊 {getCurrentStreak(habit)} day streak
                </span>
                <span style={{ 
                  background: '#f0f0f0', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  ✅ {habit.logs?.length || 0} total logs
                </span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
              <button 
                className="btn"
                onClick={() => handleLogToday(habit.id)}
                style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
              >
                ✅ Log Today
              </button>
              <button 
                className="btn"
                onClick={() => onEdit(habit)}
                style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
              >
                ✏️ Edit
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => onDelete(habit.id)}
                style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>

          {habit.logs && habit.logs.length > 0 && (
            <div>
              <p style={{ 
                fontSize: '0.8rem', 
                color: '#666',
                marginTop: '1rem'
              }}>
                <strong>Recent logs:</strong>
              </p>
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                flexWrap: 'wrap',
                marginTop: '0.5rem'
              }}>
                {habit.logs.slice(0, 5).map((log) => (
                  <span key={log.id} style={{
                    background: '#e8f5e8',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.7rem'
                  }}>
                    {formatDate(log.date)}
                  </span>
                ))}
                {habit.logs.length > 5 && (
                  <span style={{
                    background: '#f0f0f0',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.7rem'
                  }}>
                    +{habit.logs.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default HabitList