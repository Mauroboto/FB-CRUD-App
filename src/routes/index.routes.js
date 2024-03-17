const { Router } = require("express");
const router = Router();
const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("../../fireabse-form-app-firebase-adminsdk-1rup4-45b27081c2.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL:
    "https://fireabse-form-app-default-rtdb.europe-west1.firebasedatabase.app/",
});

const db = firebaseAdmin.database();

router.get("/", (req, res) => {
  db.ref("contacts").once("value", (snapshot) => {
    const data = snapshot.val();
    res.render("index", { contacts: data });
  });
});

router.post("/new-contact", (req, res) => {
  console.log(req.body);
  const newContact = {
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
  };
  db.ref("contacts").push(newContact);
  res.redirect("/");
});

router.get("/delete-contact/:id", (req, res) => {
  db.ref("/contacts/" + req.params.id).remove();
  res.redirect("/");
});

module.exports = router;
