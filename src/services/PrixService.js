import axios from 'axios';

const API_URL = 'https://garg-hot-web.onrender.com/api/prix';

const prixService = {
  /**
   * Récupère tous les prix
   */
  getAllPrix() {
    return axios.get(`${API_URL}/`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la récupération des prix:', error);
      throw error;
    });
  },

  /**
   * Récupère un prix par son ID
   * @param {number} id 
   */
  getPrixById(id) {
    return axios.get(`${API_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la récupération du prix ID ${id}:`, error);
      throw error;
    });
  },

  /**
   * Ajoute un nouveau prix
   * @param {Object} prix 
   */
  createPrix(prix) {
    return axios.post(`${API_URL}/`, prix, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la création du prix:', error);
      throw error;
    });
  },

  /**
   * Met à jour un prix
   * @param {number} id 
   * @param {Object} prix 
   */
  updatePrix(id, prix) {
    return axios.put(`${API_URL}/${id}`, prix, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la mise à jour du prix ID ${id}:`, error);
      throw error;
    });
  },

  /**
   * Supprime un prix par ID
   * @param {number} id 
   */
  deletePrix(id) {
    return axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la suppression du prix ID ${id}:`, error);
      throw error;
    });
  }
};

export default prixService;