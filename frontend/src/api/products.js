import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Helper to map backend product to frontend structure
const mapProduct = (p) => ({
  id: p._id,
  title: p.name,
  description: p.description,
  price: p.price,
  category: p.category,
  image: p.imageUrl,
});

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data.data.map(mapProduct);
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return mapProduct(response.data.data);
};

export default api;
