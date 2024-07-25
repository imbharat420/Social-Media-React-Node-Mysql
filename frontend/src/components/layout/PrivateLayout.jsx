import React from 'react'
import { Outlet } from 'react-router-dom'

function PrivateLayout({children}) {
  return (
    <div>
       <Outlet />
    </div>
  )
}

export default PrivateLayout
