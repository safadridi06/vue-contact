
<script setup>
import { useRouter } from 'vue-router'
import contacts from '../data/contacts.js'

const router = useRouter()

const listeContacts = contacts

function modifier(id) {
  router.push('/contacts/' + id)
}

function ajouterContact() {
  router.push('/contacts/ajouter')
}
</script>

<template>
  <div class="page">

    <header class="header">
      <div>
        <p class="subtitle">CARNET D'ADRESSES</p>
        <h1>Mes Contacts</h1>
        <p class="description">
          Retrouvez et gérez facilement vos contacts.
        </p>
      </div>

      <button class="btn-ajouter" @click="ajouterContact">
        <span>+</span> Ajouter un contact
      </button>
    </header>

    <div class="statistiques">
      <div class="stat-icon">👥</div>
      <div>
        <h2>{{ listeContacts.length }}</h2>
        <p>Contacts enregistrés</p>
      </div>
    </div>

    <section class="contacts-section">

      <h2 class="section-title">Tous les contacts</h2>

      <div class="contacts-grid">

        <div
          class="contact-card"
          v-for="contact in listeContacts"
          :key="contact.id"
        >

          <div class="card-top">
            <div class="photo">
              <img
                v-if="contact.photo"
                :src="contact.photo"
                :alt="contact.prenom"
              >
              <span v-else>
                {{ contact.prenom.charAt(0) }}
              </span>
            </div>
          </div>

          <div class="contact-info">
            <h3>{{ contact.prenom }} {{ contact.nom }}</h3>

            <p class="telephone">
              <span>☎</span>
              {{ contact.telephone }}
            </p>

            <p class="email">
              {{ contact.email }}
            </p>
          </div>

          <button
            class="btn-modifier"
            @click="modifier(contact.id)"
          >
            Modifier le contact
          </button>

        </div>

      </div>

      <div v-if="listeContacts.length === 0" class="vide">
        <div>📭</div>
        <h3>Aucun contact</h3>
        <p>Commencez par ajouter votre premier contact.</p>
      </div>

    </section>

  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 45px 7%;
  background: #f4f6fc;
  font-family: Arial, sans-serif;
}

/* Header */

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 35px;
}

.subtitle {
  color: #7563cf;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 3px;
  margin-bottom: 10px;
}

.header h1 {
  color: #202746;
  font-size: 35px;
  margin-bottom: 10px;
}

.description {
  color: #858ba0;
  font-size: 15px;
}

/* Bouton Ajouter */

.btn-ajouter {
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 14px 22px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-ajouter span {
  font-size: 20px;
  margin-right: 7px;
}

.btn-ajouter:hover {
  background: #5545c5;
  transform: translateY(-3px);
}

/* Statistiques */

.statistiques {
  display: flex;
  align-items: center;
  gap: 18px;
  background: white;
  padding: 20px;
  border-radius: 15px;
  width: fit-content;
  min-width: 220px;
  box-shadow: 0 5px 20px rgba(35, 40, 80, 0.05);
  margin-bottom: 40px;
}

.stat-icon {
  background: #eeeaff;
  padding: 15px;
  border-radius: 12px;
  font-size: 25px;
}

.statistiques h2 {
  color: #6c5ce7;
  font-size: 25px;
}

.statistiques p {
  color: #858ba0;
  font-size: 13px;
  margin-top: 5px;
}

/* Contacts */

.section-title {
  color: #202746;
  font-size: 21px;
  margin-bottom: 22px;
}

.contacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 25px;
}

/* Contact Card */

.contact-card {
  background: white;
  border-radius: 16px;
  padding: 25px 20px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(35, 40, 80, 0.05);
  transition: 0.3s;
}

.contact-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 25px rgba(35, 40, 80, 0.12);
}

.card-top {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}

.photo {
  width: 95px;
  height: 95px;
  border-radius: 50%;
  overflow: hidden;
  background: #eeeaff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c5ce7;
  font-size: 30px;
  font-weight: bold;
  border: 4px solid #eeeaff;
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-info h3 {
  color: #202746;
  font-size: 17px;
  margin-bottom: 14px;
}

.telephone {
  color: #626b82;
  font-size: 14px;
  margin-bottom: 9px;
}

.telephone span {
  color: #6c5ce7;
  margin-right: 5px;
}

.email {
  color: #9399aa;
  font-size: 13px;
  margin-bottom: 20px;
  overflow-wrap: anywhere;
}

/* Bouton Modifier */

.btn-modifier {
  width: 100%;
  padding: 11px;
  border: 1px solid #6c5ce7;
  border-radius: 8px;
  background: white;
  color: #6c5ce7;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-modifier:hover {
  background: #6c5ce7;
  color: white;
}

/* Liste vide */

.vide {
  text-align: center;
  background: white;
  padding: 45px;
  border-radius: 15px;
  color: #858ba0;
}

.vide div {
  font-size: 40px;
  margin-bottom: 12px;
}

.vide h3 {
  color: #202746;
  margin-bottom: 8px;
}

/* Responsive */

@media (max-width: 650px) {
  .page {
    padding: 25px 5%;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header h1 {
    font-size: 28px;
  }

  .btn-ajouter {
    width: 100%;
  }
}
</style>
