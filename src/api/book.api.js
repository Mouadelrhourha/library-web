import httpClient from './http.client';

export const fetchAllBook = async ()=>{

  const query = await httpClient.get('/books');

  return query.data;
};

export const createBook = async (book)=>{

  const query = await httpClient.post('/books',{...book,category:book.category.name});

  return query.data;
};

export const updateBook = async (book)=>{

  const query = await httpClient.put(`/books/${book.id}`,{...book,category:book.category.name});
  console.log(book.id);
  
  return query.data;
};

export const deleteBook = async (book)=>{

  const query = await httpClient.delete(`/books/${book.id}`);

  return query.data;
};