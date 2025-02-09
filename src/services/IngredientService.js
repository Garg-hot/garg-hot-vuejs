import axios from 'axios';

const API_URL = 'https://garg-hot-web.onrender.com/api/ingredient';

const ingredientService = {
  /**
   * Récupère tous les ingrédients
   */
  getAllIngredients() {
    return axios.get(`${API_URL}/`)
      .then(response => response.data)
      .catch(error => {
        console.error('Erreur lors de la récupération des ingrédients:', error);
        throw error;
      });
  },

  /**
   * Récupère un ingrédient par son ID
   * @param {number} id 
   */
  getIngredientById(id) {
    return axios.get(`${API_URL}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Erreur lors de la récupération de l'ingrédient ID ${id}:`, error);
        throw error;
      });
  },

  /**
   * Crée un nouvel ingrédient
   * @param {Object} ingredient 
   */
  createIngredient(ingredient) {
    return axios.post(`${API_URL}/`, ingredient)
      .then(response => response.data)
      .catch(error => {
        console.error('Erreur lors de la création de l\'ingrédient:', error);
        throw error;
      });
  },

  /**
   * Met à jour un ingrédient
   * @param {number} id 
   * @param {Object} ingredient 
   */
  updateIngredient(id, ingredient) {
    return axios.put(`${API_URL}/edit/${id}`, ingredient)
      .then(response => response.data)
      .catch(error => {
        console.error(`Erreur lors de la mise à jour de l'ingrédient ID ${id}:`, error);
        throw error;
      });
  },

  /**
   * Supprime un ingrédient par ID
   * @param {number} id 
   */
  deleteIngredient(id) {
    return axios.delete(`${API_URL}/delete/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Erreur lors de la suppression de l'ingrédient ID ${id}:`, error);
        throw error;
      });
  }
};

export default ingredientService;
