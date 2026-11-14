
<script setup>
import { ref, computed, onMounted } from 'vue'
import { getTickets } from '../services/ticketService.js'


const tickets = ref([])
const chargement = ref(false)
const erreur = ref('')

// Chargement des tickets
async function chargerTickets() {
    chargement.value = true
    erreur.value = ''

    try {
        const response = await getTickets()
        tickets.value = response.data
    }
    catch (error) {
        erreur.value = "Impossible de charger les tickets. Vérifiez que le serveur est démarré."
    }
    finally {
        chargement.value = false
    }
}

// Recherche et filtres
const recherche = ref('')
const filtreStatut = ref('')
const filtrePriorite = ref('')

// Filtrage des tickets
const ticketsFiltres = computed(() => {
    return tickets.value.filter(t => {
        const titreCorrespond = t.titre.toLowerCase().includes(recherche.value.toLowerCase())

        const statutCorrespond =
            filtreStatut.value === '' || t.statut === filtreStatut.value

        const prioriteCorrespond =
            filtrePriorite.value === '' || t.priorite === filtrePriorite.value

        return titreCorrespond && statutCorrespond && prioriteCorrespond
    })
})


onMounted(() => {
    chargerTickets()
})
</script>

<template>
    <div class="page-container">

        <!-- En-tête -->
        <header class="page-header">
            <div>
                <h1>Gestion des tickets</h1>
            </div>
        </header>

        <!-- Chargement -->
        <div v-if="chargement" class="message-box">
            <span class="loader"></span>
            <p>Chargement des tickets...</p>
        </div>

        <!-- Erreur -->
        <div v-else-if="erreur" class="error-box">
            <div>
                <strong>Une erreur est survenue</strong>
                <p>{{ erreur }}</p>
                <button @click="chargerTickets" class="retry-button">
                    Réessayer
                </button>
            </div>
        </div>

        <div v-else>


            <!-- Recherche et filtres -->
            <section class="filter-section">
                <div class="section-heading">
                    <div>
                        <h2>Liste des tickets</h2>
                        <p>Recherchez et filtrez les demandes.</p>
                    </div>
                    <span class="count-badge">
                        {{ ticketsFiltres.length }} ticket(s)
                    </span>
                </div>

                <div class="filters">

                    <div class="search-box">
                        <input type="text" v-model="recherche" placeholder="Rechercher un ticket...">
                    </div>

                    <select v-model="filtreStatut" >
                        <option value="">Tous les statuts</option>
                        <option value="Ouvert">Ouvert</option>
                        <option value="En cours">En cours</option>
                        <option value="Résolu">Résolu</option>
                    </select>

                    <select v-model="filtrePriorite">
                        <option value="">Toutes les priorités</option>
                        <option value="Haute">Haute</option>
                        <option value="Moyenne">Moyenne</option>
                        <option value="Basse">Basse</option>
                    </select>

                </div>
            </section>

            <!-- Cartes des tickets -->
            <section class="tickets-grid">

                <div v-for="t in ticketsFiltres" :key="t.id" class="ticket-card">

                    <div class="ticket-top">
                        <span class="ticket-id">#{{ t.id }}</span>
                        <span :class="['badge', t.priorite.toLowerCase()]">{{ t.priorite }}</span>
                    </div>

                    <h3>{{ t.titre }}</h3>

                    <p class="ticket-description">{{ t.description }}</p>

                    <div class="ticket-info">
                        <p>Demandé par: {{ t.demandeur }}</p>
                        <p>Date de creation: {{ t.dateCreation }}</p>
                    </div>

                    <div class="ticket-footer">
                        <span class="status-label">Statut</span>
                        <span :class="['badge', {
                            'ouvert': t.statut === 'Ouvert',
                            'encours': t.statut === 'En cours',
                            'resolu': t.statut === 'Résolu'
                        }]">
                            {{ t.statut }}
                        </span>
                    </div>

                </div>

            </section>

            <!-- Aucun résultat -->
            <div v-if="ticketsFiltres.length === 0" class="empty-state">
                <h3>Aucun ticket trouvé</h3>
                <p>
                    Aucun ticket ne correspond à votre recherche ou à vos filtres.
                </p>
            </div>

        </div>
    </div>
</template>


