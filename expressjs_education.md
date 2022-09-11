# EXPRESS JS NOTLARI

## 1. Genel 

- Express js Node.js üzerinde çalışan backend frameworkdür.
- > npm init -y
- > npm install express
- .gitignore file https://www.toptal.com/developers/gitignore/api/node

## 2. Express ile Hello World

- http://localhost:5000

    ```javascript
        const express = require('express')

        const server = express()

        server.get('/', (req, res) => {
            res.send("Expres'ten Merhaba")
        })

        server.listen(5000, () => {
            console.log("http://localhost:5000 adresine gelen istekler dinleniyor.")
        })
    ```

- > node index.js

## 3. Express Routing 

- http://localhost:5000/aktorler

    ```javascript
        const express = require('express')

        const server = express()

        server.get('/', (req, res) => {
            res.send("Expres'ten Merhaba")
        })


        server.get('/aktorler', (req, res) => {
            res.send("Aktörler Listesi")
        })

        server.listen(5000, () => {
            console.log("http://localhost:5000 adresine gelen istekler dinleniyor.")
        })
    ```

## 4. Data import

- touch data.js

    ```javascript
        module.exports = [
        {
            id:1,
            isim: "Kemal Sunal",
            filmler : ["Sakar Şakir", "Üç Kağıtçı", "Tosun Paşa"],
        },

        {
            id:2,
            isim:"Şener Şen",
            fimler:["Davaro", "Kibar Feyzo", "Tosun Paşa"],
        },

        {
            id:3,
            isim:"Adile Naşit",
            filmler:["Davaro", "Neşeli Günler", "Süt Kardeşler"],
        },


        ];
    ```

    ```javascript
        const data = require("./data.js")

        server.get('/aktorler', (req, res) => {
            //res.send("Aktörler Listesi")
            res.status(200).json(data)
        })
    ```

## 5. Data Get with params ile basit bir restfull api

- Basit bir restfull api

    ```javascript
        const express = require("express");

        const data = require("./data.js");

        const server = express();

        server.get("/", (req, res) => {
        res.send("Expres'ten Merhaba");
        });

        server.get("/aktorler", (req, res) => {
        //res.send("Aktörler Listesi")
        res.status(200).json(data);
        });

        server.get("/aktorler/:id", (req, res) => {
        const { id } = req.params;
        const aktor = data.find((aktor) => aktor.id === parseInt(id));
        if (aktor) {
            res.status(200).json(aktor);
        } else {
            res.status(404).send("Aradığınız aktör bulunamadı!");
        }
        });

        server.listen(5000, () => {
        console.log("http://localhost:5000 adresine gelen istekler dinleniyor.");
        });
    ```