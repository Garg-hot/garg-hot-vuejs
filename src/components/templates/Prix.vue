<script setup>
import { ref, onMounted } from "vue";
import prixService from "../../services/PrixService";
import platService from "../../services/PlatService"; // Assurez-vous d'importer le service des plats

const prixList = ref([]);
const newPrix = ref({ montant: "", platId: null });
const errorMessage = ref("");
const plats = ref([]); // Pour stocker les plats

// Charger tous les prix et plats au montage du composant
const fetchPrix = async () => {
  try {
    const response = await prixService.getAllPrix();
    prixList.value = response;
    console.log('Prix chargés:', prixList.value);
  } catch (error) {
    errorMessage.value = "Erreur lors du chargement des prix.";
    console.error('Erreur dans fetchPrix:', error);
  }
};

const fetchPlats = async () => {
  try {
    const response = await platService.getAllPlats();
    plats.value = response;
    console.log('Plats chargés:', plats.value); // Vérifiez ici la structure des données
  } catch (error) {
    errorMessage.value = "Erreur lors du chargement des plats.";
    console.error('Erreur dans fetchPlats:', error);
  }
};

// Ajouter un prix
const addPrix = async () => {
  if (!newPrix.value.montant || !newPrix.value.platId) {
    console.warn('Montant ou platId manquant lors de l\'ajout d\'un prix');
    return;
  }
  try {
    // Créer l'objet à envoyer à l'API
    const prixData = {
      plat: {
        id: newPrix.value.platId, // Utiliser l'ID du plat sélectionné
        nom: plats.value.find(plat => plat.id === newPrix.value.platId)?.nom // Récupérer le nom du plat
      },
      montant: newPrix.value.montant
    };

    const response = await prixService.createPrix(prixData);
    prixList.value.push(response);
    newPrix.value = { montant: "", platId: null }; // Réinitialiser le formulaire
    console.log('Prix ajouté:', response);
  } catch (error) {
    errorMessage.value = "Erreur lors de l'ajout du prix.";
    console.error('Erreur dans addPrix:', error);
  }
};


// Supprimer un prix
const deletePrix = async (prix) => {
  console.log('Tentative de suppression du prix avec ID:', prix.id); // Log pour vérifier l'ID
  try {
    await prixService.deletePrix(prix.id);
    prixList.value = prixList.value.filter(p => p.id !== prix.id); // Mettre à jour la liste après suppression
    console.log('Prix supprimé:', prix);
  } catch (error) {
    errorMessage.value = "Erreur lors de la suppression du prix.";
    console.error('Erreur dans deletePrix:', error);
  }
};

onMounted(() => {
  fetchPrix();
  fetchPlats(); // Charger les plats au montage
});
</script>

<template>
  <div>
    <h1>Prix</h1>

    <div class="add-form">
      <input v-model="newPrix.montant" placeholder="Montant" />
      <select v-model="newPrix.platId">
        <option v-for="plat in plats" :key="plat.id" :value="plat.id">{{ plat.nom }}</option>
        </select>
      <button @click="addPrix">Ajouter</button>
    </div>

    <ul>
      <li v-for="prix in prixList" :key="prix.id">
        {{ prix.montant }} - {{ prix.datePrix }} - {{ prix.plat.nom }}
        <button @click="deletePrix(prix)">Supprimer</button>
      </li>
    </ul>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
/* Ajoutez vos styles ici */
</style>