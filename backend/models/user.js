class Order {
    constructor(id, userId, items, totalPrice, status, createdAt) {
        this.id = id;
        this.userId = userId;
        this.items = items; 
        this.totalPrice = totalPrice;
        this.status = status;
        this.createdAt = createdAt;
    }
}

module.exports = Order;