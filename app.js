// const express = require("express");
// const mysql = require("mysql2");

// const app = express();
// const port = 3000;

// // const host = "localhost";
// // const username = "root";
// // const password = "root";
// // const database = "projeto1";

// let pool = mysql.createConnection({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "projeto1",
// });
// app.use(express.json());

// app.get("/path", req);

// const connection = mysql.createConnection({
//   host: host,
//   user: username,
//   password: password,
//   database: database,
// });

// 1.a.
const express = require("express");
// 1.b. - no terminal:
//          npm init -y
//          npm install express
// 1.c. - no terminal:
//          npm install mysql2
// no mysql cli / wrokbench / phpMyAdmin
// 2. CREATE DATABASE Aula7
// 2.a. CREATE TABLE `users` (
//            `id` INT NOT NULL AUTO_INCREMENT,
//            `Firstname` VARCHAR(100) NOT NULL,
//            `Lastname` VARCHAR(100) NOT NULL,
//            `Profession` VARCHAR(100) NOT NULL,
//            `Age` INT NOT NULL,
//            PRIMARY KEY (`id`)
//        );
const host = "localhost";
const username = "root";
const password = "";
const database = "projeto1";

const app = express();
const port = 3000;

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: host,
  user: username,
  password: password,
  database: database,
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err.message);
    return;
  }
  console.log("connection established to MySql");
});

// middleware
app.use(express.json());
/*
//PARTE 1
// rotas
//a
app.get('/books',(req,res)=>{
    const query = "SELECT * FROM users";
    connection.query(query,(err,rows)=>{
        if (err) {
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro na leitura dos livros");
        }
        res.send(rows);

    });
})

//b
app.post('/books',(req,res) => {

    const { title, isbn, genre, review, synopsis, pages, price, published,comment } = req.body;

    if( !title || !isbn || !genre || !review || !synopsis || !pages || !price || !published || !comment){
        return res.status(400).end("Dados obrigatórios em falta");
    }
    // const Firstname = req.body.Firstname;
    const query = "INSERT INTO books "
        + "(title, isbn, genre, review, synopsis, pages, price, published, comment) "
        + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(query,[title, isbn, genre, review, synopsis, pages, price, published, comment],
        (err,result)=>{
        if (err) {
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro na inserção do livro");
        }
        res.json({ linhasAfetadas: result.affectedRows });
    })
});


//c
app.get('/books/:genre',(req,res)=>{
    const genre = req.params.genre;
    const query = "SELECT * FROM books WHERE genre = ?";
    connection.query(query,[genre],(err,rows)=>{
        if (err) {
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro na leitura dos livros do género");
        }
        res.send(rows);

    });
})

// d
app.put('/books',(req,res)=>{
    const id = req.params.id;
    const { title, isbn, genre, review, synopsis, pages, price, published, comment } = req.body;

    const query = "UPDATE books SET "
        + "title = ?,"
        + "isbn = ?,"
        + "genre = ?,"
        + "review = ?,"
        + "synopsis = ?,"
        + "pages = ?,"
        + "price = ?,"
        + "published = ?,"
        + "comment = ? "
        +"WHERE id = ?";

    connection.query(query,[title, isbn, genre, review, synopsis, pages, price, published, comment, id],(err, result) =>{
        if (err) {  
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro na atualização do livro");
        }

        res.redirect('/books/' + id);
    });    
});


// parte 1 e
app.get('/books/:published',(req,res) => {
    const id = req.params.published;
       //buscar id aos parametros
    const query = "SELECT * FROM books WHERE published = ?";   //criar query

    connection.query(query,[id],(err, result) =>{   //establecer ligação 
        if (err) {  
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro na leitura do livro");
        }

        // caso não exista
        if(!result.length){
            return res.status(404).end("user não encontrado com esse id");
        }

        res.json({ resultado: result[0]});
    });
});


//--------------------------
//parte B
// a
app.get('/books/:id',(req,res) => {
    const id = req.params.id;   //buscar id aos parametros
    const query = "SELECT * FROM books WHERE id = ?";   //criar query

    connection.query(query,[id],(err, result) =>{   //establecer ligação 
        if (err) {  
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro na leitura do livro");
        }

        if(!result.length){
            return res.status(404).end("book não encontrado com esse id");
        }

        res.json({ resultado: result[0]});
    });
});


//b
app.delete('/books/:id',(req,res) => {
    const id  = req.params.id;

    const query = "DELETE FROM books WHERE id = ?";

    connection.query(query,[id],(err, result) =>{
        if (err) {
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro na eliminação do livro");
        }
        res.json({ linhasAfetadas: result.affectedRows });
    });
});

//c
app.get('/books/:/:profession',(req,res) => {
    const { age, profession } = req.params;
    const query = "SELECT * FROM users WHERE Age = ? AND Profession = ?";  

    connection.query(query,[age, profession],(err, result) =>{
        if (err) {  
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro");
        }

        if(!result.length){
            return res.status(404).end("não existem utilizadores com essa idade e profissão");
        }
        
        res.json({ resultado: result});
    });
});


//d
app.put('/users/:comment',(req,res)=>{
    const id = req.params.id;
    const { Firstname, Lastname, Profession, Age } = req.body;

    const query = "UPDATE books SET "
        + "title = ?,"
        + "isbn = ?,"
        + "genre = ?,"
        + "review = ?,"
        + "synopsis = ?,"
        + "pages = ?,"
        + "price = ?,"
        + "published = ?,"
        + "comment = ? "
        +"WHERE id = ?";

    connection.query(query,[title, isbn, genre, review, synopsis, pages, price, published, comment, id],(err, result) =>{
        if (err) {  
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro na atualização do livro");
        }

        res.redirect('/books/' + id);
    });    
});


// 4.b.iii
app.delete('/books',(req,res) => {
    const { id } = req.body;

    const query = "DELETE FROM users WHERE id = ?";

    connection.query(query,[id],(err, result) =>{
        if (err) {
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro");
        }
        res.json({ linhasAfetadas: result.affectedRows });
    });
});




// 4.b.vi
app.get('/users/:age/:profession',(req,res) => {
    const { age, profession } = req.params;
    const query = "SELECT * FROM users WHERE Age = ? AND Profession = ?";  

    connection.query(query,[age, profession],(err, result) =>{
        if (err) {  
            console.error('Erro:', err.message);
            return res.status(500).end("ocorreu um erro");
        }

        // caso não exista
        if(!result.length){
            return res.status(404).end("não existem utilizadores com essa idade e profissão");
        }
        
        res.json({ resultado: result});
    });
});

*/
/*
app.get("/", (req, res) => {

  res.status(200).json({
    message: "Lista de produtos",
    total: results.length,
    products: results,
  });
});
*/

