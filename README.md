# Ecommerce API

Esta es una API de ecommerce creada con Node.js, TypeScript, Express y Supabase. Permite gestionar usuarios, productos (tarjetas) y carritos de compras. 

## Tecnologías

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para Node.js para construir APIs.
- **Supabase**: Plataforma de código abierto para bases de datos, autenticación y almacenamiento en tiempo real.
- **SQL**: Lenguaje para gestionar y consultar bases de datos relacionales.
- **TypeScript**: Lenguaje de programación basado en JavaScript que agrega tipado estático.

## Instalación

### Requisitos previos

- **Node.js** y **npm** (o **yarn**) instalados.
- Una cuenta de **Supabase** para gestionar la base de datos y la autenticación (puedes incluir instrucciones breves sobre cómo obtener una clave de API de Supabase si es necesario).

### Pasos de instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/VeraLaureano/ecommerce-api.git
    cd ecommerce-api
    ```

2. Instala las dependencias:

    ```bash
    npm install
    # o si usas yarn
    yarn install
    ```

3. Configura las variables de entorno. Crea un archivo `.env` y agrega las siguientes variables (reemplaza con tus valores de Supabase):

    ```bash
    PORT=numero_puerto
    VERSION=version_api
    SUPABASE_URL=tu_supabase_url
    SUPABASE_CLIENT_ANON_KEY=tu_supabase_anon_key
    SECRET_KEY=tu_secreto_para_jwt
    ```

4. Ejecuta la aplicación en modo desarrollo:

    ```bash
    npm run dev
    # o si usas yarn
    yarn dev
    ```

La API estará disponible en `http://localhost:PORT`.


## Estructura del Proyecto


```
/src
  /config         # Configuración global 
  /controllers    # Controladores de la API
  /interfaces     # Interfaces de las tablas
  /middlewares    # Middlewares 
  /models         # Modelos de la base de datos (si es necesario usar mongodb)
  /routes         # Definición de rutas
  /services       # Consultas a la base de datos
  /utils          # Funciones auxiliares
```

## Endpoints

### 1. Usuarios

- **POST /api/VERSION/user/signup**: Registra un nuevo usuario y un nuevo carrito asociado a el.
- **POST /api/VERSION/user/login**: Inicia sesión con un usuario existente.
- **GET /api/VERSION/user**: Obtiene datos del usuario autorizado.
- **PATCH /api/VERSION/user**: Actualiza datos del usuario autorizado.
- **DELETE /api/VERSION/user**: Elimina el usuario y todos los elementos asociados a el *(cart, cartItems)*.

### 2. Productos

- **GET /api/VERSION/cards**: Obtiene todos los productos disponibles.
- **GET /api/VERSION/cards/:id**: Obtiene un producto por su ID.
- **POST /api/VERSION/cards**: Crea un nuevo producto (solo administradores).
- **PATCH /api/VERSION/cards/:id**: Actualiza un producto existente (solo administradores).
- **DELETE /api/VERSION/cards/:id**: Elimina un producto (solo administradores).

### 3. Carrito

- **GET /api/VERSION/cart**: Obtiene el carrito de un usuario.

### 4. Productos del Carrito
- **GET /api/VERSION/items/:userId**: Obtiene todos los productos asociados al carrito del usuario.
- **POST /api/VERSION/items/:userId**: Crea un nuevo producto del carrito *(itemCart)* y lo asocia al carrito del usuario.
- **PATCH /api/VERSION/items/:userId**: Actualiza cantidad del producto del carrito *(itemCart)*.
- **DELETE /api/VERSION/items/:userId**: Elimina el producto del carrito.

## Autenticación

La API utiliza JWT (JSON Web Token) para la autenticación de usuarios. Asegúrate de incluir el token JWT en los headers de las solicitudes que requieran autenticación.

Ejemplo de cómo agregar el token a los headers:

```bash
Authorization: Bearer <token>
```

## Ejemplo de uso

### Registrar un usuario

```bash
curl -X POST http://localhost:3000/api/v1/user/signup \
-H "Content-Type: application/json" \
-d '{
  "email": "nuevo@usuario.com",
  "password": "mi_contraseña_segura"
}'
```

### Iniciar sesión

```bash
curl -X POST http://localhost:3000/api/v1/user/login \
-H "Content-Type: application/json" \
-d '{
  "email": "usuario@ejemplo.com",
  "password": "mi_contraseña_segura"
}'
```

### Obtener y Usar Token

```bash
# Paso 1: Iniciar sesión para obtener el JWT
response=$(curl -X POST http://localhost:3000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "mi_contraseña_segura"
  }')

# Extraer el token JWT de la respuesta JSON
jwt_token=$(echo $response | jq -r '.token')

# Paso 2: Obtener los productos del carrito con el JWT
curl -X GET http://localhost:3000/api/v1/cart \
  -H "Authorization: Bearer $jwt_token"

```

### Obtener los productos

```bash
curl http://localhost:3000/api/v1/cards
```

## Licencia

Este proyecto está bajo una licencia de uso no comercial con atribución. Puedes usar, modificar y distribuir este software de manera no comercial, pero si deseas usarlo con fines comerciales, deberás obtener autorización previa por escrito del titular de los derechos de autor.

Para más detalles, consulta el archivo [LICENSE](LICENSE).


## Desarrollado por **[VeraLaureano](https://github.com/VeraLaureano)** 