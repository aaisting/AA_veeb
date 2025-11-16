const mysql = require("mysql2/promise");
const fs = require("fs").promises;
const dbInfo = require("../../../vp2025config");
const dbConf = {
	host: dbInfo.configData.host,
	user: dbInfo.configData.user,
	password: dbInfo.configData.passWord,
	database: dbInfo.configData.dataBase
};

//@desc Home page for uploading gallery photos
//@route GET /photogallery
//@access public


const photogalleryhome = async (req, res)=>{
	let conn;

	try {
		
		conn= await mysql.createConnection(dbConf);
		let sqlReq = "SELECT filename, alttext FROM gallery_photos WHERE privacy >= ? AND deleted is NULL";
		const privacy = 2;
		const[rows, fields] = await conn.execute(sqlReq, [privacy]);
		console.log(rows);
		let gallerydata = [];
		for (let i = 0; i < rows.length; i++){
			let alttext = "galeriipilt";
			if (rows[i].alttext != ""){
				alttext = rows[i].alttext;
			}
			gallerydata.push({src: rows[i]. filename, alt: alttext});
		}
		res.render("photogallery", {galleryData: gallerydata, imageref: "/gallery/thumbs/"});
		
	}
	catch(err){
		console.log(err);
		res.render("galleryphotoupload");
	}
	finally {
		if(conn){
			await conn.end();
			console.log("Andmebaasiühendus suletud!");
		}
	}
};

module.exports = {
	photogalleryhome
};