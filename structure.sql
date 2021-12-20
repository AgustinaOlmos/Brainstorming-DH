--
-- Base de datos: `brainstorming`
--

-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS brainstorming;

USE brainstorming;
--
-- Estructura de tabla para la tabla `afip`
--

CREATE TABLE IF NOT EXISTS `afip` (
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

CREATE TABLE IF NOT EXISTS `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` decimal(11,2) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_product`
--

CREATE TABLE IF NOT EXISTS `cart_product` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
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

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `discount` int(11) NOT NULL,
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
(1, 'ADUENTUS CABERNET FRANC', '3900.00', 10, 4, 10, 1, 'vino-aduentusCabernet.jpg', 'A'),
(2, 'ANTIGAL UNO MALBEC', '1350.00', 0, 4, 10, 0, 'vino-unoMalbec.jpg', 'A'),
(3, 'ANTIGAL UNO C.SAUVIGNON', '1350.00', 0, 4, 10, 0, 'vino-unoSaivignon.jpg', 'A'),
(4, 'ANTIGAL ESTUCHE LATA UNO MALBEC', '1350.00', 15, 4, 10, 1, 'vino-uno-malbec-lata.jpg', 'A'),
(5, 'JOSE LUIS MOUNIER ROSE', '1990.00', 5, 4, 9, 1, 'vino-rose-mounier.jpg', 'A'),
(6, 'ANTIGAL UNO SAUVIGNON BLANC', '1990.00', 0, 4, 8, 0, 'vino-blanco-uno.jpg', 'A'),
(7, 'FIFTY POUNDS GIN', '13250.00', 20, 3, 5, 1, 'gin-fifty.jpg', 'A'),
(8, 'NORDÉS', '8790.00', 20, 3, 5, 1, 'gin-nordes.jpg', 'A'),
(9, 'DALMORE 15 AÑOS', '36000.00', 0, 3, 6, 0, 'whisky-damore.jpg', 'A'),
(10, 'THE GLENROTHES', '34900.00', 0, 3, 6, 0, 'whisky-glenrothes.jpg', 'A'),
(11, 'PALLINI LEMONCELLO', '5750.00', 0, 3, 7, 0, 'lemoncello-pallini.jpg', 'A'),
(12, 'CACHAZA 51', '1500.00', 0, 3, 7, 0, 'espiri-otros-cachaza.jpg', 'A'),
(13, 'BOX DUO DINÁMICO', '950.00', 0, 2, 2, 0, 'box-1.jpg', 'A'),
(14, 'THE SPEAKEASY', '1300.00', 15, 2, 2, 1, 'box-2.jpg', 'A'),
(15, 'NEGRONI PERFETTO', '1300.00', 10, 2, 1, 1, 'negroni.jpg', 'A'),
(16, 'DRESSING DE CASSIS', '630.00', 0, 5, 12, 0, 'deli-1.jpg', 'A'),
(17, 'NECTAR DE FLORES DE SAUCO', '790.00', 0, 5, 11, 0, 'deli-2.jpg', 'A'),
(18, 'FEE BROTHERS PLUM', '3850.00', 20, 5, 13, 1, 'deli-3.jpg', 'A'),
(19, 'CUCHARA MEZCLADORA', '570.00', 5, 6, 15, 1, 'tool-1.jpg', 'A'),
(20, 'VASO METÁLICOS MODELO MATE', '850.00', 5, 6, 15, 1, 'tool-2.jpg', 'A'),
(21, 'COPA DECO', '900.00', 10, 6, 15, 1, 'tool-3.jpg', 'A'),
(22, 'ANTIGAL UNO ROSADO', '1175.00', 0, 4, 9, 0, 'product_img_163980781855020200626-054344_Uno.Rose.Antigal.jpg', 'A'),
(23, 'CAJA CON HIELO PREMIUM - PRISMA', '500.00', 0, 5, 14, 0, 'product_img_163984956734320200626-055511_Hielo3.jpg', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
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

CREATE TABLE IF NOT EXISTS `subcategories` (
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

CREATE TABLE IF NOT EXISTS `users` (
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
  `password` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `roll_user_id` int(11) NOT NULL,
  `reference` varchar(200) DEFAULT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `fullName`, `dni_cuit`, `phone`, `email`, `invoice_type_id`, `street`, `number`, `floor`, `flat`, `zip`, `city`, `state_id`, `password`, `avatar`, `roll_user_id`, `reference`, `estado`) VALUES
(1, 'Agustina Olmos', 36143905, 2147483647, 'olmos.agustina@gmail.com', 1, 'las marias', 2345, '', '', 2333, 'Cordoba Capital', 1, 'agus123', '1639774124080_user.jpg', 1, '', 'A'),
(2, 'Pablo Morrone', 22362590, 1138669097, 'morronepablo@gmail.com', 1, 'el arreo', 220, '', '', 2333, 'La Reja', 1, '$2a$10$eIxbehhoqLqNkP.8n.tVo.NL8I15KWq3algkEpntL2xTzsGGiXbEe', '1639076026377_user.jpg', 1, '', 'A'),
(3, 'Victoria Gallo', 25667889, 1145771234, 'victoriagallo@gmail.com', 1, 'sarrachaga', 650, NULL, NULL, 1712, 'Castelar', 2, 'victoria123', 'user_default.png', 2, NULL, 'A'),
(4, 'Natalia Oduber', 94654750, 1138661609, 'nataliaoduber@gmail.com', 1, 'El Arreo', 220, '', '', 1738, 'La Reja', 2, '$2a$10$XL/t5gnLDrFtjGmFFFBUa.DLMfLhDxwzkapRsyNGu.c4WFxxLGbqW', '1639018850981_user.jpg', 2, 'entre calle cartejarena y garcia lorca, porton negro gris', 'A'),
(5, 'Alberto Benegas', 22222222, 33445566, 'albertobenegas@gmail.com', 1, 'Rivadavia', 10444, '1', 'F', 1424, 'Villa Luro', 1, '$2a$10$N6FAI41SilMWrpSL37J5n.zMHVECu9h1kUpplj./N2xOPFH3p.oXu', '1639076543924_user.jpg', 2, 'Casa Particular', 'A'),
(6, 'Gustavo Vesani', 22165334, 2147483647, 'gustavovessani@gmail.com', 2, 'Alvarez Jonte', 356, '', '', 1712, 'Castelar', 2, '$2a$10$60.2Z0inzevUiss19/m4n.a1q9XYrZkCBWL/n9mAJJXuhcYlCOq4a', '1639063463555_user.jpg', 2, '', 'A'),
(7, 'Pepe Nuñez', 94654750, 999999999, 'pepe@gmail.com', 1, 'El Arreo', 220, '', '', 1738, 'La Reja', 1, '$2a$10$rEIK663Ito/0skAAVa3SROXpIUGrt1WgQ9n6gEYKA4.5G30EaqXd.', '1639806833055_user.jpg', 2, '', 'A'),
(8, 'Analia Gomez', 334455666, 777777777, 'analiagomez@gmail.com', 1, 'Cordoba', 234, '1', '', 1428, 'Avellaneda', 2, '$2a$10$SRLqZtnamLLlqELVDtUpqeeF2HT0tFFy1mm87YeqB7lqKiisq4GKa', 'user_default.png', 2, 'Casa Particular', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zones`
--

CREATE TABLE IF NOT EXISTS `zones` (
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`roll_user_id`) REFERENCES `roles` (`id`);
COMMIT;
