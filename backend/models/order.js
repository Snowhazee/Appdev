//const db = require('../util/database');
class Order{
    constructor(id,userId,productId,quantity,totalPrice){
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }
}
module.exports = Order;