export function createDoctorCard(doctor) {
  const card = document.createElement("div");
  card.classList.add("doctor-card");
  card.style.cssText = "background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); display: flex; flex-direction: column; justify-content: space-between; border: 1px solid #e2e8f0; min-width: 280px;";

  const role = localStorage.getItem("userRole") || "patient";

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  const name = document.createElement("h3");
  name.textContent = doctor.name;
  name.style.cssText = "color: #015c5d; margin-bottom: 8px; font-size: 1.3rem;";

  const specialty = document.createElement("p");
  specialty.textContent = "Specialization: " + (doctor.specialty || doctor.specialization || "General");
  specialty.style.cssText = "color: #475569; font-size: 0.95rem; margin: 4px 0;";

  const email = document.createElement("p");
  email.textContent = "Email: " + doctor.email;
  email.style.cssText = "color: #64748b; font-size: 0.9rem; margin: 4px 0;";

  const times = document.createElement("p");
  const availableStr = Array.isArray(doctor.availableTimes) ? doctor.availableTimes.join(", ") : (doctor.availableTimes || "09:00-10:00, 14:00-15:00");
  times.textContent = "Available: " + availableStr;
  times.style.cssText = "color: #64748b; font-size: 0.85rem; margin-top: 8px;";

  infoDiv.appendChild(name);
  infoDiv.appendChild(specialty);
  infoDiv.appendChild(email);
  infoDiv.appendChild(times);

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");
  actionsDiv.style.cssText = "margin-top: 20px;";

  if (role === "admin") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.style.cssText = "width: 100%; background: #dc2626; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-weight: bold;";
    removeBtn.addEventListener("click", () => {
      if (confirm(`Are you sure you want to delete ${doctor.name}?`)) {
        card.remove();
      }
    });
    actionsDiv.appendChild(removeBtn);
  } else {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.style.cssText = "width: 100%; background: #015c5d; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-weight: bold;";
    bookNow.addEventListener("click", () => {
      const token = localStorage.getItem("token");
      if (!token || role === "patient") {
        alert("Patient needs to login first.");
      } else {
        alert(`Booking appointment with ${doctor.name}...`);
      }
    });
    actionsDiv.appendChild(bookNow);
  }

  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);
  return card;
}
