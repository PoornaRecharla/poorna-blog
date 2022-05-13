import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/Create';
import PostDetails from './components/PostDetails';
import NotFound from './components/NotFound';
import About from './components/About';
import Dummy from './components/Dummy';
import Footer from './components/Footer';
import Posts from './components/Posts';
import EditPost from './components/EditPost';
import Tag from './components/Tag';
import Delete from './components/Delete';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <p style={{"height": "60px"}}></p> */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/" element={<About />} />
            <Route path="/create" element={<Create />} />
            <Route path="/post/:postNum" element={<PostDetails />} />
            <Route path="/posts/" element={<Posts />} />
            <Route path="/post/edit/:postNum" element={<EditPost />} />
            <Route path="/tag/:tag" element={<Tag />} />
            <Route path="/delete/:postNum" element={<Delete />} />
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