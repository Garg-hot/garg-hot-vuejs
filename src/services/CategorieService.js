import axios from 'axios';

const API_URL = 'https://garg-hot-web.onrender.com/api/categorie';

const categorieService = {
  /**
   * Récupère toutes les catégories
   */
  getAllCategories() {
    return axios.get(`${API_URL}/`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la récupération des catégories:', error);
      throw error;
    });
  },

  /**
   * Récupère une catégorie par son ID
   * @param {number} id 
   */
  getCategorieById(id) {
    return axios.get(`${API_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la récupération de la catégorie ID ${id}:`, error);
      throw error;
    });
  },

  /**
   * Ajoute une nouvelle catégorie
   * @param {Object} categorie 
   */
  createCategorie(categorie) {
    return axios.post(`${API_URL}/`, categorie, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la création de la catégorie:', error);
      throw error;
    });
  },

  /**
   * Met à jour une catégorie
   * @param {number} id 
   * @param {Object} categorie 
   */
  updateCategorie(id, categorie) {
    return axios.put(`${API_URL}/edit/${id}`, categorie, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la mise à jour de la catégorie ID ${id}:`, error);
      throw error;
    });
  },

  /**
   * Supprime une catégorie par ID
   * @param {number} id 
   */
  deleteCategorie(id) {
    return axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Erreur lors de la suppression de la catégorie ID ${id}:`, error);
      throw error;
    });
  }
};

export default categorieService;
