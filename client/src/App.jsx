import { Route, Routes } from "react-router-dom";

import Home from './components/Home';
import Navigation from './components/Navigation';
import MyNotes from "./components/MyNotes";
import NoteView from "./components/NoteView";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/my-notes" element={<MyNotes />} ></Route>
        <Route path="/note/:noteId" element={<NoteView />} ></Route>
      </Routes>
    </>
  )
}

export default App
