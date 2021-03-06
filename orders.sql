-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: h1gtfw3uuuyktywj
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` datetime DEFAULT NULL,
  `order_shipped` tinyint unsigned DEFAULT NULL,
  `order_confirmed` tinyint unsigned DEFAULT NULL,
  `payment_info` varchar(255) DEFAULT NULL,
  `tax_amount` decimal(10,2) DEFAULT NULL,
  `shipping_handling_price` decimal(10,2) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `total_items` int DEFAULT NULL,
  `billing_address` varchar(255) DEFAULT NULL,
  `shipping_address` varchar(255) DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `worker_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `worker_id` (`worker_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2021-03-29 00:21:05',0,0,'blah',8.25,5.99,493.94,5,'430 russell rd apt 5','430 russell rd apt 5',1,1),(2,'2021-02-14 17:15:25',1,1,'blah',7.10,9.99,294.23,3,'307 sutherland ln','307 sutherland ln',2,1),(3,'2021-01-26 08:36:50',0,1,'blah',8.99,10.49,483.97,7,'431 russell rd apt 6','431 russell rd apt 6',3,1),(4,'2021-04-03 00:03:05',1,1,'Paid by credit card ending in 3945',7.25,5.99,857.44,54,'430 russell rd apt 5','430 russell rd apt 5',1,1),(5,'2021-04-12 21:10:14',0,0,'Peter Smith 6011 1234 4321 1234 12/2024',1264.25,499.99,18120.96,90,'1234 Street','1234 Street',1,1),(6,'2021-04-12 21:11:33',0,0,'Jimmy Jones 6011 1234 4321 1234 12/2024',1226.75,0.00,17583.47,90,'456 Anderson Road','456 Anderson Road',1,1),(7,'2021-04-12 21:36:01',0,0,'Tom Sanders 6011 1234 4321 1234 12/2024',1226.75,0.00,17583.47,90,'111 Broadway Street','111 Broadway Street',1,1),(8,'2021-04-13 00:08:07',0,0,'Nevaeh Lewis 6011 1234 4321 1234 12/2024',3731.08,0.00,53478.81,802,'Tuam Street 2031 Auckland New Zealand ','Tuam Street 2031 Auckland New Zealand ',1,1),(9,'2021-04-13 00:08:17',0,0,'Vildan ├ûrge 6011 1234 4321 1234 12/2024',3111.48,0.00,44597.87,740,'Kushimoto Sk 2600 Antalya Turkey ','Kushimoto Sk 2600 Antalya Turkey ',1,1),(10,'2021-04-13 00:08:32',0,0,'Marija Scheibel 6011 1234 4321 1234 12/2024',4000.56,0.00,57341.38,933,'Industriestra├ƒe 1860 Burg Stargard Germany ','Industriestra├ƒe 1860 Burg Stargard Germany ',1,1),(11,'2021-04-13 00:08:41',0,0,'Kasper Wallo 6011 1234 4321 1234 12/2024',2209.14,0.00,31664.31,790,'Hatanp├ñ├ñn Valtatie 6487 Espoo Finland ','Hatanp├ñ├ñn Valtatie 6487 Espoo Finland ',1,1),(12,'2021-04-13 00:08:53',0,0,'Ryan Legrand 6011 1234 4321 1234 12/2024',3464.46,0.00,49657.20,710,'Rue Saint-Georges 1660 Dunkerque France ','Rue Saint-Georges 1660 Dunkerque France ',1,1),(13,'2021-04-13 00:09:01',0,0,'Ceyhan Ko├ºo─ƒlu 6011 1234 4321 1234 12/2024',1850.83,0.00,26528.52,458,'Vatan Cd 166 Manisa Turkey ','Vatan Cd 166 Manisa Turkey ',1,1),(14,'2021-04-13 00:09:06',0,0,'Storm Larsen 6011 1234 4321 1234 12/2024',2417.94,0.00,34657.11,503,'Alleen 3168 Ugerl├╕se Denmark ','Alleen 3168 Ugerl├╕se Denmark ',1,1),(15,'2021-04-13 00:09:09',0,0,'Rudy Kemmeren 6011 1234 4321 1234 12/2024',7099.25,0.00,101755.86,593,'H. Hartplein 3941 Helvoirt Netherlands ','H. Hartplein 3941 Helvoirt Netherlands ',1,1),(16,'2021-04-13 00:09:13',0,0,'Lena Meyer 6011 1234 4321 1234 12/2024',2293.03,0.00,32866.74,502,'Rue Abel 7166 Aix-En-Provence France ','Rue Abel 7166 Aix-En-Provence France ',1,1),(17,'2021-04-13 00:09:19',0,0,'Susanne Berry 6011 1234 4321 1234 12/2024',3364.67,0.00,48226.91,690,'Mill Lane 4799 Blessington Ireland ','Mill Lane 4799 Blessington Ireland ',1,1),(18,'2021-04-13 00:09:22',0,0,'Isabel Vicente 6011 1234 4321 1234 12/2024',1768.57,0.00,25349.50,411,'Calle de Segovia 5123 Valladolid Spain ','Calle de Segovia 5123 Valladolid Spain ',1,1),(19,'2021-04-13 00:09:30',0,0,'Ted Jones 6011 1234 4321 1234 12/2024',3915.39,0.00,56120.58,870,'Park Road 4221 Ballina Ireland ','Park Road 4221 Ballina Ireland ',1,1),(20,'2021-04-13 00:09:34',0,0,'Alice Patel 6011 1234 4321 1234 12/2024',7933.50,0.00,113713.54,952,'Tweed Street 3064 Hamilton New Zealand ','Tweed Street 3064 Hamilton New Zealand ',1,1),(21,'2021-04-13 00:09:49',0,0,'Meire Almeida 6011 1234 4321 1234 12/2024',3725.04,0.00,53392.23,959,'Rua Dezesseis de Maio 7030 Sinop Brazil ','Rua Dezesseis de Maio 7030 Sinop Brazil ',1,1),(22,'2021-04-13 00:10:05',0,0,'Emma Campbell 6011 1234 4321 1234 12/2024',3744.94,0.00,53677.46,781,'York St 9057 Russell Canada ','York St 9057 Russell Canada ',1,1),(23,'2021-04-13 00:10:11',0,0,'Tyson Nieuwstraten 6011 1234 4321 1234 12/2024',6844.83,0.00,98109.17,618,'Bosweer 1557 Sandfirden Netherlands ','Bosweer 1557 Sandfirden Netherlands ',1,1),(24,'2021-04-13 00:10:16',0,0,'Caroline Johnson 6011 1234 4321 1234 12/2024',2441.38,0.00,34993.08,642,'The Grove 3759 Dunboyne Ireland ','The Grove 3759 Dunboyne Ireland ',1,1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-12 19:10:36
