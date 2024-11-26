# Ecommerce API

Esta es una API de ecommerce creada con Node.js, TypeScript, Express y MongoDB. Permite gestionar usuarios, productos (tarjetas) y carritos de compras. 

## Tecnologías

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para Node.js para construir APIs.
- **Supabase**: Plataforma de código abierto para bases de datos, autenticación y almacenamiento en tiempo real.
- **SQL**: Lenguaje para gestionar y consultar bases de datos relacionales.
- **TypeScript**: Lenguaje de programación basado en JavaScript que agrega tipado estático.

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

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un pull request.

---

## Desarrollado por **[VeraLaureano](https://github.com/VeraLaureano)** 