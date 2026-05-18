import React from 'react'

const Analytics = ({ habits }) => {
  const getTotalHabits = () => habits.length
  
  const getTotalLogs = () => {
    return habits.reduce((total, habit) => total + (habit.logs?.length || 0), 0)
  }
  
  const getCurrentStreaks = () => {
    return habits.map(habit => {
      if (!habit.logs || habit.logs.length === 0) return { habit: habit.name, streak: 0 }
      
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
      
      return { habit: habit.name, streak }
    })
  }
  
  const getLongestStreaks = () => {
    return habits.map(habit => {
      if (!habit.logs || habit.logs.length === 0) return { habit: habit.name, streak: 0 }
      
      const sortedLogs = [...habit.logs].sort((a, b) => 
        new Date(a.date) - new Date(b.date)
      )
      
      let longestStreak = 0
      let currentStreak = 1
      
      for (let i = 1; i < sortedLogs.length; i++) {
        const prevDate = new Date(sortedLogs[i - 1].date)
        const currDate = new Date(sortedLogs[i].date)
        const diffTime = Math.abs(currDate - prevDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        if (diffDays === 1) {
          currentStreak++
        } else {
          longestStreak = Math.max(longestStreak, currentStreak)
          currentStreak = 1
        }
      }
      
      longestStreak = Math.max(longestStreak, currentStreak)
      return { habit: habit.name, streak: longestStreak }
    })
  }
  
  const getWeeklyStats = () => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    
    const weeklyLogs = habits.reduce((total, habit) => {
      if (habit.logs) {
        const recentLogs = habit.logs.filter(log => 
          new Date(log.date) >= oneWeekAgo
        )
        return total + recentLogs.length
      }
      return total
    }, 0)
    
    return weeklyLogs
  }

  const totalHabits = getTotalHabits()
  const totalLogs = getTotalLogs()
  const currentStreaks = getCurrentStreaks()
  const longestStreaks = getLongestStreaks()
  const weeklyStats = getWeeklyStats()

  return (
    <div>
      <div className="stats">
        <div className="stat-card">
          <div className="stat-number">{totalHabits}</div>
          <div className="stat-label">Total Habits</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{totalLogs}</div>
          <div className="stat-label">Total Logs</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{weeklyStats}</div>
          <div className="stat-label">This Week</div>
        </div>
      </div>

      <div>
        <h4>Current Streaks</h4>
        {currentStreaks.map((item, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            padding: '0.5rem',
            background: '#f8f9fa',
            borderRadius: '4px'
          }}>
            <span>{item.habit}</span>
            <span style={{ fontWeight: 'bold', color: item.streak > 0 ? '#28a745' : '#6c757d' }}>
              {item.streak} days
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h4>Longest Streaks</h4>
        {longestStreaks.map((item, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            padding: '0.5rem',
            background: '#e9ecef',
            borderRadius: '4px'
          }}>
            <span>{item.habit}</span>
            <span style={{ fontWeight: 'bold', color: '#007bff' }}>
              {item.streak} days
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Analytics