
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import contacts from '../data/contacts.js'

const router = useRouter()

const nouveauContact = ref({
  id: Math.max(...contacts.value.map(c => c.id), 0) + 1,
  nom: '',
  prenom: '',
  telephone: '',
  email: '',
  photo: ''
})

function ajouter() {
  contacts.value.push({ ...nouveauContact.value })

  router.push('/')
}
</script>

<template>
  <div>
    <h1>Ajouter un contact</h1>

    <form @submit.prevent="ajouter">

      <div>
        <label>Nom :</label>
        <input type="text" v-model="nouveauContact.nom" required>
      </div>

      <div>
        <label>Prénom :</label>
        <input type="text" v-model="nouveauContact.prenom" required>
      </div>

      <div>
        <label>Téléphone :</label>
        <input
          type="tel"
          v-model="nouveauContact.telephone"
          pattern="[0-9]{8}"
          maxlength="8"
          minlength="8"
          required
        >
      </div>

      <div>
        <label>E-mail :</label>
        <input type="email" v-model="nouveauContact.email" required>
      </div>

      <button type="submit">Ajouter</button>

      <button type="button" @click="router.push('/')">
        Retour
      </button>

    </form>
  </div>
</template>

<style scoped>
div {
  max-width: 650px;
  margin: 50px auto;
  padding: 35px;
  background-color: white;
  border-radius: 18px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
}

h1 {
  text-align: center;
  color: #5b3cc4;
  font-size: 28px;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

form div {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  box-shadow: none;
  border-radius: 0;
  background: none;
}

label {
  font-weight: 600;
  color: #444;
}

input {
  width: 100%;
  padding: 13px 15px;
  border: 1px solid #dcd6f5;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
}

input:focus {
  border-color: #7655d8;
  box-shadow: 0 0 0 3px rgba(118, 85, 216, 0.12);
}

button {
  padding: 13px 20px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

button[type="submit"] {
  background-color: #6c4bd2;
  color: white;
}

button[type="submit"]:hover {
  background-color: #5635b8;
}

button[type="button"] {
  background-color: #eeeaf9;
  color: #5b3cc4;
}

button[type="button"]:hover {
  background-color: #ded6f5;
}

@media (max-width: 600px) {
  div {
    margin: 20px 15px;
    padding: 22px;
  }

  h1 {
    font-size: 23px;
  }
}
</style>
