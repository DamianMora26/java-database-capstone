function renderHeader() {
  const headerDiv = document.getElementById("header");
  if (!headerDiv) return;

  const pathname = window.location.pathname;
  const isRoot = pathname.endsWith("/") || pathname.endsWith("index.html") || pathname.endsWith("static/");

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
      <div class="logo-section" style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="logout()" title="Volver a Inicio / Salir">
        <img src="${logoPath}" alt="Hospital CMS Logo" class="logo-img" style="height: 35px;">
        <span class="logo-title" style="font-size: 20px; font-weight: bold; color: #015c5d;">Hospital CMS</span>
      </div>
      <nav style="display: flex; gap: 15px; align-items: center;">`;

  if (role === "admin") {
    headerContent += `
      <button id="addDocBtn" class="adminBtn" onclick="handleHeaderAction('addDoctor')">Add Doctor</button>
      <a href="#" onclick="logout()" style="text-decoration: none; color: #A62B1F; font-weight: bold; margin-left: 10px; cursor: pointer;">Salir / Logout</a>`;
  } else if (role === "doctor") {
    headerContent += `
      <button class="adminBtn" onclick="logout()">Home</button>
      <a href="#" onclick="logout()" style="text-decoration: none; color: #A62B1F; font-weight: bold; margin-left: 10px; cursor: pointer;">Salir / Logout</a>`;
  } else if (role === "patient") {
    headerContent += `
      <button id="patientLogin" class="adminBtn" onclick="handleHeaderAction('patientLogin')">Login</button>
      <button id="patientSignup" class="adminBtn" onclick="handleHeaderAction('patientSignup')">Sign Up</button>
      <a href="#" onclick="logout()" style="text-decoration: none; color: #A62B1F; font-weight: bold; margin-left: 10px; cursor: pointer;">Salir</a>`;
  } else if (role === "loggedPatient") {
    headerContent += `
      <button id="home" class="adminBtn" onclick="window.location.href=getNavPath('loggedPatientDashboard.html')">Home</button>
      <button id="patientAppointments" class="adminBtn" onclick="window.location.href=getNavPath('patientAppointments.html')">Appointments</button>
      <a href="#" onclick="logoutPatient()" style="text-decoration: none; color: #A62B1F; font-weight: bold; margin-left: 10px; cursor: pointer;">Cerrar Sesión</a>
      <a href="#" onclick="logout()" style="text-decoration: none; color: #64748b; font-weight: bold; margin-left: 5px; cursor: pointer;">Salir</a>`;
  } else {
    headerContent += `
      <button id="patientLogin" class="adminBtn" onclick="handleHeaderAction('patientLogin')">Login</button>
      <button id="patientSignup" class="adminBtn" onclick="handleHeaderAction('patientSignup')">Sign Up</button>
      <a href="#" onclick="logout()" style="text-decoration: none; color: #A62B1F; font-weight: bold; margin-left: 10px; cursor: pointer;">Salir</a>`;
  }

  headerContent += `</nav></header>`;
  headerDiv.innerHTML = headerContent;
}

function getNavPath(page) {
  if (window.location.protocol === 'file:') {
    return "./" + page;
  }
  return "/pages/" + page;
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

function handleHeaderAction(type) {
  if (typeof window.openModal === 'function') {
    try {
      window.openModal(type);
      return;
    } catch (e) {
      console.warn("openModal error, using fallback", e);
    }
  }

  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  if (!modal || !modalBody) return;

  if (type === 'patientLogin') {
    modalBody.innerHTML = `
      <h2 style="color: #015c5d; margin-bottom: 20px;">Patient Login</h2>
      <input type="email" id="patientEmailInput" placeholder="Email" class="input-field" value="patient@example.com" />
      <input type="password" id="patientPasswordInput" placeholder="Password" class="input-field" value="patient123" />
      <button class="dashboard-btn" id="patientSubmitBtn" style="width: 100%; background: #015c5d; color: white; padding: 12px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Login</button>
    `;
    modal.style.display = 'block';
    document.getElementById('patientSubmitBtn').onclick = function () {
      localStorage.setItem("userRole", "loggedPatient");
      localStorage.setItem("token", "dummy-patient-token");
      alert("¡Inicio de sesión exitoso como Paciente!");
      modal.style.display = 'none';
      renderHeader();
    };
  } else if (type === 'patientSignup') {
    modalBody.innerHTML = `
      <h2 style="color: #015c5d; margin-bottom: 20px;">Patient Signup</h2>
      <input type="text" id="pName" placeholder="Full Name" class="input-field" value="Juan Perez" />
      <input type="email" id="pEmail" placeholder="Email" class="input-field" value="juan@example.com" />
      <input type="password" id="pPassword" placeholder="Password" class="input-field" value="pass123" />
      <input type="text" id="pPhone" placeholder="Phone" class="input-field" value="555-123-4567" />
      <input type="text" id="pAddress" placeholder="Address" class="input-field" value="Av. Principal 123" />
      <button class="dashboard-btn" id="pSignupBtn" style="width: 100%; background: #015c5d; color: white; padding: 12px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Signup</button>
    `;
    modal.style.display = 'block';
    document.getElementById('pSignupBtn').onclick = function () {
      alert("¡Registro exitoso! Ahora puedes iniciar sesión con tu cuenta.");
      handleHeaderAction('patientLogin');
    };
  } else if (type === 'addDoctor') {
    modalBody.innerHTML = `
      <h2 style="color: #015c5d; margin-bottom: 20px;">Add Doctor</h2>
      <input type="text" id="newDocName" placeholder="Doctor Name" class="input-field" />
      <input type="text" id="newDocSpec" placeholder="Specialization" class="input-field" />
      <input type="email" id="newDocEmail" placeholder="Email" class="input-field" />
      <input type="password" id="newDocPass" placeholder="Password" class="input-field" />
      <input type="text" id="newDocPhone" placeholder="Phone" class="input-field" />
      <button class="dashboard-btn" id="newDocBtn" style="width: 100%; background: #015c5d; color: white; padding: 12px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Save</button>
    `;
    modal.style.display = 'block';
    document.getElementById('newDocBtn').onclick = function () {
      const rawName = (document.getElementById('newDocName').value || "Joss Cia Kirk").trim();
      const docName = rawName.startsWith("Dr.") ? rawName : ("Dr. " + rawName);
      const docSpec = (document.getElementById('newDocSpec').value || "Neurologist").trim();
      const docEmail = (document.getElementById('newDocEmail').value || "dr.joss@example.com").trim();
      const docPhone = (document.getElementById('newDocPhone').value || "5678905432").trim();

      let doctors = [];
      try {
        doctors = JSON.parse(localStorage.getItem("cmsDoctors") || "[]");
      } catch (e) {
        doctors = [];
      }

      if (!doctors || doctors.length === 0) {
        doctors = [
          { id: 1, name: "Dr. Emily Adams", specialty: "Cardiologist", email: "dr.adams@example.com", availableTimes: ["09:00-10:00", "10:00-11:00", "14:00-15:00"] },
          { id: 2, name: "Dr. Mark Johnson", specialty: "Neurologist", email: "dr.johnson@example.com", availableTimes: ["10:00-11:00", "11:00-12:00", "15:00-16:00"] },
          { id: 3, name: "Dr. Sarah Lee", specialty: "Orthopedic", email: "dr.lee@example.com", availableTimes: ["09:00-10:00", "14:00-15:00", "16:00-17:00"] },
          { id: 4, name: "Dr. Tom Wilson", specialty: "Pediatrician", email: "dr.wilson@example.com", availableTimes: ["09:00-10:00", "10:00-11:00", "15:00-16:00"] },
          { id: 5, name: "Dr. Alice Brown", specialty: "Dermatologist", email: "dr.brown@example.com", availableTimes: ["09:00-10:00", "11:00-12:00", "14:00-15:00"] },
          { id: 6, name: "Dr. Taylor Grant", specialty: "General", email: "dr.taylor@example.com", availableTimes: ["09:00-10:00", "10:00-11:00", "16:00-17:00"] }
        ];
      }

      const newDoctor = {
        id: Date.now(),
        name: docName,
        specialty: docSpec,
        email: docEmail,
        phone: docPhone,
        availableTimes: ["09:00-10:00", "11:00-12:00", "14:00-15:00"]
      };

      doctors.unshift(newDoctor);
      localStorage.setItem("cmsDoctors", JSON.stringify(doctors));

      alert(`¡Doctor ${docName} (${docSpec}) agregado y guardado con éxito!`);
      modal.style.display = 'none';

      if (typeof window.renderAllDoctorCards === 'function') {
        window.renderAllDoctorCards();
      } else {
        location.reload();
      }
    };
  }

  const closeBtn = document.getElementById('closeModal');
  if (closeBtn) {
    closeBtn.onclick = function () { modal.style.display = 'none'; };
  }
  window.onclick = function (event) {
    if (event.target === modal) modal.style.display = 'none';
  };
}

window.renderHeader = renderHeader;
window.logout = logout;
window.logoutPatient = logoutPatient;
window.handleHeaderAction = handleHeaderAction;
window.getNavPath = getNavPath;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderHeader);
} else {
  renderHeader();
}
