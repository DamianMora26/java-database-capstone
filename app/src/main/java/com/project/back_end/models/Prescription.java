package com.project.back_end.models;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "prescriptions")
public class Prescription {

    @Id
    private String id;

    @NotNull(message = "El nombre del paciente no puede ser nulo")
    @Size(min = 3, max = 100, message = "El nombre del paciente debe tener entre 3 y 100 caracteres")
    private String patientName;

    @NotNull(message = "El ID de la cita no puede ser nulo")
    private Long appointmentId;

    @NotNull(message = "El medicamento no puede ser nulo")
    @Size(min = 3, max = 100, message = "El medicamento debe tener entre 3 y 100 caracteres")
    private String medication;

    @NotNull(message = "La dosificación no puede ser nula")
    @Size(min = 3, max = 20, message = "La dosificación debe tener entre 3 y 20 caracteres")
    private String dosage;

    @Size(max = 200, message = "Las notas del médico no pueden exceder 200 caracteres")
    private String doctorNotes;

    public Prescription() {
    }

    public Prescription(String id, String patientName, Long appointmentId, String medication, String dosage, String doctorNotes) {
        this.id = id;
        this.patientName = patientName;
        this.appointmentId = appointmentId;
        this.medication = medication;
        this.dosage = dosage;
        this.doctorNotes = doctorNotes;
    }

    public Prescription(String patientName, Long appointmentId, String medication, String dosage, String doctorNotes) {
        this.patientName = patientName;
        this.appointmentId = appointmentId;
        this.medication = medication;
        this.dosage = dosage;
        this.doctorNotes = doctorNotes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public String getMedication() {
        return medication;
    }

    public void setMedication(String medication) {
        this.medication = medication;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getDoctorNotes() {
        return doctorNotes;
    }

    public void setDoctorNotes(String doctorNotes) {
        this.doctorNotes = doctorNotes;
    }
}
