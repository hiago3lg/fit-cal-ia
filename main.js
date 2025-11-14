// main.js
import { registerUser, loginUser, logoutUser } from './auth.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

// --- Cadastro ---
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const user = await registerUser(email, password);
    alert(`Usuário registrado: ${user.email}`);
    registerForm.reset();
  } catch (error) {
    alert(`Erro ao registrar usuário: ${error.message}`);
  }
});

// --- Login ---
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const user = await loginUser(email
                                 
