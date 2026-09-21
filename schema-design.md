# SmartCare Solutions - Database Schema Design

Este documento define la arquitectura y el diseño del esquema de datos para el **Sistema de Gestión de Clínicas Inteligentes (Smart Clinic)**, implementando un almacenamiento políglota: **MySQL** para datos relacionales estructurados y transaccionales, y **MongoDB** para datos documentales flexibles y no estructurados.

---

## ## MySQL Database Design

La base de datos relacional MySQL gestiona las entidades operativas esenciales de la clínica donde la integridad referencial, transacciones ACID y relaciones normalizadas son prioritarias.

### Table: admin
Almacena las credenciales y datos de los administradores que gestionan la plataforma.
- `id`: INT, Primary Key, AUTO_INCREMENT
- `username`: VARCHAR(50), NOT NULL, UNIQUE
- `password`: VARCHAR(255), NOT NULL (almacena el hash bcrypt de la contraseña)
- `email`: VARCHAR(100), NOT NULL, UNIQUE
- `created_at`: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP

### Table: doctors
Contiene la información profesional y credenciales de los médicos del hospital.
- `id`: INT, Primary Key, AUTO_INCREMENT
- `name`: VARCHAR(100), NOT NULL
- `specialty`: VARCHAR(100), NOT NULL
- `email`: VARCHAR(100), NOT NULL, UNIQUE
- `password`: VARCHAR(255), NOT NULL (hash bcrypt)
- `available_hours`: VARCHAR(255), NOT NULL (ej. "09:00-10:00, 11:00-12:00, 14:00-15:00")
- `created_at`: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP

### Table: patients
Registra a los pacientes que reservan citas y consultan sus registros clínicos.
- `id`: INT, Primary Key, AUTO_INCREMENT
- `name`: VARCHAR(100), NOT NULL
- `email`: VARCHAR(100), NOT NULL, UNIQUE
- `password`: VARCHAR(255), NOT NULL (hash bcrypt)
- `phone`: VARCHAR(20), NULL
- `date_of_birth`: DATE, NULL
- `created_at`: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP

### Table: appointments
Gestiona la programación de citas clínicas de 1 hora de duración entre un paciente y un médico.
- `id`: INT, Primary Key, AUTO_INCREMENT
- `doctor_id`: INT, NOT NULL, Foreign Key → `doctors(id)` ON DELETE RESTRICT
- `patient_id`: INT, NOT NULL, Foreign Key → `patients(id)` ON DELETE RESTRICT
- `appointment_date`: DATE, NOT NULL
- `appointment_time`: VARCHAR(20), NOT NULL (ej. "09:00-10:00")
- `status`: VARCHAR(20), NOT NULL, DEFAULT 'Scheduled' (valores permitidos: 'Scheduled', 'Completed', 'Cancelled')
- `created_at`: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP
- **Restricciones de Negocio:**
  - `UNIQUE KEY uk_doctor_slot (doctor_id, appointment_date, appointment_time)`: Evita citas superpuestas para el mismo médico.
  - Se utiliza `ON DELETE RESTRICT` para evitar la pérdida involuntaria de registros de citas históricas si se llegase a dar de baja a un doctor o paciente.

---

## ## MongoDB Collection Design

MongoDB se utiliza para almacenar registros clínicos altamente dinámicos y no estructurados, en particular las **Recetas Médicas (`prescriptions`)**, las cuales pueden contener listas variables de fármacos, dosis, indicaciones detalladas e información de farmacia.

### Collection: prescriptions

Cada documento representa una receta médica emitida tras una consulta, vinculada tanto a la cita médica (`appointmentId`) como al paciente (`patientId`).

#### Estructura del Documento (Ejemplo JSON):

```json
{
  "_id": "ObjectId('65a123f890ab123456789abc')",
  "appointmentId": 131,
  "patientId": 26,
  "patientName": "John Smith",
  "doctorId": 5,
  "doctorName": "Dr. Emily Adams",
  "diagnosis": "Infección respiratoria aguda y fiebre",
  "date": "2025-05-23T10:30:00Z",
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Cada 8 horas",
      "duration": "7 días",
      "instructions": "Tomar después de las comidas"
    },
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "Cada 8 horas en caso de fiebre",
      "duration": "3 días",
      "instructions": "No exceder de 3 gramos al día"
    }
  ],
  "doctorNotes": "Mantener reposo e hidratación abundante. Regresar a control si los síntomas persisten por más de 72 horas.",
  "refillCount": 1,
  "pharmacy": {
    "name": "Central Hospital Pharmacy",
    "address": "Av. Principal 456, Módulo B",
    "contactPhone": "+1-555-0199"
  },
  "metadata": {
    "createdAt": "2025-05-23T10:45:00Z",
    "status": "Active"
  }
}
