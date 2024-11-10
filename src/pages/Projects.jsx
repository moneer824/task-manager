import React from 'react'
import BoardView from '../components/BoardView'
import '../style/pages/projects.scss'
function Projects() {
  return (
    <div className="projects-page">
        {/* <h2 className='view-title'>Board View</h2> */}
        <BoardView />
    </div>
  )
}

export default Projects