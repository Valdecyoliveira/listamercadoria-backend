//NO CONSOLE -> yarn add pg - Adicionando biblioteca pro bd

//serve para controlar as requisições para o banco de dados [Controla o acesso criando conexões somente quando necessário]
const Pool = require('pg').Pool; 

//1 Abrir a conexão
//2 Executar o comando SQL (query, insert) 30ms (índice)
//3 Fechar a conexão

const pool = new Pool({
    user: 'izestagcjmucvz',
    password: '056ed2a05d8a5847e1ffa34481e9b60ae0622fd7505537776a8f04f33ac562d2',
    host: 'ec2-54-88-130-244.compute-1.amazonaws.com',
    database: 'd4tfa13hliphse',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});

// const sqldrop = `drop table leads`;

// pool.query(sqldrop, function(error, result){
//     if(error)
//         throw error;
    
//         console.log(result.rowCount);
// })


//CREATE SQL
// const sql = `CREATE TABLE IF NOT EXISTS leads(
//             id serial primary key,
//             name varchar(200) not null,
//             telefone varchar (15) not null,
//             city varchar (50) not null,
//             contated varchar (10) not null
// )`;

// pool.query(sql, function(error, result){
//     if(error)
//         throw error
    
//     console.log('Tabela criada com sucesso!');
// })

// INSERT SQL
// const sql_insert = `INSERT INTO leads (name, telefone, city ,contated) 
//                     VALUES ('Fabio', '17 99192-0157', 'Rio Preto' , false)`;

// pool.query(sql_insert, function(error, result){
//     if(error)
//         throw error;
    
//         console.log(result.rowCount);
// })

//SELECT SQL
// const sql_select = `SELECT * FROM leads`;

// pool.query(sql_select, function(error, result){
//     if(error)
//         throw error;
    
//         console.log(result.rows);
// })