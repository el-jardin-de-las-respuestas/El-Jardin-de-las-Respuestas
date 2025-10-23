# 🌸 El Jardín de las Respuestas

**El Jardín de las Respuestas** es una plataforma educativa y comunitaria digital que promueve la **Educación Sexual Integral (ESI)** y el **acompañamiento ginecológico gratuito**, en un entorno seguro, accesible e inclusivo.

---

## 💡 Descripción General

El proyecto busca democratizar el acceso a información confiable sobre salud sexual y reproductiva, conectando a usuarias con profesionales voluntarias y creando una comunidad basada en el respeto y la empatía.

---

## 🧩 Objetivos

- Brindar acceso gratuito a contenido educativo validado por profesionales.  
- Facilitar consultas anónimas con ginecólogas voluntarias.  
- Ofrecer un foro seguro para compartir experiencias.  
- Promover la inclusión, la salud y la educación digital.

---

## 🌐 Funcionalidades Principales

- **Biblioteca ESI:** Artículos, videos e infografías sobre cuerpo, género, relaciones, derechos y salud.  
- **Foro Comunitario:** Espacio de diálogo moderado, sin juicios.  
- **Consultorio Virtual:** Chat seguro entre usuarias y profesionales.  
- **Chatbot de IA:** Asistente para consultas frecuentes.  
- **Roles:** Administradora, Profesional y Usuaria (gestionados mediante Prisma).

---

## ⚙️ Tecnologías Utilizadas

| Capa | Tecnología |
|------|-------------|
| **Backend** | NestJS |
| **ORM** | Prisma |
| **Base de datos** | PostgreSQL |
| **Frontend** | Next.js |
| **Autenticación** | JWT |
| **Contenedores** | Docker |

---

## 🗂️ Estructura de la Base de Datos (Prisma)

El modelo incluye las entidades principales:

- `User`, `Role`, `Professional`  
- `Forum`, `Post`, `Comment`  
- `Consultation`, `Message`, `Chat`  
- `Library`  

Las relaciones están diseñadas para garantizar integridad, privacidad y escalabilidad.

---

## 🚀 Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/emanuelcabral8/El-Jardin-de-las-Respuestas.git
