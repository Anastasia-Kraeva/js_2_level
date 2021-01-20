const listG = new GoodsList();
listG.fetchGoods()
    .then(() => {
        listG.render();
    })
    .then(() => {
        document.onclick = event => {
            if (event.target.classList.contains('add')) {
                goods_item.addToCart(event.target.dataset.id)
            }
        }
    })
    .catch((error) => {
        console.log(error);
    });

const goods_item = new GoodsItem()