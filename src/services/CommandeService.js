import axios from 'axios';

const API_URL = 'https://garg-hot-web.onrender.com/api/commandes';

const commandeService = {
  /**
   * Récupère toutes les commandes
   */
  getAllCommandes() {
    return axios.get(`${API_URL}/`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la récupération des commandes:', error);
      throw error;
    });
  },

  /**
   * Récupère une commande par son ID
   * @param {number} id 
   */
  getCommandeById(id) {
    return axios.get(`${API_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la récupération de la commande ID ${id}:`, error);
      throw error;
    });
  },

  /**
   * Ajoute une nouvelle commande
   * @param {Object} commande 
   */
  createCommande(commande) {
    return axios.post(`${API_URL}/`, commande, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la création de la commande:', error);
      throw error;
    });
  },

  /**
   * Met à jour une commande
   * @param {number} id 
   * @param {Object} commande 
   */
  updateCommande(id, commande) {
    return axios.put(`${API_URL}/edit/${id}`, commande, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la mise à jour de la commande ID ${id}:`, error);
      throw error;
    });
  },

  /**
   * Supprime une commande par ID
   * @param {number} id 
   */
  deleteCommande(id) {
    return axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la suppression de la commande ID ${id}:`, error);
      throw error;
    });
  },

  /**
   * Récupère les plats d'une commande par son ID
   * @param {number} id 
   */
  getPlatsByCommandeId(id) {
    return axios.get(`${API_URL}/${id}/plats`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la récupération des plats pour la commande ID ${id}:`, error);
      throw error;
    });
  }
};

export default commandeService;
