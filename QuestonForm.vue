<template>
  <div class="card">
    <h3>📝 Créer une nouvelle question</h3>
    
    <div class="field">
      <label>Intitulé de la question :</label>
      <input 
        v-model="question.intitule" 
        type="text" 
        placeholder="Ex: Quel est votre niveau en programmation ?" 
      />
    </div>

    <div class="field">
      <label>Type de réponse :</label>
      <select v-model="question.type">
        <option value="echelle">Échelle de valeurs (1 à 5)</option>
        <option value="texte">Texte libre</option>
      </select>
    </div>

    <div v-if="question.type === 'echelle'" class="field-group">
      <label>Valeur min : <input v-model.number="question.min" type="number" /></label>
      <label>Valeur max : <input v-model.number="question.max" type="number" /></label>
    </div>

    <div class="preview">
      <h4>🔍 Aperçu des données enregistrées :</h4>
      <pre>{{ question }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Question {
  intitule: string
  type: 'echelle' | 'texte'
  min?: number
  max?: number
}

const question = ref<Question>({
  intitule: '',
  type: 'echelle',
  min: 1,
  max: 5
})
</script>

<style scoped>
.card { border: 1px solid #ccc; padding: 20px; border-radius: 8px; max-width: 500px; margin: 20px auto; }
.field { margin-bottom: 15px; display: flex; flex-direction: column; text-align: left; }
.field-group { display: flex; gap: 10px; margin-bottom: 15px; }
.preview { background: #222; color: #fff; padding: 10px; border-radius: 4px; text-align: left; }
</style>