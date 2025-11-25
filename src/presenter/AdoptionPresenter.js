import { initiateAdoption,cancelAdoption} from "../process adoption/AdoptionManager.js";

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

    const user = window.currentUser || { id: "guest", name: "Usuario" };

    const cg = cardGenerator || window.cardGenerator;
    let card = null;

    if (cg && Array.isArray(cg.cards)) {
      card = cg.cards.find((c) => String(c.data?.id) === String(petId)) || null;
    }

    if (action === "cancel-adoption") {
      const res = await cancelAdoption(petId);

      if (res.success) {
        if (card?.updateData) card.updateData(res.pet);
        else if (card) {
          card.data = res.pet;
          card.update?.();
        }

        const cardEl = btn.closest(".pet-card");
        if (cardEl) {
          const badge = cardEl.querySelector(".adoption-badge");
          if (badge) badge.remove();
        }

        btn.setAttribute("data-action", "start-adoption");
        btn.textContent = "Iniciar Proceso de Adopción";

        alert("Has cancelado el proceso de adopción.");
      } else {
        let msg =
          res.reason === "not_in_process"
            ? "La mascota no está en proceso de adopción."
            : res.reason === "not_found"
            ? "No se encontró la mascota."
            : "No se pudo cancelar el proceso.";
        alert(msg);
      }

      return;
    }

    if (action === "start-adoption") {
      const res = await initiateAdoption(petId, user);

      if (res.success) {
        if (card?.updateData) card.updateData(res.pet);
        else if (card) {
          card.data = res.pet;
          card.update?.();
        }

        const cardEl = btn.closest(".pet-card");
        if (cardEl) {
          let badge = cardEl.querySelector(".adoption-badge");
          if (!badge) {
            badge = document.createElement("div");
            badge.className = "adoption-badge";
            badge.textContent = "En proceso de adopción";

            const content = cardEl.querySelector(".card-content");
            if (content) content.insertBefore(badge, content.firstChild);
          } else {
            badge.textContent = "En proceso de adopción";
            badge.style.display = "inline-block";
          }
        }

        btn.setAttribute("data-action", "cancel-adoption");
        btn.textContent = "Cancelar proceso";

        alert("Solicitud enviada: la mascota está en proceso de adopción.");
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
    }
  });
}