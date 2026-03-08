//const db = require('../util/database');
class Product{
    constructor(id,title,price,description,imageUrl,stock,category){
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.stock = stock;
        this.category = category;
    }
}
module.exports = Product;