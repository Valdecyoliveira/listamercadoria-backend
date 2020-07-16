const express = require('express');
const cors = require('cors');
// //Dados em Memória
// const server = express();
// server.use(express.json());

// const leads = [
//     {id: 1, nome: 'Fabio Maia', contatado: true},
//     {id: 2, nome: 'Leonardo Pasin', contatado: false}
// ];

// server.get('/leads', function(request, response){
//     response.json(leads);
// })

// server.get('/leads/:id', function(request, response){

//     const id = request.params.id;
//     const lead = leads.filter(p => p.id == id);
//     return response.json(lead);

// })

// //POST PARA INSERÇÃO DE DADOS JSON
// server.post('/leads', function(request, response){

//     const {id, nome, contatado} = request.body;
//     leads.push({id, nome, contatado});
//     return response.status(201).send();

// })

// //DELETE DE DADOS JSON
// server.delete('/leads/:id', function(request, response){
//     const id = request.params.id;

//      for(let i = 0; i < leads.length; i++){
//         if(leads[i].id == id){
//             leads.splice(i, 1);
//             break;
//         }
    
//     }
//     return response.status(204).send();
// })

// //UPDATE DE DADOS JSON
// server.put('/leads/:id', (req, res) => {

//     const id = req.params.id;
//     const lead = req.body;

//     leads.forEach(p => {
//         if(p.id == id){
//             p.nome = lead.nome;
//             p.contatado = lead.contatado;
//             return;
//         }
//         return res.send();
//     })

// })

// server.listen(3000);

const Pool = require('pg').Pool; 

//CONEXÃO COM HEROKU
const pool = new Pool({
    user: 'izestagcjmucvz',
    password: '056ed2a05d8a5847e1ffa34481e9b60ae0622fd7505537776a8f04f33ac562d2',
    host: 'ec2-54-88-130-244.compute-1.amazonaws.com',
    database: 'd4tfa13hliphse',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});

const server = express();
server.use(cors());
server.use(express.json());

//request.params.id > /leads/:id
//request.body > corpo da msg
//request.query.name > /tarefa/?name=ABC

//PESQUISA COMPLETA
server.get('/leads', async function(request, response) {
    const result = await pool.query('SELECT * FROM leads');
    return response.json(result.rows);
})

//PESQUISA POR ID
server.get('/leads/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `SELECT * FROM leads WHERE id = $1`;
    const result = await pool.query(sql, [id]);
    return response.status(204).send();
})

//TERMINAR - PESQUISA POR CONTATED
server.get('/leads/search', async function(request, response) {
    const contated = request.query.contated;
    const result = await pool.query('SELECT * FROM leads WHER contated = true');
    return response.status(204).send();
})

//INSERÇÃO
server.post('/leads', async function(request, response) {
    const name = request.body.name; //json
    const telefone = request.body.telefone;
    const city = request.body.city;
    const sql = `INSERT INTO leads (name, telefone, city, contated) VALUES ($1, $2, $3, $4)`;
    const result = await pool.query(sql, [name, telefone, city, false]);
    return response.status(204).send();
})

//DELETE
server.delete('/leads/:id', async function(request, response){
    const id = request.params.id;
    const sql = `DELETE FROM leads where id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})

//UPDATE POR ID
server.put('/leads/:id', async function(request, response){
    const id = request.params.id;
    const {name, telefone, city, contated} = request.body;
    const sql = `UPDATE leads set name = $1, telefone = $2, city = $3, contated = $4 where id = $5`;
    await pool.query(sql, [name, telefone, city, contated, id]);
    return response.status(204).send();
})

//UPDATE POR ID MAS SOMENTE NO contated pra true
server.put('/leads/:id/contated', async function(request, response){
    const id = request.params.id;
    const sql = `UPDATE leads set contated = true where id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})

//UPDATE POR ID MAS SOMENTE NO contated pra false
server.put('/leads/:id/uncontated', async function(request, response){
    const id = request.params.id;
    const sql = `UPDATE leads set contated = false where id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);
