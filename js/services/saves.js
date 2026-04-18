import { auth, db } from "./server.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getSave } from "../game/gameController.js";

export async function saveGame() {
  const user = auth.currentUser;

  if (!user) {
    console.log("Usuário não logado");
    return;
  }

  try {
    await setDoc(doc(db, "game_saves", user.uid), getSave());
    console.log("Jogo salvo!");
  } catch (error) {
    console.error("Erro ao salvar:", error);
  }
}

export async function loadGame() {
  const user = auth.currentUser;

  if (!user) {
    console.log("Usuário não logado");
    return null;
  }

  try {
    const docRef = doc(db, "game_saves", user.uid);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      console.log("Save carregado!");
      return snap.data();
    } else {
      console.log("Nenhum save encontrado");
      return null;
    }
  } catch (error) {
    console.error("Erro ao carregar:", error);
    return null;
  }
}