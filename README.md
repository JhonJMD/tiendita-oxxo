# Tiendita OXXO - Sistema de Gestión 🏪

![](https://raw.githubusercontent.com/JhonJMD/tiendita-oxxo/refs/heads/main/public/assets/images/Asset%2B10OXXO.png)

![React Version](https://img.shields.io/badge/React-18.3.1-blue)
![Vite Version](https://img.shields.io/badge/Vite-6.3.5-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Development-orange)

> Sistema de gestión para tiendas OXXO desarrollado por JhonJMD que permite administrar productos, categorías, clientes y registrar compras de manera eficiente a través de una interfaz gráfica intuitiva y responsiva.

## ✨ Características

- **Gestión de productos**: Crear, ver, editar y eliminar productos
- **Administración de categorías**: Organización de productos por categorías
- **Gestión de clientes**: Registro y administración de la información de clientes
- **Proceso de compras**: Registro de compras con selección de productos y clientes
- **Dashboard**: Vista principal con estadísticas y accesos rápidos
- **Interfaz responsiva**: Diseño adaptable a diferentes dispositivos
- **Validación de formularios**: Implementación de validaciones robustas
- **Notificaciones**: Sistema de notificaciones para acciones exitosas y errores

## 📸 Capturas de pantalla

![](https://raw.githubusercontent.com/JhonJMD/tiendita-oxxo/refs/heads/main/public/assets/images/Captura%20desde%202025-05-13%2009-58-40.png)

## 🎬 Demo

![Demo](https://raw.githubusercontent.com/JhonJMD/tiendita-oxxo/main/public/assets/images/Grabaci%C3%B3n-de-pantalla-desde-13-05-25-10_25_19.gif)


## 🛠️ Tecnologías utilizadas

- **React 18.3**: Framework principal para la construcción de interfaces
- **Vite 6.3**: Herramienta de construcción y desarrollo
- **Formik**: Gestión de formularios complejos
- **Yup**: Validación de formularios
- **React Icons**: Iconografía
- **React Modal**: Ventanas modales
- **React Toastify**: Sistema de notificaciones
- **CSS puro**: Estilos sin frameworks externos

## 📂 Estructura del proyecto

```
tiendita-oxxo/
├── public/                  # Recursos estáticos
├── src/
│   ├── api/                 # Comunicación con la API
│   │   ├── services/        # Servicios para cada entidad (productos, categorías, etc.)
│   │   └── config.js        # Configuración de la API
│   ├── components/          # Componentes React organizados por módulos
│   │   ├── categories/      # Componentes relacionados con categorías
│   │   ├── clients/         # Componentes relacionados con clientes
│   │   ├── common/          # Componentes reutilizables (botones, modales, etc.)
│   │   ├── layout/          # Componentes de estructura (header, navbar, footer)
│   │   ├── products/        # Componentes relacionados con productos
│   │   └── purchases/       # Componentes relacionados con compras
│   ├── context/             # Context API para estado global
│   ├── hooks/               # Custom hooks (useForm, useFetch)
│   ├── pages/               # Páginas principales (Home, Productos, etc.)
│   ├── styles/              # Archivos CSS
│   ├── utils/               # Utilidades (formatters, validators, etc.)
│   ├── validations/         # Esquemas de validación
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Punto de entrada
└── package.json             # Dependencias y scripts
```

## 📋 Requisitos previos

- Node.js ≥ 18.0.0
- NPM ≥ 8.0.0
- API backend ejecutándose en http://localhost:8080/api

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/JhonJMD/tiendita-oxxo.git
cd tiendita-oxxo
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Accede a la aplicación en tu navegador:
```
http://localhost:5173
```

## 🔧 Uso

### Dashboard
El dashboard principal muestra estadísticas clave del negocio:
- Productos activos e inactivos
- Categorías activas
- Clientes registrados
- Valor del inventario
- Productos con bajo stock (menos de 10 unidades)

### Gestión de productos
- **Crear producto**: Completa el formulario con nombre, código de barras, precio, stock, etc.
- **Ver productos**: Lista completa con opciones de edición y eliminación
- **Editar producto**: Modifica cualquier campo del producto
- **Eliminar producto**: Requiere confirmación para evitar eliminaciones accidentales

### Gestión de categorías
- **Crear categoría**: Asigna nombre y estado a la categoría
- **Ver categorías**: Listado con opciones de edición y eliminación
- **Editar categoría**: Modifica nombre o estado (activo/inactivo)
- **Eliminar categoría**: Con confirmación para prevenir pérdida de datos

### Gestión de clientes
- **Crear cliente**: Registra información completa del cliente
- **Ver clientes**: Lista de clientes con sus datos principales
- **Editar cliente**: Actualiza información del cliente
- **Eliminar cliente**: Con confirmación previa

### Registro de compras
1. Selecciona un cliente
2. Agrega productos a la compra (especificando cantidad)
3. El sistema calcula automáticamente los subtotales y total
4. Confirma la compra para registrarla en el sistema

## 🔌 API

La aplicación se comunica con un backend a través de los siguientes endpoints:

### Productos
- `GET /api/producto`: Obtener todos los productos
- `GET /api/producto/:id`: Obtener un producto por ID
- `POST /api/producto`: Crear un nuevo producto
- `PUT /api/producto/:id`: Actualizar un producto existente
- `DELETE /api/producto/:id`: Eliminar un producto

### Categorías
- `GET /api/categoria`: Obtener todas las categorías
- `GET /api/categoria/:id`: Obtener una categoría por ID
- `POST /api/categoria`: Crear una nueva categoría
- `PUT /api/categoria/:id`: Actualizar una categoría existente
- `DELETE /api/categoria/:id`: Eliminar una categoría

### Clientes
- `GET /api/cliente`: Obtener todos los clientes
- `GET /api/cliente/:id`: Obtener un cliente por ID
- `POST /api/cliente`: Crear un nuevo cliente
- `PUT /api/cliente/:id`: Actualizar un cliente existente
- `DELETE /api/cliente/:id`: Eliminar un cliente

### Compras
- `GET /api/compra`: Obtener todas las compras
- `GET /api/compra/:id`: Obtener una compra por ID
- `POST /api/compra`: Crear una nueva compra
- `PUT /api/compra/:id`: Actualizar una compra existente
- `DELETE /api/compra/:id`: Eliminar una compra

## 🔄 Flujo de trabajo

1. **Navegación**: A través del menú superior (Productos, Categorías, Clientes, Compras)
2. **Formularios**: Validados en tiempo real usando Formik y Yup
3. **Notificaciones**: Feedback inmediato de acciones realizadas
4. **Navegación con breadcrumbs**: Para ubicar al usuario dentro de la aplicación
5. **Confirmaciones**: Para operaciones críticas como eliminación de registros

## 👤 Autor

- **JhonJMD** - [GitHub](https://github.com/JhonJMD)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.

---

Proyecto desarrollado con 💙 por JhonJMD.
