let token = null;

// ==============================
// LOGIN
// ==============================
function login() {
  const username = document.getElementById('username').value;

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  })
  .then(res => res.json())
  .then(data => {
    if (data.access_token) {
      token = data.access_token;
      document.getElementById('loginResult').textContent = 'Login correcto';
    } else {
      document.getElementById('loginResult').textContent = 'Error al iniciar sesión';
    }
  });
}


// ==============================
// CREAR POST
// ==============================
function createPost() {
  const content = document.getElementById('postContent').value;

  fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ content })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('postResult').textContent = 'Publicación creada';
    getPosts();
  });
}


// ==============================
// OBTENER POSTS
// ==============================
function getPosts() {
  fetch('/api/posts')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById('postsResult');
    contenedor.innerHTML = '';

    data.forEach(post => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${post.author}</strong>: ${post.content}`;
      contenedor.appendChild(div);
    });
  });
}
