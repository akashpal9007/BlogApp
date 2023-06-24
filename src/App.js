import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from './Components/HomePage/HomePage';
import BlogPage from './Components/BlogPage/BlogPage';
import Favourites from './Components/Favourites/Favourites';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/fav" element={<Favourites />} />
          <Route path="/posts/:id" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
