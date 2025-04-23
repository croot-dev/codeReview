// 2. Trie는 Tree가 아니야.md

class TrieNode {
constructor(value = "") {
    this.value = value;
    this.children = new Map();
    this.isEnd = false; 
}
}

class CustomTrie {
constructor() {
    this.root = new TrieNode();
    this.nodeCount = 0;
}

insert(word) {
    this._insert(this.root, word);
}

_insert(node, word) {
    for (let [childValue, childNode] of node.children.entries()) {
        const commonPrefix = this._getCommonPrefix(childValue, word);

        if (commonPrefix.length === 0) continue;

        const tRemain = childValue.slice(commonPrefix.length);
        const sRemain = word.slice(commonPrefix.length);

        if (commonPrefix === childValue) {
            return this._insert(childNode, sRemain);
        }

        const midNode = new TrieNode(commonPrefix);
        this.nodeCount++;

        node.children.delete(childValue);
        node.children.set(commonPrefix, midNode);

        childNode.value = tRemain;
        midNode.children.set(tRemain, childNode);
        this.nodeCount++;

        if (sRemain.length > 0) {
            const newNode = new TrieNode(sRemain);
            this.nodeCount++;
            midNode.children.set(sRemain, newNode);
            newNode.isEnd = true;
        } else {
            midNode.isEnd = true;
        }

        return;
    }

    const newNode = new TrieNode(word);
    this.nodeCount++;
    node.children.set(word, newNode);
    newNode.isEnd = true;
}

_getCommonPrefix(a, b) {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) {
        i++;
    }
    return a.slice(0, i);
}

countNodes() {
    return this.nodeCount;
}
}

function solution(words) {
    const trie = new CustomTrie();
    words.forEach(word => trie.insert(word));
    return trie.countNodes();
}
  