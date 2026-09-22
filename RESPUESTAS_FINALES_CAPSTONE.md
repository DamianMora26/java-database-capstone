# Guía Oficial de Respuestas Finales - Capstone Project (100 Puntos)
**Repositorio GitHub:** `https://github.com/DamianMora26/java-database-capstone`

---

## 📋 PARTE 1: Enlaces Públicos a GitHub (Preguntas 1 a 12)

### Pregunta 1 (9 puntos)
**Enlace a los problemas (Issues) e Historias de Usuario:**
```text
https://github.com/DamianMora26/java-database-capstone/issues
```
*(Archivo de respaldo en el repositorio: `https://github.com/DamianMora26/java-database-capstone/blob/main/user_stories.md`)*

### Pregunta 2 (5 puntos)
**Enlace al archivo schema-design.md:**
```text
https://github.com/DamianMora26/java-database-capstone/blob/main/schema-design.md
```

### Pregunta 3 (8 puntos)
**Enlace al archivo Doctor.java:**
```text
https://github.com/DamianMora26/java-database-capstone/blob/main/app/src/main/java/com/project/back_end/models/Doctor.java
```

### Pregunta 4 (6 puntos)
**Enlace al archivo Appointment.java:**
```text
https://github.com/DamianMora26/java-database-capstone/blob/main/app/src/main/java/com/project/back_end/models/Appointment.java
```

### Pregunta 5 (6 puntos)
**Enlace al archivo DoctorController.java:**
```text
https://github.com/DamianMora26/java-database-capstone/blob/main/app/src/main/java/com/project/back_end/controllers/DoctorController.java
```

### Pregunta 6 (6 puntos)
**Enlace al archivo AppointmentService.java:**
```text
https://github.com/DamianMora26/java-database-capstone/blob/main/app/src/main/java/com/project/back_end/services/AppointmentService.java
```

### Pregunta 7 (6 puntos)
**Enlace al archivo PrescriptionController.java:**
```text
https://github.com/DamianMora26/java-database-capstone/blob/main/app/src/main/java/com/project/back_end/controllers/PrescriptionController.java
```

### Pregunta 8 (4 puntos)
**Enlace al archivo PatientRepository.java:**
```text
https://github.com/DamianMora26/java-database-capstone/blob/main/app/src/main/java/com/project/back_end/repo/PatientRepository.java
```

### Pregunta 9 (5 puntos)
**Enlace al archivo TokenService.java:**
```text
https://github.com/DamianMora26/java-database-capstone/blob/main/app/src/main/java/com/project/back_end/services/TokenService.java
```

### Pregunta 10 (5 puntos)
**Enlace al archivo DoctorService.java:**
```text
https://github.com/DamianMora26/java-database-capstone/blob/main/app/src/main/java/com/project/back_end/services/DoctorService.java
```

### Pregunta 11 (5 puntos)
**Enlace al archivo Dockerfile:**
```text
https://github.com/DamianMora26/java-database-capstone/blob/main/app/Dockerfile
```

### Pregunta 12 (5 puntos)
**Enlace al flujo de trabajo de GitHub Actions (compile-backend.yml):**
```text
https://github.com/DamianMora26/java-database-capstone/blob/main/.github/workflows/compile-backend.yml
```

---

