require('dotenv').config();
const express = require('express');
const { Client } = require('pg');

const app = express();

const client = new Client({
  host: 'db',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

async function connectWithRetry() {
  while (true) {
    try {
      await client.connect();
      console.log("✅ Conectado ao PostgreSQL");
      break;
    } catch (err) {
      console.log("⏳ Aguardando banco subir...");
      await new Promise(res => setTimeout(res, 3000));
    }
  }
}

connectWithRetry();

app.get('/', async (req, res) => {
  const result = await client.query('SELECT NOW()');
  res.send(`Banco conectado! Hora: ${result.rows[0].now}`);
});

app.listen(3000, () => {
  console.log('App rodando');
});