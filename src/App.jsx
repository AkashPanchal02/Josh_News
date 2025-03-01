
import './App.css'
import Layout from './components/Layout'
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'
import DisplayNews from './Pages/DisplayNews'
import { ThemeProvider } from './context/ThemeProvider'
import LandingPage from './Pages/LandingPage'
import  InternationalNews  from './Pages/InternationalNews'




function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider default="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/news/international" element={<InternationalNews />} />
              <Route exact path="/news/:category" element={ <DisplayNews /> } />
            </Routes>        
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
