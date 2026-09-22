import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { openModal } from "./components/modals.js";
import { createDoctorCard } from "./components/doctorCard.js";

window.openModal = openModal;

document.addEventListener("DOMContentLoaded", () => {
  const addDocBtn = document.getElementById("addDocBtn");
  if (addDocBtn) {
    addDocBtn.addEventListener("click", () => openModal("addDoctor"));
  }

  loadDoctorCards();

  const searchBar = document.getElementById("searchBar");
  const filterTime = document.getElementById("filterTime");
  const filterSpecialty = document.getElementById("filterSpecialty");

  if (searchBar) searchBar.addEventListener("input", filterDoctorsOnChange);
  if (filterTime) filterTime.addEventListener("change", filterDoctorsOnChange);
  if (filterSpecialty) filterSpecialty.addEventListener("change", filterDoctorsOnChange);
});

async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Failed to load doctors:", error);
  }
}

async function filterDoctorsOnChange() {
  const searchBar = document.getElementById("searchBar");
  const filterTime = document.getElementById("filterTime");
  const filterSpecialty = document.getElementById("filterSpecialty");

  const name = searchBar ? searchBar.value.trim() : null;
  const time = filterTime ? filterTime.value : null;
  const specialty = filterSpecialty ? filterSpecialty.value : null;

  try {
    const response = await filterDoctors(name, time, specialty);
    const doctors = response.doctors || [];
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Error filtering doctors:", error);
  }
}

function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  if (!contentDiv) return;
  contentDiv.innerHTML = "";
  contentDiv.style.cssText = "display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding: 20px 0;";

  if (doctors && doctors.length > 0) {
    doctors.forEach(doc => {
      const card = createDoctorCard(doc);
      contentDiv.appendChild(card);
    });
  } else {
    contentDiv.innerHTML = "<p style='color: #64748b; font-style: italic;'>No doctors found with the given filters.</p>";
  }
}

window.adminAddDoctor = async function () {
  const name = document.getElementById("doctorName")?.value;
  const specialization = document.getElementById("specialization")?.value;
  const email = document.getElementById("doctorEmail")?.value;
  const password = document.getElementById("doctorPassword")?.value;
  const phone = document.getElementById("doctorPhone")?.value;

  const availability = [];
  document.querySelectorAll('input[name="availability"]:checked').forEach(cb => {
    availability.push(cb.value);
  });

  const token = localStorage.getItem("token") || "mock-token";
  const doctor = {
    name,
    specialty: specialization,
    email,
    password,
    phone,
    availableTimes: availability
  };

  const result = await saveDoctor(doctor, token);
  if (result.success) {
    alert("Doctor agregado exitosamente");
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
    loadDoctorCards();
  } else {
    alert("Error al agregar doctor: " + result.message);
  }
};
