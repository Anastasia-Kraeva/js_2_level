Vue.component('search-form', {
    template: `
        <div>
            <form id="search_form" @submit.prevent="FilterGoods">
                <input class="goods_search" id="search_line" v-model='searchLine'>
                <input type="submit" value="Искать">
            </form>
        </div>
    `,
    data() {
        return {
            searchLine: null,
        }
    },
    methods: {
        FilterGoods() {
            let filteredGoods = app.$refs.goodlist.goods
            let search = this.searchLine.toLowerCase();
            app.$refs.goodlist.filterGoods = []
            for (key in filteredGoods) {
                el = filteredGoods[key]
                if (el.product_name.toLowerCase().indexOf(search) != -1) app.$refs.goodlist.filterGoods.push(el)
            }
        },
    }
});

Vue.component('goods-list', {
    template: `
      <div class="list goods-list">
        <goods-item v-for="good in filterGoods" v-bind:good="good" v-bind:key="good.id_product"></goods-item>
      </div>
    `,
    data: function () {
        return {
            goods: [],
            filterGoods: [],
            API_URL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
        }
    },
    methods: {
        makeGETRequest(url, callback) {
            var xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('GET', url, true);
            xhr.send();
        },

    },
    mounted() {
        this.makeGETRequest(`/catalogData`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filterGoods = JSON.parse(goods);
        });
    },
});

Vue.component('goods-item', {
    props: ['good'],
    template: `
      <div class="item goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
        <button class="add" v-on:click="addToCart(good.id_product)">добавить в корзину</button>
      </div>
    `,
    methods: {
        makePOSTRequest(url, data, callback) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

            xhr.send(data);
        },
        addToCart(id) {
            let el = JSON.stringify(app.$refs.goodlist.goods.find(x => x.id_product == id))
            this.makePOSTRequest('/addToCart', el, () => {
            })
        }
    }
});

Vue.component('cart-list', {
    template: `
    <div>
        <div class="list cart-list" v-if="cartArr.length">
            <cart-item v-for="item in cartArr" v-bind:item="item" v-bind:key="item.id_product">
            </cart-item>
        </div>
        <p v-if="!cartArr.length" style="text-align:center;">Корзина пуста</p>
    </div>
    `,
    data: function () {
        return {
            cartArr: [],
        }
    }, methods: {
        costSum() {
            app.sum = 0;
            for (let item of this.cartArr) {
                app.sum += item.price * item.count
            }
        }
    },
    beforeMount: function () {
        app.$refs.goodlist.makeGETRequest(`/cartData`, (cart) => {
            this.cartArr = Object.values(JSON.parse(cart));
            this.costSum()
        });
    },
});

Vue.component('cart-item', {
    props: ['item'],
    template: `
        <div class="item cart-item">
            <h3 class="title">{{ item.product_name }}</h3>
            <p class="price">цена: {{ item.price }}	
            &#8381;</p>
            <p>количество: {{ item.count }}</p>
            <button class="delete" v-on:click="deleteFromCart(item.id_product)">удалить из корзины</button>
        </div>
    `,
    methods: {
        makePOSTRequest(url, data, callback) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

            xhr.send(data);
        },

        deleteFromCart(id) {
            this.makePOSTRequest('/deleteFromCart', JSON.stringify({ 'id': id }), () => {
            })
            let goods = []
            for (let item = 0; item < app.$refs.cartlist.cartArr.length; item++) {
                if (app.$refs.cartlist.cartArr[item]['id_product'] !== id) {
                    goods.push(app.$refs.cartlist.cartArr[item])
                }
            }
            app.$refs.cartlist.cartArr = goods
            app.$refs.cartlist.costSum()
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        isVisibleCatalog: true,
        isVisibleCart: false,
        sum: 0,
    }
});


// Vue.component('error', {
//     props: ['error'],
//     template: `
//     <div v-if=''>
//         Error: не удаётся выполнить запрос к серверу
//     </div>
//     `
// });

// const app = new Vue({
//     el: '#app',

// data: {
//     goods: [],
//     filteredGoods: [],
//     searchLine: '',
//     API_URL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
//     searchLine: '',
//     isVisibleCatalog: true,
//     cart: [],
//     isVisibleCart: false,
// },
// methods: {
//     makeGETRequest(url, callback) {
//         var xhr;

//         if (window.XMLHttpRequest) {
//             xhr = new XMLHttpRequest();
//         } else if (window.ActiveXObject) {
//             xhr = new ActiveXObject("Microsoft.XMLHTTP");
//         }

//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4) {
//                 callback(xhr.responseText);
//             }
//         }

//         xhr.open('GET', url, true);
//         xhr.send();
//     },

//     mounted() {
//         this.makeGETRequest(`${app.API_URL}/catalogData.json`, (goods) => {
//             this.goods = JSON.parse(goods);
//         });
//     },

// },
// });
// app.mounted()