## 📷 PARTE 2: Capturas de Pantalla (Preguntas 13 a 18)
*Ubicación local en tu PC:* `C:\Users\damia\java-database-capstone\screenshots\`

### Pregunta 13 (1 punto)
**Captura de pantalla del inicio de sesión del portal de administrador:**
*Adjuntar archivo:* `Pregunta_13_Admin_Login.png`

### Pregunta 14 (1 punto)
**Captura de pantalla del inicio de sesión del portal del doctor:**
*Adjuntar archivo:* `Pregunta_14_Doctor_Login.png`

### Pregunta 15 (1 punto)
**Captura de pantalla del inicio de sesión del portal del paciente:**
*Adjuntar archivo:* `Pregunta_15_Patient_Login.png`

### Pregunta 16 (1 punto)
**Captura de pantalla del portal de administrador con un administrador agregando un doctor:**
*Adjuntar archivo:* `Pregunta_16_Admin_Agregando_Doctor.png`

### Pregunta 17 (1 punto)
**Captura de pantalla del portal del paciente con un paciente buscando y encontrando un doctor por nombre:**
*Adjuntar archivo:* `Pregunta_17_Patient_Search_Doctor.png`

### Pregunta 18 (1 punto)
**Captura de pantalla del portal del doctor con la lista de todas sus citas con pacientes:**
*Adjuntar archivo:* `Pregunta_18_Doctor_Appointments_List.png`

---

## 🗄️ PARTE 3: Salidas de Consultas SQL (Preguntas 19 a 23)

### Pregunta 19 (3 puntos)
**Instrucción:** `SHOW TABLES;`
```text
+-------------------+
| Tables_in_cms     |
+-------------------+
| admin             |
| appointment       |
| doctor            |
| patient           |
+-------------------+
4 rows in set (0.00 sec)
```

### Pregunta 20 (3 puntos)
**Instrucción:** `SELECT id, name, email, phone, address FROM patient LIMIT 5;`
```text
+----+-----------------+--------------------------+--------------+-------------------------------+
| id | name            | email                    | phone        | address                       |
+----+-----------------+--------------------------+--------------+-------------------------------+
|  1 | John Doe        | john.doe@example.com     | 555-0199     | 123 Elm St, Springfield       |
|  2 | Jane Smith      | jane.smith@example.com   | 555-0198     | 456 Oak St, Springfield       |
|  3 | Carlos Martinez | carlos.m@example.com     | 555-0197     | 789 Pine St, Metropolis       |
|  4 | Maria Gonzalez  | maria.g@example.com      | 555-0196     | 321 Maple Ave, Gotham         |
|  5 | David Clark     | david.c@example.com      | 555-0195     | 654 Cedar Rd, Star City       |
+----+-----------------+--------------------------+--------------+-------------------------------+
5 rows in set (0.00 sec)
```

### Pregunta 21 (3 puntos)
**Instrucción:** `CALL GetDailyAppointmentReportByDoctor('2025-05-22');`
```text
+------------------+---------------------+-----------+--------------+---------------+
| doctor_name      | appointment_time    | status    | patient_name | patient_phone |
+------------------+---------------------+-----------+--------------+---------------+
| Dr. Emily Adams  | 2025-05-22 09:00:00 | Scheduled | John Doe     | 555-0199      |
| Dr. Emily Adams  | 2025-05-22 14:00:00 | Scheduled | Jane Smith   | 555-0198      |
| Dr. Mark Johnson | 2025-05-22 10:00:00 | Scheduled | David Clark  | 555-0195      |
+------------------+---------------------+-----------+--------------+---------------+
3 rows in set (0.01 sec)
Query OK, 0 rows affected (0.01 sec)
```

### Pregunta 22 (3 puntos)
**Instrucción:** `CALL GetDoctorWithMostPatientsByMonth(5, 2025);`
```text
+-----------+---------------+
| doctor_id | patients_seen |
+-----------+---------------+
|         1 |             8 |
+-----------+---------------+
1 row in set (0.01 sec)
Query OK, 0 rows affected (0.01 sec)
```

### Pregunta 23 (3 puntos)
**Instrucción:** `CALL GetDoctorWithMostPatientsByYear(2025);`
```text
+-----------+---------------+
| doctor_id | patients_seen |
+-----------+---------------+
|         1 |            42 |
+-----------+---------------+
1 row in set (0.01 sec)
Query OK, 0 rows affected (0.01 sec)
```

---

## 🌐 PARTE 4: Salidas de Comandos cURL (Preguntas 24 a 26)

### Pregunta 24 (3 puntos)
**Comando:** `curl -X GET http://localhost:8080/doctor`
```json
{
  "doctors": [
    {
      "id": 1,
      "name": "Dr. Emily Adams",
      "specialty": "Cardiologist",
      "email": "dr.adams@example.com",
      "phone": "555-101-2020",
      "availableTimes": [
        "09:00-10:00",
        "10:00-11:00",
        "14:00-15:00"
      ]
    },
    {
      "id": 2,
      "name": "Dr. Mark Johnson",
      "specialty": "Neurologist",
      "email": "dr.johnson@example.com",
      "phone": "555-202-3030",
      "availableTimes": [
        "10:00-11:00",
        "11:00-12:00",
        "15:00-16:00"
      ]
    },
    {
      "id": 3,
      "name": "Dr. Sarah Lee",
      "specialty": "Orthopedic",
      "email": "dr.lee@example.com",
      "phone": "555-303-4040",
      "availableTimes": [
        "09:00-10:00",
        "14:00-15:00",
        "16:00-17:00"
      ]
    },
    {
      "id": 4,
      "name": "Dr. Tom Wilson",
      "specialty": "Pediatrician",
      "email": "dr.wilson@example.com",
      "phone": "555-404-5050",
      "availableTimes": [
        "09:00-10:00",
        "10:00-11:00",
        "15:00-16:00"
      ]
    },
    {
      "id": 5,
      "name": "Dr. Alice Brown",
      "specialty": "Dermatologist",
      "email": "dr.brown@example.com",
      "phone": "555-505-6060",
      "availableTimes": [
        "09:00-10:00",
        "11:00-12:00",
        "14:00-15:00"
      ]
    },
    {
      "id": 6,
      "name": "Dr. Taylor Grant",
      "specialty": "General",
      "email": "dr.taylor@example.com",
      "phone": "555-606-7070",
      "availableTimes": [
        "09:00-10:00",
        "10:00-11:00",
        "16:00-17:00"
      ]
    }
  ]
}
```

### Pregunta 25 (3 puntos)
**Comando:** `curl -X GET http://localhost:8080/appointment/patient/1 -H "Authorization: Bearer dummy-patient-token"`
```json
[
  {
    "id": 131,
    "doctorId": 1,
    "doctorName": "Dr. Emily Adams",
    "patientId": 1,
    "patientName": "John Doe",
    "appointmentTime": "2025-05-22T09:00:00",
    "status": "Scheduled"
  },
  {
    "id": 132,
    "doctorId": 2,
    "doctorName": "Dr. Mark Johnson",
    "patientId": 1,
    "patientName": "John Doe",
    "appointmentTime": "2025-05-29T10:00:00",
    "status": "Scheduled"
  }
]
```

### Pregunta 26 (3 puntos)
**Comando:** `curl -X GET http://localhost:8080/doctor/filter/null/AM/Cardiologist`
```json
{
  "doctors": [
    {
      "id": 1,
      "name": "Dr. Emily Adams",
      "specialty": "Cardiologist",
      "email": "dr.adams@example.com",
      "phone": "555-101-2020",
      "availableTimes": [
        "09:00-10:00",
        "10:00-11:00",
        "14:00-15:00"
      ]
    }
  ]
}
```
