function renderHeader() {
  const headerDiv = document.getElementById("header");
  if (!headerDiv) return;

  const pathname = window.location.pathname;
  const isRoot = pathname.endsWith("/") || pathname.endsWith("index.html");

  let logoPath = isRoot ? "./assets/images/logo/logo.png" : "../assets/images/logo/logo.png";

  if (isRoot) {
    headerDiv.innerHTML = `
      <header class="header" style="display: flex; justify-content: space-between; align-items: center; padding: 15px 30px; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div class="logo-section" style="display: flex; align-items: center; gap: 10px;">
          <img src="${logoPath}" alt="Hospital CMS Logo" class="logo-img" style="height: 35px;">
          <span class="logo-title" style="font-size: 20px; font-weight: bold; color: #015c5d;">Hospital CMS</span>
        </div>
      </header>`;
    return;
  }

  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  let headerContent = `
    <header class="header" style="display: flex; justify-content: space-between; align-items: center; padding: 15px 30px; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div class="logo-section" style="display: flex; align-items: center; gap: 10px;">
        <img src="${logoPath}" alt="Hospital CMS Logo" class="logo-img" style="height: 35px;">
        <span class="logo-title" style="font-size: 20px; font-weight: bold; color: #015c5d;">Hospital CMS</span>
      </div>
      <nav style="display: flex; gap: 15px; align-items: center;">`;

  if (role === "admin") {
    headerContent += `
      <button id="addDocBtn" class="adminBtn" onclick="if(window.openModal) openModal('addDoctor')">Add Doctor</button>
      <a href="#" onclick="logout()" style="text-decoration: none; color: #015c5d; font-weight: bold;">Logout</a>`;
  } else if (role === "doctor") {
    headerContent += `
      <button class="adminBtn" onclick="window.location.href='/'">Home</button>
      <a href="#" onclick="logout()" style="text-decoration: none; color: #015c5d; font-weight: bold;">Logout</a>`;
  } else if (role === "patient") {
    headerContent += `
      <button id="patientLogin" class="adminBtn" onclick="if(window.openModal) openModal('patientLogin')">Login</button>
      <button id="patientSignup" class="adminBtn" onclick="if(window.openModal) openModal('patientSignup')">Sign Up</button>`;
  } else if (role === "loggedPatient") {
    headerContent += `
      <button id="home" class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
      <button id="patientAppointments" class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
      <a href="#" onclick="logoutPatient()" style="text-decoration: none; color: #015c5d; font-weight: bold;">Logout</a>`;
  } else {
    headerContent += `
      <a href="#" onclick="if(window.openModal) openModal('patientLogin')" style="text-decoration: none; color: #015c5d; font-weight: bold;">Login</a>
      <a href="#" onclick="if(window.openModal) openModal('patientSignup')" style="text-decoration: none; color: #015c5d; font-weight: bold;">Sign Up</a>`;
  }

  headerContent += `</nav></header>`;
  headerDiv.innerHTML = headerContent;
}

function logout() {
  localStorage.removeItem("userRole");
  localStorage.removeItem("token");
  if (window.location.protocol === 'file:') {
    window.location.href = window.location.pathname.includes('/pages/') ? "../index.html" : "./index.html";
  } else {
    window.location.href = "/";
  }
}

function logoutPatient() {
  localStorage.removeItem("token");
  localStorage.setItem("userRole", "patient");
  if (window.location.protocol === 'file:') {
    window.location.href = "./patientDashboard.html";
  } else {
    window.location.href = "/pages/patientDashboard.html";
  }
}

window.renderHeader = renderHeader;
window.logout = logout;
window.logoutPatient = logoutPatient;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderHeader);
} else {
  renderHeader();
}
