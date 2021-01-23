const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        API_URL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
        searchLine: '',
        isVisibleCatalog: true,
        cart: [],
        isVisibleCart: false,
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
            this.makeGETRequest(`${app.API_URL}/catalogData.json`, (goods) => {
                this.goods = JSON.parse(goods);
            });
        },

    },
});
app.mounted()

const formSearch = new Vue({
    el: '#search_form',
    data: {
        searchLine: null,
    },
    methods: {
        FilterGoods: function (e) {
            let obj = app.goods;
            const search = this.searchLine.toLowerCase();
            for (key in obj) {
                el = obj[key]
                if (el.product_name.toLowerCase().indexOf(this.searchLine) != -1) app.filteredGoods.push(el)
            }
        }
    }
});

const cart = new Vue({
    el: '.cart-button',
    data: {
        cart: [],
    },
    methods: {
        VisibleCart: function () {
            app.isVisibleCatalog = false;
            app.isVisibleCart = true;
        }
    }
});