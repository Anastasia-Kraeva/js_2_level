<template>
  <div class="list goods-list">
    <goods-item
      v-for="good in filterGoods"
      v-bind:good="good"
      v-bind:key="good.id_product"
    ></goods-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: [],
      filterGoods: [],
      API_URL:
        'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
    }
  },
  methods: {
    makeGETRequest(url, callback) {
      var xhr

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText)
        }
      }

      xhr.open('GET', url, true)
      xhr.send()
    }
  },
  mounted() {
    this.makeGETRequest(`/catalogData`, goods => {
      this.goods = JSON.parse(goods)
      this.filterGoods = JSON.parse(goods)
    })
  }
}
</script>

