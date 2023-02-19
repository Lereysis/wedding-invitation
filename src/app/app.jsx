import React from 'react'
import { Outlet } from 'react-router-dom'
const App = () => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  return (
    <Outlet/>
  )
}

export default App