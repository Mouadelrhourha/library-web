import httpClient from './http.client';

export const fetchAllCategories = async () => {
  const query = await httpClient.get('/category');
  return query.data; // tableau dial les categories
};

export const createCategory = async(category)=>{
  // category : { name : 'test' }
  /**
   * 2eme argument hwa json li baghi tsift
   * 3tini object js w ana radi nrdo JSON
   *
   */
  const query= await httpClient.post('/category',category);
  return query.data;
};

export const updateCategory = async(category)=>{
  const query = await httpClient.put(`/category/${category.id}`,category);
  return query.data;
};

export const deleteCategory = async(category)=>{
  const query = await httpClient.delete(`/category/${category.id}`);
  return query.data;
};

export const getPopularCategories = async()=>{
  const query = await httpClient.get('/category/popular');
  return query.data;
};
