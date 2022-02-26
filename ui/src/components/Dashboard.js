import React from 'react'
import Nav from './Nav'

import UIComponents from './UIComponents'
import Footer from './Footer'

function DashBoard() {
  return (
    <React.Fragment>
      <Nav />
      <UIComponents />
      <Footer />
    </React.Fragment>
  )
}

export default DashBoard