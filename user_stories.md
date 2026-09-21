# Historias de Usuario - SmartCare Clinic Management System

# User Story Template
**Title:**
_As a [user role], I want [feature/goal], so that [reason]._
**Acceptance Criteria:**
1. [Criteria 1]
2. [Criteria 2]
3. [Criteria 3]
**Priority:** [High/Medium/Low]
**Story Points:** [Estimated Effort in Points]
**Notes:**
- [Additional information or edge cases]

---

## ## Historias de usuario administrador

### Historia 1: Inicio de sesión de Administrador
**Title:**
_As an Administrator, I want to log in to the portal using my username and password, so that I can manage the clinical platform securely._
**Acceptance Criteria:**
1. El sistema valida las credenciales contra la base de datos de administradores con contraseñas encriptadas.
2. Si las credenciales son válidas, se genera un token JWT de sesión y se redirige al Admin Dashboard.
3. Si los datos son inválidos, se muestra un mensaje de error claro sin exponer información sensible.
**Priority:** High  
**Story Points:** 3  
**Notes:**
- Soporte para protección contra ataques de fuerza bruta tras múltiples intentos fallidos.

### Historia 2: Cierre de sesión de Administrador
**Title:**
_As an Administrator, I want to log out of the portal, so that I can protect system access and maintain confidentiality._
**Acceptance Criteria:**
1. Al pulsar el botón "Logout", se invalida la sesión activa y se elimina el token JWT del cliente.
2. El sistema redirige a la página principal de selección de rol o inicio de sesión.
3. El uso del botón atrás del navegador no debe permitir ver páginas restringidas en caché.
**Priority:** High  
**Story Points:** 2  
**Notes:**
- Invalidar cualquier cookie o token en almacenamiento local.

### Historia 3: Agregar nuevos doctores
**Title:**
_As an Administrator, I want to add doctor profiles to the clinic portal, so that patients can discover them and book appointments._
**Acceptance Criteria:**
1. Formulario con validación de campos obligatorios: nombre completo, especialidad médica, correo institucional y horarios de disponibilidad.
2. El sistema valida que el correo electrónico no esté registrado previamente.
3. Al guardar exitosamente, el doctor se persiste en MySQL y aparece disponible inmediatamente en el directorio público.
**Priority:** High  
**Story Points:** 5  
**Notes:**
- El doctor recibe una cuenta inicial con credenciales para acceder a su portal.

### Historia 4: Eliminar perfil de un doctor
**Title:**
_As an Administrator, I want to remove or deactivate a doctor's profile from the portal, so that outdated medical staff are not shown to patients._
**Acceptance Criteria:**
1. El administrador puede buscar y seleccionar un doctor para su eliminación o desactivación.
2. Si el doctor tiene citas futuras activas, el sistema advierte o reasigna antes de la confirmación.
3. Una vez confirmado, el doctor deja de ser visible en el catálogo de citas.
**Priority:** Medium  
**Story Points:** 3  
**Notes:**
- Se recomienda borrado lógico (soft delete) para preservar el historial clínico asociado.

### Historia 5: Reporte de estadísticas de citas por mes (Procedimiento Almacenado)
**Title:**
_As an Administrator, I want to execute a stored procedure in MySQL CLI, so that I can obtain the number of appointments per month and track usage statistics._
**Acceptance Criteria:**
1. El procedimiento almacenado `GetAppointmentsByMonth` o similar acepta año/mes o agrupa por períodos mensuales.
2. Devuelve un conjunto de datos agregados con el conteo de citas agrupadas por doctor y estado.
3. Ejecución optimizada mediante índices sobre la columna de fecha de cita en MySQL.
**Priority:** Medium  
**Story Points:** 5  
**Notes:**
- El procedimiento almacenado formará parte de los scripts de inicialización SQL de la base de datos.

---

## ## Historias de usuario paciente

### Historia 6: Directorio público de médicos
**Title:**
_As a Patient, I want to view a list of doctors without logging in, so that I can explore medical specialties and options before registering._
**Acceptance Criteria:**
1. La página de inicio lista a todos los doctores activos mostrando nombre, especialidad, correo y franjas de disponibilidad.
2. Se permite filtrar por especialidad o buscar por nombre en tiempo real.
3. El botón "Book Now" o reservar cita invita al usuario a registrarse o iniciar sesión si aún no lo ha hecho.
**Priority:** High  
**Story Points:** 3  
**Notes:**
- Consumo directo mediante la API REST pública de doctores.

### Historia 7: Registro de cuenta de paciente
**Title:**
_As a Patient, I want to register using my email and password, so that I can book appointments and manage my clinical profile._
**Acceptance Criteria:**
1. Formulario de registro con validaciones de email válido y complejidad de contraseña.
2. Se verifica que el correo electrónico no exista previamente registrado como paciente.
3. Se almacena el nuevo registro en MySQL con contraseña hasheada y se inicia sesión automáticamente.
**Priority:** High  
**Story Points:** 5  
**Notes:**
- Cumplimiento de estándares de seguridad en manejo de datos personales.

