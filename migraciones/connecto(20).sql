-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-12-2024 a las 01:59:34
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
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `id_compra` int(11) NOT NULL,
  `id_documento` int(11) DEFAULT NULL,
  `id_envio` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `detalle` varchar(255) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`id_compra`, `id_documento`, `id_envio`, `id_usuario`, `detalle`, `cantidad`, `estado`, `total`, `fecha_creacion`) VALUES
(1, 5, 5, NULL, 'Compra de productos', 1, 1, 2000, '2024-11-30 01:18:23'),
(2, 6, 6, NULL, 'Compra de productos', 1, 1, 2000, '2024-11-30 01:18:59'),
(3, 7, 7, 11, 'Compra de productos', 1, 1, 2000, '2024-11-30 01:24:26'),
(4, 8, 8, 12, 'Compra de productos', 1, 1, 4000, '2024-12-03 01:24:55'),
(5, 9, 9, 12, 'Compra de productos', 1, 1, 4000, '2024-12-03 01:29:34'),
(6, 10, 10, 12, 'Compra de productos', 1, 1, 4000, '2024-12-03 01:33:32'),
(7, 11, 11, 12, 'Compra de productos', 1, 1, 4000, '2024-12-03 01:45:11'),
(8, 12, 12, 12, 'Compra de productos', 1, 1, 4000, '2024-12-03 01:48:22'),
(9, 13, 13, 12, 'Compra de productos', 1, 1, 4000, '2024-12-03 01:49:52'),
(10, 14, 14, 12, 'Compra de productos', 1, 1, 8000, '2024-12-03 01:51:18'),
(11, 15, 15, 12, 'Compra de productos', 1, 1, 8000, '2024-12-03 02:05:26'),
(12, 16, 16, 7, 'Compra de productos', 1, 1, 2000, '2024-12-03 18:15:35'),
(13, 17, 17, 11, 'Compra de productos', 1, 1, 6000, '2024-12-05 19:05:57'),
(14, 18, 18, 11, 'Compra de productos', 3, 1, 111980, '2024-12-05 19:07:15'),
(15, 19, 19, 12, 'Compra de productos', 1, 1, 6990, '2024-12-05 22:54:33'),
(16, 20, 20, 12, 'Compra de productos', 3, 1, 33970, '2024-12-11 20:44:34'),
(17, 21, 21, 12, 'Compra de productos', 5, 1, 465910, '2024-12-12 04:34:45'),
(18, 22, 22, 12, 'Compra de productos', 3, 1, 38980, '2024-12-16 01:06:58'),
(19, 23, 23, 12, 'Compra de productos', 4, 1, 40980, '2024-12-16 02:06:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conversaciones`
--

CREATE TABLE `conversaciones` (
  `id_conversacion` int(11) NOT NULL,
  `nombre_conversacion` varchar(255) NOT NULL,
  `id_usuario1` int(11) NOT NULL,
  `id_usuario2` int(11) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `conversaciones`
--

INSERT INTO `conversaciones` (`id_conversacion`, `nombre_conversacion`, `id_usuario1`, `id_usuario2`, `fecha_creacion`) VALUES
(1, 'Chat entre 7 y 9', 7, 9, '2024-11-26 01:21:51'),
(2, 'Chat entre 7 y 11', 7, 11, '2024-11-26 19:31:42'),
(3, 'Chat entre 9 y 9', 9, 9, '2024-11-26 19:52:09'),
(4, 'Chat entre 7 y 10', 7, 10, '2024-11-26 20:22:47'),
(5, 'Chat entre 11 y 9', 11, 9, '2024-11-29 22:41:29'),
(6, 'Chat entre 11 y 11', 11, 11, '2024-11-30 00:05:12'),
(7, 'Chat entre 12 y 9', 12, 9, '2024-12-03 01:31:05'),
(8, 'Chat entre 12 y 11', 12, 11, '2024-12-05 22:40:29'),
(9, 'Chat entre 9 y 13', 9, 13, '2024-12-12 04:33:48'),
(10, 'Chat entre 11 y 10', 11, 10, '2024-12-16 01:08:53'),
(11, 'Chat entre 12 y 10', 12, 10, '2024-12-16 02:05:35');

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

--
-- Volcado de datos para la tabla `detalle_compra`
--

INSERT INTO `detalle_compra` (`id_detalle`, `id_compra`, `cantidad`, `precio_unitario`, `subtotal`, `total_sin_iva`, `iva`, `total_con_iva`) VALUES
(1, 1, 1, 2000.00, 2000.00, 2000.00, 380.00, 2380.00),
(2, 2, 1, 2000.00, 2000.00, 2000.00, 380.00, 2380.00),
(3, 3, 1, 2000.00, 2000.00, 2000.00, 380.00, 2380.00),
(4, 4, 2, 2000.00, 4000.00, 4000.00, 760.00, 4760.00),
(5, 5, 2, 2000.00, 4000.00, 4000.00, 760.00, 4760.00),
(6, 6, 2, 2000.00, 4000.00, 4000.00, 760.00, 4760.00),
(7, 7, 2, 2000.00, 4000.00, 4000.00, 760.00, 4760.00),
(8, 8, 2, 2000.00, 4000.00, 4000.00, 760.00, 4760.00),
(9, 9, 2, 2000.00, 4000.00, 4000.00, 760.00, 4760.00),
(10, 10, 4, 2000.00, 8000.00, 8000.00, 1520.00, 9520.00),
(11, 11, 4, 2000.00, 8000.00, 8000.00, 1520.00, 9520.00),
(12, 12, 1, 2000.00, 2000.00, 2000.00, 380.00, 2380.00),
(13, 13, 3, 2000.00, 6000.00, 6000.00, 1140.00, 7140.00),
(14, 14, 3, 2000.00, 6000.00, 6000.00, 1140.00, 7140.00),
(15, 14, 1, 99990.00, 99990.00, 99990.00, 18998.10, 118988.10),
(16, 14, 1, 5990.00, 5990.00, 5990.00, 1138.10, 7128.10),
(17, 15, 1, 6990.00, 6990.00, 6990.00, 1328.10, 8318.10),
(18, 16, 2, 12990.00, 25980.00, 25980.00, 4936.20, 30916.20),
(19, 16, 1, 5990.00, 5990.00, 5990.00, 1138.10, 7128.10),
(20, 16, 1, 2000.00, 2000.00, 2000.00, 380.00, 2380.00),
(21, 17, 1, 20000.00, 20000.00, 20000.00, 3800.00, 23800.00),
(22, 17, 2, 12990.00, 25980.00, 25980.00, 4936.20, 30916.20),
(23, 17, 4, 99990.00, 399960.00, 399960.00, 75992.40, 475952.40),
(24, 17, 1, 5990.00, 5990.00, 5990.00, 1138.10, 7128.10),
(25, 17, 2, 6990.00, 13980.00, 13980.00, 2656.20, 16636.20),
(26, 18, 1, 20000.00, 20000.00, 20000.00, 3800.00, 23800.00),
(27, 18, 1, 5990.00, 5990.00, 5990.00, 1138.10, 7128.10),
(28, 18, 1, 12990.00, 12990.00, 12990.00, 2468.10, 15458.10),
(29, 19, 1, 20000.00, 20000.00, 20000.00, 3800.00, 23800.00),
(30, 19, 1, 5990.00, 5990.00, 5990.00, 1138.10, 7128.10),
(31, 19, 1, 12990.00, 12990.00, 12990.00, 2468.10, 15458.10),
(32, 19, 1, 2000.00, 2000.00, 2000.00, 380.00, 2380.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento`
--

CREATE TABLE `documento` (
  `id_documento` int(11) NOT NULL,
  `tipo_documento` enum('Boleta,Factura') DEFAULT NULL,
  `tipo_pago` enum('Debito,Credito') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `documento`
--

INSERT INTO `documento` (`id_documento`, `tipo_documento`, `tipo_pago`) VALUES
(1, NULL, NULL),
(2, NULL, NULL),
(3, NULL, NULL),
(4, NULL, NULL),
(5, NULL, NULL),
(6, NULL, NULL),
(7, NULL, NULL),
(8, NULL, NULL),
(9, NULL, NULL),
(10, NULL, NULL),
(11, NULL, NULL),
(12, NULL, NULL),
(13, NULL, NULL),
(14, NULL, NULL),
(15, NULL, NULL),
(16, NULL, NULL),
(17, NULL, NULL),
(18, NULL, NULL),
(19, NULL, NULL),
(20, NULL, NULL),
(21, NULL, NULL),
(22, NULL, NULL),
(23, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrepreneur_reviews`
--

CREATE TABLE `entrepreneur_reviews` (
  `id_review` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_emprendedor` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `calificacion` int(11) NOT NULL CHECK (`calificacion` between 1 and 5),
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entrepreneur_reviews`
--

INSERT INTO `entrepreneur_reviews` (`id_review`, `id_usuario`, `id_emprendedor`, `comentario`, `calificacion`, `fecha_creacion`) VALUES
(1, 12, 2, 'lol', 2, '2024-12-16 02:05:43');

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

--
-- Volcado de datos para la tabla `envio`
--

INSERT INTO `envio` (`id_envio`, `direccion`, `destinatario`, `remitente`, `tiempo_estimado`, `valor`, `tiempo_llegada`, `fecha_creacion`) VALUES
(1, NULL, NULL, NULL, '2024-11-30 01:15:33', NULL, NULL, NULL),
(2, NULL, NULL, NULL, '2024-11-30 01:16:11', NULL, NULL, NULL),
(3, NULL, NULL, NULL, '2024-11-30 01:16:17', NULL, NULL, NULL),
(4, NULL, NULL, NULL, '2024-11-30 01:17:11', NULL, NULL, NULL),
(5, NULL, NULL, NULL, '2024-11-30 01:18:23', NULL, NULL, NULL),
(6, NULL, NULL, NULL, '2024-11-30 01:18:59', NULL, NULL, NULL),
(7, NULL, NULL, NULL, '2024-11-30 01:24:26', NULL, NULL, NULL),
(8, NULL, NULL, NULL, '2024-12-03 01:24:55', NULL, NULL, NULL),
(9, NULL, NULL, NULL, '2024-12-03 01:29:34', NULL, NULL, NULL),
(10, NULL, NULL, NULL, '2024-12-03 01:33:32', NULL, NULL, NULL),
(11, NULL, NULL, NULL, '2024-12-03 01:45:11', NULL, NULL, NULL),
(12, NULL, NULL, NULL, '2024-12-03 01:48:22', NULL, NULL, NULL),
(13, NULL, NULL, NULL, '2024-12-03 01:49:52', NULL, NULL, NULL),
(14, NULL, NULL, NULL, '2024-12-03 01:51:18', NULL, NULL, NULL),
(15, NULL, NULL, NULL, '2024-12-03 02:05:26', NULL, NULL, NULL),
(16, NULL, NULL, NULL, '2024-12-03 18:15:35', NULL, NULL, NULL),
(17, NULL, NULL, NULL, '2024-12-05 19:05:57', NULL, NULL, NULL),
(18, NULL, NULL, NULL, '2024-12-05 19:07:15', NULL, NULL, NULL),
(19, NULL, NULL, NULL, '2024-12-05 22:54:33', NULL, NULL, NULL),
(20, NULL, NULL, NULL, '2024-12-11 20:44:34', NULL, NULL, NULL),
(21, NULL, NULL, NULL, '2024-12-12 04:34:45', NULL, NULL, NULL),
(22, NULL, NULL, NULL, '2024-12-16 01:06:58', NULL, NULL, NULL),
(23, NULL, NULL, NULL, '2024-12-16 02:06:53', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favemprendedor`
--

CREATE TABLE `favemprendedor` (
  `id_favorito` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_negocio` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favemprendedor`
--

INSERT INTO `favemprendedor` (`id_favorito`, `id_usuario`, `id_negocio`, `fecha_creacion`) VALUES
(1, 7, 1, '2024-11-27 22:31:44'),
(3, 7, 2, '2024-11-27 23:02:04'),
(4, 12, 2, '2024-12-16 02:05:47');

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
(24, 11, 35, '2024-11-30 00:22:53'),
(25, 11, 35, '2024-11-30 01:11:18'),
(26, 9, 36, '2024-12-12 04:30:29'),
(27, 12, 36, '2024-12-16 02:04:45');

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
-- Estructura de tabla para la tabla `hilos_foro`
--

CREATE TABLE `hilos_foro` (
  `id_hilos` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
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
  `id_publicaciones` int(11) DEFAULT NULL,
  `url_imagen` varchar(255) DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagen_publicacion`
--

INSERT INTO `imagen_publicacion` (`id_imagen`, `id_publicaciones`, `url_imagen`, `tiempo_creacion`) VALUES
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
(13, NULL, 'j', '2024-11-17 16:06:09'),
(14, NULL, 'https://yt3.googleusercontent.com/ytc/AIdro_nQDRMfNCBCUumCBMlgwAwrVCNYZPmI6wnUME9B5EmxYNY=s900-c-k-c0x00ffffff-no-rj', '2024-11-19 17:53:29'),
(15, NULL, 'https://elcomercio.pe/resizer/5oYD1gjh8HJ9bkviH3ODRHD448Q=/1200x800/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/CLVESG4AJRFX3E7TRTJI45R2MQ.jpg', '2024-11-19 23:58:38'),
(16, NULL, '/placeholder.webp', '2024-11-20 00:05:49'),
(17, NULL, 'f', '2024-12-06 19:30:47'),
(18, NULL, 'd', '2024-12-06 19:42:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `interacciones`
--

CREATE TABLE `interacciones` (
  `id_interaccion` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `tipo_interaccion` enum('View','Click','Purchase') NOT NULL,
  `fecha_interaccion` timestamp NOT NULL DEFAULT current_timestamp(),
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `interacciones`
--

INSERT INTO `interacciones` (`id_interaccion`, `id_perfil`, `id_producto`, `tipo_interaccion`, `fecha_interaccion`, `cantidad`) VALUES
(2, 1, NULL, 'View', '2024-11-17 17:08:55', NULL),
(3, 2, NULL, 'View', '2024-11-17 17:09:16', NULL),
(6, 1, NULL, 'View', '2024-11-18 18:43:06', NULL),
(20, 4, NULL, 'View', '2024-11-19 18:06:39', NULL),
(21, 1, NULL, 'View', '2024-11-19 22:53:20', NULL),
(22, 1, NULL, 'View', '2024-11-19 23:01:01', NULL),
(26, 1, NULL, 'View', '2024-11-20 00:04:52', NULL),
(30, 1, NULL, 'View', '2024-11-22 22:04:26', NULL),
(31, 1, NULL, 'View', '2024-11-26 01:01:28', NULL),
(32, 1, NULL, 'View', '2024-11-26 01:18:10', NULL),
(33, 1, NULL, 'View', '2024-11-26 01:28:39', NULL),
(34, 1, NULL, 'View', '2024-11-26 02:37:23', NULL),
(36, 3, NULL, 'View', '2024-11-26 19:31:41', NULL),
(37, 1, NULL, 'View', '2024-11-26 19:52:08', NULL),
(38, 3, NULL, 'View', '2024-11-26 20:20:35', NULL),
(39, 2, NULL, 'View', '2024-11-26 20:22:46', NULL),
(40, 1, NULL, 'View', '2024-11-26 20:22:53', NULL),
(41, 1, NULL, 'View', '2024-11-27 21:35:47', NULL),
(42, 1, NULL, 'View', '2024-11-27 22:31:04', NULL),
(43, 3, NULL, 'View', '2024-11-27 22:51:11', NULL),
(44, 3, NULL, 'View', '2024-11-27 22:56:43', NULL),
(45, 2, NULL, 'View', '2024-11-27 23:00:44', NULL),
(46, 1, NULL, 'View', '2024-11-29 22:41:28', NULL),
(47, 3, 35, 'Click', '2024-11-30 00:37:48', NULL),
(48, 3, 35, 'Click', '2024-11-30 00:46:48', NULL),
(50, 3, 35, 'Click', '2024-11-30 01:15:19', NULL),
(53, 1, NULL, 'View', '2024-12-03 01:31:01', NULL),
(55, 3, 35, 'Purchase', '2024-12-05 19:05:57', 3),
(56, 3, NULL, 'View', '2024-12-05 19:06:17', NULL),
(57, 2, 37, 'Click', '2024-12-05 19:06:40', NULL),
(58, 2, 36, 'Click', '2024-12-05 19:06:57', NULL),
(59, 3, 35, 'Purchase', '2024-12-05 19:07:15', 3),
(60, 2, 37, 'Purchase', '2024-12-05 19:07:15', 1),
(61, 2, 36, 'Purchase', '2024-12-05 19:07:15', 1),
(62, 3, NULL, 'View', '2024-12-05 22:40:23', NULL),
(63, 3, NULL, 'View', '2024-12-05 22:40:24', NULL),
(64, 3, NULL, 'View', '2024-12-05 22:46:31', NULL),
(65, 3, 47, 'Click', '2024-12-05 22:53:57', NULL),
(66, 3, 47, 'Click', '2024-12-05 22:54:16', NULL),
(67, 3, 47, 'Purchase', '2024-12-05 22:54:33', 1),
(68, 2, 37, 'Click', '2024-12-06 01:28:37', NULL),
(69, 2, 37, 'Click', '2024-12-06 01:30:17', NULL),
(70, 2, 37, 'Click', '2024-12-06 01:30:18', NULL),
(71, 2, 36, 'Click', '2024-12-06 01:30:20', NULL),
(72, 2, 37, 'Click', '2024-12-06 01:31:01', NULL),
(73, 1, 42, 'Purchase', '2024-12-11 20:44:34', 2),
(74, 2, 36, 'Purchase', '2024-12-11 20:44:34', 1),
(75, 3, 35, 'Purchase', '2024-12-11 20:44:34', 1),
(76, 2, 38, 'Click', '2024-12-12 03:39:51', NULL),
(77, 2, 37, 'Click', '2024-12-12 03:39:53', NULL),
(78, 2, 37, 'Click', '2024-12-12 03:41:39', NULL),
(79, 2, 36, 'Click', '2024-12-12 03:41:39', NULL),
(80, 2, 36, 'Click', '2024-12-12 03:41:57', NULL),
(81, 3, 35, 'Click', '2024-12-12 03:42:04', NULL),
(82, 1, 42, 'Click', '2024-12-12 03:42:20', NULL),
(83, 1, 43, 'Click', '2024-12-12 03:44:43', NULL),
(84, 3, 47, 'Click', '2024-12-12 03:45:05', NULL),
(85, 2, 37, 'Click', '2024-12-12 03:53:25', NULL),
(86, 2, 36, 'Click', '2024-12-12 03:53:25', NULL),
(87, 3, 35, 'Click', '2024-12-12 03:55:00', NULL),
(88, 2, 36, 'Click', '2024-12-12 03:55:00', NULL),
(89, 2, 37, 'Click', '2024-12-12 03:55:01', NULL),
(90, 3, 35, 'Click', '2024-12-12 03:55:33', NULL),
(91, 2, 36, 'Click', '2024-12-12 03:55:33', NULL),
(92, 1, 42, 'Click', '2024-12-12 03:55:36', NULL),
(93, 2, 38, 'Click', '2024-12-12 03:56:35', NULL),
(94, 2, 37, 'Click', '2024-12-12 03:56:35', NULL),
(95, 2, 37, 'Click', '2024-12-12 03:57:12', NULL),
(96, 2, 36, 'Click', '2024-12-12 03:57:13', NULL),
(97, 3, 35, 'Click', '2024-12-12 03:58:31', NULL),
(98, 2, 37, 'Click', '2024-12-12 03:59:54', NULL),
(99, 2, 36, 'Click', '2024-12-12 03:59:54', NULL),
(100, 3, 35, 'Click', '2024-12-12 04:02:37', NULL),
(101, 2, 36, 'Click', '2024-12-12 04:05:56', NULL),
(102, 1, 43, 'Click', '2024-12-12 04:05:58', NULL),
(103, 1, 44, 'Click', '2024-12-12 04:08:42', NULL),
(104, 3, 47, 'Click', '2024-12-12 04:09:32', NULL),
(105, 4, 46, 'Click', '2024-12-12 04:10:47', NULL),
(106, 4, 45, 'Click', '2024-12-12 04:11:10', NULL),
(107, 1, 42, 'Click', '2024-12-12 04:21:54', NULL),
(108, 3, 35, 'Click', '2024-12-12 04:22:13', NULL),
(109, 1, 44, 'Click', '2024-12-12 04:27:29', NULL),
(110, 2, 37, 'Click', '2024-12-12 04:30:04', NULL),
(111, 1, 43, 'Click', '2024-12-12 04:30:20', NULL),
(112, 2, 37, 'Click', '2024-12-12 04:30:38', NULL),
(113, 2, 37, 'Click', '2024-12-12 04:30:39', NULL),
(114, 2, 37, 'Click', '2024-12-12 04:30:39', NULL),
(115, 2, 37, 'Click', '2024-12-12 04:30:40', NULL),
(116, 2, 37, 'Click', '2024-12-12 04:30:40', NULL),
(117, 2, 36, 'Click', '2024-12-12 04:33:53', NULL),
(118, 4, 45, 'Click', '2024-12-12 04:33:58', NULL),
(119, 3, 47, 'Purchase', '2024-12-12 04:34:45', 2),
(120, 1, 42, 'Purchase', '2024-12-12 04:34:45', 2),
(121, 2, 37, 'Purchase', '2024-12-12 04:34:45', 4),
(122, 2, 36, 'Purchase', '2024-12-12 04:34:45', 1),
(123, 4, 45, 'Purchase', '2024-12-12 04:34:45', 1),
(124, 2, 36, 'Click', '2024-12-13 21:39:04', NULL),
(125, 1, 42, 'Click', '2024-12-16 01:06:48', NULL),
(126, 4, 45, 'Purchase', '2024-12-16 01:06:58', 1),
(127, 2, 36, 'Purchase', '2024-12-16 01:06:58', 1),
(128, 1, 42, 'Purchase', '2024-12-16 01:06:58', 1),
(129, 3, 35, 'Click', '2024-12-16 02:06:26', NULL),
(130, 4, 45, 'Purchase', '2024-12-16 02:06:53', 1),
(131, 2, 36, 'Purchase', '2024-12-16 02:06:53', 1),
(132, 1, 42, 'Purchase', '2024-12-16 02:06:53', 1),
(133, 3, 35, 'Purchase', '2024-12-16 02:06:53', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id_mensaje` int(11) NOT NULL,
  `id_conversacion` int(11) NOT NULL,
  `id_remitente` int(11) NOT NULL,
  `id_destinatario` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `leido` tinyint(1) DEFAULT 0,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id_mensaje`, `id_conversacion`, `id_remitente`, `id_destinatario`, `contenido`, `leido`, `fecha_envio`) VALUES
(1, 1, 7, 9, 'xd', 0, '2024-11-26 01:21:56'),
(2, 1, 7, 9, 'xd', 0, '2024-11-26 01:25:25'),
(3, 1, 7, 9, 'xd', 0, '2024-11-26 01:31:44'),
(4, 1, 7, 9, 'hola', 0, '2024-11-26 01:44:54'),
(5, 1, 7, 9, 'hola', 0, '2024-11-26 01:46:18'),
(6, 1, 7, 9, 'xd', 0, '2024-11-26 01:49:26'),
(7, 1, 9, 9, 'hola', 0, '2024-11-26 02:27:13'),
(8, 1, 7, 9, 'xd', 0, '2024-11-26 19:21:19'),
(9, 1, 7, 9, 'buenas', 0, '2024-11-26 19:24:11'),
(10, 11, 12, 10, 'hola necesito ayuda', 0, '2024-12-16 02:05:58');

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
(1, 9, NULL, 'malumabeiby', 'el mejor', 'Chuchuncocity 339', '975122121', 'gentecomunicaciones.cl', 'Free', NULL, '2024-10-31 20:07:09'),
(2, 10, NULL, 'barbershopking', NULL, NULL, NULL, NULL, 'Free', NULL, '2024-10-31 20:30:09'),
(3, 11, NULL, 'flower', 'tienda de flores', NULL, NULL, NULL, 'Free', NULL, '2024-11-01 22:09:47'),
(4, 13, NULL, 'Productos de Aseo', 'Somos un emprendimiento que empezó hace poco a entrar en este mundo, queremos hacer un cambio', 'Calle Falsa 123', '+56988888888', NULL, 'Free', NULL, '2024-11-14 12:17:02'),
(5, 15, NULL, 'xddd', NULL, NULL, NULL, NULL, 'Free', NULL, '2024-11-19 23:40:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `id_perfil`, `nombre`, `descripcion`, `precio`, `stock`, `tiempo_creacion`) VALUES
(35, 3, 'claveles', 'mejore claveles', 2000.00, 19, '2024-11-29 22:59:03'),
(36, 2, 'cera para pelo', 'cera para cabello liso ', 5990.00, 10, '2024-12-03 18:21:35'),
(37, 2, 'wahl', 'maquina para cortar el pelo profesional ...con set de peines..', 99990.00, 0, '2024-12-04 00:51:07'),
(38, 2, 'Insumos de barberia', 'KIT COMBO COMPLETO INICIO INSUMOS BARBERÍA', 29990.00, 20, '2024-12-04 00:57:35'),
(42, 1, 'Tortitas de amorshh', 'Las mejores tortas de la región a pedido.', 12990.00, -1, '2024-12-04 01:23:46'),
(43, 1, 'Pastelitos', 'pastelitos a pedido , baratitos ', 10000.00, 5, '2024-12-04 01:26:51'),
(44, 1, 'wafles', 'wafles para el regal@n ', 5990.00, 11, '2024-12-04 01:31:24'),
(45, 4, 'productos de aseo ', 'Productos de limpieza imprescindibles en el hogar ', 20000.00, 17, '2024-12-04 01:39:17'),
(46, 4, 'Limpieza de auto', 'Productos de limpieza para tu auto, que necesitas.', 10000.00, 8, '2024-12-04 01:45:54'),
(47, 3, 'Rosas', 'Las rosas mas hermosas de la región ', 6990.00, 7, '2024-12-04 01:54:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_imagenes`
--

CREATE TABLE `producto_imagenes` (
  `id_imagen` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `url_imagen` varchar(255) NOT NULL,
  `es_principal` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_imagenes`
--

INSERT INTO `producto_imagenes` (`id_imagen`, `id_producto`, `url_imagen`, `es_principal`) VALUES
(4, 35, 'https://content.elmueble.com/medio/2023/05/23/claveles_8ea9bd65_230523104229_1000x1500.jpg', 0),
(5, 35, 'https://blog.germigarden.com/wp-content/uploads/2022/04/carnation-chinese-3591757_1920-1024x768.jpg', 0),
(6, 35, 'https://blog.germigarden.com/wp-content/uploads/2022/04/carnation-chinese-3591757_1920-1024x768.jpg', 0),
(7, 36, 'https://cdnx.jumpseller.com/casa-del-peluquero1/image/20635159/cera-obopekal-barber-black-200ml.jpg?1657736804', 0),
(8, 36, 'https://sirfausto.cl/cdn/shop/products/oldwaxextrafuerte3.jpg?v=1715704483&width=1500', 0),
(9, 36, 'https://http2.mlstatic.com/D_NQ_NP_879388-MLC77476862048_072024-O.webp', 0),
(10, 37, 'https://cdnx.jumpseller.com/cabellocenter/image/15892170/7FB94044-E450-4B80-BA91-949A19A2A140.jpeg?1643767088', 0),
(11, 37, 'https://cosmetic.cl/cdn/shop/products/1_b368fcb1-4b11-4f71-9958-9ea0dab9db92_800x.png?v=1681759634', 0),
(12, 37, 'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/5MIOYMO2KRAX3ESLTHTGKJ6R4A.png', 0),
(13, 38, 'https://hairhuntersco.com/cdn/shop/files/p_800x.png?v=1725225888', 0),
(14, 38, 'https://www.eurostil.com/wp-content/uploads/2019/10/navajas-barber-line.png', 0),
(15, 38, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkyOlZ9HW2ZnG7d-maFxFviPbyKgCgW65i_w&s', 0),
(23, 42, 'https://deliciasdeiquique.cl/wp-content/uploads/2022/09/Diseno-sin-titulo-2022-09-29T161129.912-1.png', 0),
(24, 42, 'https://www.latorterie.cl/cdn/shop/files/4B15A767-00F3-4183-94BD-23AFD63DFD80.jpg?v=1725472001&width=1445', 0),
(25, 42, 'https://i0.wp.com/mozart.cl/wp-content/uploads/2021/06/94_MIF_3221_Torta_Vegana_Tres_Berries_1080x1080.jpg?fit=1080%2C1080&ssl=1', 0),
(26, 43, 'https://i0.wp.com/mozart.cl/wp-content/uploads/2018/04/269_MIF_2034_Surtido_de_Pastelitos_1080x1080.jpg?fit=1080%2C1080&ssl=1', 0),
(27, 43, 'https://d2g2gko594h1qv.cloudfront.net/1051-large_default/pastelitos.jpg', 0),
(28, 43, 'https://2.bp.blogspot.com/-Qdd_O5fWJgM/VMB9s8LWdYI/AAAAAAAACFM/_ZcM-1_gAhM/s1600/Chocolate%2BCupcakes%2BSySPMS.jpg', 0),
(29, 44, 'https://www.gourmet.cl/wp-content/uploads/2019/04/Waffles-editada.jpg', 0),
(30, 44, 'https://annaspasteleria.com/images/_imageBlock/DSC_3948web.jpg', 0),
(31, 44, 'https://alimentossanluis.com/storage/SanLuis_Miel_Recetas_Wafles4.jpg', 0),
(32, 45, 'https://www.timbrit.cl/blog/wp-content/uploads/2020/01/Productos-de-limpieza-imprescindibles-para-el-hogar.jpg', 0),
(33, 45, 'https://www.mmtseguros.com/hubfs/productos-limpieza-hogar.jpg', 0),
(34, 45, 'https://ecommerce.surtifamiliar.com/backend/admin/backend/web/archivosDelCliente/categorias/images/20201103104011-Aseo-Hogar-Cuidado-Hogar16044180118488.jpg', 0),
(35, 46, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI-vF1K4Jlx37QO-BaiqatTt7strSWd9giIA&s', 0),
(36, 46, 'https://detailing.cl/wp-content/uploads/2024/02/meguiars-detailing.cl_.jpg', 0),
(37, 46, 'https://www.retail.cl/cdn/shop/files/1_6deb8f06-1584-4228-ab5c-dd755777fbdd.jpg?v=1698938021', 0),
(38, 47, 'https://media.admagazine.com/photos/65ca727d564155b0f3dcdae4/4:3/w_2664,h_1998,c_limit/Rosas%2014%20febrero.jpg', 0),
(39, 47, 'https://storage.googleapis.com/rosalinda-productos/producto/2396/14989/800/14989.jpg', 0),
(40, 47, 'https://eljardinderosas.cl/inicio/wp-content/uploads/2020/10/RAMO-BUCHON-CON-100-ROSAS-ROJAS.png', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_reviews`
--

CREATE TABLE `product_reviews` (
  `id_review` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `calificacion` int(11) NOT NULL CHECK (`calificacion` between 1 and 5),
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_reviews`
--

INSERT INTO `product_reviews` (`id_review`, `id_usuario`, `id_producto`, `comentario`, `calificacion`, `fecha_creacion`) VALUES
(1, 12, 36, 'hola', 1, '2024-12-16 02:05:27');

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
  `id_perfil` int(11) NOT NULL,
  `id_imagen` int(11) DEFAULT NULL,
  `id_foro` int(11) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicaciones_foro`
--

INSERT INTO `publicaciones_foro` (`id_publicaciones`, `id_perfil`, `id_imagen`, `id_foro`, `titulo`, `descripcion`, `tiempo_creacion`) VALUES
(29, 1, NULL, 1, 'Cómo empezar un negocio', 'Consejos prácticos para emprendedores', '2024-12-06 20:00:00'),
(30, 2, 5, 2, 'Marketing para principiantes', 'Estrategias básicas de marketing para pequeños negocios', '2024-12-06 20:05:00'),
(31, 3, NULL, 3, 'Logística eficiente', 'Cómo optimizar los procesos de entrega', '2024-12-06 20:10:00'),
(32, 4, 8, 4, 'Atención al cliente', 'Claves para ofrecer una excelente atención al cliente', '2024-12-06 20:15:00'),
(33, 5, NULL, 5, 'Finanzas personales', 'Cómo manejar tus finanzas mientras emprendes', '2024-12-06 20:20:00'),
(34, 1, 9, 6, 'Innovación en ventas', 'Estrategias creativas para aumentar las ventas', '2024-12-06 19:47:25'),
(35, 2, 11, 1, 'Desarrollo de producto', 'Cómo diseñar un producto que tus clientes amen', '2024-12-06 19:47:25'),
(36, 3, NULL, 2, 'Publicidad en redes sociales', 'Cómo aprovechar Facebook Ads y Google Ads', '2024-12-06 19:47:25'),
(37, 4, 13, 3, 'Gestión del tiempo', 'Consejos para gestionar tu tiempo como emprendedor', '2024-12-06 19:47:25'),
(38, 5, NULL, 4, 'Casos de éxito', 'Historias de emprendedores que marcaron la diferencia', '2024-12-06 19:47:25'),
(39, 3, NULL, 1, 'Buenas tardes', 'Busco ayuda en un documento de empresa', '2024-12-06 20:51:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reacciones_foro`
--

CREATE TABLE `reacciones_foro` (
  `id_reaccion` int(11) NOT NULL,
  `id_publicaciones` int(11) NOT NULL,
  `id_perfil` int(11) DEFAULT NULL,
  `tipo` enum('me gusta','útil') NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reacciones_foro`
--

INSERT INTO `reacciones_foro` (`id_reaccion`, `id_publicaciones`, `id_perfil`, `tipo`, `tiempo_creacion`) VALUES
(6, 29, 3, 'me gusta', '2024-12-06 19:54:47'),
(7, 29, 3, 'útil', '2024-12-06 19:54:47'),
(8, 35, 3, 'me gusta', '2024-12-06 20:03:11'),
(9, 35, 3, 'útil', '2024-12-06 20:19:50'),
(10, 38, 3, 'me gusta', '2024-12-06 20:24:18'),
(11, 38, 3, 'útil', '2024-12-06 20:26:52'),
(12, 39, 3, 'me gusta', '2024-12-17 00:10:20'),
(13, 39, 3, 'útil', '2024-12-17 00:10:21'),
(18, 31, 3, 'me gusta', '2024-12-17 00:10:42'),
(19, 31, 3, 'útil', '2024-12-17 00:10:43'),
(20, 32, 3, 'útil', '2024-12-17 00:10:53'),
(21, 32, 3, 'me gusta', '2024-12-17 00:10:54'),
(23, 33, 3, 'me gusta', '2024-12-17 00:58:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas_foro`
--

CREATE TABLE `respuestas_foro` (
  `id_respuesta` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `id_publicaciones` int(11) NOT NULL,
  `respuesta` text NOT NULL,
  `tiempo_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `respuestas_foro`
--

INSERT INTO `respuestas_foro` (`id_respuesta`, `id_perfil`, `id_publicaciones`, `respuesta`, `tiempo_creacion`) VALUES
(5, 2, 29, 'Me parecen excelentes consejos para iniciar un negocio.', '2024-12-06 21:00:00'),
(6, 3, 29, '¿Puedes profundizar en cómo manejar clientes difíciles?', '2024-12-06 21:05:00'),
(7, 1, 34, 'Gracias por estas ideas de ventas, son muy útiles.', '2024-12-06 21:10:00'),
(8, 5, 34, '¿Qué herramientas recomiendas para analizar las ventas?', '2024-12-06 21:15:00'),
(9, 4, 35, '¡Interesante tema! El diseño del producto es clave.', '2024-12-06 21:20:00'),
(10, 2, 35, '¿Cómo validas la idea del producto antes de lanzarlo?', '2024-12-06 21:25:00'),
(11, 3, 36, 'La logística puede ser un reto, ¿qué software recomiendas?', '2024-12-06 21:30:00'),
(12, 1, 36, 'El proceso de optimización es clave para ahorrar costos.', '2024-12-06 21:35:00'),
(13, 4, 33, 'Me encantó el enfoque en la gestión del tiempo.', '2024-12-06 21:40:00'),
(14, 2, 33, '¿Qué técnicas usas para priorizar tareas?', '2024-12-06 21:45:00'),
(15, 3, 33, 'hola', '2024-12-06 20:49:50');

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
(7, 'eric', 'user', 'eric@gmail.com', 'eric', 'https://i.pinimg.com/736x/17/df/b7/17dfb7ccd910388cf96aed0c23173e7b.jpg', '2024-10-30 22:21:00'),
(8, 'xd', 'emprendedor', 'x@x.x', '123', NULL, '2024-10-31 21:35:24'),
(9, 'malumabeiby', 'emprendedor', 'm1@gmail.com', '12345', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStQgMbIeIJkjUDL6cAuNnzat8IwwFTdKl2ig&s', '2024-10-31 23:07:09'),
(10, 'barbershopking', 'emprendedor', 'barber@xd.cl', '54321', NULL, '2024-10-31 23:30:09'),
(11, 'flower', 'emprendedor', 'flower@xd.com', '12345', 'https://img.freepik.com/vector-premium/dibujo-flores-coloridas-colores-arco-iris_761413-3871.jpg', '2024-11-02 01:09:47'),
(12, 'holaaa', 'user', 'wenas@gmail.com', 'wenas', '/avatar.jpg', '2024-11-02 22:16:23'),
(13, 'Productos de Aseo', 'emprendedor', 'emp@gmailcom', '1234', 'https://images.app.goo.gl/exYe2AVrc3PpwKtZ7', '2024-11-14 15:17:02'),
(15, 'xddd', 'emprendedor', 'xddd@gmail.com', '123', NULL, '2024-11-20 02:40:56'),
(16, 'duque', 'user', 'duque@gmail.com', '123', NULL, '2024-11-20 02:56:45');

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
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id_compra`),
  ADD KEY `id_documento` (`id_documento`),
  ADD KEY `id_envio` (`id_envio`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `conversaciones`
--
ALTER TABLE `conversaciones`
  ADD PRIMARY KEY (`id_conversacion`),
  ADD KEY `fk_usuario1` (`id_usuario1`),
  ADD KEY `fk_usuario2` (`id_usuario2`);

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
-- Indices de la tabla `entrepreneur_reviews`
--
ALTER TABLE `entrepreneur_reviews`
  ADD PRIMARY KEY (`id_review`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_emprendedor` (`id_emprendedor`);

--
-- Indices de la tabla `envio`
--
ALTER TABLE `envio`
  ADD PRIMARY KEY (`id_envio`);

--
-- Indices de la tabla `favemprendedor`
--
ALTER TABLE `favemprendedor`
  ADD PRIMARY KEY (`id_favorito`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_negocio` (`id_negocio`);

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
-- Indices de la tabla `hilos_foro`
--
ALTER TABLE `hilos_foro`
  ADD PRIMARY KEY (`id_hilos`),
  ADD KEY `id_publicaciones` (`id_publicaciones`),
  ADD KEY `id_perfil` (`id_perfil`);

--
-- Indices de la tabla `imagen_publicacion`
--
ALTER TABLE `imagen_publicacion`
  ADD PRIMARY KEY (`id_imagen`),
  ADD KEY `id_publicaciones` (`id_publicaciones`);

--
-- Indices de la tabla `interacciones`
--
ALTER TABLE `interacciones`
  ADD PRIMARY KEY (`id_interaccion`),
  ADD KEY `profile_id` (`id_perfil`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id_mensaje`),
  ADD KEY `id_conversacion` (`id_conversacion`),
  ADD KEY `id_remitente` (`id_remitente`),
  ADD KEY `id_destinatario` (`id_destinatario`);

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
  ADD KEY `profile_id` (`id_perfil`);

--
-- Indices de la tabla `producto_imagenes`
--
ALTER TABLE `producto_imagenes`
  ADD PRIMARY KEY (`id_imagen`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`id_review`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_producto` (`id_producto`);

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
  ADD KEY `id_foro` (`id_foro`),
  ADD KEY `id_perfil` (`id_perfil`);

--
-- Indices de la tabla `reacciones_foro`
--
ALTER TABLE `reacciones_foro`
  ADD PRIMARY KEY (`id_reaccion`),
  ADD UNIQUE KEY `unique_reaccion` (`id_perfil`,`id_publicaciones`,`tipo`),
  ADD KEY `id_publicaciones` (`id_publicaciones`);

--
-- Indices de la tabla `respuestas_foro`
--
ALTER TABLE `respuestas_foro`
  ADD PRIMARY KEY (`id_respuesta`),
  ADD KEY `id_publicaciones` (`id_publicaciones`),
  ADD KEY `id_perfil` (`id_perfil`);

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
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id_compra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `conversaciones`
--
ALTER TABLE `conversaciones`
  MODIFY `id_conversacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `documento`
--
ALTER TABLE `documento`
  MODIFY `id_documento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `entrepreneur_reviews`
--
ALTER TABLE `entrepreneur_reviews`
  MODIFY `id_review` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `envio`
--
ALTER TABLE `envio`
  MODIFY `id_envio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `favemprendedor`
--
ALTER TABLE `favemprendedor`
  MODIFY `id_favorito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id_favorito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `foro`
--
ALTER TABLE `foro`
  MODIFY `id_foro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `hilos_foro`
--
ALTER TABLE `hilos_foro`
  MODIFY `id_hilos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `imagen_publicacion`
--
ALTER TABLE `imagen_publicacion`
  MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `interacciones`
--
ALTER TABLE `interacciones`
  MODIFY `id_interaccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id_mensaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id_notificacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perfil_negocio`
--
ALTER TABLE `perfil_negocio`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `producto_imagenes`
--
ALTER TABLE `producto_imagenes`
  MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `id_review` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `promociones`
--
ALTER TABLE `promociones`
  MODIFY `id_promocion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publicaciones_foro`
--
ALTER TABLE `publicaciones_foro`
  MODIFY `id_publicaciones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `reacciones_foro`
--
ALTER TABLE `reacciones_foro`
  MODIFY `id_reaccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `respuestas_foro`
--
ALTER TABLE `respuestas_foro`
  MODIFY `id_respuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `visibilidad_busqueda`
--
ALTER TABLE `visibilidad_busqueda`
  MODIFY `id_visibilidad` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`id_envio`) REFERENCES `envio` (`id_envio`),
  ADD CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`id_documento`) REFERENCES `documento` (`id_documento`),
  ADD CONSTRAINT `compra_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `conversaciones`
--
ALTER TABLE `conversaciones`
  ADD CONSTRAINT `fk_usuario1` FOREIGN KEY (`id_usuario1`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `fk_usuario2` FOREIGN KEY (`id_usuario2`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD CONSTRAINT `detalle_compra_ibfk_1` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id_compra`);

--
-- Filtros para la tabla `entrepreneur_reviews`
--
ALTER TABLE `entrepreneur_reviews`
  ADD CONSTRAINT `entrepreneur_reviews_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `entrepreneur_reviews_ibfk_2` FOREIGN KEY (`id_emprendedor`) REFERENCES `perfil_negocio` (`id_perfil`);

--
-- Filtros para la tabla `favemprendedor`
--
ALTER TABLE `favemprendedor`
  ADD CONSTRAINT `favemprendedor_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `favemprendedor_ibfk_2` FOREIGN KEY (`id_negocio`) REFERENCES `perfil_negocio` (`id_perfil`);

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
-- Filtros para la tabla `hilos_foro`
--
ALTER TABLE `hilos_foro`
  ADD CONSTRAINT `hilos_foro_ibfk_1` FOREIGN KEY (`id_publicaciones`) REFERENCES `publicaciones_foro` (`id_publicaciones`),
  ADD CONSTRAINT `hilos_foro_ibfk_2` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`),
  ADD CONSTRAINT `hilos_foro_ibfk_3` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`),
  ADD CONSTRAINT `hilos_foro_ibfk_4` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`);

--
-- Filtros para la tabla `imagen_publicacion`
--
ALTER TABLE `imagen_publicacion`
  ADD CONSTRAINT `imagen_publicacion_ibfk_1` FOREIGN KEY (`id_publicaciones`) REFERENCES `publicaciones_foro` (`id_publicaciones`);

--
-- Filtros para la tabla `interacciones`
--
ALTER TABLE `interacciones`
  ADD CONSTRAINT `interacciones_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`),
  ADD CONSTRAINT `interacciones_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`id_conversacion`) REFERENCES `conversaciones` (`id_conversacion`),
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`id_remitente`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `mensajes_ibfk_3` FOREIGN KEY (`id_destinatario`) REFERENCES `usuarios` (`id_usuario`);

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
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`);

--
-- Filtros para la tabla `producto_imagenes`
--
ALTER TABLE `producto_imagenes`
  ADD CONSTRAINT `producto_imagenes_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

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
  ADD CONSTRAINT `publicaciones_foro_ibfk_2` FOREIGN KEY (`id_foro`) REFERENCES `foro` (`id_foro`),
  ADD CONSTRAINT `publicaciones_foro_ibfk_3` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`);

--
-- Filtros para la tabla `reacciones_foro`
--
ALTER TABLE `reacciones_foro`
  ADD CONSTRAINT `reacciones_foro_ibfk_1` FOREIGN KEY (`id_publicaciones`) REFERENCES `publicaciones_foro` (`id_publicaciones`) ON DELETE CASCADE,
  ADD CONSTRAINT `reacciones_foro_ibfk_2` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`);

--
-- Filtros para la tabla `respuestas_foro`
--
ALTER TABLE `respuestas_foro`
  ADD CONSTRAINT `respuestas_foro_ibfk_1` FOREIGN KEY (`id_publicaciones`) REFERENCES `publicaciones_foro` (`id_publicaciones`),
  ADD CONSTRAINT `respuestas_foro_ibfk_2` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`);

--
-- Filtros para la tabla `visibilidad_busqueda`
--
ALTER TABLE `visibilidad_busqueda`
  ADD CONSTRAINT `visibilidad_busqueda_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_negocio` (`id_perfil`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
