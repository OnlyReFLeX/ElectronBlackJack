export default class Player {
  constructor (name) {
    this.name = name
    this.bank = 100
    this.cards = []
  }

  makeBet (bank, bet) {
    this.bank -= bet
    bank.debet(bet)
  }

  addMoney (money) {
    this.bank += money
  }

  takeCard (deck) {
    if (this.cards.length <= 2) {
      let card = deck.cards[0]
      this.cards.push(card)
      deck.cards.shift()
    }
  }

  get score () {
    let score = 0
    this.cards.forEach((card) => {
      if (card.isAce()) {
        score += (score > 21 ? 1 : card.value)
      } else {
        score += card.value
      }
    })
    return score
  }
}
