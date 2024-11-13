# TP-MarketPlaceApuntes

Este es un proyecto de Marketplace de apuntes universitarios, compuesto por un frontend desarrollado en Angular y un backend en Node.js.

En nuestra página puedes publicar y comprar apuntes referidos a la carrera Ingeniería en Sistemas de Información de la Universidad Tecnológica Nacional Facultad Regional Rosario.

Puedes cumplir el rol de "Administrador" o "Alumno".

Un alumno puede publicar y comprar apuntes. Además, un alumno puede calificar los apuntes que compró.

Un administrador puede crear, modificar y borrar materias, como también puede borrar apuntes y sancionar alumnos en caso de que infrinjan las normas de nuestro sitio.

## Repositorios

- **Backend**: [TP-MarketPlaceApuntes-BackEnd](https://github.com/BrunoIglina/TP-MarketPlaceApuntes-BackEnd.git)
- **Frontend**: [TP-MarketPlaceApuntes](https://github.com/BrunoIglina/TP-MarketPlaceApuntes.git)

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Angular CLI](https://angular.io/cli) (versión 12 o superior)
- [MySQL](https://www.mysql.com/) (para la base de datos)

---

## Instalación

### 1. Clonar los Repositorios

Clona ambos repositorios en tu máquina local:

```bash
# Clonar el backend
git clone https://github.com/BrunoIglina/TP-MarketPlaceApuntes-BackEnd.git

# Clonar el frontend
git clone https://github.com/BrunoIglina/TP-MarketPlaceApuntes.git
```

### 2. Configuración del Backend

1. Entra al directorio del backend:

   ```bash
   cd TP-MarketPlaceApuntes-BackEnd
   ```

2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

3. Configura la base de datos MySQL. Actualiza los datos de conexión en el archivo `.env` con tus datos de MySQL:

   ```env
   DB_HOST=localhost
   DB_USER=*tu_usuario*
   DB_PASSWORD=*tu_contraseña*
   DB_NAME=*nombre_base_de_datos*
   ```

4. Creación de la base de datos:

      Ejecutar el schema en MySQL Workbench que está en el siguiente vínculo:
      [Esquema de la base de datos](https://github.com/BrunoIglina/TP-MarketPlaceApuntes-BackEnd/blob/main/BaseDeDatosSQL_WorkBench/marketplace_apuntes_schema.sql)

      Ejecutar el siguiente script para tener datos cargados en la base de datos:
      [Script con datos para usar](https://github.com/BrunoIglina/TP-MarketPlaceApuntes-BackEnd/blob/main/BaseDeDatosSQL_WorkBench/DatosEjemploMarketPlaceApuntes.sql)
   
6. Inicia el servidor backend:

   ```bash
   node app.js
   ```

   Esto debería iniciar el backend en `http://localhost:3000` (o en el puerto especificado en tu configuración).

### 3. Configuración del Frontend

1. Entra al directorio del frontend:

   ```bash
   cd ../TP-MarketPlaceApuntes\Front_End_Angular\MarketPlaceApuntes-app
   ```

2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

3. Inicia la aplicación frontend:

   ```bash
   ng serve --open
   ```

   La aplicación debería estar disponible en `http://localhost:4200`.

---

## Uso / Funcionalidades

Si todos los pasos fueron realizados correctamente, habrás llegado al inicio de sesión. 
Para ingresar como alumno, debes registrarte. 
Para usar la funcionalidad de administrador, debes ingresar con uno de los administradores precargados en la base de datos.

---

## Respecto a la compra de apuntes:

Para realizar la compra de un apunte, deberás iniciar sesión en MercadoPago con una de las siguientes cuentas de prueba. Ten en cuenta que el dinero que se usa no es dinero real:
[Cuentas de prueba de MercadoPago](https://docs.google.com/document/d/1csWDhjC5ck2ivICSAuDUtiZ3Rnd3NNMV-t7VIfY680Y/edit?tab=t.0)

---

## Notas Adicionales

- Asegúrate de que el backend esté en ejecución antes de iniciar el frontend.
- Verifica las configuraciones de CORS si encuentras problemas de conexión entre el frontend y el backend.

---

## Autores

- Bruno Iglina [BrunoIglina](https://github.com/BrunoIglina)
- Agustín Molina [AgustinMolina028](https://github.com/AgustinMolina028)
- Agustín García [AgustinGarcia2307](https://github.com/AgustinGarcia2307)
