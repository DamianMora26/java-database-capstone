-- ==========================================================
-- PROCEDIMIENTOS ALMACENADOS - SMART CLINIC MANAGEMENT SYSTEM
-- Base de Datos: cms
-- ==========================================================

USE cms;

-- ----------------------------------------------------------
-- 1. Procedimiento: GetDailyAppointmentReportByDoctor
-- Genera un informe de citas en una fecha específica agrupadas por médico.
-- ----------------------------------------------------------
DROP PROCEDURE IF EXISTS GetDailyAppointmentReportByDoctor;

DELIMITER $
CREATE PROCEDURE GetDailyAppointmentReportByDoctor(
    IN report_date DATE
)
BEGIN
    SELECT 
        d.name AS doctor_name,
        a.appointment_time,
        a.status,
        p.name AS patient_name,
        p.phone AS patient_phone
    FROM 
        appointment a
    JOIN 
        doctor d ON a.doctor_id = d.id
    JOIN 
        patient p ON a.patient_id = p.id
    WHERE 
        DATE(a.appointment_time) = report_date
    ORDER BY 
        d.name, a.appointment_time;
END$
DELIMITER ;

-- ----------------------------------------------------------
-- 2. Procedimiento: GetDoctorWithMostPatientsByMonth
-- Identifica al médico que atendió más pacientes en un mes y año dados.
-- ----------------------------------------------------------
DROP PROCEDURE IF EXISTS GetDoctorWithMostPatientsByMonth;

DELIMITER $
CREATE PROCEDURE GetDoctorWithMostPatientsByMonth(
    IN input_month INT, 
    IN input_year INT
)
BEGIN
    SELECT
        doctor_id, 
        COUNT(patient_id) AS patients_seen
    FROM
        appointment
    WHERE
        MONTH(appointment_time) = input_month 
        AND YEAR(appointment_time) = input_year
    GROUP BY
        doctor_id
    ORDER BY
        patients_seen DESC
    LIMIT 1;
END$
DELIMITER ;

-- ----------------------------------------------------------
-- 3. Procedimiento: GetDoctorWithMostPatientsByYear
-- Identifica al médico que atendió más pacientes en un año determinado.
-- ----------------------------------------------------------
DROP PROCEDURE IF EXISTS GetDoctorWithMostPatientsByYear;

DELIMITER $
CREATE PROCEDURE GetDoctorWithMostPatientsByYear(
    IN input_year INT
)
BEGIN
    SELECT
        doctor_id, 
        COUNT(patient_id) AS patients_seen
    FROM
        appointment
    WHERE
        YEAR(appointment_time) = input_year
    GROUP BY
        doctor_id
    ORDER BY
        patients_seen DESC
    LIMIT 1;
END$
DELIMITER ;

-- ==========================================================
-- COMANDOS DE EJECUCIÓN Y PRUEBA (CALL)
-- ==========================================================
-- CALL GetDailyAppointmentReportByDoctor('2025-04-15');
-- CALL GetDoctorWithMostPatientsByMonth(4, 2025);
-- CALL GetDoctorWithMostPatientsByYear(2025);
