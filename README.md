# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

proyecto hecho con react y vite
compilar con npm run dev

# 🛍️ Tienda Online - Frontend
Este es el frontend de una tienda online desarrollado con React y Vite, el cual permite a los usuarios explorar productos, agregarlos al carrito y realizar pagos con tarjeta.

# 🚀 Tecnologías principales
⚛️ React

⚡ Vite

💳 API de pagos (integrada con backend propio)

💅 CSS personalizado

📦 Axios


Vista detallada de cada producto.

Carrito de compras con cantidad y precios actualizados.

Formulario de pago con validación.

Modales de confirmación y estados de compra.

Categorías y filtro por tipo.

Diseño responsive para móviles y escritorio.

# 🔌 APIs Consumidas
El frontend se comunica con un backend desplegado (por ejemplo, en Render) a través de las siguientes rutas:

# #🔍 Productos
GET /products
Retorna todos los productos disponibles.

GET /products/:id
Retorna el detalle de un producto específico.

# 🛒 Tokens (Tarjetas)
POST /tokens/cards
Envía los datos de la tarjeta para generar un token.

# 🧾 Comerciantes
GET /merchant
Retorna los datos del comercio, incluyendo el acceptance_token necesario para procesar pagos.

# 💳 Pagos
POST /payment
Realiza el pago usando el token generado, el acceptance_token, y el payload completo.




