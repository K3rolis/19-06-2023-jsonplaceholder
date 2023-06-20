import axios from 'axios';
import React, { useContext, useState } from 'react';
import { API_URL } from '../../config/config';
import { useQueries, useQuery } from '@tanstack/react-query';
import { SearchContext } from '../../App';

const Search = () => {
  //   const { searchQuery, setSearchQuery } = useContext(SearchContext);

  //   const { searchQuery } = useContext(SearchContext);
  const [query, setQuery] = useState<string>('');

  //   setSearchQuery(query);

  const getSearchResults = async (value: string) => {
    return await axios.get(`${API_URL}/posts?q=${value}`).then((res) => res.data);
  };

  // const [postsQuery, usersQuery, commentsQuery] = useQueries({
  //   queries: [
  //     {
  //       queryKey: ['posts'],
  //       queryFn: () => axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => res.data),
  //     },

  //     {
  //       queryKey: ['users'],
  //       queryFn: () => axios.get('https://jsonplaceholder.typicode.com/users').then((res) => res.data),
  //     },

  //     {
  //       queryKey: ['comments'],
  //       queryFn: () => axios.get('https://jsonplaceholder.typicode.com/comments').then((res) => res.data),
  //     },
  //   ],
  // });

  // console.log(usersQuery && usersQuery?.data, postsQuery && postsQuery?.data, commentsQuery && commentsQuery?.data);

  const {
    isLoading,
    isFetching,
    status,
    error,
    refetch,
    data: search,
  } = useQuery({
    queryKey: ['search', query],
    queryFn: () => getSearchResults(query),
    enabled: false,
  });
  console.log(query);

  //   setSearchQuery(query);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    refetch();
  };

  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name="q" onChange={(e) => setQuery(e.target.value)} value={query} autoFocus />
        <input type="submit" />
      </form>
      <div>{isFetching && isLoading ? 'Loading...' : null}</div>
      {search && <h1>{search.length} results found</h1>}
      {search && search.map((item: any) => <p key={item.id}>{item.title}</p>)}
    </div>
  );
};

export default Search;
