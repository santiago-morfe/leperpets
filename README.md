# LeperPets: Una reinterpretación de los clásicos Tamagotchi

LeperPets es una aplicación web que reimagina los clásicos Tamagotchi, permitiendo a los usuarios cuidar y coleccionar criaturas virtuales directamente desde su navegador. Este proyecto combina tecnologías modernas como React, TypeScript y CSS modular para ofrecer una experiencia interactiva y atractiva. Es ideal para incluir en un portafolio, ya que demuestra habilidades en desarrollo frontend, gestión de estado y despliegue de aplicaciones web.

## Características principales

- **Cuidado de criaturas**: Alimenta, juega y cuida de tus mascotas para mantenerlas felices y saludables.
- **Colección de mascotas**: Cumple ciertas condiciones para desbloquear nuevas criaturas y expandir tu colección.
- **Interactividad en tiempo real**: Las mascotas tienen estados dinámicos que cambian con el tiempo, como hambre, felicidad y energía.
- **Compatibilidad con items**: Usa items consumibles para mejorar el estado de tus mascotas.
- **Sistema de juego**: Participa en mini juegos para interactuar con tus mascotas.

## Tecnologías utilizadas

- **React**: Biblioteca principal para la construcción de la interfaz de usuario.
- **TypeScript**: Para un desarrollo más robusto y tipado estático.
- **CSS Modules**: Para estilos encapsulados y reutilizables.
- **Vite**: Herramienta de construcción rápida para proyectos modernos de frontend.
- **Netlify**: Plataforma utilizada para el despliegue continuo de la aplicación.

## Arquitectura del proyecto

El proyecto está organizado de manera modular para facilitar la escalabilidad y el mantenimiento:

### Estructura de carpetas

- **`src/`**: Contiene todo el código fuente de la aplicación.
  - **`assets/`**: Recursos estáticos como imágenes y fuentes.
  - **`components/`**: Componentes reutilizables como la barra de navegación y pantallas de carga.
  - **`contexts/`**: Implementación de Context API para la gestión de estado global (e.g., `PetsContext` para manejar el estado de las mascotas).
  - **`data/`**: Archivos de configuración y datos estáticos como `petsData.ts` y `config.ts`.
  - **`pages/`**: Pantallas principales de la aplicación, organizadas por funcionalidad (e.g., `HomeScreen`, `PetsScreen`, `ShopScreen`).
  - **`utilities/`**: Funciones auxiliares y utilidades.

### Gestión de estado

Se utiliza Context API para manejar el estado global de la aplicación. Por ejemplo, `PetsContext` gestiona el estado de las mascotas, incluyendo su felicidad, hambre, energía y más. Este estado se sincroniza con `localStorage` para persistencia entre sesiones.

### Estilos

Los estilos están organizados utilizando CSS Modules, lo que permite un encapsulamiento completo y evita conflictos de nombres. Cada componente tiene su propio archivo `.module.css`.

### Despliegue

La aplicación está desplegada en [Netlify](https://leper-pets-beta.netlify.app/), lo que permite un despliegue continuo y una experiencia de usuario fluida.

## Cómo ejecutar el proyecto localmente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/santiago-morfe/leperpets.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd leperpets
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre tu navegador en `http://localhost:5173`.

## Enlaces importantes

- **Repositorio GitHub**: [https://github.com/santiago-morfe/leperpets](https://github.com/santiago-morfe/leperpets)
- **Aplicación en vivo**: [https://leper-pets-beta.netlify.app/](https://leper-pets-beta.netlify.app/)

## Autor

Este proyecto fue desarrollado por Santiago Morfe como parte de su portafolio profesional. Si tienes preguntas o comentarios, no dudes en contactarlo a través de su perfil de GitHub.
