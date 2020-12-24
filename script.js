
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

// 2) Можно убрать скобки у параметра ф-ии; убрать фигурные скобки и return. Возможно, в данном случае, допустимо заменить вызов ф-ии renderGoodsItem на ее содержимое.
// 3) Запятые выводятся, потому что innerHTML преобразует див в строку. Скорее всего, этот метод и массив читает как строку. Вот только не понятно, почему кавычки не выводятся, их же там не одна пара, а целая строка внутри которой еще текст в кавычках  ( " '..', '..' и тд " ). :/

