import { MongoClient } from 'mongodb';

const LOCAL_URI = 'mongodb://127.0.0.1:27017/';

async function test() {
  try {
    const client = new MongoClient(LOCAL_URI);
    await client.connect();
    
    console.log('✅ Conectado ao MongoDB Local!');
    
    const dbs = await client.db().admin().listDatabases();
    console.log('📊 Bancos disponíveis:');
    dbs.databases.forEach(db => console.log(`- ${db.name}`));
    
    await client.close();
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

test();