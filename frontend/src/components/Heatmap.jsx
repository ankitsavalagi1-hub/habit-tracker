import React from 'react'

const Heatmap = ({ habits }) => {
  const getHeatmapData = () => {
    const allLogs = []
    
    habits.forEach(habit => {
      if (habit.logs) {
        habit.logs.forEach(log => {
          allLogs.push({
            date: log.date,
            count: 1
          })
        })
      }
    })

    const groupedByDate = allLogs.reduce((acc, log) => {
      if (!acc[log.date]) {
        acc[log.date] = {
          date: log.date,
          count: 0
        }
      }
      acc[log.date].count++
      return acc
    }, {})

    return Object.values(groupedByDate)
  }

  const heatmapData = getHeatmapData()

  return (
    <div>
      <h3>Heatmap Visualization</h3>
      {heatmapData.length > 0 ? (
        <div>
          <p>Heatmap data available: {heatmapData.length} days with activity</p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 20px)',
            gap: '2px',
            marginTop: '1rem'
          }}>
            {heatmapData.slice(0, 35).map((day, index) => (
              <div
                key={index}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: day.count > 0 ? '#40c463' : '#ebedf0',
                  borderRadius: '2px'
                }}
                title={`${day.date}: ${day.count} habits`}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>No habit data yet. Start logging your habits to see the heatmap!</p>
      )}
    </div>
  )
}

export default Heatmap