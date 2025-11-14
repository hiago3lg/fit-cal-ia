// AUTH (Login, cadastro e logout)

const auth = firebase.auth();

// Criar conta
function createAccount(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

// Login
function loginUser(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

// Logout
function logout() {
  return auth.signOut();
}

// Monitorar usuário conectado
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Usuário logado:", user.email);
  } else {
    console.log("Nenhum usuário logado");
  }
});
