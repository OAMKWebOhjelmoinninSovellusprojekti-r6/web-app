<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Food Master - ruokasovellus</h1>

  <p align="center">
    Jokaisen herkkusuun ykkösvalinta
    <br />
    <a href="http://foodmaster.live">Katso demo</a>
  </p>
</div>

## Tietoa projektista

Tämä dokumentti kertoo keväällä 2022 Oulun ammattikorkeakoulussa ryhmän 6 tekemästä pro-jektityöstä, jonka tarkoituksena oli saada aikaan toimiva ruuantilaussovellus. Työn tavoitteena oli saada toimiva nettisivu, johon käyttäjä voisi tehdä tunnukset, selata sovelluksessa olevia ravinto-loita, sekä tehdä kuvitteellinen ruokatilaus valitsemalla ravintolan ruokalistalta haluamiansa ruo-kia. Lisäksi korkean arvosanan saavuttamiseksi vaatimuksina oli myös erilliset toiminnallisuudet ravintolan omistajalle, joka pystyisi luomaan palveluun uusia ravintoloita ja lisäämään niiden ruo-kalistoille artikkeleita.

<p align="right">(<a href="#top">takaisin alkuun</a>)</p>



### Käytetyt teknologiat

* [React.js](https://reactjs.org/)

<p align="right">(<a href="#top">takaisin alkuun</a>)</p>



## Projektin käyttöönotto ja esittely

Projektin saat käyttöön seuraamalla alla olevia ohjeita.

### Esivaatimukset

Projektia varten tarvittavat paketit
* Mysql
  ```sh
  sudo apt install mysql-server
  ```

* Node
  ```sh
  sudo apt install nodejs
  ```

### Paikallinen käyttöönotto

_Alta löydät ohjeet sovelluksen käyttöönottoon paikallisessa kehitysympäristössä. Kaikki tarvittava sovelluksen käynnistystä varten löytyy tästä dokumentista._

1. Kloonaa repository
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Asenna tarvittavat NodeJS-kirjastot palvelinohjelmalle `./server`
   ```sh
   npm install
   ```
3. Asenna tarvittavat NodeJS-kirjastot asiakassovellukselle `./client`
   ```sh
    npm install
    ```
4. Aja tietokantarakenne tiedostosta `server/db.sql`
   ```sql
    sudo mysql -u root -p webapp < db.sql
   ```
5. Aseta tarvittavat ympäristömuuttujat palvelinsovellukseen `server/.env`
   ```js
    MYSQL_CONNECTION_LIMIT=10 // sallittujen tietokantayhteyksien maksimimäärä
    MYSQL_HOST=localhost // mysql-tietokannan paikallinen osoite
    MYSQL_USER=dbuser // mysql-tietokannan käyttäjätunnus
    MYSQL_PASSWORD=wordpass321 // mysql-tietokannan salasana
    MYSQL_DATABASE=foodmaster // mysql-tietokannan nimi
    TOKEN_SECRET=asdf1234 // JWT Access tokenin hash merkkijono
    TOKEN_EXPIRE=10m // JWT Access tokenin erääntymisaika
   ```
6. Aseta tarvittavat ympäristömuuttujat asiakassovellukseen `client/.env`
   ```js
    REACT_APP_SERVER_HOST=http://localhost:3000
   ```

<p align="right">(<a href="#top">takaisin alkuun</a>)</p>




## Sovelluksen käyttö

Tähän esimerkkejä sovelluksen toiminnasta, kuvina, koodina tms.

<p align="right">(<a href="#top">takaisin alkuun</a>)</p>



## Lisenssi

Jaettu MIT lisenssin alaisena.

<p align="right">(<a href="#top">takaisin alkuun</a>)</p>




## Projektin tekijät

- Antti Haverinen
- Gerhard Klemola
- Tomi Niemelä
- Henry Väisänen

Linkki projektiin: [https://github.com/OAMKWebOhjelmoinninSovellusprojekti-r6](https://github.com/OAMKWebOhjelmoinninSovellusprojekti-r6)

<p align="right">(<a href="#top">takaisin alkuun</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
