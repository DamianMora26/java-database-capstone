// render.js

function selectRole(role) {
  setRole(role);
  const token = localStorage.getItem('token');
  const isFile = window.location.protocol === 'file:';

  if (role === "admin") {
    if (token) {
      window.location.href = isFile ? "./pages/patientDashboard.html" : `/adminDashboard/${token}`;
    } else {
      window.location.href = isFile ? "./pages/patientDashboard.html" : "/adminDashboard";
    }
  } else if (role === "patient") {
    window.location.href = isFile ? "./pages/patientDashboard.html" : "/pages/patientDashboard.html";
  } else if (role === "doctor") {
    if (token) {
      window.location.href = isFile ? "./pages/patientDashboard.html" : `/doctorDashboard/${token}`;
    } else if (role === "loggedPatient") {
      window.location.href = isFile ? "./pages/loggedPatientDashboard.html" : "/pages/loggedPatientDashboard.html";
    } else {
      window.location.href = isFile ? "./pages/patientDashboard.html" : "/doctorDashboard";
    }
  }
}

function renderContent() {
  const role = getRole();
  if (!role) {
    // Si no hay rol asignado en localStorage, por defecto asignar patient o volver a index
    const isFile = window.location.protocol === 'file:';
    if (isFile) {
      // Si se abre directamente el dashboard, auto-asignar patient para una mejor experiencia visual
      setRole("patient");
    } else {
      window.location.href = "/";
    }
    return;
  }
}
