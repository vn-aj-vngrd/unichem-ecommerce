import axios from "axios";

const API_URL = "/api/promos/";

// Set new promo
const setPromo = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, productData, config);

  return response.data;
};

// Get all promos
const getPromos = async () => {
  const response = await axios.get(API_URL);
  // console.log(response.data);

  return response.data;
};

// Update Promo
const updatePromo = async (promoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "updatePromo", promoData, config);
  // console.log(response.data);

  return response.data;
};


// // Get specific product
// const updatePromo = async (id, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.update(API_URL + id, config);
//   // console.log(response.data);

//   return response.data;
// };

// Delete product
const deletePromo = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id.id, config);

  return response.data;
};

const promoService = {
  setPromo,
  getPromos,
  updatePromo,
  deletePromo,
};

export default promoService;
