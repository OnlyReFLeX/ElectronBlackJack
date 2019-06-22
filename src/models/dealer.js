import Player from './player'

export default class Dealer extends Player {
  constructor () {
    super('Dealer')
  }

  step (deck) {
    if (this.score < 17 && this.cards.length !== 3) {
      this.takeCard(deck)
    }
  }
}
