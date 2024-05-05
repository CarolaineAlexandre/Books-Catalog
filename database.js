const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8000;
const uri = 'mongodb://localhost:27017';
const dbName = 'livros';
const collectionName = 'livro';

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
  }));
  

async function connectBD(pageNumber, pageSize) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Conectado com sucesso");

        // Seleciona o banco de dados
        const db = client.db(dbName);

        // Seleciona a collection
        const collection = db.collection(collectionName);

        // Calcula o número de documentos a pular 
        const skip = (pageNumber - 1) * pageSize;

        // Realiza a consulta com skip e limit 
        const resultado = await collection.find().skip(skip).limit(pageSize).toArray();

        console.log(resultado);
        return resultado;
    } catch(error) {
        console.log("Erro ao realizar a conexão: ", error);
        throw error; // Adicionado para relançar o erro
    } finally {
        await client.close();
        console.log("Conexão fechada");
    }
}


app.get('/api/catalogoLivros', async (req, res) => {
    const { pageNumber, pageSize } = req.query;

    try {
        const resultado = await connectBD(parseInt(pageNumber), parseInt(pageSize));
        res.json(resultado);
    } catch (error) {
        console.error('Erro ao buscar banco:', error);
        res.status(500).json({ error: 'Erro ao buscar banco' });
    }
});

app.listen(port, () => {
    console.log("Servidor rodando na porta:", port);
});
