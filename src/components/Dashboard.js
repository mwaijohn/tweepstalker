import React, { useState, useEffect } from 'react'
import Nav from './Nav'

import UIComponents from './UIComponents'
import Footer from './Footer'

function DashBoard() {
  return (
    <React.Fragment>
      <Nav />
      <br></br>
      <UIComponents />
      <Footer />
    </React.Fragment>
  )
}

export default DashBoard