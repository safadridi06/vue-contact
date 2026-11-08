
import { ref } from 'vue'
import ahmed from './images/ahmed.jpg'
import sarra from './images/sarra.jpg'
import mohammed from './images/mohammed.jpg'
import ines from './images/ines.jpg'
const contacts = [
  {
    id: 1,
    nom: "Ben Ali",
    prenom: "Ahmed",
    telephone: "22 345 678",
    email: "ahmed@gmail.com",
    photo: ahmed
  },
  {
    id: 2,
    nom: "Trabelsi",
    prenom: "Sarra",
    telephone: "98 765 432",
    email: "sarra@gmail.com",
    photo: sarra
  },
  {
    id: 3,
    nom: "Gharbi",
    prenom: "Mohammed",
    telephone: "55 234 567",
    email: "mohammed@gmail.com",
    photo: mohammed
  },
  {
    id: 4,
    nom: "Jaziri",
    prenom: "Ines",
    telephone: "29 456 123",
    email: "ines@gmail.com",
    photo: ines
  }
]

export default ref(contacts)
