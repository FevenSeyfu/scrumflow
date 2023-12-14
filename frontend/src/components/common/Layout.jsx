import React from 'react'
import SideBar from './SideBar'
import Header from './Header'

Header
const Layout = ({children}) => {
  return (
    <>
        <SideBar></SideBar>
        <Header></Header>
        <main>{children}</main>
    </>
  )
}

export default Layout