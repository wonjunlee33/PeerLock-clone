-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: containers-us-west-60.railway.app    Database: railway
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `reservation_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `end_date` datetime(6) NOT NULL,
  `insurance_plan` varchar(255) NOT NULL,
  `insurance_price` int NOT NULL,
  `item_size` varchar(50) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `start_date` datetime(6) NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `total_months` int NOT NULL,
  `total_payment` int NOT NULL,
  `total_storage_price` int NOT NULL,
  `storage_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `FKduhy7tq9f63yja7s3wccyk0dw` (`storage_id`),
  KEY `FKrea93581tgkq61mdl13hehami` (`user_id`),
  CONSTRAINT `FKduhy7tq9f63yja7s3wccyk0dw` FOREIGN KEY (`storage_id`) REFERENCES `storage` (`storage_id`),
  CONSTRAINT `FKrea93581tgkq61mdl13hehami` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (1,'2023-08-20 22:31:35.583582','2023-08-20 22:31:35.583582','2023-08-15 17:30:00.000000','프리미엄',50000,'중형','not yet','2023-07-15 17:30:00.000000','AVAILABLE',7,350000,28000,9,3),(2,'2023-08-20 22:33:39.254840','2023-08-20 22:33:39.254840','2023-09-08 09:00:00.000000','standard',5000,'medium','not yet','2023-08-20 09:00:00.000000','AVAILABLE',2,65000,60000,11,3),(3,'2023-08-20 22:46:03.783977','2023-08-20 22:46:03.783977','2023-08-31 09:00:00.000000','standard',5000,'small','not yet','2023-08-20 09:00:00.000000','AVAILABLE',1,35000,30000,11,1),(4,'2023-08-20 22:57:23.350878','2023-08-20 22:57:23.350878','2023-08-31 09:00:00.000000','standard',5000,'small','not yet','2023-08-20 09:00:00.000000','AVAILABLE',1,15000,10000,13,8);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_images`
--

DROP TABLE IF EXISTS `reservation_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_images` (
  `image_id` bigint NOT NULL AUTO_INCREMENT,
  `image_name` varchar(255) DEFAULT NULL,
  `image_path` varchar(300) DEFAULT NULL,
  `reservation_id` bigint DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `FKnrr3xnx9s8spv5niuivrv69if` (`reservation_id`),
  CONSTRAINT `FKnrr3xnx9s8spv5niuivrv69if` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`reservation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_images`
--

LOCK TABLES `reservation_images` WRITE;
/*!40000 ALTER TABLE `reservation_images` DISABLE KEYS */;
INSERT INTO `reservation_images` VALUES (1,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_223339/efe0015f-7dfc-4e1e-87bf-c039774a14f8_bag1.jpeg',2),(2,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_223339/3e6a2abf-19a3-4af0-b6ee-e72abb5e9d53_bag2.jpeg',2),(3,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_223339/9404b225-756d-4756-b676-855e9d148bd3_bag3.jpeg',2),(4,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_224604/ebdb0a3c-1606-442f-8436-01c00d9a298a_bag1.jpeg',3),(5,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_224604/b3e28900-6b33-444f-9660-5b62e55a2845_bag2.jpeg',3),(6,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_224604/169b7daa-f5a3-4208-839a-21e402fed14e_bag3.jpeg',3),(7,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_224604/b412b1c3-f71f-49b3-b370-914a766ff9ba_bag4.webp',3),(8,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_225723/86f8ee26-7be6-4334-b9e4-76c98c084b37_bag1.jpeg',4),(9,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_225723/d39845e5-6c1b-43e3-8ef6-c2121f7bbff7_bag2.jpeg',4),(10,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_225723/8cde8d9f-c24a-40c4-adf4-0f017bd851b2_bag3.jpeg',4),(11,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_225723/2a90fb9f-d303-4289-9e27-756641459338_bag4.webp',4);
/*!40000 ALTER TABLE `reservation_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage`
--

DROP TABLE IF EXISTS `storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage` (
  `storage_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `return_policy` text NOT NULL,
  `service_commission` int NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `storage_address` varchar(100) NOT NULL,
  `storage_description` text NOT NULL,
  `storage_feature` varchar(50) NOT NULL,
  `storage_latitude` varchar(100) NOT NULL,
  `storage_longitude` varchar(100) NOT NULL,
  `storage_name` varchar(50) NOT NULL,
  `storage_price` int NOT NULL,
  `storage_size` varchar(50) NOT NULL,
  `storage_type` varchar(50) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`storage_id`),
  KEY `FK3sedaenipukllqrhkuldl4ku0` (`user_id`),
  CONSTRAINT `FK3sedaenipukllqrhkuldl4ku0` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage`
--

LOCK TABLES `storage` WRITE;
/*!40000 ALTER TABLE `storage` DISABLE KEYS */;
INSERT INTO `storage` VALUES (1,'2023-08-20 22:23:52.821774','2023-08-20 22:23:52.821774','구매 후 30일 이내에 반품 가능합니다.',10,'AVAILABLE','서울특별시 영등포구 여의도동 50-63','도심에 위치한 중앙 창고입니다.','1','37.519377','126.940175','양종욱의 방',80000,'대형','기타',3),(2,'2023-08-20 22:26:32.485291','2023-08-20 22:26:32.485291','구매 후 30일 이내에 반품 가능합니다.',10,'AVAILABLE','서울특별시 영등포구 여의도동 50-63','도심에 위치한 중앙 창고입니다.','1','37.519377','126.940175','양종욱의 방',80000,'대형','기타',3),(3,'2023-08-20 22:27:01.394220','2023-08-20 22:27:01.394220','구매 후 30일 이내에 반품 가능합니다.',10,'AVAILABLE','서울특별시 영등포구 국제금융로 10','도심에 위치한 중앙 창고입니다.','1','37.525797','126.925933','윤주혜의 방',15000,'소형','상권',1),(4,'2023-08-20 22:27:15.127809','2023-08-20 22:27:15.127809','구매 후 30일 이내에 반품 가능합니다.',10,'AVAILABLE','서울특별시 영등포구 의사당대로 1','도심에 위치한 중앙 창고입니다.','1','37.528771','126.913512','이원준의 방',20000,'중형','상권',5),(5,'2023-08-20 22:27:24.804649','2023-08-20 22:27:24.804649','구매 후 30일 이내에 반품 가능합니다.',10,'AVAILABLE','서울특별시 영등포구 여의대로 108 파크원','도심에 위치한 중앙 창고입니다.','1','37.522095','126.925790','김현수의 방',45000,'중형','창고',2),(6,'2023-08-20 22:27:37.211055','2023-08-20 22:27:37.211055','구매 후 30일 이내에 반품 가능합니다.',10,'AVAILABLE','서울특별시 중구 을지로 20','도심에 위치한 중앙 창고입니다.','1','37.524101','126.927676','차규빈의 방',65000,'소형','방',4),(7,'2023-08-20 22:27:46.134861','2023-08-20 22:27:46.134861','구매 후 30일 이내에 반품 가능합니다.',10,'AVAILABLE','서울특별시 영등포구 여의나루로 76','도심에 위치한 중앙 창고입니다.','1','37.521907','126.927445','배승우의 방',30000,'대형','기타',3),(8,'2023-08-20 22:27:54.059611','2023-08-20 22:27:54.059611','구매 후 30일 이내에 반품 가능합니다.',10,'AVAILABLE','서울특별시 용산구 한강대로 25','도심에 위치한 중앙 창고입니다.','1','37.526505','126.928650','김가연의 방',55000,'대형','창고',1),(9,'2023-08-20 22:28:02.652031','2023-08-20 22:28:02.652031','구매 후 30일 이내에 반품 가능합니다.',10,'AVAILABLE','서울특별시 중구 퇴계로 21-6','도심에 위치한 중앙 창고입니다.','1','37.524534','126.848224','김테현의 옷장',20000,'소형','기타',5),(10,'2023-08-20 22:28:11.952532','2023-08-20 22:28:11.952532','구매 후 30일 이내에 반품 가능합니다.',10,'AVAILABLE','서울특별시 영등포구 여의공원로 13','도심에 위치한 중앙 창고입니다.','1','37.523541','126.929991','김종민의 옷장',30000,'소형','상권',2),(11,'2023-08-20 22:28:19.091340','2023-08-20 22:28:19.091340','구매 후 30일 이내에 반품 가능합니다.',10,'AVAILABLE','서울특별시 영등포구 여의공원로 13','도심에 위치한 중앙 창고입니다.','1','37.525787','126.9264','김종민의 옷장',30000,'소형','상권',2),(12,'2023-08-20 22:49:02.347398','2023-08-20 22:49:02.347398','Items can be returned within 30 days of purchase.',10,'AVAILABLE','123 Main St, City, Country','모든걸 맡겨보세요~','1','37.123456','127.123456','양종욱의 5번째 방',20000,'소형','방',1),(13,'2023-08-20 22:51:42.479932','2023-08-20 22:51:42.479932','Items can be returned within 30 days of purchase.',10,'AVAILABLE','123 Main St, City, Country','또간집이라 접근성이 좋아요 ㅎㅎ','1','37.123456','127.123456','경기 수지 또간집',10000,'소형','상권',1),(14,'2023-08-20 22:59:16.482982','2023-08-20 22:59:16.482982','Items can be returned within 30 days of purchase.',10,'AVAILABLE','123 Main St, City, Country','경기 빽다방 수지점입니다. 작은 물건들 맡아드립니다!','1','37.123456','127.123456','빽다방',10000,'소형','상권',8);
/*!40000 ALTER TABLE `storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage_images`
--

DROP TABLE IF EXISTS `storage_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage_images` (
  `image_id` bigint NOT NULL AUTO_INCREMENT,
  `image_name` varchar(255) DEFAULT NULL,
  `image_path` varchar(300) DEFAULT NULL,
  `storage_id` bigint DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `FKdf54qm3ou9ukldi40gfhdhblq` (`storage_id`),
  CONSTRAINT `FKdf54qm3ou9ukldi40gfhdhblq` FOREIGN KEY (`storage_id`) REFERENCES `storage` (`storage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage_images`
--

LOCK TABLES `storage_images` WRITE;
/*!40000 ALTER TABLE `storage_images` DISABLE KEYS */;
INSERT INTO `storage_images` VALUES (1,'양종욱의 방','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room1.jpg',2),(2,'양종욱의 방','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room10.jpeg',2),(3,'윤주혜의 방','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room11.jpeg',3),(4,'윤주혜의 방','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room12.jpeg',3),(5,'이원준의 방','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room13.jpeg',4),(6,'이원준의 방','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room14.jpeg',4),(7,'김현수의 방','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room15.avif',5),(8,'김현수의 방','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room2.jpg',5),(9,'차규빈의 방','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room3.jpg',6),(10,'차규빈의 방','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room4.jpg',6),(11,'배승우의 방','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room5.jpg',7),(12,'배승우의 방','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room6.jpg',7),(13,'김가연의 방','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room7.jpg',8),(14,'김가연의 방','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room8.jpeg',8),(15,'김테현의 옷장','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room9.jpeg',9),(16,'김테현의 옷장','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room15.avif',9),(17,'김종민의 옷장','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room3.jpg',10),(18,'김종민의 옷장','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room4.jpg',10),(19,'김종민의 옷장','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room13.jpeg',11),(20,'김종민의 옷장','https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/room14.jpeg',11),(21,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_224903/d384af4d-05d3-4ae3-b687-1343373d0ca7_room8.jpeg',12),(22,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_224903/be9d0874-3aad-4f4d-9ee1-892dc45c2c4e_room9.jpeg',12),(23,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_225142/36e3d9da-abec-4863-868b-f1bcb049840c_sto1.jpeg',13),(24,NULL,'https://kr.object.ncloudstorage.com/peerlock-image-storage/20230820_225917/a9273b4f-b70c-4595-8d95-334dc7a6da89_sto2.jpeg',14);
/*!40000 ALTER TABLE `storage_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile` (
  `profile_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `image_name` varchar(50) DEFAULT NULL,
  `introduction_text` varchar(255) DEFAULT NULL,
  `language` varchar(100) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`profile_id`),
  KEY `FKuganfwvnbll4kn2a3jeyxtyi` (`user_id`),
  CONSTRAINT `FKuganfwvnbll4kn2a3jeyxtyi` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `user_birth` datetime(6) DEFAULT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `user_phone_number` varchar(255) NOT NULL,
  `user_sex` int DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2023-08-20 21:17:47.221749','2023-08-20 21:17:47.221749','HOST','1970-01-01 09:16:30.708000','admin1','양종욱','1234','01012345678',0),(2,'2023-08-20 21:17:54.215679','2023-08-20 21:17:54.215679','HOST','1970-01-01 09:16:30.708000','admin2','윤주혜','1234','01012345678',0),(3,'2023-08-20 21:18:04.419345','2023-08-20 21:18:04.419345','USER','1970-01-01 09:16:30.708000','admin3','이원준','1234','01012345678',0),(4,'2023-08-20 21:18:15.250919','2023-08-20 21:18:15.250919','HOST','1970-01-01 09:16:30.708000','admin4','김가연','1234','01012345678',0),(5,'2023-08-20 21:18:25.805862','2023-08-20 21:18:25.805862','HOST','1970-01-01 09:16:30.708000','admin5','배승우','1234','01012345678',0),(8,'2023-08-20 22:53:44.925873','2023-08-20 22:53:44.925873','HOST','1970-01-01 09:16:30.708000','paik@naver.com','백종원','1234','01012345678',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-20 23:27:26
