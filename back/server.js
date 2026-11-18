import express from 'express';

const app = express();
app.use(express.json());   // lit le corps JSON des requêtes → req.body (AVANT les routes)

// Route de santé : sert à vérifier que le front atteint bien le back
app.get('/api/v1/health', (req, res) => {
  res.json({ ok: true, heure: new Date().toISOString() });
});

app.listen(3000, () => console.log('API sur http://localhost:3000'));