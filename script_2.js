Vue.component('goods-list', {
    props: ['goods'],
    template: `
      <div class="list goods-list">
        <goods-item v-for="good in goods" v-bind:good="good" v-bind:key="good.id_product"></goods-item>
      </div>
    `
});

Vue.component('goods-item', {
    props: ['good'],
    template: `
      <div class="item goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
      </div>
    `
});

var catalogApp = new Vue({
    el: '#catalog',
    data: {
        filteredGoods: [],
        API_URL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
        isVisibleCatalog: true,
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

        mounted() {
            this.makeGETRequest(`${this.API_URL}/catalogData.json`, (goods) => {
                this.filteredGoods = JSON.parse(goods);
            });
        },
    },
    beforeMount() {
        this.mounted()
    }

});

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
            let obj = catalogApp.filteredGoods;
            let search = this.searchLine.toLowerCase();
            catalogApp.filteredGoods = []
            for (key in obj) {
                el = obj[key]

                if (el.product_name.toLowerCase().indexOf(search) != -1) catalogApp.filteredGoods.push(el)
            }
        },
    }
});

var formSearch = new Vue({
    el: '#nav',
    data: {
        filteredGoods: [],
    },
    methods: {
        VisibleCart() {
            catalogApp.isVisibleCatalog = false;
            cartApp.isVisibleCart = true;
        },
    }
});

Vue.component('cart-list', {
    props: ['cartList'],
    template: `
    <div class="list cart-list">
        <cart-item v-for="item in cartList" v-bind:item="item" v-bind:key="item.id_product"></cart-item>
    </div>
    `
});

Vue.component('cart-item', {
    props: ['item'],
    template: `
        <div class="item cart-item">
            <h3 class="title">{{ item.product_name }}</h3>
            <p class="price">{{ item.price }}</p>
        </div>
    `
});

const cartApp = new Vue({
    el: '#cart',
    data: {
        cartArr: [{ product_name: 'Мышка', price: 1000, id_product: '456' }],
        isVisibleCart: false,
    },
    methods: {

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
// catalogApp.mounted()