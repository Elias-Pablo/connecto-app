-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-11-2024 a las 01:13:46
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `connecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `permiso` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id_admin`, `nombre`, `permiso`) VALUES
(1, 'Eric', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id_carrito` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `id_compra` int(11) NOT NULL,
  `id_documento` int(11) DEFAULT NULL,
  `id_carrito` int(11) NOT NULL,
  `id_envio` int(11) DEFAULT NULL,
  `detalle` varchar(255) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_compra`
--

CREATE TABLE `detalle_compra` (
  `id_detalle` int(11) NOT NULL,
  `id_compra` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `total_sin_iva` decimal(10,2) DEFAULT NULL,
  `iva` decimal(10,2) DEFAULT NULL,
  `total_con_iva` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento`
--

CREATE TABLE `documento` (
  `id_documento` int(11) NOT NULL,
  `tipo_documento` enum('Boleta,Factura') DEFAULT NULL,
  `tipo_pago` enum('Debito,Credito') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envio`
--

CREATE TABLE `envio` (
  `id_envio` int(11) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `destinatario` varchar(255) DEFAULT NULL,
  `remitente` varchar(255) DEFAULT NULL,
  `tiempo_estimado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `valor` int(11) DEFAULT NULL,
  `tiempo_llegada` datetime DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id_favorito` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`id_favorito`, `id_usuario`, `id_producto`, `fecha_creacion`) VALUES
(2, 1, 5, '2024-11-11 19:16:27'),
(3, 1, 4, '2024-11-11 19:17:10'),
(5, 1, 7, '2024-11-11 19:21:09'),
(6, 1, 10, '2024-11-11 19:21:43'),
(7, 1, 8, '2024-11-11 19:24:06'),
(8, 1, 11, '2024-11-11 19:24:09'),
(9, 1, 5, '2024-11-11 19:52:09'),
(10, 1, 6, '2024-11-11 20:06:09'),
(14, 13, 4, '2024-11-18 18:41:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foro`
--

CREATE TABLE `foro` (
  `id_foro` int(11) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `foro`
--

INSERT INTO `foro` (`id_foro`, `id_admin`, `nombre`, `tiempo_creacion`) VALUES
(1, 1, 'Finanzas', '2024-11-07 21:00:00'),
(2, 1, 'Marketing', '2024-11-07 21:10:00'),
(3, 1, 'Recursos Humanos', '2024-11-07 21:20:00'),
(4, 1, 'Operaciones', '2024-11-07 21:30:00'),
(5, 1, 'Desarrollo de Producto', '2024-11-07 21:40:00'),
(6, 1, 'Ventas', '2024-11-07 21:50:00'),
(7, 1, 'Logística', '2024-11-07 22:00:00'),
(8, 1, 'Atención al Cliente', '2024-11-07 22:10:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gestion_redes_sociales`
--

CREATE TABLE `gestion_redes_sociales` (
  `id_gestion` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `plataforma` enum('Facebook','Twitter','Instagram') NOT NULL,
  `contenido_publicacion` text DEFAULT NULL,
  `fecha_publicacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `generado_ia` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hilos_foro`
--

CREATE TABLE `hilos_foro` (
  `id_hilos` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_publicaciones` int(11) DEFAULT NULL,
  `comentario` varchar(255) DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen_publicacion`
--

CREATE TABLE `imagen_publicacion` (
  `id_imagen` int(11) NOT NULL,
  `id_post` int(11) DEFAULT NULL,
  `url_imagen` varchar(255) DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagen_publicacion`
--

INSERT INTO `imagen_publicacion` (`id_imagen`, `id_post`, `url_imagen`, `tiempo_creacion`) VALUES
(1, NULL, 'https://assets.adidas.com/images/w_600,f_auto,q_auto/02cd9a97ce874d89ba17ae2b003ebe50_9366/Zapatillas_adidas_Grand_Court_Lifestyle_para_Tenis_con_Cordones_Blanco_GW6511_01_standard.jpg', '2024-10-30 23:15:15'),
(2, NULL, 'https://chilecultura.gob.cl/uploads/cropped_SOTkYrh.png', '2024-10-31 20:00:11'),
(3, NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSCdX3pVcKLUyQ511oyaDDufnC9apP-5nwQ&s', '2024-10-31 20:09:44'),
(4, NULL, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/17113173_1/w=800,h=800,fit=pad', '2024-10-31 20:21:37'),
(5, NULL, 'https://2356021.fs1.hubspotusercontent-na1.net/hubfs/2356021/iStock-506514230%20(1).jpg', '2024-10-31 20:31:35'),
(6, NULL, 'https://hairhuntersco.com/cdn/shop/files/p_800x.png?v=1725225888', '2024-11-01 16:26:50'),
(7, NULL, 'https://cdnx.jumpseller.com/catron-el-autentico-traje-de-huaso/image/35717554/resize/1000/1000?1685039134', '2024-11-01 16:44:37'),
(8, NULL, 'https://cdn.milenio.com/uploads/media/2022/02/14/venta-flores-disminuido-pandemia-araceli.jpeg', '2024-11-01 22:11:32'),
(9, NULL, 'https://www.eljardindeamanda.cl/wp-content/uploads/2016/11/ramo-24-rosa.jpg', '2024-11-01 22:16:34'),
(10, NULL, 'https://images.app.goo.gl/cJChz3f9vDDrs3rS9', '2024-11-07 22:38:20'),
(11, NULL, 'https://2356021.fs1.hubspotusercontent-na1.net/hubfs/2356021/iStock-506514230%20(1).jpg', '2024-11-07 22:46:00'),
(12, NULL, 'https://2356021.fs1.hubspotusercontent-na1.net/hubfs/2356021/iStock-506514230%20(1).jpg', '2024-11-07 22:49:04'),
(13, NULL, 'j', '2024-11-17 16:06:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `interacciones`
--

CREATE TABLE `interacciones` (
  `id_interaccion` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `tipo_interaccion` enum('View','Click','Purchase') NOT NULL,
  `fecha_interaccion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `interacciones`
--

INSERT INTO `interacciones` (`id_interaccion`, `id_perfil`, `id_producto`, `tipo_interaccion`, `fecha_interaccion`) VALUES
(1, 1, 5, 'Click', '2024-11-17 16:37:49'),
(2, 1, NULL, 'View', '2024-11-17 17:08:55'),
(3, 2, NULL, 'View', '2024-11-17 17:09:16'),
(4, 1, 5, 'Click', '2024-11-17 17:09:55'),
(5, 3, 11, 'Click', '2024-11-17 17:10:09'),
(6, 1, NULL, 'View', '2024-11-18 18:43:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metricas`
--

CREATE TABLE `metricas` (
  `id_metricas` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `tipo_metrica` enum('visitas','ventas') NOT NULL,
  `intervalo` enum('diarias','semanales','mensuales') NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 0,
  `producto_mas_vendido` varchar(255) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `metricas`
--

INSERT INTO `metricas` (`id_metricas`, `id_perfil`, `tipo_metrica`, `intervalo`, `cantidad`, `producto_mas_vendido`, `fecha_creacion`) VALUES
(2, 4, 'visitas', 'diarias', 150, 'Producto XYZ', '2024-11-14 12:47:10'),
(3, 4, 'visitas', 'semanales', 950, 'Producto XYZ', '2024-11-14 12:47:10'),
(4, 4, 'visitas', 'mensuales', 3500, 'Producto XYZ', '2024-11-14 12:47:10'),
(5, 4, 'ventas', 'diarias', 20, 'Producto XYZ', '2024-11-14 12:47:10'),
(6, 4, 'ventas', 'semanales', 120, 'Producto XYZ', '2024-11-14 12:47:10'),
(7, 4, 'ventas', 'mensuales', 450, 'Producto XYZ', '2024-11-14 12:47:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id_notificacion` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `titulo` varchar(50) DEFAULT NULL,
  `texto_notificacion` text DEFAULT NULL,
  `tipo_notificacion` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `fecha_programada` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `tiempo_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_negocio`
--

CREATE TABLE `perfil_negocio` (
  `id_perfil` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_imagen` int(11) DEFAULT NULL,
  `nombre_negocio` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `sitioweb_url` varchar(255) DEFAULT NULL,
  `tipo_perfil` enum('Free','Premium') DEFAULT 'Free',
  `id_foro` int(11) DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil_negocio`
--

INSERT INTO `perfil_negocio` (`id_perfil`, `id_usuario`, `id_imagen`, `nombre_negocio`, `descripcion`, `direccion`, `telefono`, `sitioweb_url`, `tipo_perfil`, `id_foro`, `tiempo_creacion`) VALUES
(1, 9, NULL, 'malumabeiby', NULL, NULL, NULL, NULL, 'Free', NULL, '2024-10-31 20:07:09'),
(2, 10, NULL, 'barbershopking', NULL, NULL, NULL, NULL, 'Free', NULL, '2024-10-31 20:30:09'),
(3, 11, NULL, 'flower', NULL, NULL, NULL, NULL, 'Free', NULL, '2024-11-01 22:09:47'),
(4, 13, NULL, 'Productos de Aseo', 'Somos un emprendimiento que empezó hace poco a entrar en este mundo, queremos hacer un cambio', 'Calle Falsa 123', '+56988888888', NULL, 'Free', NULL, '2024-11-14 12:17:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `id_imagen` int(11) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `id_perfil`, `nombre`, `descripcion`, `id_imagen`, `precio`, `stock`, `tiempo_creacion`) VALUES
(4, 1, 'artesania', 'artesania local echa a mano ', 2, 59990.00, 10, '2024-10-31 20:08:04'),
(5, 1, 'torta', 'torta de chocolate relleno con manjar', 3, 12990.00, 8, '2024-10-31 20:13:04'),
(6, 1, 'Notebook HP Victus ', ' Notebook gamer procesador i7°13Genreacion 8Gb RAM 512 SSD', 4, 899990.00, 5, '2024-10-31 20:25:07'),
(7, 2, 'babershopking', 'cortes de pelo y perfilado de barba en la mejor barberia de rancagua', 5, 10000.00, 0, '2024-10-31 20:36:03'),
(8, 2, 'insumos barbershop', 'insumos de barberia  los mejores a muy buen precio ', 6, 19990.00, 20, '2024-11-01 16:30:03'),
(9, 1, 'Poncho de Huaso', 'poncho de huaso echo a mano artesania regional ', 7, 32990.00, 5, '2024-11-01 16:46:40'),
(10, 3, 'flores ', 'L as flores mas exlcusivas y hermosas de la ciudad ', 8, 15990.00, 22, '2024-11-01 22:13:24'),
(11, 3, 'rosas', 'rosas rojas para el dia del amor', 9, 10000.00, 25, '2024-11-01 22:18:04'),
(25, 1, 'sdg', 'gsdgs', NULL, 2442.00, 1, '2024-11-02 19:40:46'),
(26, 1, 'sdg', 'gsdgs', NULL, 2442.00, 1, '2024-11-02 19:40:47'),
(27, 1, 'sdg', 'gsdgs', NULL, 2442.00, 1, '2024-11-02 19:41:00'),
(28, 1, 'sdg', 'gsdgs', NULL, 2442.00, 1, '2024-11-02 19:41:08'),
(29, 1, 'sdgs', 'sdgs', NULL, 232.00, 1, '2024-11-02 19:42:29'),
(30, 4, 'Producto 1', 'Descripción del producto 1', 9, 1000.00, 10, '2024-11-18 18:43:06'),
(31, 4, 'Producto 2', 'Descripción del producto 2', 9, 2000.00, 5, '2024-11-18 18:43:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promociones`
--

CREATE TABLE `promociones` (
  `id_promocion` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_termino` date NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones_foro`
--

CREATE TABLE `publicaciones_foro` (
  `id_publicaciones` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_imagen` int(11) DEFAULT NULL,
  `id_foro` int(11) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicaciones_foro`
--

INSERT INTO `publicaciones_foro` (`id_publicaciones`, `id_usuario`, `id_imagen`, `id_foro`, `titulo`, `descripcion`, `tiempo_creacion`) VALUES
(5, 1, NULL, 1, 'hola', 'ssfsf', '2024-11-07 21:40:49'),
(6, 1, NULL, 1, 'hd', 'df', '2024-11-07 21:41:42'),
(7, 1, NULL, 8, 'hhh', 'hh', '2024-11-07 21:58:41'),
(8, 1, 9, 6, 'Busco trabajador', 'no venecos', '2024-11-07 22:43:41'),
(9, 1, NULL, 1, 'dd', 'd', '2024-11-07 22:07:55'),
(10, 1, NULL, 6, 'Busco una colaboracion de comida', 'Tengo un restaurante en santiago', '2024-11-07 22:14:26'),
(11, 1, NULL, 3, 'ff', 'ff', '2024-11-07 22:25:56'),
(12, 1, 10, 2, 'ff', 'hola', '2024-11-07 22:38:20'),
(13, 1, 11, 4, 'prueba', 'hola', '2024-11-07 22:46:00'),
(14, 1, 12, 2, 'hola', 'dfs', '2024-11-07 22:49:04'),
(15, 1, 13, 8, 'hola', 'adfafa', '2024-11-17 16:06:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `tipo_usuario` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `usuario_imagen` varchar(255) DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `tipo_usuario`, `email`, `contraseña`, `usuario_imagen`, `tiempo_creacion`) VALUES
(1, 'usuario', 'user', 'usuario@example.com', '12345', NULL, '2024-11-02 22:16:23'),
(3, 'malumaaaa', 'user', 'malumaweko@gmail.com', '1345', NULL, '2024-10-29 00:19:25'),
(6, 'hola', 'user', 'hola@gmail.com', 'hola', NULL, '2024-10-30 03:34:43'),
(7, 'eric', 'user', 'eric@gmail.com', 'eric', NULL, '2024-10-30 22:21:00'),
(8, 'xd', 'emprendedor', 'x@x.x', '123', NULL, '2024-10-31 21:35:24'),
(9, 'malumabeiby', 'emprendedor', 'm1@gmail.com', '12345', NULL, '2024-10-31 23:07:09'),
(10, 'barbershopking', 'emprendedor', 'barber@xd.cl', '54321', NULL, '2024-10-31 23:30:09'),
(11, 'flower', 'emprendedor', 'flower@xd.com', '12345', NULL, '2024-11-02 01:09:47'),
(12, 'holaaa', 'user', 'wenas@gmail.com', 'wenas', NULL, '2024-11-02 22:16:23'),
(13, 'Productos de Aseo', 'emprendedor', 'emp@gmailcom', '1234', 'https://images.app.goo.gl/exYe2AVrc3PpwKtZ7', '2024-11-14 15:17:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visibilidad_busqueda`
--

CREATE TABLE `visibilidad_busqueda` (
  `id_visibilidad` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `nivel_visibilidad` enum('Basic','Enhanced') DEFAULT 'Basic'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id_compra`),
  ADD KEY `id_documento` (`id_documento`),
  ADD KEY `id_envio` (`id_envio`),
  ADD KEY `id_carrito` (`id_carrito`);

--
-- Indices de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_compra` (`id_compra`);

--
-- Indices de la tabla `documento`
--
ALTER TABLE `documento`
  ADD PRIMARY KEY (`id_documento`);

--
-- Indices de la tabla `envio`
--
ALTER TABLE `envio`
  ADD PRIMARY KEY (`id_envio`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id_favorito`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `foro`
--
ALTER TABLE `foro`
  ADD PRIMARY KEY (`id_foro`),
  ADD KEY `id_admin` (`id_admin`);

--
-- Indices de la tabla `gestion_redes_sociales`
--
ALTER TABLE `gestion_redes_sociales`
  ADD PRIMARY KEY (`id_gestion`),
  ADD KEY `profile_id` (`id_perfil`);

--
-- Indices de la tabla `hilos_foro`
--
ALTER TABLE `hilos_foro`
  ADD PRIMARY KEY (`id_hilos`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_publicaciones` (`id_publicaciones`);

--
-- Indices de la tabla `imagen_publicacion`
--
ALTER TABLE `imagen_publicacion`
  ADD PRIMARY KEY (`id_imagen`);

--
-- Indices de la tabla `interacciones`
--
ALTER TABLE `interacciones`
  ADD PRIMARY KEY (`id_interaccion`),
  ADD KEY `profile_id` (`id_perfil`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `metricas`
--
ALTER TABLE `metricas`
  ADD PRIMARY KEY (`id_metricas`),
  ADD KEY `fk_perfil_negocio` (`id_perfil`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id_notificacion`),
  ADD KEY `user_id` (`id_usuario`);

--
-- Indices de la tabla `perfil_negocio`
--
ALTER TABLE `perfil_negocio`
  ADD PRIMARY KEY (`id_perfil`),
  ADD KEY `user_id` (`id_usuario`),
  ADD KEY `id_foro` (`id_foro`),
  ADD KEY `id_imagen` (`id_imagen`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `profile_id` (`id_perfil`),
  ADD KEY `id_imagen` (`id_imagen`);

--
-- Indices de la tabla `promociones`
--
ALTER TABLE `promociones`
  ADD PRIMARY KEY (`id_promocion`),
  ADD KEY `profile_id` (`id_perfil`);

--
-- Indices de la tabla `publicaciones_foro`
--
ALTER TABLE `publicaciones_foro`
  ADD PRIMARY KEY (`id_publicaciones`),
  ADD KEY `id_imagen` (`id_imagen`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_foro` (`id_foro`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `visibilidad_busqueda`
--
ALTER TABLE `visibilidad_busqueda`
  ADD PRIMARY KEY (`id_visibilidad`),
  ADD KEY `profile_id` (`id_perfil`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id_compra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `documento`
--
ALTER TABLE `documento`
  MODIFY `id_documento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `envio`
--
ALTER TABLE `envio`
  MODIFY `id_envio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id_favorito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `foro`
--
ALTER TABLE `foro`
  MODIFY `id_foro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `gestion_redes_sociales`
--
ALTER TABLE `gestion_redes_sociales`
  MODIFY `id_gestion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `hilos_foro`
--
ALTER TABLE `hilos_foro`
  MODIFY `id_hilos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `imagen_publicacion`
--
ALTER TABLE `imagen_publicacion`
  MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `interacciones`
--
ALTER TABLE `interacciones`
  MODIFY `id_interaccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `metricas`
--
ALTER TABLE `metricas`
  MODIFY `id_metricas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id_notificacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perfil_negocio`
--
ALTER TABLE `perfil_negocio`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `promociones`
--
ALTER TABLE `promociones`
  MODIFY `id_promocion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publicaciones_foro`
--
ALTER TABLE `publicaciones_foro`
  MODIFY `id_publicaciones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `visibilidad_busqueda`
--
ALTER TABLE `visibilidad_busqueda`
  MODIFY `id_visibilidad` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`id_envio`) REFERENCES `envio` (`id_envio`),
  ADD CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`id_documento`) REFERENCES `documento` (`id_documento`),
  ADD CONSTRAINT `compra_ibfk_3` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id_carrito`);

--
-- Filtros para la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD CONSTRAINT `detalle_compra_ibfk_1` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id_compra`);

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `foro`
--
ALTER TABLE `foro`
  ADD CONSTRAINT `foro_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`);

--
-- Filtros para la tabla `gestion_redes_sociales`
--
ALTER TABLE `gestion_redes_sociales`
  ADD CONSTRAINT `gestion_redes_sociales_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`);

--
-- Filtros para la tabla `hilos_foro`
--
ALTER TABLE `hilos_foro`
  ADD CONSTRAINT `hilos_foro_ibfk_1` FOREIGN KEY (`id_publicaciones`) REFERENCES `publicaciones_foro` (`id_publicaciones`);

--
-- Filtros para la tabla `interacciones`
--
ALTER TABLE `interacciones`
  ADD CONSTRAINT `interacciones_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`),
  ADD CONSTRAINT `interacciones_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `metricas`
--
ALTER TABLE `metricas`
  ADD CONSTRAINT `fk_perfil_negocio` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`);

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `perfil_negocio`
--
ALTER TABLE `perfil_negocio`
  ADD CONSTRAINT `perfil_negocio_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `perfil_negocio_ibfk_3` FOREIGN KEY (`id_foro`) REFERENCES `foro` (`id_foro`),
  ADD CONSTRAINT `perfil_negocio_ibfk_4` FOREIGN KEY (`id_imagen`) REFERENCES `imagen_publicacion` (`id_imagen`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`),
  ADD CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`id_imagen`) REFERENCES `imagen_publicacion` (`id_imagen`);

--
-- Filtros para la tabla `promociones`
--
ALTER TABLE `promociones`
  ADD CONSTRAINT `promociones_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`);

--
-- Filtros para la tabla `publicaciones_foro`
--
ALTER TABLE `publicaciones_foro`
  ADD CONSTRAINT `publicaciones_foro_ibfk_1` FOREIGN KEY (`id_imagen`) REFERENCES `imagen_publicacion` (`id_imagen`),
  ADD CONSTRAINT `publicaciones_foro_ibfk_2` FOREIGN KEY (`id_foro`) REFERENCES `foro` (`id_foro`);

--
-- Filtros para la tabla `visibilidad_busqueda`
--
ALTER TABLE `visibilidad_busqueda`
  ADD CONSTRAINT `visibilidad_busqueda_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
