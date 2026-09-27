<template>
  <div class="respondent-container">
    <h2>📋 Formulaire de réponse</h2>

    <div v-for="(question, index) in questions" :key="question.id" class="question-card">
      <p class="question-title"><strong>Question {{ index + 1 }} :</strong> {{ question.intitule }}</p>

      <!-- Cas 1 : Question de type Échelle avec un curseur (Slider) -->
       <div v-if="question.type === 'echelle'" class="slider-container">
        <input 
        type="range" 
        :min="question.min || 1" 
        :max="question.max || 5" 
        step="1"
        v-model.number="reponses[question.id]" 
        class="slider"
        />
        <!-- Affichage dynamique de la valeur sélectionnée -->
         <div class="slider-value">
            Valeur choisie : <strong>{{ reponses[question.id] ?? 'Non définie' }}</strong>
        </div>
    </div>
      <!-- Cas 2 : Question de type Texte -->
      <div v-else-if="question.type === 'texte'" class="text-option">
        <textarea 
          v-model="reponses[question.id]" 
          placeholder="Saisissez votre réponse ici..."
          rows="3"
        ></textarea>
      </div>
    </div>

    <!-- Aperçu des réponses enregistrées -->
    <div class="preview">
      <h4>💾 Réponses saisies (prêtes pour la BDD) :</h4>
      <pre>{{ reponses }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Question {
  id: number
  intitule: string
  type: 'echelle' | 'texte'
  min?: number
  max?: number
}

// 1. Liste de questions de test (simule la BDD)
const questions = ref<Question[]>([
  { id: 1, intitule: 'Quel est votre niveau global en Vue.js ?', type: 'echelle', min: 1, max: 5 },
  { id: 2, intitule: 'Quelles sont vos principales difficultés rencontrées ?', type: 'texte' }
])

// 2. Objet pour stocker les réponses { id_question: valeur }
const reponses = ref<Record<number, any>>({})

// Fonction utilitaire pour générer la plage de valeurs d'une échelle
const getScaleRange = (min = 1, max = 5) => {
  const range = []
  for (let i = min; i <= max; i++) range.push(i)
  return range
}
</script>

<style scoped>
.respondent-container { max-width: 600px; margin: 0 auto; text-align: left; }
.question-card { background: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin-bottom: 20px; color: #333; }
.question-title { margin-top: 0; }
.scale-options { display: flex; gap: 15px; margin-top: 10px; }
.scale-label { cursor: pointer; display: flex; align-items: center; gap: 5px; }
.text-option textarea { width: 100%; border-radius: 4px; border: 1px solid #ccc; padding: 8px; }
.preview { background: #222; color: #fff; padding: 10px; border-radius: 4px; margin-top: 20px; }
</style>