import axios from 'axios';

const API_URL = 'https://garg-hot-web.onrender.com/api/vente';

const venteService = {
  /**
   * Récupère toutes les ventes
   */
  getAllVentes() {
    return axios.get(`${API_URL}/`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la récupération des ventes:', error);
      throw error;
    });
  },

  /**
   * Récupère une vente par son ID
   * @param {number} id 
   */
  getVenteById(id) {
    return axios.get(`${API_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la récupération de la vente ID ${id}:`, error);
      throw error;
    });
  },

  /**
   * Ajoute une nouvelle vente
   * @param {Object} vente 
   */
  createVente(vente) {
    return axios.post(`${API_URL}/`, vente, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la création de la vente:', error);
      throw error;
    });
  },

  /**
   * Met à jour une vente
   * @param {number} id 
   * @param {Object} vente 
   */
  updateVente(id, vente) {
    return axios.put(`${API_URL}/${id}`, vente, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la mise à jour de la vente ID ${id}:`, error);
      throw error;
    });
  },

  /**
   * Supprime une vente par ID
   * @param {number} id 
   */
  deleteVente(id) {
    return axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la suppression de la vente ID ${id}:`, error);
      throw error;
    });
  }
};

export default venteService;