### Historia 8: Inicio de sesión de paciente
**Title:**
_As a Patient, I want to log in to the portal, so that I can manage my existing bookings and view personal medical records._
**Acceptance Criteria:**
1. Acceso mediante correo electrónico y contraseña.
2. Autenticación exitosa devuelve token JWT y redirige al panel del paciente (PatientDashboard).
3. Notificación visible en pantalla en caso de credenciales incorrectas.
**Priority:** High  
**Story Points:** 3  
**Notes:**
- Almacenamiento seguro del token de sesión.

### Historia 9: Reserva de cita médica de una hora
**Title:**
_As a Patient, I want to log in and book a one-hour appointment with a doctor, so that I can consult regarding my health issues._
**Acceptance Criteria:**
1. El paciente selecciona el doctor, la fecha deseada y la franja horaria disponible (de 1 hora de duración).
2. El sistema verifica en tiempo real que el doctor no tenga otra cita solapada en ese horario.
3. Al confirmar, la cita se registra en MySQL con estado programada (Scheduled) y se asocia al ID del paciente.
**Priority:** High  
**Story Points:** 5  
**Notes:**
- Prevención de concurrencia para evitar doble reserva simultánea de la misma franja.

### Historia 10: Consulta de próximas citas
**Title:**
_As a Patient, I want to view my upcoming appointments in my dashboard, so that I can prepare accordingly and not miss them._
**Acceptance Criteria:**
1. La sección Patient Record / Appointments muestra una tabla o lista con fecha, ID de cita, nombre del doctor y estado.
2. Permite acceder a la vista de recetas (Prescription) asociadas cuando la cita ya ha finalizado.
3. Opción para actualizar o cancelar la cita antes de la fecha programada.
**Priority:** Medium  
**Story Points:** 3  
**Notes:**
- Las recetas asociadas se recuperan de la base de datos documental MongoDB.

---

## ## Historias de usuario doctor

### Historia 11: Inicio de sesión de médico
**Title:**
_As a Doctor, I want to log in to the medical portal, so that I can manage my appointments and patient consultations._
**Acceptance Criteria:**
1. Inicio de sesión mediante credenciales asignadas con rol DOCTOR.
2. Acceso restringido al DoctorDashboard con validación de roles vía Spring Security.
3. Manejo de expiración de sesión por inactividad.
**Priority:** High  
**Story Points:** 3  
**Notes:**
- Sólo los doctores activos pueden autenticarse.

### Historia 12: Cierre de sesión de médico
**Title:**
_As a Doctor, I want to log out of the portal, so that I can protect patient data and confidentiality between shifts._
**Acceptance Criteria:**
1. Botón de Logout accesible en todo momento en la barra de navegación superior.
2. Limpieza de tokens JWT en el cliente y redirección inmediata a la página de bienvenida.
3. Las páginas con historiales y recetas no deben ser accesibles tras cerrar sesión.
**Priority:** High  
**Story Points:** 2  
**Notes:**
- Estricto cumplimiento de privacidad de registros médicos.

### Historia 13: Gestión de calendario y agenda de citas
**Title:**
_As a Doctor, I want to view my appointment calendar, so that I can stay organized and know my schedule for the day._
**Acceptance Criteria:**
1. Vista cronológica de todas las citas asignadas al doctor logueado filtradas por fecha.
2. Visualización del ID de cita, nombre del paciente, hora y estado de la consulta.
3. Filtro rápido entre citas del día de hoy y citas de fechas futuras.
**Priority:** High  
**Story Points:** 5  
**Notes:**
- Petición filtrada a la API REST por el identificador del doctor.

### Historia 14: Marcar indisponibilidad de horario
**Title:**
_As a Doctor, I want to mark my unavailability for specific time slots, so that patients are only shown times when I am available._
**Acceptance Criteria:**
1. El doctor puede bloquear franjas horarias específicas en su configuración de disponibilidad.
2. Las franjas marcadas como no disponibles dejan de aparecer en el selector de reserva de citas para pacientes.
3. No se permite bloquear franjas que ya cuenten con citas confirmadas a menos que sean canceladas o reprogramadas.
**Priority:** Medium  
**Story Points:** 3  
**Notes:**
- Persistencia de horarios hábiles en el modelo relacional Doctor.

### Historia 15: Consulta de detalles del paciente y prescripción
**Title:**
_As a Doctor, I want to view patient details for upcoming appointments and create prescriptions, so that I can provide optimal care._
**Acceptance Criteria:**
1. El doctor puede consultar la información básica del paciente que reservó la cita.
2. Posibilidad de abrir la ventana modal para emitir una receta (Prescription) con medicamento, dosis e instrucciones.
3. La receta se almacena en la colección de MongoDB ligada al ID de cita y paciente.
**Priority:** High  
**Story Points:** 5  
**Notes:**
- Integración entre la cita en MySQL y el documento de prescripción en MongoDB.
