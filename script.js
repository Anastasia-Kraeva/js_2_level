
const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

// const renderGoodsItem = (title = "", price = 0) =>
//     `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;

const renderGoodsList = list => {
    // let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    let goodsList = list.map(item => `<div class="goods-item"><h3>${item.title}</h3><p>${item.price}</p></div>`);
    document.querySelector('.goods-list').innerHTML = goodsList.join(' ');
}

renderGoodsList(goods);

class СartItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class СartList {
    constructor() {
        this.items = [];
    }
    fetchItem() {
        this.items = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
    totalСost() {
        const arrPrice = list.items.map(i => i.price)
        const sum = arrPrice.reduce((s, cur) => s + cur)
        return `Общая сумма товаров: ${sum} рублей`
    }
    render() {
        let listHtml = '';
        this.items.forEach(arrayElement => {
            const product = new СartItem(arrayElement.title, arrayElement.price);
            listHtml += product.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        document.querySelector('main').innerHTML += `<div class="sum">${this.totalСost()}</div>`;
    }
}

const list = new СartList();
list.fetchItem();
list.render();
console.log(list)
list.totalСost()
