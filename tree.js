class TreeNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.articleId = null;
    }
}

class Tree {
    constructor() {
        this.root = new TreeNode();
        this.articles = {};
    }

    insert(article) {
        let node = this.root;

        this.articles[article.id] = article;

        for (let char of article.title.toLowerCase()) {
            if (!node.children[char]) {
                node.children[char] = new TreeNode();
            }
            node = node.children[char];
        }

        node.isEndOfWord = true;
        node.articleId = article.id;
    }

    search(word) {
        let node = this.root;
        const result = [];
        for (let char of word) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        if(node.isEndOfWord) 
            result.push(node.articleId);
        else {
            const autoCompletedWord = this.autocomplete(word);
            console.log(autoCompletedWord)
            if(autoCompletedWord != []){
                for(let word in autoCompletedWord){
                    
                }
            }
        }
        return result;
    }

    searchId(word){
        let node = this.root;
        const result = [];
        for (let char of word) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
    }

    searchById(id) {
        return this.articles[id];
    }

    autocomplete(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) return [];
            node = node.children[char];
        }
        return this._getWordsFromNode(node, prefix);
    }

    _getWordsFromNode(node, prefix) {
        let results = [];
        if (node.isEndOfWord) results.push(prefix);
        for (let char in node.children) {
            results = results.concat(this._getWordsFromNode(node.children[char], prefix + char));
        }
        return results;
    }
}

module.exports = Tree;
