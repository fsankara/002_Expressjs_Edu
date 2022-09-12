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

## 5. Browserdan parametre almak - params ile basit bir restfull api

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

## 6. Nodemon Kullanımı

- Dosyada değişiklik yapıldığında otomatik olarak serverı restart eder.
- > npm install -D nodemon //dev dependencie olarak kurar

    ```javascript
        "scripts": {
            "start" : "node index.js",
            "server" : "nodemon index.js",
            "test": "echo \"Error: no test specified\" && exit 1"
        },
    ```
- > npm run server
- > npx nodemon index.js

## 7. Express ile Sunucuya Gelen İstekten Veri Okumak

- /aktorler/1?isim=kemal&soyadi=sunal -> req.params ve req.query

    ```javascript
        server.get("/aktorler/:id", (req, res) => {
        console.log(req.params) // :id gibi parametre verileri
        console.log(req.query)// ? işareti sonrası veriler


        { id: '1' }
        { isim: 'kemal' }
        { soyadi: 'sunal'}
    ```
- req.body ile gelen istekleri görüyoruz.
- postman yükle. GET çağrısı yap. body raw altına json veri ekle 
- `console.log(req.body) // postman ile body ile gelen veri` ile gelen request leri al.

    ```javascript
        const express = require("express");

        const data = require("./data.js");

        const server = express();

        server.use(express.json())

        server.get("/", (req, res) => {
        res.send("Expres'ten Merhaba.");
        });

        server.get("/aktorler", (req, res) => {
        //res.send("Aktörler Listesi")
        res.status(200).json(data);
        });

        server.get("/aktorler/:id", (req, res) => {
        console.log(req.params)
        console.log(req.query)
        console.log(req.body)
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

## 8. Express Routing Özelliği

- Kullanıcadan gelen istekleri ilgili fonksiyonlara yönlendirmeye yarar.

- Tarayıcıdan gelen istekler GET metodu ile geliyor.

- POST metodu ile istek göndermeye bakalım.

    ```javascript
        let next_id =4//normalde id artırımını veritabanı otomatik yapar.
        server.post("/aktorler", (req, res) =>{ // aynı routingin get metodu var. Birbiriyle karışmıyor.
        let yeni_aktor =req.body // postmandan yazdığımız post metodunun body raw json kısmını aldık
        yeni_aktor.id = next_id
        next_id++
        data.push(yeni_aktor)// gelen veriyi data verisine ekledik
        res.status(201).json(yeni_aktor) ///response olarak eklenen veriyi gösterdik

        })
    ```

- DELETE metoduna bakalım

    ```javascript
        server.delete("/aktorler/:id", (req, res) =>{
        const silinecek_aktor_id = req.params.id
        const silinecek_aktor = data.find(aktor => aktor.id === Number(silinecek_aktor_id))

        if (silinecek_aktor) {
            data = data.filter(aktor => aktor.id !== Number(silinecek_aktor_id))
            res.status(204).end() // end ile bitir
        } else {
            res
            .status(404)
            .json({errorMessage: "Silmeye çalıştığınız aktör sistemde yok."})
        }
        })
    ````

    - POSTMAN den DELETE metodunu seç http://localhost:5000/aktorler/3 istek yolla

- PUT metodu ile kayıt değiştirme ödev.

- Router kullanımı
    - `./routers` klasörü oluştur.
    - `./routers/aktorlerRouter.js` oluştur

        ```javascript
            const router = require('express').Router()

            let  data = require("../data.js");

            router.get("/", (req, res) => { // ARTIK "/aktorler" yazmaya gerek yok.
                //res.send("Aktörler Listesi")
                res.status(200).json(data);
            });
            
            
            let next_id =4
            router.post("/", (req, res) =>{//endpoint deniyor bu adrese
                let yeni_aktor =req.body 
                yeni_aktor.id = next_id
                next_id++
                data.push(yeni_aktor)
                res.status(201).json(yeni_aktor)
            
            })
            
            router.delete("/:id", (req, res) =>{
                const silinecek_aktor_id = req.params.id
                const silinecek_aktor = data.find(aktor => aktor.id === Number(silinecek_aktor_id))
            
                if (silinecek_aktor) {
                data = data.filter(aktor => aktor.id !== Number(silinecek_aktor_id))
                res.status(204).end()
                } else {
                res
                    .status(404)
                    .json({errorMessage: "Silmeye çalıştığınız aktör sistemde yok."})
                }
            })
            
            router.get("/:id", (req, res) => {
                console.log(req.params)
                console.log(req.query)
                console.log(req.body)
                const { id } = req.params;
                const aktor = data.find((aktor) => aktor.id === parseInt(id));
                if (aktor) {
                res.status(200).json(aktor);
                } else {
                res.status(404).send("Aradığınız aktör bulunamadı!");
                }
            });

            module.exports = router
        ```

    - index.js
        - `const aktorlerRouter = require('./routers/aktorlerRouter')` // index.js
        - `server.use("/aktorler", aktorlerRouter)` // aktorler adresini aktorlerRouter.js e gönder

## 9. EXPRESS Middleware Nedir? Nasıl Kullanılır.

- Middleware logger.js
    ```javascript
        module.exports = (req, res, next) => {
        console.log(`${new Date().toUTCString()} - ${req.method} - ${req.hostname} `)
        next()
        }


        server.use(logger)
    ```
- errorHandling.js
    ```javascript
        module.exports = (err, req, res, next) =>{
        res.status(err.statusCode).json(err)
        }

        //middleware en sona
        server.use(errorHandling)
    ```