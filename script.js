// Sélection des éléments
let display1 = document.querySelector('.display-1'); // Élément pour afficher l'historique des calculs
let display2 = document.querySelector('.display-2'); // Élément pour afficher l'entrée en cours
let nombre = document.querySelectorAll('.nombre'); // Liste des boutons numériques
let operation = document.querySelectorAll('.operation'); // Liste des boutons d'opération
let egal = document.querySelector('.egal'); // Bouton égal
let button_c = document.querySelector('.btn-c'); // Bouton Effacer
let button_ce = document.querySelector('.btn-ce'); // Bouton Effacer Entrée

// Déclaration des variables
let dis1NUm = ''; // Stocke le premier nombre
let dis2NUm = ''; // Stocke le deuxième nombre
let result = null; // Stocke le résultat du calcul
let lastOperation = ''; // Stocke la dernière opération effectuée
let haveDot = false; // Booléen pour suivre l'utilisation d'un point décimal

// Boucle pour gérer les clics sur les boutons numériques
nombre.forEach((number) => {
  number.addEventListener('click', (e) => {
    if (e.target.innerText === '.' && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === '.' && haveDot) {
      return; // Si le point décimal est cliqué à nouveau et qu'il y en a déjà un, ne rien faire
    }

    dis2NUm = e.target.innerText; // Ajoute le chiffre cliqué à l'entrée actuelle
    display1.innerText = dis2NUm; // Met à jour l'affichage avec l'entrée actuelle
  });
});

// Boucle pour gérer les clics sur les boutons d'opération
operation.forEach((operate) => {
  operate.addEventListener('click', (e) => {
    if (!dis2NUm) return; // Si aucune entrée actuelle, ne rien faire
    haveDot = false;
    const operationName = e.target.innerText;

    if (dis1NUm && dis2NUm && lastOperation) {
      calculatrice(); // Effectuer le calcul si une opération précédente existe
    } else {
      result = parseFloat(dis2NUm); // Stocke l'entrée actuelle comme résultat pour le moment
    }
    netoyerVar(operationName); // Réinitialiser les variables et mettre à jour l'affichage pour la nouvelle opération
    lastOperation = operationName; // Stocke l'opération actuelle
  });
});

// Fonction pour réinitialiser les variables et mettre à jour l'affichage pour une nouvelle opération
function netoyerVar(name = '') {
  dis1NUm += dis2NUm + ' ' + name + ' '; // Stocke le premier nombre, l'opération et un espace
  display1.innerText = dis1NUm; // Met à jour l'affichage de l'historique
  display2.innerText = ' '; // Efface l'affichage de l'entrée actuelle
  dis2NUm = ''; // Réinitialise le deuxième nombre
}

// Fonction principale de la calculatrice
function calculatrice() {
  if (lastOperation === 'X') {
    result = parseFloat(result) * parseFloat(dis2NUm);
  } else if (lastOperation === '-') {
    result = parseFloat(result) - parseFloat(dis2NUm);
  } else if (lastOperation === '+') {
    result = parseFloat(result) + parseFloat(dis2NUm);
  } else if (lastOperation === '/') {
    result = parseFloat(result) / parseFloat(dis2NUm);
  }
}

// Gérer le clic sur le bouton égal
egal.addEventListener('click', () => {
  if (!dis1NUm || !dis2NUm) {
    return; // Si aucune entrée, ne rien faire
  }
  haveDot = false; // Réinitialiser le drapeau du point décimal
  calculatrice(); // Effectuer le calcul en attente
  netoyerVar(); // Réinitialiser les variables et mettre à jour l'affichage
  display2.innerText = result; // Afficher le résultat final
  dis2NUm.innerText = ''; // Effacer l'affichage du résultat temporaire
  dis2NUm = result; // Stocker le résultat dans le deuxième nombre pour d'autres opérations potentielles
  dis1NUm = ''; // Effacer le premier nombre pour le prochain calcul
});

// Gérer le clic sur le bouton Effacer Entrée
button_ce.addEventListener('click', () => {
  // Réinitialiser toutes les variables et mettre à jour l'affichage
  dis1NUm = 0;
  dis2NUm = 0;
  display1.innerText = 0;
  display2.innerText = 0;
  result = 0;
});

// Gérer le clic sur le bouton Effacer
button_c.addEventListener('click', () => {
  display2.innerText = 0; // Effacer l'affichage de l'entrée actuelle
  dis2NUm = 0; // Réinitialiser le deuxième nombre
});
