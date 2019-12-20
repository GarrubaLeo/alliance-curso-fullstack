import { Router } from 'express';
import { Client } from 'pg';

const router = Router();

router.get('/', async (req, res) => {
    let resultado = [];
    const client = criaClient();

    await client.connect();
    let queryResult = await client.query("select CODIGO_ATIVO, QUANTIDADE, PRECO_MEDIO from CARTEIRA;")
    for(let row of queryResult.rows){
        resultado.push({
            codigoAtivo: row.codigo_ativo,
            quantidade: row.quantidade,
            precoMedio: row.preco_medio
        });
    }
    await client.end();

    res.send(JSON.stringify(resultado));
});

router.post('/', async (req, res) => {
    let payload = req.body;
    const client = criaClient();
    await client.connect();

    let sql = `insert into CARTEIRA (CODIGO_ATIVO, QUANTIDADE, PRECO_MEDIO) values
        ('${payload.codigoAtivo}', ${payload.quantidade}, 0);    
    `;
    console.log(sql);
    let sqlOp = `insert into OPERACOES (ID, CODIGO_ATIVO, TIPO, PRECO, QUANTIDADE) values
        (nextval('SEQ_OPERACOES_ID'), '${payload.codigoAtivo}', 'S', ${payload.preco}, '${payload.quantidade}')
    `;
    console.log(sqlOp);
    
    await client.query(sql);
    await client.query(sqlOp);
    await client.end();

    res.status(201);
    res.send();
})

function criaClient() {
    return new Client ({
        user: 'postgres',
        host: 'localhost',
        database: 'db_dia5',
        password: '123456',
        port: 5432
    });
};

export default router;