app.get("/", (req, res) => {
  // 4.a.
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("PAGINA PRINCIPAL DO PROJETO 1");
});

//PARTE A
//parte A a
app.get("/book", (req, res) => {
  const query = "SELECT * FROM book";
  connection.query(query, (err, rows) => {
    if (err) {
      console.error("Erro:", err.message);
      return res.status(500).end("ocorreu um erro na leitura dos livros");
    }
    res.send(rows);
  });
});
//------------------------------------------------
//parte A b
app.post("/book", (req, res) => {
  const {
    title,
    isbn,
    genre,
    review,
    synopsis,
    pages,
    price,
    published,
    comment,
  } = req.body;

  if (
    !title ||
    !isbn ||
    !genre ||
    !review ||
    !synopsis ||
    !pages ||
    !price ||
    !published ||
    !comment
  ) {
    return res.status(400).end("Dados obrigatórios em falta");
  }
  // const Firstname = req.body.Firstname;
  const query =
    "INSERT INTO book " +
    "(title, isbn, genre, review, synopsis, pages, price, published, comment) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [title, isbn, genre, review, synopsis, pages, price, published, comment],
    (err, result) => {
      if (err) {
        console.error("Erro:", err.message);
        return res.status(500).end("ocorreu um erro na inserção do livro");
      }
      res.json({ linhasAfetadas: result.affectedRows });
    },
  );
});
//------------------------------------------------

//parteA c
app.get("/book/genre/:genre", (req, res) => {
  const { genre } = req.params;

  const query = "SELECT * FROM book WHERE genre = ?";

  connection.query(query, [genre], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Erro ao buscar livros",
        details: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: "Nenhum livro encontrado neste gênero",
        genre: genre,
      });
    }

    res.status(200).json({
      message: "Livros encontrados",
      genre: genre,
      total: results.length,
      books: results,
    });
  });
});
//------------------------------------------------
//parteA d

app.put("/book/:id/discount", (req, res) => {
  const { id } = req.body;
  const discount = req.query.value;

  if (!discount || isNaN(discount) || discount <= 0 || discount >= 100) {
    return res
      .status(400)
      .end("Valor de desconto inválido. Deve ser um número entre 0 e 100.");
  }

  const query = "SELECT * FROM book WHERE id = ?";
  connection.query(query, [id], (err, rows) => {
    if (err) {
      console.error("Erro:", err.message);
      return res.status(500).end("ocorreu um erro na leitura dos livros");
    }
    const book = rows[0];
    let newPrice = book.price - (book.price * discount) / 100;

    const query = "UPDATE book SET price = ? WHERE id = ?";
    connection.query(query, [newPrice, id], (err, result) => {
      if (err) {
        console.error("Erro:", err.message);
        return res.status(500).end("ocorreu um erro na atualização do livro");
      }
      res.json({ linhasAfetadas: result.affectedRows });
    });
  });
});
//------------------------------------------------

