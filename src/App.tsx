import React, { Dispatch, SetStateAction, createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Users from './Pages/Users/Users';
import Posts from './Pages/Posts/Posts';
import Post from './Pages/Posts/Post';

import Navbar from './components/Navbar/Navbar';
import Albums from './Pages/Albums/Albums';
import User from './Pages/Users/User';
import Album from './Pages/Albums/Album';
import Search from './Pages/Search/Search';
import CreateNewPost from './Pages/Posts/CreatePost';
import EditPost from './Pages/Posts/EditPost';
import CreateUser from './Pages/Users/CreateUser';
import EditUser from './Pages/Users/EditUser';

// import { SearchContext } from './Contexts/SearchContext';

export const SearchContext = createContext<{ searchQuery: string; setSearchQuery: Dispatch<SetStateAction<string>> }>({
  searchQuery: '',
  setSearchQuery: () => {},
});

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="App">
      <Router>
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/users/:userId" element={<User />}></Route>
            <Route path="/users/create" element={<CreateUser />}></Route>
            <Route path="/users/edit/:userId" element={<EditUser />}></Route>

            <Route path="/posts" element={<Posts />}></Route>
            <Route path="/posts/:postId" element={<Post />}></Route>
            <Route path="/posts/create" element={<CreateNewPost />}></Route>
            <Route path="/posts/edit/:postId" element={<EditPost />}></Route>

            <Route path="/albums" element={<Albums />}></Route>
            <Route path="/albums/:albumId" element={<Album />}></Route>

            <Route path="/search" element={<Search />}></Route>
            <Route path="/search/:searchParams" element={<Search />}></Route>
          </Routes>
        </SearchContext.Provider>
      </Router>
    </div>
  );
}

export default App;