<style scoped>
* {
    box-sizing: border-box;
}

.page-container {
    min-height: 100vh;
    background: #f4f6fb;
    padding: 40px;
    font-family: Arial, sans-serif;
    color: #1e293b;
}

/* En-tête */
.page-header {
    background: linear-gradient(120deg, #172554, #2563eb);
    color: white;
    padding: 35px;
    border-radius: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}



.page-header h1 {
    font-size: 30px;
    margin: 0 0 10px;
}

/* Recherche et filtres */
.filter-section {
    background: white;
    padding: 25px;
    border-radius: 14px;
    margin-bottom: 25px;
    border: 1px solid #e8edf5;
}

.section-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;
}

.section-heading h2 {
    margin: 0 0 7px;
    font-size: 20px;
}

.section-heading p {
    color: #64748b;
    font-size: 13px;
    margin: 0;
}

.count-badge {
    background: #eff6ff;
    color: #1d4ed8;
    padding: 8px 13px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
}

.filters {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 14px;
}

.search-box {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #dce3ed;
    border-radius: 9px;
    padding: 0 13px;
    background: white;
}

.search-box input {
    border: none;
    outline: none;
    width: 100%;
    padding: 12px 0;
    font-size: 13px;
    background: transparent;
}

.filters select {
    padding: 12px;
    border: 1px solid #dce3ed;
    border-radius: 9px;
    background: white;
    color: #334155;
    font-size: 13px;
    cursor: pointer;
}



/* Cartes des tickets */
.tickets-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.ticket-card {
    background: white;
    border: 1px solid #e8edf5;
    border-radius: 14px;
    padding: 22px;
}

.ticket-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 17px;
}

.ticket-id {
    color: #64748b;
    font-size: 13px;
    font-weight: bold;
}

.ticket-card h3 {
    font-size: 17px;
    margin: 0 0 10px;
    color: #172554;
}

.ticket-description {
    color: #64748b;
    font-size: 13px;
    line-height: 1.6;
    min-height: 40px;
    margin-bottom: 20px;
}

.ticket-info {
    border-top: 1px solid #edf0f5;
    border-bottom: 1px solid #edf0f5;
    padding: 12px 0;
}

.ticket-info p {
    font-size: 12px;
    color: #475569;
    margin: 7px 0;
}

.ticket-info span {
    margin-right: 6px;
}

.ticket-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
}

.status-label {
    font-size: 12px;
    color: #64748b;
}

/* Badges */
.badge {
    display: inline-block;
    padding: 6px 11px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: bold;
    white-space: nowrap;
}

/* Priorités */
.haute {
    background-color: #fee2e2;
    color: #991b1b;
}

.moyenne {
    background-color: #ffedd5;
    color: #9a3412;
}

.basse {
    background-color: #dcfce7;
    color: #166534;
}

/* Statuts */
.ouvert {
    background-color: #dbeafe;
    color: #1e40af;
}

.encours {
    background-color: #fef3c7;
    color: #92400e;
}

.resolu {
    background-color: #dcfce7;
    color: #166534;
}

/* Aucun résultat */
.empty-state {
    background: white;
    border-radius: 14px;
    padding: 45px 20px;
    text-align: center;
    border: 1px solid #e8edf5;
}


.empty-state h3 {
    color: #172554;
    margin-bottom: 8px;
}

.empty-state p {
    color: #64748b;
    font-size: 13px;
}

/* Chargement et erreur */
.message-box {
    text-align: center;
    padding: 60px;
    color: #64748b;
}

.loader {
    display: inline-block;
    width: 35px;
    height: 35px;
    border: 4px solid #dbeafe;
    border-top-color: #2563eb;
    border-radius: 50%;
}

.error-box {
    background: #fff1f2;
    border: 1px solid #fecdd3;
    color: #9f1239;
    padding: 20px;
    border-radius: 12px;
    display: flex;
    gap: 15px;
}

.error-box p {
    font-size: 13px;
}

.retry-button {
    border: none;
    background: #be123c;
    color: white;
    padding: 9px 15px;
    border-radius: 7px;
    cursor: pointer;
}

/* Pied de page */
.page-footer {
    text-align: center;
    color: #94a3b8;
    font-size: 12px;
    margin-top: 40px;
}

</style>
