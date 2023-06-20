import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { SearchContext } from '../../App';
import Search from '../../Pages/Search/Search';

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  // };

  console.log(searchQuery);

  return (
    <div className={styles.navbar}>
      <NavLink className={styles.link} to="/">
        Home
      </NavLink>

      <NavLink className={styles.link} to="/users">
        Users
      </NavLink>

      <NavLink className={styles.link} to="/posts">
        Posts
      </NavLink>

      <NavLink className={styles.link} to="/albums">
        Albums
      </NavLink>

      <NavLink className={styles.link} to="/search">
        Search
      </NavLink>

      {/* <Search /> */}
      {/* <form onSubmit={handleSubmit}>
        <input type="text" name="q" onChange={(e) => setQuery(e.target.value)} value={query} />
        <input type="submit" />
      </form> */}
    </div>
  );
};

export default Navbar;
