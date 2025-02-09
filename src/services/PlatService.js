import axios from 'axios';

const API_URL = 'https://garg-hot-web.onrender.com/api/plat';

const platService = {
  getAllPlats() {
    return axios.get(`${API_URL}/`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la récupération des plats:', error);
      throw error;
    });
  },

  getPlatById(id) {
    return axios.get(`${API_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la récupération du plat ID ${id}:`, error);
      throw error;
    });
  },

  createPlat(platData) {
    return axios.post(`${API_URL}/`, platData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la création du plat:', error);
      throw error;
    });
  },

  updatePlat(id, platData) {
    console.log('URL de mise à jour:', `${API_URL}/edit/${id}`);
    console.log('Données envoyées:', platData);
    return axios.put(`${API_URL}/edit/${id}`, platData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Réponse de l\'API:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour du plat:', error);
      throw error;
    });
  },

  deletePlat(id) {
    return axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la suppression du plat ID ${id}:`, error);
      throw error;
    });
  }
};

export default platService;
