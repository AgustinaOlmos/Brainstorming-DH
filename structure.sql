-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-12-2021 a las 23:52:54
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `brainstorming`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `afip`
--

CREATE TABLE `afip` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `afip`
--

INSERT INTO `afip` (`id`, `name`, `estado`) VALUES
(1, 'Consumidor Final', 'A'),
(2, 'Responsable Inscripto', 'A'),
(3, 'Exento', 'A'),
(4, 'Monotributo', 'A'),
(5, 'No Categorizado', 'A'),
(6, 'No Grabado', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` decimal(11,2) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_product`
--

CREATE TABLE `cart_product` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `imgBanner` varchar(100) NOT NULL,
  `img1` varchar(100) NOT NULL,
  `img2` varchar(100) NOT NULL,
  `img3` varchar(100) NOT NULL,
  `img4` varchar(100) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `url`, `imgBanner`, `img1`, `img2`, `img3`, `img4`, `estado`) VALUES
(1, 'TODOS LOS PRODUCTOS', '/all', 'vinos-banner3.jpg', 'cocktails-galeria-1.jpg', 'espirituosas-banner.jpg', 'deli-galeria-1.jpg', 'tools-galeria-1.jpg', 'A'),
(2, 'COCKTAILS', '/category/2', 'cocktails-banner.jpg', 'cocktails-galeria-1.jpg', 'cocktails-galeria-2.jpg', 'cocktails-galeria-3.jpg', 'cocktails-galeria-4.jpg', 'A'),
(3, 'ESPITITUOSAS', '/category/3', 'espirituosas-banner.jpg', 'espirituosas-galeria-1.jpg', 'espirituosas-galeria-2.jpg', 'espirituosas-galeria-3.jpg', 'espirituosas-galeria-4.jpg', 'A'),
(4, 'VINOS', '/category/4', 'vinos-banner.jpg', 'vinos-galeria-1.jpg', 'vinos-galeria-2.jpg', 'vinos-galeria-3.jpg', 'vinos-galeria-4.jpg', 'A'),
(5, 'DELI', '/category/5', 'deli-banner.jpg', 'deli-galeria-1.jpg', 'deli-galeria-2.jpg', 'deli-galeria-3.jpg', 'deli-galeria-4.jpg', 'A'),
(6, 'TOOLS', '/category/6', 'tools-banner.jpg', 'tools-galeria-1.jpg', 'tools-galeria-2.jpg', 'tools-galeria-3.jpg', 'tools-galeria-4.jpg', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `discount` decimal(11,2) NOT NULL,
  `category_id` int(11) NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  `promotion` tinyint(1) NOT NULL,
  `img` varchar(100) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `title`, `price`, `discount`, `category_id`, `subcategory_id`, `promotion`, `img`, `estado`) VALUES
