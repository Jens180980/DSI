import db from '../Config/db.config.js';

class SongModel {
	constructor() {
		console.log('Class song model is loaded');
	}

	list = (req, res) => {
		return new Promise((resolve, reject) => {
			const orderBy = req.query.orderBy || 's.id';
			const limit = req.query.limit ? `LIMIT ${req.query.limit}` : '';
			let sql = `SELECT s.id, s.title, a.name AS artist 
						FROM song s 
						INNER JOIN artist a 
						ON s.artist_id = a.id 
						ORDER BY ${orderKey} ${limit}`;
			db.query(sql, (err, result) => {
				if(err) {
					reject(err);
				} else {
					resolve(result);
				}
			})
		})
	}

	get = (req, res) => {
		return new Promise((resolve, reject) => {
			const sql = `SELECT s.id, s.title, s.content, a.name AS artist  
							FROM song s 
							JOIN artist a 
							ON s.artist_id = a.id 
							WHERE s.id = ?`;
			db.query(sql, [req.params.id], (err, result) => {
				if(err) {
					reject(err)
				} else {
					resolve(...result)
				}
			})
		})
	}

	create = async (req, res) => {
		return new Promise ((resolve, reject) => {

		const arrFormValues = (Object.values(req.body));
		const sql = `INSERT INTO song(title, content, artist_id) 
						VALUES(?,?,?)`;
		db.query(sql, arrFormValues, (err, result) => {
			if(err) {
				reject(err)
			} else {
				resolve({ status: 'ok', id: result.insertId })
			}
		})
	})
	}

	update = async (req, res) => {
		return new Promise ((resolve, reject) => {

		const arrFormValues = (Object.values(req.body));
		const sql = `UPDATE song
						SET title = ?, content = ?, artist_id = ?
						WHERE id = ?`
		db.query(sql, arrFormValues, (err, result) => {
			if(err) {
				reject(err)
			} else {
				resolve({ status: 'ok', id: req.body.id })
			}
		})
	})
	}

	delete = async (req, res) => {
		return new Promise ((resolve, reject) => {

		const arrFormValues = (Object.values(req.body));
		const sql = `DELETE song
						WHERE id = ?`
		db.query(sql, arrFormValues, (err, result) => {
			if(err) {
				reject(err)
			} else {
				resolve({ status: 'ok', id: req.body.id })
			}
		})
	})
	}

}

export default SongModel;