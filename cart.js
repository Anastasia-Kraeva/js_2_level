const list = new CartList();
list.items = Object.assign([], localStorage);
list.fetchItem()
list.render();
list.getListItem();

document.onclick = event => {
    if (event.target.classList.contains('remove')) {
        list.removeItem(event.target.dataset.id)
    }
}