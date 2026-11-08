
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import contacts from '../data/contacts.js'

const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)

const contact = contacts.value.find(c => c.id === id)

const contactModifie = ref({ ...contact })

function enregistrer() {
  Object.assign(contact, contactModifie.value)
  router.push('/')
}

function retour() {
  router.push('/')
}

function changerPhoto(event) {
  const fichier = event.target.files[0]

  if (fichier) {
    contactModifie.value.photo = URL.createObjectURL(fichier)
  }
}
</script>

<template>
  <div class="fiche-contact">

    <h1>Fiche contact — Modification</h1>

    <div class="photo">
      <img
        v-if="contactModifie.photo"
        :src="contactModifie.photo"
        alt="Photo du contact"
      >

      <div v-else class="initiales">
        {{ contactModifie.prenom?.charAt(0) }}{{ contactModifie.nom?.charAt(0) }}
      </div>
    </div>

    <form @submit.prevent="enregistrer">

      <div class="formulaire">

        <div>
          <label>Nom</label>
          <input type="text" v-model="contactModifie.nom" required>
        </div>

        <div>
          <label>Prénom</label>
          <input type="text" v-model="contactModifie.prenom" required>
        </div>

        <div>
          <label>Téléphone</label>
          <input
            type="tel"
            v-model="contactModifie.telephone"
            pattern="[0-9]{8}"
            maxlength="8"
            minlength="8"
            required
          >
        </div>

        <div>
          <label>E-mail</label>
          <input type="email" v-model="contactModifie.email" required>
        </div>

      </div>

      <div class="boutons">

        <a :href="'tel:' + contactModifie.telephone" class="btn appeler">
          Appeler
        </a>

        <a :href="'mailto:' + contactModifie.email" class="btn email">
          E-mail
        </a>

        <label for="galerie" class="btn galerie">Galerie</label>

        <input
          id="galerie"
          type="file"
          accept="image/*"
          hidden
          @change="changerPhoto"
        >

        <label for="camera" class="btn camera">Caméra</label>

        <input
          id="camera"
          type="file"
          accept="image/*"
          capture="environment"
          hidden
          @change="changerPhoto"
        >

      </div>

      <div class="actions">
        <button type="submit" class="btn enregistrer">
          Enregistrer
        </button>

        <button type="button" class="btn retour" @click="retour">
          Retour
        </button>
      </div>

    </form>
  </div>
</template>

<style scoped>
.fiche-contact {
  padding: 25px;
  max-width: 800px;
  margin: auto;
  font-family: Arial, sans-serif;
}

h1 {
  color: #26334d;
  margin-bottom: 20px;
}

.photo {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.photo img,
.initiales {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
}

.initiales {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d8e6fa;
  color: #3549a5;
  font-size: 30px;
  font-weight: bold;
}

.formulaire {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 25px;
}

.formulaire div {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

input[type="text"],
input[type="email"],
input[type="tel"] {
  padding: 11px;
  border: 1px solid #b9c7dc;
  border-radius: 6px;
}

.boutons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-top: 30px;
}

.btn {
  padding: 12px;
  border: none;
  border-radius: 6px;
  color: white;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.appeler {
  background: #168f68;
}

.email {
  background: #287bd0;
}

.galerie,
.camera {
  background: #6850b7;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.enregistrer {
  background: #168f68;
}

.retour {
  background: #777;
}

@media (max-width: 600px) {
  .formulaire {
    grid-template-columns: 1fr;
  }

  .boutons {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
