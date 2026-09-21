# Smart Clinic Management System - Diseño de Arquitectura

## Sección 1: Resumen de la Arquitectura

La solución Smart Clinic (SmartCare Solutions) está diseñada sobre una arquitectura desacoplada de tres capas utilizando Spring Boot en el backend para garantizar modularidad, escalabilidad y alto rendimiento. El sistema combina dos patrones de entrega en la capa de presentación y dos motores de persistencia complementarios:

1. Capa Web Híbrida (Spring MVC + RESTful APIs):
   - Los módulos administrativos y de gestión clínica principal (AdminDashboard y DoctorDashboard) utilizan Spring MVC con el motor de plantillas Thymeleaf, facilitando el renderizado dinámico del lado del servidor (Server-Side Rendering).
   - Los módulos interactivos y de autoservicio de pacientes (Appointments, PatientDashboard y PatientRecord) se exponen mediante APIs RESTful bajo el estándar JSON/HTTP, lo que permite la interoperabilidad con aplicaciones de cliente modernas (HTML/CSS/JS), aplicaciones móviles y servicios externos.

2. Capa de Negocio y Lógica de Servicios:
   - Una Capa de Servicios (Service Layer) unificada centraliza las reglas de negocio, la validación de dominios, las políticas de seguridad/autorización y la orquestación entre múltiples entidades antes de persistir la información.

3. Arquitectura de Persistencia Políglota (MySQL + MongoDB):
   - MySQL (Relacional): Gestionado a través de Spring Data JPA, almacena datos estructurados, normalizados y con integridad referencial crítica: Pacientes (Patient), Médicos (Doctor), Citas (Appointment) y Cuentas de Administración (Admin).
   - MongoDB (NoSQL Documental): Gestionado a través de Spring Data MongoDB, almacena entidades de esquema dinámico y flexible como las Prescripciones/Recetas (Prescription), permitiendo anidar listas de medicamentos, dosis personalizadas e instrucciones médicas variables sin penalizar la rigidez del esquema relacional.

---

## Sección 2: Flujo Numerado de Datos y Control

A continuación se detalla el ciclo completo de procesamiento de una solicitud en 7 pasos estructurados, siguiendo el flujo del diagrama de arquitectura del sistema:

1. Interacción del Usuario (Capa de Interfaz de Usuario / UI):
   El usuario (Administrador, Médico o Paciente) interactúa con la interfaz. Puede solicitar vistas del panel de control web (AdminDashboard / DoctorDashboard) o interactuar con módulos interactivos (Appointments, PatientDashboard, PatientRecord) a través de peticiones HTTP en el navegador o clientes frontend.

2. Enrutamiento en Controladores (Thymeleaf Controllers & REST Controllers):
   La solicitud HTTP llega al backend de Spring Boot y es dirigida según la ruta y método HTTP:
   - Si la solicitud requiere una página web, es procesada por un Thymeleaf Controller, que gestionará la vista.
   - Si la solicitud es asíncrona o proviene de un módulo de cliente (JSON), es procesada por un REST Controller (@RestController), que analiza el cuerpo del mensaje y deserializa el JSON de entrada.

3. Invocación de la Capa de Servicios (Service Layer):
   Los controladores no acceden directamente a las bases de datos; delegan de forma inmediata el control a la Capa de Servicios (Service Layer). En esta capa se ejecutan las validaciones lógicas, verificaciones de disponibilidad horaria, reglas de negocio clínicas y la orquestación de transacciones.

4. Delegación a la Capa de Repositorios (Data Repositories):
   La capa de servicio se comunica con la abstracción de repositorios correspondiente:
   - Utiliza Spring Data JPA Repositories para operaciones sobre entidades transaccionales y relacionales.
   - Utiliza Spring Data MongoDB Repositories para operaciones sobre documentos clínicos flexibles.

5. Acceso y Persistencia en Base de Datos (Database Engine Access):
   Los repositorios ejecutan las consultas o comandos en los motores subyacentes:
   - MySQL Database: Gestiona tablas normalizadas con claves foráneas, restricciones de unicidad e integridad ACID para pacientes, doctores, citas y credenciales de administrador.
   - MongoDB Database: Gestiona colecciones de documentos BSON para almacenar recetas y prescripciones médicas dinámicas.

6. Mapeo y Vinculación de Modelos (Model Binding / Entity Hydration):
   Los motores de bases de datos devuelven los registros sin procesar, que son convertidos automáticamente por Spring Data en objetos Java fuertemente tipados:
   - Para MySQL, se mapean a entidades anotadas con @Entity (Patient, Doctor, Appointment, Admin).
   - Para MongoDB, se mapean a documentos anotados con @Document (Prescription).

7. Generación de Respuesta y Presentación al Consumidor (Response Delivery):
   Los modelos o DTOs resultantes se envían de vuelta a través del controlador para cerrar el ciclo solicitud-respuesta:
   - En el flujo MVC, los datos del modelo se inyectan en las plantillas HTML de Thymeleaf, produciendo HTML dinámico renderizado para el navegador web.
   - En el flujo REST, los objetos Java son serializados a formato JSON por Jackson y devueltos con el código de estado HTTP adecuado (ej. 200 OK, 201 Created) para que la interfaz web o cliente móvil los procese y renderice.
