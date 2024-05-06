
import { Route, Routes } from 'react-router-dom';
import './App.css'

import Intro from './pages/home/intro'
import Notes from './pages/notes/notes'

import WrapperBg from './pages/wrapper'


function App() {

  return (
    <div className='wrapper'>
      <WrapperBg />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path='/home' element={<Intro></Intro>}></Route>
        <Route path='/notes' element={<Notes></Notes>}></Route>
      </Routes>
    </div>
  )
}

export default App
