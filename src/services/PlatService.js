import axios from 'axios';

const API_URL = 'http://http://192.168.88.171:8000/api/plat/'; // Mets l'URL de ton API Symfony

const platService = {
  /**
   * Récupère tous les plats
   */
  getAllPlats() {
    return axios.get(API_URL)
      .then(response => response.data)
      .catch(error => {
        console.error('Erreur lors de la récupération des plats:', error);
        throw error;
      });
  },

  /**
   * Récupère un plat par son ID
   * @param {number} id 
   */
  getPlatById(id) {
    return axios.get(`${API_URL}${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Erreur lors de la récupération du plat ID ${id}:`, error);
        throw error;
      });
  },

  /**
   * Ajoute un nouveau plat
   * @param {Object} platData 
   */
  createPlat(platData) {
    return axios.post(API_URL, platData)
      .then(response => response.data)
      .catch(error => {
        console.error('Erreur lors de la création du plat:', error);
        throw error;
      });
  },

  /**
   * Met à jour un plat
   * @param {number} id 
   * @param {Object} platData 
   */
  updatePlat(id, platData) {
    return axios.put(`${API_URL}edit/${id}`, platData)
      .then(response => response.data)
      .catch(error => {
        console.error(`Erreur lors de la mise à jour du plat ID ${id}:`, error);
        throw error;
      });
  },

  /**
   * Supprime un plat par ID
   * @param {number} id 
   */
  deletePlat(id) {
    return axios.delete(`${API_URL}delete/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Erreur lors de la suppression du plat ID ${id}:`, error);
        throw error;
      });
  }
};

export default platService;
