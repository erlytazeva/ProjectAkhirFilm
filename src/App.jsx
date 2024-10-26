import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Beranda from './Pages/Beranda'
import Movies from './Pages/Movies'
import Search from './Pages/Search'
import Footer from './Components/Footer'
import Detail from './Pages/Detail/Detail'
import ThemeContext from './Context/ThemeContext'
import { Provider } from 'react-redux'
import store from "./Store/Store";

function App() {
  const [count, setCount] = useState(0);
  const theme = useState("light");

  return (
    <>
      <BrowserRouter>
      <ThemeContext.Provider value ={theme}>
      <Provider store={store}>
        <Navbar />
        <Routes>
          {/* Tambahkan route untuk root "/" */}
          <Route path="/" element={<Beranda />} />
          <Route path="/Beranda" element={<Beranda />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Movie/:id" element={<Detail />} />
        </Routes>
        <Footer />
        </Provider>
        </ThemeContext.Provider>
      </BrowserRouter>
      
    </>
  )
}

export default App
