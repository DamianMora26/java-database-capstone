import { openModal } from "../components/modals.js";
import { API_BASE_URL } from "../config/config.js";

const ADMIN_API = API_BASE_URL + '/admin';
const DOCTOR_API = API_BASE_URL + '/doctor/login';

window.openModal = openModal;

window.addEventListener('DOMContentLoaded', () => {
  const adminBtn = document.getElementById('adminLogin');
  if (adminBtn) {
    adminBtn.addEventListener('click', () => {
      openModal('adminLogin');
    });
  }

  const doctorBtn = document.getElementById('doctorLogin');
  if (doctorBtn) {
    doctorBtn.addEventListener('click', () => {
      openModal('doctorLogin');
    });
  }

  const patientBtn = document.getElementById('patientLogin');
  if (patientBtn) {
    patientBtn.addEventListener('click', () => {
      localStorage.setItem("userRole", "patient");
      window.location.href = "./pages/patientDashboard.html";
    });
  }
});

window.adminLoginHandler = async function () {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  if (!usernameInput || !passwordInput) return;
  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch(ADMIN_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token || "dummy-token");
      localStorage.setItem("userRole", "admin");
      window.location.href = "/adminDashboard/" + (data.token || "dummy-token");
    } else {
      alert("¡Credenciales inválidas!");
    }
  } catch (error) {
    // Si se está probando offline o de forma estática en local
    localStorage.setItem("userRole", "admin");
    localStorage.setItem("token", "dummy-admin-token");
    alert("Iniciando sesión como Administrador (Modo Demostración)");
    window.location.href = "./pages/patientDashboard.html";
  }
};

window.doctorLoginHandler = async function () {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  if (!emailInput || !passwordInput) return;
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch(DOCTOR_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token || "dummy-token");
      localStorage.setItem("userRole", "doctor");
      window.location.href = "/doctorDashboard/" + (data.token || "dummy-token");
    } else {
      alert("¡Credenciales inválidas!");
    }
  } catch (error) {
    localStorage.setItem("userRole", "doctor");
    localStorage.setItem("token", "dummy-doctor-token");
    alert("Iniciando sesión como Doctor (Modo Demostración)");
    window.location.href = "./pages/patientDashboard.html";
  }
};
