<template>
    <div>
      <h1>Commandes</h1>
  
      <ul>
        <li v-for="commande in commandes" :key="commande.id">
          Statut: {{ commande.statut }} - Client ID: {{ commande.id_client }}
          <ul>
            <li v-for="plat in commande.plats" :key="plat.id">
              Plat: {{ getPlatName(plat.id) }} 
            </li>
          </ul>
          <button @click="deleteCommande(commande)">Supprimer</button>
        </li>
      </ul>
  
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import commandeService from "../../services/CommandeService";
  import platService from "../../services/PlatService"; // Importer le service des plats
  
  const commandes = ref([]);
  const plats = ref([]); // Pour stocker les plats
  const errorMessage = ref("");
  
  // Charger toutes les commandes et les plats au montage du composant
  const fetchCommandes = async () => {
    try {
      const response = await commandeService.getAllCommandes();
      commandes.value = response;
      console.log('Commandes chargées:', commandes.value);
    } catch (error) {
      errorMessage.value = "Erreur lors du chargement des commandes.";
      console.error('Erreur dans fetchCommandes:', error);
    }
  };
  
  const fetchPlats = async () => {
    try {
      const response = await platService.getAllPlats();
      plats.value = response;
      console.log('Plats chargés:', plats.value);
    } catch (error) {
      errorMessage.value = "Erreur lors du chargement des plats.";
      console.error('Erreur dans fetchPlats:', error);
    }
  };
  
  // Fonction pour obtenir le nom d'un plat par son ID
  const getPlatName = (platId) => {
    const plat = plats.value.find(p => p.id === platId);
    return plat ? plat.nom : 'Inconnu'; // Retourner 'Inconnu' si le plat n'est pas trouvé
  };
  
  // Supprimer une commande
  const deleteCommande = async (commande) => {
    try {
      await commandeService.deleteCommande(commande.id);
      commandes.value = commandes.value.filter(c => c.id !== commande.id);
      console.log('Commande supprimée:', commande);
    } catch (error) {
      errorMessage.value = "Erreur lors de la suppression de la commande.";
      console.error('Erreur dans deleteCommande:', error);
    }
  };
  
  onMounted(() => {
    fetchCommandes(); // Charger les commandes au montage
    fetchPlats(); // Charger les plats au montage
  });
  </script>
  
  <style scoped>
  /* Ajoutez vos styles ici */
  </style>