// parteB e
app.get("/book/sorted", (req, res) => {
  const query = "SELECT * FROM book";

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Erro ao buscar livros",
        details: err.message,
      });
    }

    const sortedProducts = results.sort((a, b) => a.price - b.price);

    res.status(200).json({
      message: "livros ordenados por preço (crescente)",
      total: sortedProducts.length,
      note: "ordenação javaScript",
      products: sortedProducts,
    });
  });
});
//------------------------------------------------

//parteA e
app.get("/book/before/:published", (req, res) => {
  const { published } = req.params;

  // const id = req.params.published;
  //buscar id aos parametros
  const query = "SELECT * FROM book WHERE published < ?";

  connection.query(query, [published], (err, result) => {
    if (err) {
      console.error("Erro:", err.message);
      return res.status(500).end("ocorreu um erro na leitura do livro");
    }

    if (!result.length) {
      return res.status(404).end("data não encontrada com esse id");
    }

    res.json({ resultado: result });
  });
});

//------------------------------------------------
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//------------------------------------------------
//parte B
// a

app.get("/book/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM book WHERE id = ?";

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro:", err.message);
      return res.status(500).end("ocorreu um erro na leitura do livro");
    }

    if (!result.length) {
      return res.status(404).end("livro não encontrado com esse id");
    }

    res.json({ resultado: result });
  });
});
//------------------------------------------------

//parteB c

app.post("/book/filter", (req, res) => {
  const { keywords } = req.body;

  if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
    return res.status(400).json({
      error: "Keywords são obrigatorias",
      format: '{"keywords": ["palavra1", "palavra2"]}',
      example: '{"keywords": ["RGB", "gaming"]}',
    });
  }

  let conditions = keywords.map(() => "synopsis LIKE ?").join(" OR ");
  let query = `SELECT * FROM book WHERE ${conditions}`;
  let values = keywords.map((keyword) => `%${keyword}%`);

  connection.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Erro ao filtrar livros por keywords",
        details: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: "Nenhum livro encontrado com essas palavras-chave",
        keywords: keywords,
      });
    }

    res.status(200).json({
      message: "livros encontrados",
      keywords: keywords,
      total: results.length,
      products: results,
    });
  });
});
//------------------------------------------------

//parteB b

app.delete("/book/:id", (req, res) => {
  const id = req.params.id;
  // const { id } = req.params;

  const query = "DELETE FROM book WHERE id = ?";

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro:", err.message);
      return res.status(500).end("ocorreu um erro na eliminação do livro");
    }
    res.json({ linhasAfetadas: result.affectedRows });
  });
});
//------------------------------------------------
// parteB d

app.put("/book/:id/comment", (req, res) => {
  const { id } = req.params;
  const { user, text } = req.body;

  if (!user || !text) {
    return res.status(400).json({
      error: "Campos obrigatorios em falta",
      required: ["user", "text"],
      example: '{user: "João", text: "Excelente livro!"}',
    });
  }

  const query1 = "SELECT * FROM book WHERE id = ?";

  connection.query(query1, [id], (err, rows) => {
    if (err) {
      console.error("Erro:", err.message);
      return res.status(500).json({
        error: "Erro ao buscar livro",
        details: err.message,
      });
    }

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Livro não encontrado",
        id: id,
      });
    }

    const book = rows[0];

    let array = [];
    try {
      const parsed = JSON.parse(book.comment || "[]");
      array = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      array = [];
    }

    const newComment = {
      user: user,
      text: text,
    };

    array.push(newComment);

    const updatedComments = JSON.stringify(array);

    const query2 = "UPDATE book SET comment = ? WHERE id = ?";

    connection.query(query2, [updatedComments, id], (err, result) => {
      if (err) {
        console.error("Erro:", err.message);
        return res.status(500).json({
          error: "erro ao atualizar comentario",
          details: err.message,
        });
      }

      res.status(200).json({
        message: "Comentario adicionado com sucesso",
        bookId: id,
        bookTitle: book.title,
        newComment: newComment,
        totalComments: array.length,
        allComments: array,
        affectedRows: result.affectedRows,
      });
    });
  });
});
//------------------------------------------------

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
