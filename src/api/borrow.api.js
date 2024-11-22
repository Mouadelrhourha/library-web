import httpClient from './http.client';

export const fetchAllBorrows=async ()=>{

  const query = await httpClient.get('/borrows');
  return query.data;
};

export const createBorrow=async ({userId,bookId,borrowDate,returnDate})=>{
  const query = await httpClient.post('/borrows/',{ userId,bookId,
    borrow_date :   borrowDate ,
    return_date:  returnDate
  });
  return query.data;
};

export const updateBorrows= async (borrowsId,{userId,bookId,borrowDate,returnDate})=>{
  const query= await httpClient.put(`/borrows/${borrowsId}`,{userId,bookId,
    borrow_date:borrowDate,
    return_date : returnDate});
  return query.data;
};

export const getCountBorrowsByMonth=async ()=>{
  const query = await httpClient.get('/borrows/count-by-month');
  return query.data;
};

export const getTopBorrowingUsers=async ()=>{
  const query = await httpClient.get('/borrows/top-borrowing-users');
  return query.data;
};

export const getMostBorrowedBooks=async ()=>{
  const query = await httpClient.get('/borrows/most-borrowed-books');
  return query.data;
};
