// src/dev/storage-demo.js — só em `npm run dev`.
// No console do navegador: storageDemo.success()  /  storageDemo.error()
import { setItem } from "@core/storage/storage.js"

window.storageDemo = {
  success() {
    setItem("demo", true, {
      errorMessage: "Erro ao salvar.",
      successMessage: "Salvo com sucesso!",
    })
  },

  error() {
    // Quebra o setItem SÓ durante esta chamada e restaura no finally.
    // (Deixar o Storage.prototype.setItem quebrado é o que faz o banner de
    // erro "reaparecer" a cada clique de tema/menu.)
    const original = Storage.prototype.setItem
    Storage.prototype.setItem = () => {
      throw new Error("falha simulada")
    }
    try {
      setItem("demo", true, { errorMessage: "Erro simulado ao salvar." })
    } finally {
      Storage.prototype.setItem = original
    }
  },
}
