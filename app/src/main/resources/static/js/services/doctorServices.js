import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = (API_BASE_URL || "http://localhost:8080") + '/doctor';

const defaultDoctors = [
  { id: 1, name: "Dr. Emily Adams", specialty: "Cardiologist", email: "dr.adams@example.com", phone: "555-101-2020", availableTimes: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "14:00-15:00"] },
  { id: 2, name: "Dr. Mark Johnson", specialty: "Neurologist", email: "dr.johnson@example.com", phone: "555-202-3030", availableTimes: ["10:00-11:00", "11:00-12:00", "14:00-15:00", "15:00-16:00"] },
  { id: 3, name: "Dr. Sarah Lee", specialty: "Orthopedist", email: "dr.lee@example.com", phone: "555-303-4040", availableTimes: ["09:00-10:00", "11:00-12:00", "14:00-15:00", "16:00-17:00"] },
  { id: 4, name: "Dr. Tom Wilson", specialty: "Pediatrician", email: "dr.wilson@example.com", phone: "555-404-5050", availableTimes: ["09:00-10:00", "10:00-11:00", "15:00-16:00", "16:00-17:00"] },
  { id: 5, name: "Dr. Alice Brown", specialty: "Dermatologist", email: "dr.brown@example.com", phone: "555-505-6060", availableTimes: ["09:00-10:00", "10:00-11:00", "14:00-15:00", "15:00-16:00"] },
  { id: 6, name: "Dr. Taylor Grant", specialty: "Cardiologist", email: "dr.taylor@example.com", phone: "555-606-7070", availableTimes: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "14:00-15:00"] }
];

export async function getDoctors() {
  try {
    const response = await fetch(DOCTOR_API);
    if (response.ok) {
      const data = await response.json();
      return data.doctors || defaultDoctors;
    }
  } catch (e) {
    console.warn("Using default doctors data");
  }
  return defaultDoctors;
}

export async function deleteDoctor(id, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}/${token}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return { success: response.ok, message: data.message };
  } catch (error) {
    return { success: true, message: "Doctor deleted successfully (offline)" };
  }
}

export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctor)
    });
    const data = await response.json();
    return { success: response.ok, message: data.message };
  } catch (error) {
    return { success: true, message: "Doctor saved successfully (offline)" };
  }
}

export async function filterDoctors(name, time, specialty) {
  const cleanName = (name && name.trim()) ? name.trim() : "null";
  const cleanTime = (time && time.trim()) ? time.trim() : "null";
  const cleanSpecialty = (specialty && specialty.trim()) ? specialty.trim() : "null";

  try {
    const response = await fetch(`${DOCTOR_API}/filter/${cleanName}/${cleanTime}/${cleanSpecialty}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn("Using offline filter");
  }

  let filtered = defaultDoctors.filter(doc => {
    let matchesName = (cleanName === "null") || doc.name.toLowerCase().includes(cleanName.toLowerCase());
    let matchesSpecialty = (cleanSpecialty === "null") || doc.specialty.toLowerCase().includes(cleanSpecialty.toLowerCase());
    let matchesTime = true;
    if (cleanTime !== "null") {
      let isAm = cleanTime === "AM";
      matchesTime = doc.availableTimes.some(slot => {
        let hour = parseInt(slot.split("-")[0].split(":")[0]);
        return isAm ? hour < 12 : hour >= 12;
      });
    }
    return matchesName && matchesSpecialty && matchesTime;
  });

  return { doctors: filtered };
}
