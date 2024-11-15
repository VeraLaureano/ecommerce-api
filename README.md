# Ecommerce API

Esta es una API de ecommerce creada con Node.js, TypeScript, Express y MongoDB. Permite gestionar usuarios, productos (tarjetas) y carritos de compras. 

## Tecnologías

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para Node.js para construir APIs.
- **MongoDB**: Base de datos NoSQL para almacenamiento de datos.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.
- **TypeScript**: Lenguaje de programación basado en JavaScript que agrega tipado estático.

## Instalación

### Requisitos

- Node.js (v16 o superior).
- MongoDB (local o Atlas).

### Pasos para instalar

1. Clona este repositorio:
   ```bash
   git clone git@github.com:VeraLaureano/ecommerce-api.git
   cd ecommerce-api
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```bash
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_secret_key
   PORT=5000
   VERSION=v1
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```

   El servidor se iniciará en `http://localhost:5000`.

## Modelos

### 1. Usuario (`User`)

El modelo `User` permite almacenar información de los usuarios registrados en el ecommerce. 

**Campos**:

- `username`: Nombre de usuario (único y requerido).
- `email`: Correo electrónico (único y requerido).
- `password`: Contraseña (mínimo 10 caracteres).

```typescript
import { Schema, model } from 'mongoose';
import { User } from '../interfaces/User.interface';

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, 'MUST_PROVIDE_USERNAME'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'MUST_PROVIDE_EMAIL'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'MUST_PROVIDE_PASSWORD'],
    minlength: [10, 'PASSWORD_MIN_LENGTH_10']
  }
}, { timestamps: true });

const UserModel = model('User', UserSchema);
export default UserModel;
```

### 2. Producto (`Card`)

El modelo `Card` representa los productos que se pueden comprar en el ecommerce.

**Campos**:

- `name`: Nombre del producto.
- `description`: Descripción del producto.
- `price`: Precio del producto.
- `imageUrl`: URL de la imagen del producto.
- `available`: Indica si el producto está disponible para la venta.

```typescript
import { Schema, model } from 'mongoose';
import { ICard } from './../interfaces/Card.interface';

const CardSchema = new Schema<ICard>({
  name: { type: String, required: true },
  description: { type: String, required: [true, 'NAME_IS_REQUIRED'] },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  available: { type: Boolean, default: true }
});

export default model<ICard>('Card', CardSchema);
```

### 3. Carrito (`Cart`)

El modelo `Cart` permite almacenar la información del carrito de compras de un usuario.

**Campos**:

- `userId`: ID del usuario (referencia al modelo `User`).
- `items`: Array de productos en el carrito. Cada item contiene:
  - `cardId`: ID del producto (referencia al modelo `Card`).
  - `quantity`: Cantidad del producto en el carrito.

```typescript
import { ICart } from './../interfaces/Cart.interface';
import mongoose, { Schema } from 'mongoose';

const cartSchema = new Schema<ICart>({
  userId: mongoose.Types.ObjectId,
  items: [
    {
      cardId: { type: mongoose.Types.ObjectId, ref: 'Card', required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

export default mongoose.model<ICart>('Cart', cartSchema);
```

## Endpoints

### 1. Usuarios

- **POST /api/VERSION/users/register**: Registra un nuevo usuario.
- **POST /api/VERSION/users/login**: Inicia sesión con un usuario existente.

### 2. Productos

- **GET /api/VERSION/cards**: Obtiene todos los productos disponibles.
- **GET /api/VERSION/cards/:id**: Obtiene un producto por su ID.
- **POST /api/VERSION/cards**: Crea un nuevo producto (solo administradores).
- **PUT /api/VERSION/cards/:id**: Actualiza un producto existente (solo administradores).
- **DELETE /api/VERSION/cards/:id**: Elimina un producto (solo administradores).

### 3. Carrito

- **GET /api/VERSION/cart**: Obtiene el carrito de un usuario.
- **PATCH /api/VERSION/cart/:cardId**: Actualiza o añade cartas al carrito.
- **DELETE /api/VERSION/cart/:cardId/remove**: Elimina una carta del carrito.

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