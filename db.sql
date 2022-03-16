-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: restaurantsdb
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `iditem` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `picture` varchar(300) NOT NULL,
  `category` varchar(45) NOT NULL,
  `restaurant_idrestaurant` int NOT NULL,
  `restaurant_user_idcustomer` int NOT NULL,
  PRIMARY KEY (`iditem`,`restaurant_idrestaurant`,`restaurant_user_idcustomer`),
  KEY `fk_menu_item_restaurant1_idx` (`restaurant_idrestaurant`,`restaurant_user_idcustomer`),
  CONSTRAINT `fk_menu_item_restaurant1` FOREIGN KEY (`restaurant_idrestaurant`, `restaurant_user_idcustomer`) REFERENCES `restaurant` (`idrestaurant`, `user_idcustomer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_history`
--

DROP TABLE IF EXISTS `order_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_history` (
  `idorder_history` int NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` float NOT NULL,
  `user_idcustomer` int NOT NULL,
  PRIMARY KEY (`idorder_history`,`user_idcustomer`),
  KEY `fk_order_history_user1_idx` (`user_idcustomer`),
  CONSTRAINT `fk_order_history_user1` FOREIGN KEY (`user_idcustomer`) REFERENCES `user` (`idcustomer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_history`
--

LOCK TABLES `order_history` WRITE;
/*!40000 ALTER TABLE `order_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_history_item`
--

DROP TABLE IF EXISTS `order_history_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_history_item` (
  `idorder` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `picture` varchar(300) NOT NULL,
  `category` varchar(45) NOT NULL,
  `order_history_idorder_history` int NOT NULL,
  `order_history_user_idcustomer` int NOT NULL,
  PRIMARY KEY (`idorder`,`order_history_idorder_history`,`order_history_user_idcustomer`),
  KEY `fk_order_history_item_order_history1_idx` (`order_history_idorder_history`,`order_history_user_idcustomer`),
  CONSTRAINT `fk_order_history_item_order_history1` FOREIGN KEY (`order_history_idorder_history`, `order_history_user_idcustomer`) REFERENCES `order_history` (`idorder_history`, `user_idcustomer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_history_item`
--

LOCK TABLES `order_history_item` WRITE;
/*!40000 ALTER TABLE `order_history_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_history_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `idrestaurant` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `address` varchar(45) DEFAULT NULL,
  `opening_hours` varchar(45) DEFAULT NULL,
  `picture` varchar(300) DEFAULT NULL,
  `restaurant_type` enum('Buffet','Fast food','Fast casual','Casual dining','Fine dining') DEFAULT NULL,
  `price_level` enum('€','€€','€€€','€€€€') DEFAULT NULL,
  `user_idcustomer` int NOT NULL,
  PRIMARY KEY (`idrestaurant`,`user_idcustomer`),
  KEY `fk_restaurant_user_idx` (`user_idcustomer`),
  CONSTRAINT `fk_restaurant_user` FOREIGN KEY (`user_idcustomer`) REFERENCES `user` (`idcustomer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart` (
  `idshopping_cart` int NOT NULL AUTO_INCREMENT,
  `user_idcustomer` int NOT NULL,
  PRIMARY KEY (`idshopping_cart`,`user_idcustomer`),
  KEY `fk_shopping_cart_user1_idx` (`user_idcustomer`),
  CONSTRAINT `fk_shopping_cart_user1` FOREIGN KEY (`user_idcustomer`) REFERENCES `user` (`idcustomer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart_item`
--

DROP TABLE IF EXISTS `shopping_cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart_item` (
  `idshopping_cart_item` int NOT NULL AUTO_INCREMENT,
  `shopping_cart_idshopping_cart` int NOT NULL,
  `shopping_cart_user_idcustomer` int NOT NULL,
  `item_iditem` int NOT NULL,
  `item_restaurant_idrestaurant` int NOT NULL,
  `item_restaurant_user_idcustomer` int NOT NULL,
  PRIMARY KEY (`idshopping_cart_item`,`shopping_cart_idshopping_cart`,`shopping_cart_user_idcustomer`,`item_iditem`,`item_restaurant_idrestaurant`,`item_restaurant_user_idcustomer`),
  KEY `fk_shopping_cart_item_shopping_cart1_idx` (`shopping_cart_idshopping_cart`,`shopping_cart_user_idcustomer`),
  KEY `fk_shopping_cart_item_item1_idx` (`item_iditem`,`item_restaurant_idrestaurant`,`item_restaurant_user_idcustomer`),
  CONSTRAINT `fk_shopping_cart_item_item1` FOREIGN KEY (`item_iditem`, `item_restaurant_idrestaurant`, `item_restaurant_user_idcustomer`) REFERENCES `item` (`iditem`, `restaurant_idrestaurant`, `restaurant_user_idcustomer`),
  CONSTRAINT `fk_shopping_cart_item_shopping_cart1` FOREIGN KEY (`shopping_cart_idshopping_cart`, `shopping_cart_user_idcustomer`) REFERENCES `shopping_cart` (`idshopping_cart`, `user_idcustomer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart_item`
--

LOCK TABLES `shopping_cart_item` WRITE;
/*!40000 ALTER TABLE `shopping_cart_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `shopping_cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idcustomer` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `phone_number` int NOT NULL,
  `is_owner` enum('yes','no') NOT NULL COMMENT 'VARCHAR(45)',
  `token` varchar(255) DEFAULT NULL,
  `token_refresh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idcustomer`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-16 19:16:16
