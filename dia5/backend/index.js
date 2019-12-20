import express from 'express';
import cors from 'cors';

import Ativo from './ativo';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/ativo', Ativo);

app.listen(3000, () =>
    console.log('Servidor rodando na porta 3000'),
);