const express = require('express');
const Tree = require('./tree');

const app = express();
const tree = new Tree();

app.use(express.json());

app.post('/articles', (req, res) => {
    const article = req.body;
    tree.insert(article);
    res.status(200).json({ message: `Article "${article.title}" added to articles` });
});

app.get('/articles/search', (req, res) => {
    const word = req.query.word.toLowerCase();
    const id = tree.search(word);
    var article = null;
    if(id)
        article = tree.searchById(id);
    res.status(200).json({ article });
});

app.get('/articles/:id', (req, res) => {
    const id = req.params.id;
    const article = tree.searchById(id);
    res.status(200).json({ article });
});

app.listen(4000, () => {
    console.log(`Server running on port 4000`);
});
