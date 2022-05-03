import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/Create';
import PostDetails from './components/PostDetails';
import NotFound from './components/NotFound';
import About from './components/About';
import Dummy from './components/Dummy';
import Footer from './components/Footer';
import Posts from './components/Posts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="App">
          <Navbar />
          <p style={{"height": "60px"}}></p>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about/" element={<About />} />
              <Route path="/create" element={<Create />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route path="/posts/" element={<Posts />} /> //:page
              <Route path="*" element={<NotFound />} />
              <Route path="/dummy" element={<Dummy />} />
            </Routes>
          </div>
          <Footer />
        </div>
    </Router>
  );
}

export default App;