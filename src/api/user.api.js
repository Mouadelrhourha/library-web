import httpClient from './http.client';

export const fetchAllUser =async ()=>{
  const query = await httpClient.get('/users');
  return query.data;

};

export const createUser= async(user)=>{
  console.log(user);
  const query = await httpClient.post('/users',{...user,joined_date:user.joinedDate});
  return query.data;

};
export const updateUser= async(user)=>{

  const query = await httpClient.put(`/users/${user.id}`,{...user,joined_date:user.joinedDate});
  return query.data;

};
export const deleteUser = async(user)=>{
  const query = await httpClient.delete(`/users/${user.id}`);
  return query.data;
};