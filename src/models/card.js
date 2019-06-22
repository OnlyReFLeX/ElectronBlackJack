export default class Card {
  constructor (suit, rank) {
    this.suit = suit
    this.rank = rank
  }

  get face () {
    return this.suit + this.rank
  }

  isAce () {
    return this.rank === 'A'
  }

  get value () {
    if ('JQK'.includes(this.rank)) {
      return 10
    } else if (this.isAce()) {
      return 11
    } else {
      return Number(this.rank)
    }
  }
}
