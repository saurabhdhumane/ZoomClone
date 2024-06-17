
import './App.css';
import Hoom from './Components/Home/Hoom';
import Room from './Components/Room/Room';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Hoom />} />
        <Route path='/room/:roomID' element={<Room />} />
      </Routes>
    </div>

  );
}

export default App;
