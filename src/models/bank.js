export default class Bank {
  constructor () {
    this.money = 0
  }

  debet (amount) {
    this.money += amount
  }

  credit (amount) {
    this.money -= amount
  }
}
