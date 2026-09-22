import { createPatientRow } from "./components/patientRows.js";

const sampleAppointments = [
  { id: 131, patientId: 26, patientName: "John Smith", patientPhone: "888-000-2222", patientEmail: "john.smith@example.com", date: "2025-05-23", time: "10:00-11:00" },
  { id: 132, patientId: 26, patientName: "John Smith", patientPhone: "888-000-2222", patientEmail: "john.smith@example.com", date: "2025-05-22", time: "09:00-10:00" },
  { id: 133, patientId: 26, patientName: "John Smith", patientPhone: "888-000-2222", patientEmail: "john.smith@example.com", date: "2025-05-22", time: "14:00-15:00" },
  { id: 134, patientId: 27, patientName: "Emily Rose", patientPhone: "888-000-3333", patientEmail: "emily.rose@example.com", date: "2025-05-21", time: "11:00-12:00" },
  { id: 135, patientId: 28, patientName: "Michael Jordan", patientPhone: "888-000-4444", patientEmail: "michael.j@example.com", date: "2025-05-20", time: "15:00-16:00" }
];

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("patientTableBody");
  const searchBar = document.getElementById("searchBar");
  const todayButton = document.getElementById("todayButton");
  const datePicker = document.getElementById("datePicker");

  const todayStr = new Date().toISOString().split("T")[0];
  if (datePicker) datePicker.value = todayStr;

  function renderRows(appointments) {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    if (!appointments || appointments.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px; color: #64748b; font-style: italic;">No Appointments found for this date.</td></tr>`;
      return;
    }

    appointments.forEach(apt => {
      const patient = {
        id: apt.patientId,
        name: apt.patientName,
        phone: apt.patientPhone,
        email: apt.patientEmail
      };
      const tr = createPatientRow(patient, apt.id, 1);
      tableBody.appendChild(tr);
    });
  }

  function filterAppointments() {
    const query = searchBar ? searchBar.value.trim().toLowerCase() : "";
    const selectedDate = datePicker ? datePicker.value : "";

    const filtered = sampleAppointments.filter(apt => {
      const matchesName = !query || apt.patientName.toLowerCase().includes(query);
      return matchesName;
    });

    renderRows(filtered);
  }

  if (searchBar) searchBar.addEventListener("input", filterAppointments);
  if (datePicker) datePicker.addEventListener("change", filterAppointments);
  if (todayButton) {
    todayButton.addEventListener("click", () => {
      if (datePicker) datePicker.value = todayStr;
      renderRows(sampleAppointments);
    });
  }

  renderRows(sampleAppointments);
});
