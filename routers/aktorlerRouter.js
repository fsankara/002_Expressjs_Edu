//imports
const router = require("express").Router();
let data = require("../data.js");

// GET Method
router.get("/", (req, res) => {
  //res.send("Aktörler Listesi")
  res.status(200).json(data);
});

// POST Method
let next_id = 4;
// next ile sıradaki middleware e git
router.post("/", (req, res, next) => {
  //endpoint deniyor bu adrese
  let yeni_aktor = req.body;
  if (!yeni_aktor.isim) {
    next({
      statusCode: 400,
      errorMessage: "Aktör eklemek için isim girmelisiniz.",
    });
  } else if (yeni_aktor.isim && !yeni_aktor.filmler) {
    next({
      statusCode: 400,
      errorMessage: "Aktör eklemek için filimler girmelisiniz.",
    });
  } else {
    yeni_aktor.id = next_id;
    next_id++;
    data.push(yeni_aktor);
    res.status(201).json(yeni_aktor);
  }
});

router.delete("/:id", (req, res) => {
  const silinecek_aktor_id = req.params.id;
  const silinecek_aktor = data.find(
    (aktor) => aktor.id === Number(silinecek_aktor_id)
  );

  if (silinecek_aktor) {
    data = data.filter((aktor) => aktor.id !== Number(silinecek_aktor_id));
    res.status(204).end();
  } else {
    res
      .status(404)
      .json({ errorMessage: "Silmeye çalıştığınız aktör sistemde yok." });
  }
});

router.get("/:id", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  const { id } = req.params;
  const aktor = data.find((aktor) => aktor.id === parseInt(id));
  if (aktor) {
    res.status(200).json(aktor);
  } else {
    res.status(404).send("Aradığınız aktör bulunamadı!");
  }
});

module.exports = router;
