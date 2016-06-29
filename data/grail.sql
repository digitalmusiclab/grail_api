-- MySQL dump 10.13  Distrib 5.5.49, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: grail
-- ------------------------------------------------------
-- Server version	5.5.49-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artist` (
  `g_art_id` int(11) unsigned NOT NULL,
  `g_name` text,
  `musicbrainz` varchar(36) DEFAULT NULL,
  `spotify` varchar(30) DEFAULT NULL,
  `musixmatch` int(11) DEFAULT NULL,
  `rdio` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`g_art_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` VALUES (1,'David Bowie','30501715-6870-3f9a-bd25-a4791dcf87f4','5edKZc17JA7e6aCHoxDuye',98748,'a99484'),(2,'Queen','87961407-0e03-3d7a-b00c-a40b875ec5ae','471Ycbmda1lAuLMscQvxMR',96390,'a93037'),(3,'Nirvana','c2e0911a-73ac-38db-ad5f-c691fe45ef3c','4cONNM3Yyhpoxq6cmjFRAc',495820,'a87449'),(4,'The Beatles','a29cfba7-889a-3966-a372-7c282288e7ab','7HxwV8NK5Ea0UaOPamhuxe',963693,'a84038');
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `track`
--

DROP TABLE IF EXISTS `track`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `track` (
  `g_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `g_art_id` int(11) unsigned NOT NULL,
  `g_name` text,
  `musicbrainz` varchar(36) DEFAULT NULL,
  `spotify` varchar(30) DEFAULT NULL,
  `isrc` varchar(15) DEFAULT NULL,
  `msd` int(11) DEFAULT NULL,
  `musixmatch` int(11) DEFAULT NULL,
  `rdio` varchar(36) DEFAULT NULL,
  `echonest` varchar(19) DEFAULT NULL,
  PRIMARY KEY (`g_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `track`
--

LOCK TABLES `track` WRITE;
/*!40000 ALTER TABLE `track` DISABLE KEYS */;
INSERT INTO `track` VALUES (1,1,'Song 1','b2416511-31dd-4770-b32e-0f06ec87e90a','2kD8q4RE7i59z0kX7YidhP','GBBSN0500246',1234567,145259,'r329006','SOJZYMS1358D001131'),(2,2,'Song 1','b2416511-31dd-4770-b32e-0f06ec87e90a','2kD8q4RE7i59z0kX7YidhP','GBBSN0500246',1234567,145259,'r329006','SOJZYMS1358D001131'),(3,3,'Best Grail song','82d3dd6d-7d97-3416-9cc3-91a389436874','4DsTKmZFDe2wWfdgSKCb1p','USSM11103790',37612,467379,'r554969','SOTNDTD13447A33C66'),(4,3,'Best Grail song','82d3dd6d-7d97-3416-9cc3-91a389436874','0mTf5njyjkaAb4tpJsTQYE','GBCRL1100113',37612,467379,'r554969','SOTNDTD13447A33C66'),(5,4,'Another great song',NULL,'7voCqDg5xgF1LZFrmbPS7w','GB6BY0900006',31255,4325,'r23453','SOHKSUZ12AB0185AD0');
/*!40000 ALTER TABLE `track` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-28 17:22:25
