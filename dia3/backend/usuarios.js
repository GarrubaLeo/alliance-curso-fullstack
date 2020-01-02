import {Router} from 'express';
import { Client } from 'pg';

const router = Router();

router.get('/', async (req, res) =>{
    let resultado = [];
    const client = criaClient();

    await client.connect();
    let queryResult = await client.query("select CODIGO, NOME, TELEFONE, EMAIL, SALDO_CREDITOS from USUARIOS;");
    for (let row of queryResult.rows){
        resultado.push({
            codigo: row.codigo,
            nome: row.nome,
            telefone: row.telefone,
            email: row.email,
            saldoCreditos: row.saldo_creditos
        });
    }
    await client.end();

    res.send(JSON.stringify(resultado));
});

//ENTRADA É:
//payload = {nome: string, telefone: string, email: string, saldoCreditos: numerico}
router.post('/', async (req, res) => {
    let payload = req.body;
    let sql = `insert into USUARIOS(CODIGO, NOME, TELEFONE, EMAIL, SALDO_CREDITOS) values
        (nextval('usuarios_sequence'), '${payload.nome}', '${payload.telefone}', '${payload.email}', ${payload.saldoCreditos});
    `;

    console.log(sql);
    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(201);
    res.send();
});

router.put('/:codigo', async(req, res) => {
    let codigo = req.params.codigo;
    let payload = req.body;
    
    let sql = `update USUARIOS set
            NOME = '${payload.nome}',
            TELEFONE = '${payload.telefone}',
            EMAIL = '${payload.email}',
            SALDO_CREDITOS = '${payload.saldoCreditos}'
        where
            CODIGO = ${codigo};
    `;

    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(204);
    res.send();
});

router.delete('/:codigo', async (req, res) => {
    let codigo = req.params.codigo;
    
    let sql = `delete from USUARIOS
        where
            CODIGO = ${codigo};
    `;

    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(204);
    res.send();
});

// function addCreditos() {
//     router.get('/:codigo', async (req, res) => {
//         let codigo = req.params.codigo;
//         let extracao = [];
//         const client = criaClient();

//         await client.connect();
//         let queryResult = await client.query(`select SALDO_CREDITOs from USUARIOS where CODIGO = ${codigo};`);
//         for(let row of queryResult.rows){
//             extracao.push({
//                 saldoCreditos: row.saldo_creditos
//             });
//         }
//         await client.end();
//         console.log(extracao);
//     });

//     saldoAtual = extracao;
// }

function criaClient() {
    return new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'db_dia3',
        password: '123456',
        port: 5432
    });
}

export default router;