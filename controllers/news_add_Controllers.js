const dateTimeET = require('../src/dateTimeET');
const mysql = require('mysql2/promise');
const dbConfAksel = require('../vp2025config');
const textRef = "public/txt/vanasonad.txt";

//uudiste lehekülg
const news_home_page = (req, res) => {
  res.render("news_add");
};

//uued uudised

const news_all = async (req, res) => {
  let conn;
  const sqlReq = "SELECT * FROM news_add";
  try {
    conn = await mysql.createConnection(dbConfAksel);
    console.log("Andmebaasiühendus loodud");
    const [rows] = await conn.execute(sqlReq);
    res.render("uudiste_lisamine", { newsList: rows });
  } catch (err) {
    console.log("Viga: " + err);
    res.render("uudiste_lisamine", { newsList: [] });
  } finally {
    if (conn) {
      await conn.end();
      console.log("Andmebaasiühendus suletud!");
    }
  }
};






module.exports = {
  news_home_page,
  news_all

};
