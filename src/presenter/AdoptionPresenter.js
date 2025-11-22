import { initiateAdoption} from "../process adoption/AdoptionManager.js";

export function registerAdoptionPresenter(cardGenerator) {
  if (typeof document === "undefined") return;

  if (document.__tindog_adoption_listener_registered) return;
  document.__tindog_adoption_listener_registered = true;

  document.addEventListener("click", async (evt) => {
    const btn = evt.target?.closest("[data-action][data-pet-id]");
    if (!btn) return;

    const action = btn.getAttribute("data-action");
    const petId = btn.getAttribute("data-pet-id");
    if (!petId) return;

    if (action !== "start-adoption") return;

    const user = window.currentUser || { id: "guest", name: "Usuario" };

    const cg = cardGenerator || window.cardGenerator;
    let card = null;

    if (cg && Array.isArray(cg.cards)) {
      card = cg.cards.find((c) => String(c.data?.id) === String(petId)) || null;
    }

    const res = await initiateAdoption(petId, user);

    if (res.success) {
      if (card?.updateData) {
        card.updateData(res.pet);
      } else if (card) {
        card.data = res.pet;
        card.update?.();
      }

      alert("Solicitud enviada: la mascota está en proceso de adopción.");

      btn.setAttribute("data-action", "cancel-adoption");
      btn.textContent = "Cancelar proceso";
    } else {
      let msg;
      if (res.reason === "in_process") {
        msg = "La mascota ya está en proceso de adopción.";
        btn.setAttribute("data-action", "cancel-adoption");
        btn.textContent = "Cancelar proceso";
      } else if (res.reason === "already_adopted") {
        msg = "La mascota ya fue adoptada.";
      } else {
        msg = "Error: no se encontró la mascota.";
      }

      alert(msg);
    }
  });
}