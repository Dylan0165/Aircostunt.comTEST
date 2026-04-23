import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Dashboard from './pages/Dashboard'
import Design1 from './pages/designs/Design1'
import Design2 from './pages/designs/Design2'
import Design3 from './pages/designs/Design3'
import Design4 from './pages/designs/Design4'
import Design5 from './pages/designs/Design5'
import Design6 from './pages/designs/Design6'
import Design7 from './pages/designs/Design7'
import Design8 from './pages/designs/Design8'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/design/1/*" element={<Design1 />} />
        <Route path="/design/2/*" element={<Design2 />} />
        <Route path="/design/3/*" element={<Design3 />} />
        <Route path="/design/4/*" element={<Design4 />} />
        <Route path="/design/5/*" element={<Design5 />} />
        <Route path="/design/6/*" element={<Design6 />} />
        <Route path="/design/7/*" element={<Design7 />} />
        <Route path="/design/8/*" element={<Design8 />} />
      </Routes>
    </BrowserRouter>
  )
}
