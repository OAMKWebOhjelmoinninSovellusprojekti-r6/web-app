<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Food Master - ruokasovellus</h1>

  <p align="center">
    Jokaisen herkkusuun ykkösvalinta
    <br />
    <a href="http://foodmaster.live">Live</a>
    -
    <a href="https://www.youtube.com/watch?v=srrM4zYZCyc">Esittelyvideo</a>
  </p>
</div>

## Tietoa projektista

Tämä dokumentti kertoo keväällä 2022 Oulun ammattikorkeakoulussa ryhmän 6 tekemästä projektityöstä, jonka tarkoituksena oli saada aikaan toimiva ruuantilaussovellus. Työn tavoitteena oli saada toimiva nettisivu, johon käyttäjä voisi tehdä tunnukset, selata sovelluksessa olevia ravintoloita, sekä tehdä kuvitteellinen ruokatilaus valitsemalla ravintolan ruokalistalta haluamiansa ruokia. Lisäksi korkean arvosanan saavuttamiseksi vaatimuksina oli myös erilliset toiminnallisuudet ravintolan omistajalle, joka pystyisi luomaan palveluun uusia ravintoloita ja lisäämään tuotteita omien ravintoloiden ruokalistoille.

### Käytetyt teknologiat

* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org)
* [Express.js](https://expressjs.com/)

## Projektin käyttöönotto ja esittely

Projektin saat käyttöön seuraamalla alla olevia ohjeita.

### Esivaatimukset

Projektin esimerkkiohjeissa on käytetty Ubuntu-käyttöjärjestelmää. Projektia varten tarvittavat paketit
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
   git clone https://github.com/OAMKWebOhjelmoinninSovellusprojekti-r6/web-app.git
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
7. Käynnistä palvelinsovellus kansiosta `./server`
   ```sh
   npm start
   ```
8. Käynnistä asiakassovellus kansiosta `./client`
   ```sh
    npm start
    ```

## Sovelluksen käyttö

Sovelluksessa käyttäjä voi tehdä ravintoloista ruokatilauksia. Sovelluksen päänäkymässä käyttäjä voi selata ravintoloita rekisteröitymättä. Päänäkymässä on myös mahdollista kirjautua sisään tai luoda uusi käyttäjätunnus.

![etusivu](https://user-images.githubusercontent.com/92326664/165806410-f2cca2f6-ee4a-4436-aa2f-d76104d20829.PNG)


Rekisteröitynyt asiakas voi lisätä ravintoloiden tuotteita ostoskoriin ja muokata tuotemääriä ja poistaa tuotteita ostoskorista. Toimitusosoitteen muuttaminen onnistuu ostoskorinäkymästä. Tilauksen tehtyä tästä tallentuu tiedot tilaushistoriaan, joita asiakas voi myöhemmin selailla.

Ravintolan omistaja voi luoda omalla käyttäjätunnuksella ravintoloita ja lisätä tuotteita ravintolan näkymään. Lisäksi omistaja voi selata ravintolakohtaisesti tehtyjä tilauksia.


## Lisenssi

Jaettu MIT lisenssin alaisena.

## Projektin tekijät

- Antti Haverinen
- Gerhard Klemola
- Tomi Niemelä
- Henry Väisänen

Linkki projektiin: [https://github.com/OAMKWebOhjelmoinninSovellusprojekti-r6](https://github.com/OAMKWebOhjelmoinninSovellusprojekti-r6)
