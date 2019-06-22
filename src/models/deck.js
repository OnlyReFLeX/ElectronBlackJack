import Card from './card'

export default class Deck {
  constructor () {
    this.generateCards()
  }

  generateCards () {
    let cards = []
    Deck.suits.forEach((suit) => {
      Deck.ranks.forEach((rank) => {
        cards.push(new Card(suit, rank))
      })
    })
    cards = this.shuffle(cards)
    this.cards = cards
    return cards
  }

  static get suits () {
    return 'C H S D'.split(' ')
  }

  static get ranks () {
    return 'A 2 3 4 5 6 7 8 9 10 J Q K'.split(' ')
  }

  shuffle (a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }
}
