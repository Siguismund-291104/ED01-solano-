const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const SECRET = 'clave_secreta';
const posts = [];


// Conexión MySQL
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234', // Cambia esto por tu contraseña
  database: 'ED1_SWOS'
});

conexion.connect(err => {
  if (err) {
    console.error(' Error MySQL:', err);
  } else {
    console.log(' Conectado a MySQL');
  }
});


// ==============================
// OBTENER PATROCINADORES
// ==============================
app.get('/api/patrocinadores', (req, res) => {
  const sql = 'SELECT * FROM patrocinador';

  conexion.query(sql, (err, resultados) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener patrocinadores' });
    } else {
      res.json(resultados);
    }
  });
});


// ==============================
// GUARDAR REGISTRO
// ==============================
app.post('/api/registro', (req, res) => {
  const { nombre, correo } = req.body;

  const sql = 'INSERT INTO registro (nombre, correo) VALUES (?, ?)';

  conexion.query(sql, [nombre, correo], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error al guardar registro' });
    } else {
      res.json({ mensaje: 'Registro guardado correctamente' });
    }
  });
});

// ==============================
// LOGIN FORO
// ==============================
app.post('/api/login', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Usuario requerido' });
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });

  res.json({ access_token: token });
});


// ==============================
// MIDDLEWARE TOKEN
// ==============================
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
}


// ==============================
// CREAR POST
// ==============================
app.post('/api/posts', authenticateToken, (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Contenido requerido' });
  }

  const post = {
    id: posts.length + 1,
    author: req.user.username,
    content,
    date: new Date()
  };

  posts.push(post);
  res.json(post);
});


// ==============================
// OBTENER POSTS
// ==============================
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// ==============================
// OBTENER REGISTRO PLATAFORMA EXTERNA
// ==============================
app.get('/api/registro', (req, res) => {
  const sql = 'SELECT * FROM registro';

  conexion.query(sql, (err, resultados) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al cargar registros' });
    } else {
      res.json(resultados);
    }
  });
});


// Servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