(1, 'ADUENTUS CABERNET FRANC', '3900.00', '10.00', 4, 10, 1, 'vino-aduentusCabernet.jpg', 'A'),
(2, 'ANTIGAL UNO MALBEC', '1350.00', '0.00', 4, 10, 0, 'vino-unoMalbec.jpg', 'A'),
(3, 'ANTIGAL UNO C.SAUVIGNON', '1350.00', '0.00', 4, 10, 0, 'vino-unoSaivignon.jpg', 'A'),
(4, 'ANTIGAL ESTUCHE LATA UNO MALBEC', '1350.00', '15.00', 4, 10, 1, 'vino-uno-malbec-lata.jpg', 'A'),
(5, 'JOSE LUIS MOUNIER ROSE', '1990.00', '5.00', 4, 9, 1, 'vino-rose-mounier.jpg', 'A'),
(6, 'ANTIGAL UNO SAUVIGNON BLANC', '1990.00', '0.00', 4, 8, 0, 'vino-blanco-uno.jpg', 'A'),
(7, 'FIFTY POUNDS GIN', '13250.00', '20.00', 3, 5, 1, 'gin-fifty.jpg', 'A'),
(8, 'NORDÉS', '8790.00', '20.00', 3, 5, 1, 'gin-nordes.jpg', 'A'),
(9, 'DALMORE 15 AÑOS', '36000.00', '0.00', 3, 6, 0, 'whisky-damore.jpg', 'A'),
(10, 'THE GLENROTHES', '34900.00', '0.00', 3, 6, 0, 'whisky-glenrothes.jpg', 'A'),
(11, 'PALLINI LEMONCELLO', '5750.00', '0.00', 3, 7, 0, 'lemoncello-pallini.jpg', 'A'),
(12, 'CACHAZA 51', '1500.00', '0.00', 3, 7, 0, 'espiri-otros-cachaza.jpg', 'A'),
(13, 'BOX DUO DINÁMICO', '950.00', '0.00', 2, 2, 0, 'box-1.jpg', 'A'),
(14, 'THE SPEAKEASY', '1300.00', '15.00', 2, 2, 1, 'box-2.jpg', 'A'),
(15, 'NEGRONI PERFETTO', '1300.00', '10.00', 2, 1, 1, 'negroni.jpg', 'A'),
(16, 'DRESSING DE CASSIS', '630.00', '0.00', 5, 12, 0, 'deli-1.jpg', 'A'),
(17, 'NECTAR DE FLORES DE SAUCO', '790.00', '0.00', 5, 11, 0, 'deli-2.jpg', 'A'),
(18, 'FEE BROTHERS PLUM', '3850.00', '0.00', 5, 13, 0, 'deli-3.jpg', 'A'),
(19, 'CUCHARA MEZCLADORA', '570.00', '5.00', 6, 15, 1, 'tool-1.jpg', 'A'),
(20, 'VASO METÁLICOS MODELO MATE', '850.00', '5.00', 6, 15, 1, 'tool-2.jpg', 'A'),
(21, 'COPA DECO', '900.00', '10.00', 6, 15, 1, 'tool-3.jpg', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `roll` varchar(50) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `roll`, `estado`) VALUES
(1, 'Administrador', 'A'),
(2, 'Cliente', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategories`
--

CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category_id` int(11) NOT NULL,
  `url` varchar(100) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `subcategories`
--

INSERT INTO `subcategories` (`id`, `name`, `category_id`, `url`, `estado`) VALUES
(1, 'PREPARADOS', 2, '/subCategory/1', 'A'),
(2, 'PARA PREPARAR', 2, '/subCategory/2', 'A'),
(3, 'BOX', 2, '/subCategory/3', 'A'),
(4, 'CAÑAS', 3, '/subCategory/4', 'A'),
(5, 'GINS', 3, '/subCategory/5', 'A'),
(6, 'WISKY', 3, '/subCategory/6', 'A'),
(7, 'OTROS', 3, '/subCategory/7', 'A'),
(8, 'BLANCO', 4, '/subCategory/8', 'A'),
(9, 'ROSÉ', 4, '/subCategory/9', 'A'),
(10, 'TINTO', 4, '/subCategory/10', 'A'),
(11, 'NECTAR', 5, '/subCategory/11', 'A'),
(12, 'DRESSING', 5, '/subCategory/12', 'A'),
(13, 'FEE', 5, '/subCategory/13', 'A'),
(14, 'HIELO', 5, '/subCategory/14', 'A'),
(15, 'TOOLS', 6, '/subCategory/15', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `dni_cuit` int(11) NOT NULL,
  `phone` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `invoice_type_id` int(11) NOT NULL,
  `street` varchar(100) NOT NULL,
  `number` int(11) NOT NULL,
  `floor` varchar(30) DEFAULT NULL,
  `flat` varchar(30) DEFAULT NULL,
  `zip` int(11) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state_id` int(11) NOT NULL,
  `reference` varchar(200) DEFAULT NULL,
  `roll_user_id` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `fullName`, `dni_cuit`, `phone`, `email`, `invoice_type_id`, `street`, `number`, `floor`, `flat`, `zip`, `city`, `state_id`, `reference`, `roll_user_id`, `password`, `avatar`, `estado`) VALUES
(1, 'Agustina Olmos', 36143905, 2147483647, 'olmos.agustina@gmail.com', 1, 'las marias', 2345, NULL, NULL, 2333, 'Cordoba Capital', 1, NULL, 1, '$2a$10$wFq6fiVvjMiKNuByJQO85OEu0vd2m4rK7NhCh1DnJ8uVMgFuWvApi', '1638133724746_user.jpg', 'A'),
(2, 'Pablo Morrone', 22362590, 1138669097, 'morronepablo@gmail.com', 1, 'el arreo', 220, NULL, NULL, 2333, 'La Reja', 2, NULL, 1, 'morrone22362590', '1637686577084_user.jpg', 'A'),
(3, 'Victoria Gallo', 25667889, 1145771234, 'victoriagallo@gmail.com', 1, 'sarrachaga', 650, NULL, NULL, 1712, 'Castelar', 2, NULL, 2, 'victoria123', 'user_default.png', 'A'),
(4, 'Natalia Oduber', 94654750, 1138661609, 'nataliaoduber@gmail.com', 1, 'El Arreo', 220, NULL, NULL, 1738, 'La Reja', 2, 'entre calle cartejarena y garcia lorca, porton negro', 2, '$2a$10$vp5.nf.1BCN0qiy5R1v9Ee/XgWbxnzdkyTbMZECihkFKfBuRZUEwi', '1637643623808_user.jpg', 'A'),
(5, 'Alberto Benegas', 22354765, 1138776545, 'albertobenegas@gmail.com', 1, 'rivadavia', 10444, NULL, NULL, 1425, 'Villa Luro', 1, 'Casa propia - tacar timbre', 1, '$2a$10$s6XW.lNFRfDINhYX0GcHiO0Eoe01dSevft99ab4lhC/8rSofOekeO', '1637686325065_user.jpg', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zones`
--

CREATE TABLE `zones` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `zones`
--

INSERT INTO `zones` (`id`, `name`, `estado`) VALUES
(1, 'Ciudad Autónoma De Buenos Aires', 'A'),
(2, 'Gran Buenos Aires', 'A');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `afip`
--
ALTER TABLE `afip`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `cart_product`
--
ALTER TABLE `cart_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `subcategory_id` (`subcategory_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_type_id` (`invoice_type_id`,`state_id`,`roll_user_id`),
  ADD KEY `state_id` (`state_id`),
  ADD KEY `roll_user_id` (`roll_user_id`);

--
-- Indices de la tabla `zones`
--
ALTER TABLE `zones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `afip`
--
ALTER TABLE `afip`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cart_product`
--
ALTER TABLE `cart_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `zones`
--
ALTER TABLE `zones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `cart_product`
--
ALTER TABLE `cart_product`
  ADD CONSTRAINT `cart_product_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `cart_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`);

--
-- Filtros para la tabla `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`invoice_type_id`) REFERENCES `afip` (`id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`state_id`) REFERENCES `zones` (`id`),
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`roll_user_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
