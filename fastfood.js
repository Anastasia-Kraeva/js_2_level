const hamburgers = [
    { size: 'small', price: 50, cal: 20 },
    { size: 'big', price: 100, cal: 40 },
]

const ingredients = [
    { name: 'cheese', price: 10, cal: 20 },
    { name: 'salad', price: 20, cal: 5 },
    { name: 'potato', price: 15, cal: 10 },
]

const optionally = [
    { name: 'seasoning', price: 15, cal: 0 },
    { name: 'mayonnaise', price: 20, cal: 5 },
]

class Hamburger {
    constructor(size, stuffing) {
        this.sizeH = hamburgers.find(x => x.size == size);
        this.stuffingH = [ingredients.find(x => x.name == stuffing)];
    }
    addTopping(topping) {
        this.toppingH = [];
        const findTopping = optionally.find(x => x.name == topping);
        return this.toppingH.push(findTopping);
    }
    removeTopping(topping) {
        return this.toppingH.splice(findTopping, 1)
    }
    getToppings() {
        return this.toppingH.map(x => x.name).join(', ')
    }
    getSize() {
        return this.sizeH.size
    }
    getStuffing() {
        let listIngredient = ''
        if (this.stuffingH) {
            listIngredient += this.stuffingH.map(x => x.name).join(', ')
        }
        if (this.toppingH) {
            listIngredient += `, ${this.getToppings()}`
        }
        return listIngredient
    }
    calculatePrice() {
        let price
        price = this.sizeH.price
        if (this.stuffingH) {
            price += this.stuffingH.map(x => x.price).reduce((s, cur) => s + cur)
        }
        if (this.toppingH) {
            price += this.stuffingH.map(x => x.cal).reduce((s, cur) => s + cur)
        }
        return price
    }
    calculateCalories() {
        let calories
        calories = this.sizeH.cal
        if (this.stuffingH) {
            calories += this.stuffingH.map(x => x.cal).reduce((s, cur) => s + cur)
        }
        if (this.toppingH) {
            calories += this.stuffingH.map(x => x.cal).reduce((s, cur) => s + cur)
        }
        return calories
    }
}
let currentHamburger = new Hamburger('small', 'potato')
currentHamburger.addTopping('seasoning')

console.log(currentHamburger)
console.log(currentHamburger.getToppings())
console.log(currentHamburger.getSize())
console.log(currentHamburger.getStuffing())
console.log(currentHamburger.calculatePrice())
console.log(currentHamburger.calculateCalories())