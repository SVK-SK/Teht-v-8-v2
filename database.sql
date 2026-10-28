CREATE DATABASE IF NOT EXISTS urheilijadb
  CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci;
USE urheilijadb;

CREATE TABLE IF NOT EXISTS urheilijat (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  etunimi      VARCHAR(100) NOT NULL,
  sukunimi     VARCHAR(100) NOT NULL,
  kutsumanimi  VARCHAR(100),
  syntymavuosi DATE,
  paino        DECIMAL(5,2),
  kuva_url     VARCHAR(500),
  laji         VARCHAR(100) NOT NULL,
  saavutukset  TEXT
);

CREATE USER IF NOT EXISTS 'urheilija'@'localhost' IDENTIFIED BY 'salasana123';
GRANT ALL PRIVILEGES ON urheilijadb.* TO 'urheilija'@'localhost';
FLUSH PRIVILEGES;

INSERT INTO urheilijat (etunimi, sukunimi, kutsumanimi, syntymavuosi, paino, kuva_url, laji, saavutukset) VALUES
('Teemu', 'Selänne', 'Teukka Salama', '1970-07-03', 92.00, 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Teemu_Selanne_on_the_ice_November_2010.jpg?utm_source=fi.wikipedia.org&utm_campaign=imageinfo&utm_content=original', 'Jääkiekko', 'Olympiapronssia, NHL-uran pistepörssin voittoja'),
('Paavo', 'Nurmi', 'Lentävä suomalainen', '1897-06-13', 65.00, 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Paavo_Nurmi_%28Antwerp_1920%29.jpg?utm_source=fi.wikipedia.org&utm_campaign=index&utm_content=original', 'Juoksu', '9 olympiakultamitalia');