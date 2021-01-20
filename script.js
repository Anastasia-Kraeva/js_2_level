const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class CartItem {
    constructor(id_product, product_name, price) {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.count = 1;
    }
    render() {
        return `<div class='cart-item' id='${this.id_product}'><h3>${this.product_name}</h3><p>${this.price}</p><button class="remove" data-id="${this.id_product}" >удалить из корзины</button></div>`;
    }
}

class CartList {
    constructor() {
        this.items = [];
        this.sum = 0;
    }
    removeItem(id) {
        id = +id;
        localStorage.removeItem(id);
        list.items = localStorage
        list.render()
    }
    fetchItem() {
        // return new Promise((resolve, reject) => {
        //     if (localStorage !== 0) {
        //         list.items = localStorage
        //     } else {
        //         list.render()
        //     }
        // });
    }
    totalCost() {
        this.sum = 0;
        for (let key in list.items) {
            if (key == 'length') {
                break
            }
            key = +key
            this.sum += JSON.parse(list.items[key]).price * JSON.parse(list.items[key]).count
        }
    }
    getListItem() {
        let list_items = list.items.filter(function (el) { return typeof el == 'string' })
            .map(function (el) {
                let obj = JSON.parse(el);
                return obj.product_name
            })
        console.log(list_items.join(', '))
    }
    render() {
        if (!(document.querySelector('.catalog-button'))) {
            document.querySelector('header').innerHTML = '<a class="catalog-button header-button" type="button" href="index.html">Каталог</a>'
        }

        if (document.querySelector('.cart-list')) {
            if (list.items.length == 0) {
                document.querySelector('main').innerHTML = `<div>Ваша корзина пуста</div>`
            }

            else {
                let listHtml = '';
                let product;

                for (let key in list.items) {
                    if (key == 'length') {
                        break;
                    }
                    key = +key
                    let ss = JSON.parse(list.items[key])
                    product = new CartItem(ss.id_product, ss.product_name, ss.price);
                    listHtml += product.render();
                }
                this.totalCost()
                document.querySelector('.cart-list').innerHTML = listHtml;
                if (document.querySelector('.sum')) {
                    document.querySelector('.sum').innerHTML = `<div class='sum'>Общая сумма товаров: ${this.sum} рублей</div>`
                } else {
                    document.querySelector('main').innerHTML += `<div class='sum'>Общая сумма товаров: ${this.sum} рублей</div>`;
                }
            }
        }
    }
}

class GoodsItem {
    constructor(id, product_name, price) {
        this.id = id;
        this.product_name = product_name;
        this.price = price;
        this.count = 1;
    }
    addToCart(id) {
        id = +id
        let LocStorGet = JSON.parse(localStorage.getItem(id))
        if (LocStorGet) {
            LocStorGet['count']++
            localStorage.setItem(id, JSON.stringify(LocStorGet));
        } else {
            localStorage.setItem(id, JSON.stringify(listG.goods.find(x => x.id_product == id)))
        }
    }
    render() {
        return `<div class='goods-item' id='${this.id}'><h3>${this.product_name}</h3><p>${this.price}</p><button class="add" data-id="${this.id}">добавить в корзину</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/catalogData.json`)
                .then((goods) => {
                    let gg = JSON.parse(goods)
                    gg.map(i => i['count'] = 1);
                    this.goods = gg;
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    render() {
        if (!(document.querySelector('.cart-button'))) {
            document.querySelector('header').innerHTML = '<a class="cart-button header-button" type="button" href="cart.html">Корзина</a>'
        }

        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {

        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.status)
                }
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    });
}

makeGETRequest(API_URL)
    .then((xhr) => {
        console.log(xhr.readyState);
    }, (error) => {
        console.log('error: ' + error)
    });