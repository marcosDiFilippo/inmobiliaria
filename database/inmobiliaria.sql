-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 17-01-2026 a las 15:43:19
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inmobiliaria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acuerdo_pago`
--

DROP TABLE IF EXISTS `acuerdo_pago`;
CREATE TABLE IF NOT EXISTS `acuerdo_pago` (
  `fk_operacion` int NOT NULL,
  `fk_forma_pago` int NOT NULL,
  PRIMARY KEY (`fk_operacion`,`fk_forma_pago`),
  KEY `fk_Operaciones_has_Formas_Pago_Formas_Pago1_idx` (`fk_forma_pago`),
  KEY `fk_Operaciones_has_Formas_Pago_Operaciones1_idx` (`fk_operacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `contrasenia` varchar(45) NOT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id_admin`, `email`, `contrasenia`) VALUES
(1, 'a@a', '0cc175b9c0f1b6a831c399e269772661');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ambiente`
--

DROP TABLE IF EXISTS `ambiente`;
CREATE TABLE IF NOT EXISTS `ambiente` (
  `id_ambiente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_ambiente`),
  UNIQUE KEY `id_ambientes_UNIQUE` (`id_ambiente`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `ambiente`
--

INSERT INTO `ambiente` (`id_ambiente`, `nombre`) VALUES
(1, 'Cocina'),
(2, 'Banio'),
(3, 'Cochera'),
(4, 'Habitacion'),
(5, 'Living'),
(6, 'Patio'),
(7, 'Terraza'),
(8, 'Parrilla'),
(9, 'Balcon'),
(10, 'Comedor'),
(11, 'Lavadero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato_operacion`
--

DROP TABLE IF EXISTS `contrato_operacion`;
CREATE TABLE IF NOT EXISTS `contrato_operacion` (
  `id_contrato_img` int NOT NULL AUTO_INCREMENT,
  `img_contrato` varchar(100) NOT NULL,
  `fk_operacion` int NOT NULL,
  PRIMARY KEY (`id_contrato_img`),
  KEY `fk_contrato_operacion` (`fk_operacion`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentacion_parte`
--

DROP TABLE IF EXISTS `documentacion_parte`;
CREATE TABLE IF NOT EXISTS `documentacion_parte` (
  `id_documentacion_parte` int NOT NULL AUTO_INCREMENT,
  `fk_tipo_documento` int NOT NULL,
  `fk_parte_intervinente` int NOT NULL,
  `documento` varchar(100) NOT NULL,
  PRIMARY KEY (`id_documentacion_parte`),
  KEY `fk_parte_documentacion` (`fk_parte_intervinente`),
  KEY `fk_tipo_documentacion` (`fk_tipo_documento`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `documentacion_parte`
--

INSERT INTO `documentacion_parte` (`id_documentacion_parte`, `fk_tipo_documento`, `fk_parte_intervinente`, `documento`) VALUES
(1, 1, 4, 'a60161754ca5bb9594dbb22b135a0f38.webp'),
(2, 2, 4, 'b3643bbed757e0ae847bc1af60531705.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_inmueble`
--

DROP TABLE IF EXISTS `estado_inmueble`;
CREATE TABLE IF NOT EXISTS `estado_inmueble` (
  `id_estado_inmueble` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_estado_inmueble`),
  UNIQUE KEY `id_estado_inmueble_UNIQUE` (`id_estado_inmueble`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `estado_inmueble`
--

INSERT INTO `estado_inmueble` (`id_estado_inmueble`, `estado`) VALUES
(1, 'Excelente'),
(2, 'Muy Bueno'),
(3, 'Bueno'),
(4, 'A Refaccionar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forma_pago`
--

DROP TABLE IF EXISTS `forma_pago`;
CREATE TABLE IF NOT EXISTS `forma_pago` (
  `id_forma_pago` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) NOT NULL,
  PRIMARY KEY (`id_forma_pago`),
  UNIQUE KEY `id_formas_pago_UNIQUE` (`id_forma_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `forma_pago`
--

INSERT INTO `forma_pago` (`id_forma_pago`, `tipo`) VALUES
(1, 'Efectivo'),
(2, 'Transferencia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmueble`
--

DROP TABLE IF EXISTS `inmueble`;
CREATE TABLE IF NOT EXISTS `inmueble` (
  `id_inmueble` int NOT NULL AUTO_INCREMENT,
  `descripcion` tinytext NOT NULL,
  `fecha_creacion` date NOT NULL,
  `precio_venta` decimal(10,0) NOT NULL,
  `precio_alquiler` decimal(10,0) NOT NULL,
  `fk_locacion` int NOT NULL,
  `fk_tipo_inmueble` int NOT NULL,
  `fk_estado_inmueble` int NOT NULL,
  PRIMARY KEY (`id_inmueble`),
  UNIQUE KEY `id_inmueble_UNIQUE` (`id_inmueble`),
  KEY `fk_Inmuebles_Locaciones1_idx` (`fk_locacion`),
  KEY `fk_inmueble_tipo_inmueble1_idx` (`fk_tipo_inmueble`),
  KEY `fk_inmueble_estado_inmueble1_idx` (`fk_estado_inmueble`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `inmueble`
--

INSERT INTO `inmueble` (`id_inmueble`, `descripcion`, `fecha_creacion`, `precio_venta`, `precio_alquiler`, `fk_locacion`, `fk_tipo_inmueble`, `fk_estado_inmueble`) VALUES
(8, 'int cespedes', '2025-12-28', 6780000, 450000, 21, 1, 2),
(9, 'INT 2', '2026-01-06', 12000000, 670000, 22, 1, 2),
(10, 'int 3', '2026-01-09', 67000000, 567000, 23, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmueble_ambiente`
--

DROP TABLE IF EXISTS `inmueble_ambiente`;
CREATE TABLE IF NOT EXISTS `inmueble_ambiente` (
  `fk_inmueble` int NOT NULL,
  `fk_ambientes` int NOT NULL,
  `cantidad_ambientes` int NOT NULL,
  PRIMARY KEY (`fk_inmueble`,`fk_ambientes`),
  KEY `fk_Inmuebles_has_Ambientes_Ambientes1_idx` (`fk_ambientes`),
  KEY `fk_Inmuebles_has_Ambientes_Inmuebles1_idx` (`fk_inmueble`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `inmueble_ambiente`
--

INSERT INTO `inmueble_ambiente` (`fk_inmueble`, `fk_ambientes`, `cantidad_ambientes`) VALUES
(8, 1, 1),
(8, 2, 1),
(8, 3, 1),
(8, 4, 2),
(8, 5, 1),
(8, 6, 1),
(8, 8, 1),
(8, 10, 1),
(8, 11, 1),
(9, 1, 1),
(9, 2, 1),
(9, 3, 1),
(9, 4, 2),
(9, 5, 1),
(9, 6, 1),
(9, 8, 1),
(9, 10, 1),
(9, 11, 1),
(10, 1, 1),
(10, 2, 1),
(10, 3, 1),
(10, 4, 1),
(10, 5, 1),
(10, 6, 1),
(10, 8, 1),
(10, 9, 1),
(10, 10, 1),
(10, 11, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locacion`
--

DROP TABLE IF EXISTS `locacion`;
CREATE TABLE IF NOT EXISTS `locacion` (
  `id_locacion` int NOT NULL AUTO_INCREMENT,
  `calle` varchar(45) NOT NULL,
  `numero_calle` int NOT NULL,
  `numero_dpto` int DEFAULT NULL,
  PRIMARY KEY (`id_locacion`),
  UNIQUE KEY `id_locacion_UNIQUE` (`id_locacion`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `locacion`
--

INSERT INTO `locacion` (`id_locacion`, `calle`, `numero_calle`, `numero_dpto`) VALUES
(21, 'Intendente Cespedes', 847, 1),
(22, 'Intendente Cespedes', 847, 2),
(23, 'Intendente Cespedes', 847, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operacion`
--

DROP TABLE IF EXISTS `operacion`;
CREATE TABLE IF NOT EXISTS `operacion` (
  `id_operacion` int NOT NULL AUTO_INCREMENT,
  `fecha_inicio` date NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `monto_total` decimal(10,0) NOT NULL,
  `fk_inmueble` int NOT NULL,
  `fk_plazo_operacion` int NOT NULL,
  `fk_plan_operacion` int NOT NULL,
  PRIMARY KEY (`id_operacion`),
  UNIQUE KEY `id_operaciones_UNIQUE` (`id_operacion`),
  KEY `fk_Operaciones_Inmuebles1_idx` (`fk_inmueble`),
  KEY `fk_operacion_plazo_operacion1_idx` (`fk_plazo_operacion`),
  KEY `fk_operacion_plan_operacion1_idx` (`fk_plan_operacion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `operacion`
--

INSERT INTO `operacion` (`id_operacion`, `fecha_inicio`, `fecha_vencimiento`, `monto_total`, `fk_inmueble`, `fk_plazo_operacion`, `fk_plan_operacion`) VALUES
(2, '2026-01-06', '2026-01-06', 56000, 8, 1, 1),
(3, '2026-01-06', '2026-01-06', 56000, 9, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parte_intervinente`
--

DROP TABLE IF EXISTS `parte_intervinente`;
CREATE TABLE IF NOT EXISTS `parte_intervinente` (
  `id_parte_intervinente` int NOT NULL AUTO_INCREMENT,
  `dni` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `telefono` int NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `email` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `es_gendarme` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_parte_intervinente`),
  UNIQUE KEY `id_partes_intervinentes_UNIQUE` (`id_parte_intervinente`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `parte_intervinente`
--

INSERT INTO `parte_intervinente` (`id_parte_intervinente`, `dni`, `nombre`, `telefono`, `fecha_nacimiento`, `email`, `apellido`, `es_gendarme`) VALUES
(1, 1, 'marcos', 23, '2007-06-26', 'a@a', 'di filippo', 0),
(4, 47911625, 'Marcos', 2147483647, '2007-06-26', 'marcosdf788@gmail.com', 'Di Filippo', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parte_operacion`
--

DROP TABLE IF EXISTS `parte_operacion`;
CREATE TABLE IF NOT EXISTS `parte_operacion` (
  `fk_parte_intervinente` int NOT NULL,
  `fk_operacion` int NOT NULL,
  `fk_rol` int NOT NULL,
  PRIMARY KEY (`fk_parte_intervinente`,`fk_operacion`),
  KEY `fk_parte_intervinente_has_operacion_operacion1_idx` (`fk_operacion`),
  KEY `fk_parte_intervinente_has_operacion_parte_intervinente1_idx` (`fk_parte_intervinente`),
  KEY `fk_parte_operacion_rol1_idx` (`fk_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan_operacion`
--

DROP TABLE IF EXISTS `plan_operacion`;
CREATE TABLE IF NOT EXISTS `plan_operacion` (
  `id_plan_operacion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_plan_operacion`),
  UNIQUE KEY `id_plan_operacion_UNIQUE` (`id_plan_operacion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `plan_operacion`
--

INSERT INTO `plan_operacion` (`id_plan_operacion`, `nombre`) VALUES
(1, 'Cuatrimestral'),
(2, 'Semestral'),
(3, 'Anual');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plazo_operacion`
--

DROP TABLE IF EXISTS `plazo_operacion`;
CREATE TABLE IF NOT EXISTS `plazo_operacion` (
  `id_plazo_operacion` int NOT NULL AUTO_INCREMENT,
  `cantidad_meses` int NOT NULL,
  PRIMARY KEY (`id_plazo_operacion`),
  UNIQUE KEY `id_plazo_operacion_UNIQUE` (`id_plazo_operacion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `plazo_operacion`
--

INSERT INTO `plazo_operacion` (`id_plazo_operacion`, `cantidad_meses`) VALUES
(1, 12),
(2, 24),
(3, 36),
(4, 48),
(5, 60);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

DROP TABLE IF EXISTS `rol`;
CREATE TABLE IF NOT EXISTS `rol` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `id_rol_UNIQUE` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre`) VALUES
(1, 'Propietario'),
(2, 'Inquilino'),
(3, 'Garante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documento`
--

DROP TABLE IF EXISTS `tipo_documento`;
CREATE TABLE IF NOT EXISTS `tipo_documento` (
  `id_tipo_documento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_documento`),
  UNIQUE KEY `id_tipos_Documentos_UNIQUE` (`id_tipo_documento`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `tipo_documento`
--

INSERT INTO `tipo_documento` (`id_tipo_documento`, `nombre`) VALUES
(1, 'Documento Identificacion'),
(2, 'Recibo Sueldo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_garantia`
--

DROP TABLE IF EXISTS `tipo_garantia`;
CREATE TABLE IF NOT EXISTS `tipo_garantia` (
  `id_tipo_garantia` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_garantia`),
  UNIQUE KEY `id_tipos_garantias_UNIQUE` (`id_tipo_garantia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_inmueble`
--

DROP TABLE IF EXISTS `tipo_inmueble`;
CREATE TABLE IF NOT EXISTS `tipo_inmueble` (
  `id_tipo_inmueble` int NOT NULL,
  `tipo` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_tipo_inmueble`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `tipo_inmueble`
--

INSERT INTO `tipo_inmueble` (`id_tipo_inmueble`, `tipo`) VALUES
(1, 'Departamento'),
(2, 'Casa'),
(3, 'Cancha'),
(4, 'Lote');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `acuerdo_pago`
--
ALTER TABLE `acuerdo_pago`
  ADD CONSTRAINT `fk_Operaciones_has_Formas_Pago_Formas_Pago1` FOREIGN KEY (`fk_forma_pago`) REFERENCES `forma_pago` (`id_forma_pago`),
  ADD CONSTRAINT `fk_Operaciones_has_Formas_Pago_Operaciones1` FOREIGN KEY (`fk_operacion`) REFERENCES `operacion` (`id_operacion`);

--
-- Filtros para la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD CONSTRAINT `fk_inmueble_estado_inmueble1` FOREIGN KEY (`fk_estado_inmueble`) REFERENCES `estado_inmueble` (`id_estado_inmueble`),
  ADD CONSTRAINT `fk_inmueble_tipo_inmueble1` FOREIGN KEY (`fk_tipo_inmueble`) REFERENCES `tipo_inmueble` (`id_tipo_inmueble`),
  ADD CONSTRAINT `fk_Inmuebles_Locaciones1` FOREIGN KEY (`fk_locacion`) REFERENCES `locacion` (`id_locacion`);

--
-- Filtros para la tabla `inmueble_ambiente`
--
ALTER TABLE `inmueble_ambiente`
  ADD CONSTRAINT `fk_Inmuebles_has_Ambientes_Ambientes1` FOREIGN KEY (`fk_ambientes`) REFERENCES `ambiente` (`id_ambiente`),
  ADD CONSTRAINT `fk_Inmuebles_has_Ambientes_Inmuebles1` FOREIGN KEY (`fk_inmueble`) REFERENCES `inmueble` (`id_inmueble`);

--
-- Filtros para la tabla `operacion`
--
ALTER TABLE `operacion`
  ADD CONSTRAINT `fk_operacion_plan_operacion1` FOREIGN KEY (`fk_plan_operacion`) REFERENCES `plan_operacion` (`id_plan_operacion`),
  ADD CONSTRAINT `fk_operacion_plazo_operacion1` FOREIGN KEY (`fk_plazo_operacion`) REFERENCES `plazo_operacion` (`id_plazo_operacion`),
  ADD CONSTRAINT `fk_Operaciones_Inmuebles1` FOREIGN KEY (`fk_inmueble`) REFERENCES `inmueble` (`id_inmueble`);

--
-- Filtros para la tabla `parte_operacion`
--
ALTER TABLE `parte_operacion`
  ADD CONSTRAINT `fk_parte_intervinente_has_operacion_operacion1` FOREIGN KEY (`fk_operacion`) REFERENCES `operacion` (`id_operacion`),
  ADD CONSTRAINT `fk_parte_intervinente_has_operacion_parte_intervinente1` FOREIGN KEY (`fk_parte_intervinente`) REFERENCES `parte_intervinente` (`id_parte_intervinente`),
  ADD CONSTRAINT `fk_parte_operacion_rol1` FOREIGN KEY (`fk_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
