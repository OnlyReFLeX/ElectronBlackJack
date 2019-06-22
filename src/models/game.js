import Player from './player'
import Dealer from './dealer'
import Bank from './bank'
import Deck from './deck'

export default class Game {
  constructor (name) {
    this.player = new Player(name)
    this.dealer = new Dealer()
    this.bank = new Bank()
    this.deck = {}
  }

  isMoneyEmpty () {
    return (this.player.bank <= 0 || this.dealer.bank <= 0)
  }

  newRound (bet) {
    this.clearPlayersCards()
    this.newDeck()
    this.takeTwoCardMakeBet(bet)
  }

  clearPlayersCards () {
    this.player.cards = []
    this.dealer.cards = []
  }

  isCardLimit (user) {
    return user.cards.length > 2
  }

  isScoreLimit (user) {
    return user.score > 21
  }

  moneyToWinner () {
    let winner = this.winner()
    console.log('Победитель:')
    console.log(winner)
    if (winner) {
      winner.addMoney(this.bank.money)
    } else {
      let amount = this.bank.money / 2
      this.player.addMoney(amount)
      this.dealer.addMoney(amount)
    }
    this.bank.credit(this.bank.money)
  }

  takeTwoCardMakeBet (bet) {
    this.player.makeBet(this.bank, bet)
    this.dealer.makeBet(this.bank, bet)
    for (let i = 0; i < 2; i++) {
      this.player.takeCard(this.deck)
      this.dealer.takeCard(this.deck)
    }
  }

  newDeck () {
    this.deck = new Deck()
  }

  winner () {
    if (this.isScoreLimit(this.player) && this.isScoreLimit(this.dealer)) {
      return false
    } else if (this.player.score === this.dealer.score) {
      return false
    } else if (this.isScoreLimit(this.player)) {
      return this.dealer
    } else if (this.isScoreLimit(this.dealer)) {
      return this.player
    } else {
      return (this.player.score > this.dealer.score ? this.player : this.dealer)
    }
  }
}
