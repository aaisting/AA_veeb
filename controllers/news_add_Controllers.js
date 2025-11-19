const dateTimeET = require('../src/dateTimeET');
const mysql = require('mysql2/promise');
const dbConfAksel = require('../vp2025config');
const textRef = "public/txt/vanasonad.txt";

//eesti film
const filmHomePage = (req, res) => {
  res.render("eestifilm");
};

//inimesed eesti filmis
const filmPeople = async (req, res) => {
  let conn;
  const sqlReq = "SELECT * FROM person";
  try {
    conn = await mysql.createConnection(dbConfAksel);
    console.log("Andmebaasiühendus loodud");
    const [rows] = await conn.execute(sqlReq);
    res.render("filmiinimesed", { personList: rows });
  } catch (err) {
    console.log("Viga: " + err);
    res.render("filmiinimesed", { personList: [] });
  } finally {
    if (conn) {
      await conn.end();
      console.log("Andmebaasiühendus suletud!");
    }
  }
};

//inimeste lisamine eesti filmi
const filmPeopleAdd = (req, res) => {
  res.render("filmiinimesed_add", { notice: "Ootan sisestust!" });
};


const filmPeopleAddPost = async (req, res) => {
  let conn;
  const sqlReq = "INSERT INTO person (first_name, last_name, born, deceased) VALUES (?,?,?,?)";
  if (!req.body.firstNameInput || !req.body.lastNameInput || !req.body.bornInput) {
    res.render("filmiinimesed_add", { notice: "Andmed on vigased!" });
    return;
  }
  try {
    conn = await mysql.createConnection(dbConfAksel);
    console.log("Andmebaasiühendus loodud");
    let deceasedDate = req.body.deceasedInput || null;
    const [result] = await conn.execute(sqlReq, [
      req.body.firstNameInput,
      req.body.lastNameInput,
      req.body.bornInput,
      deceasedDate
    ]);
    console.log("Salvestati kirje id: " + result.insertId);
    res.render("filmiinimesed_add", { notice: "Andmed edukalt salvestatud!" });
  } catch (err) {
    console.log("Viga: " + err);
    res.render("filmiinimesed_add", { notice: "Tekkis tehniline viga!" });
  } finally {
    if (conn) {
      await conn.end();
      console.log("Andmebaasiühendus suletud!");
    }
  }
};


const filmPosition = async (req, res) => {
  let conn;
  const sqlReq = "SELECT * FROM position";
  try {
    conn = await mysql.createConnection(dbConfAksel);
    const [rows] = await conn.execute(sqlReq);
    res.render("filmiametid", { positionList: rows });
  } catch (err) {
    console.log("Viga: " + err);
    res.render("filmiametid", { positionList: [] });
  } finally {
    if (conn) {
      await conn.end();
    }
  }
};


const filmPositionAdd = (req, res) => {
  res.render("filmiametid_add", { notice: "Ootan sisestust!" });
};


const filmPositionAddPost = async (req, res) => {
  let conn;
  if (!req.body.positionNameInput) {
    res.render("filmiametid_add", { notice: "Palun kirjuta ameti nimetus!" });
    return;
  }
  try {
    conn = await mysql.createConnection(dbConfAksel);
    const sqlReq = "INSERT INTO position (position_name, description) VALUES (?,?)";
    const description = req.body.positionDescriptionInput || null;
    await conn.execute(sqlReq, [req.body.positionNameInput, description]);
    res.redirect("/eestifilm/ametid");
  } catch (err) {
    res.render("filmiametid_add", { notice: "Tekkis tehniline viga: " + err });
  } finally {
    if (conn) {
      await conn.end();
    }
  }
};

module.exports = {
  filmHomePage,
  filmPeople,
  filmPeopleAdd,
  filmPeopleAddPost,
  filmPosition,
  filmPositionAdd,
  filmPositionAddPost
};
