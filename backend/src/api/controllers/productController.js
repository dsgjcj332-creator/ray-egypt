// Simple product controller for Vercel
const getProducts = (req, res) => {
  res.json({ message: 'Products endpoint working', data: [] });
};

const getProductById = (req, res) => {
  res.json({ message: 'Product by ID working', id: req.params.id });
};

const createProduct = (req, res) => {
  res.json({ message: 'Create product working' });
};

const updateProduct = (req, res) => {
  res.json({ message: 'Update product working', id: req.params.id });
};

const deleteProduct = (req, res) => {
  res.json({ message: 'Delete product working', id: req.params.id });
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
