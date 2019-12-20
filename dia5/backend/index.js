import express from 'express';
import cors from 'cors';

import Ativo from './ativo';
import Carteira from './carteira';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/ativo', Ativo);
app.use('/carteira', Carteira);

app.listen(3000, () =>
    console.log('Servidor rodando na porta 3000'),
);