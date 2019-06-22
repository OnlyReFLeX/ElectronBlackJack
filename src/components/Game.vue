<template lang="pug">
  div.q-pa-md.text-center
    q-dialog(v-model='canBet', v-if="game", no-esc-dismiss, no-backdrop-dismiss)
      q-card(style="min-width: 300px;")
        q-card-section(style="padding-top: 0px;text-align: center;")
          .text-h6.text-center Сделай ставку
          q-input(ref='bet', v-model="bet", :rules="[val => !!val, validateBet]", type="number")
          q-btn(
            @click="newRound",
            label="Сделать!",
            color="primary",
            unelevated
          )
    q-dialog(v-model='notMoney', v-if="game", no-esc-dismiss, no-backdrop-dismiss)
      q-card(style="min-width: 300px;")
        q-card-section(style="padding-top: 0px;text-align: center;")
          .text-h6.text-center(v-if="game.player.bank <= 0", style="padding-bottom: 25px;") У вас недостаточно фишек
          .text-h6.text-center(v-else, style="padding-bottom: 25px;") У дилера недостаточно фишек
          q-btn(
            @click="newGame",
            label="Начать заново",
            color="primary",
            unelevated
          )
    template(v-if="game")
      .fixed-top
        span.bet Ставка: {{bet > 0 ? bet : 'Нет' }}
      .fixed-top-left
        img(:src="cardImage('chips')")
        p.user-bank {{game.player.name}}: {{game.player.bank}}
      .fixed-top-right
        img(:src="cardImage('chips')")
        p.user-bank {{game.dealer.name}}: {{game.dealer.bank}}
    template(v-if="!canBet")
      template(v-if="start")

        img.card(v-for="card in game.player.cards", :src="cardImage(card.rank, card.suit)")
        p.score
          span Очки {{game.player.name}}: {{playerScore}}
        div(v-if="showDealerCards")
          img.card(v-for="card in game.dealer.cards", :src="cardImage(card.rank, card.suit)")
        div(v-else)
          img.card(v-for="card in game.dealer.cards", :src="cardImage('HIDDEN')")
        p.score
          span Очки {{game.dealer.name}}: {{showDealerCards ? dealerScore : '*'}}
        div(v-if="!choosed")
          q-btn.action(color="primary", @click="takeCard", label="Взять карту", unelevated)
          q-btn.action(color="primary", @click="pass", label="Пас" unelevated)
          q-btn.action(color="primary", @click="openCards", label="Открыть карты", unelevated)
        q-btn(color="primary", @click="newBet", label="Еще раз", v-if="end", unelevated)
      template(v-else)
        .text-h5.text-white Добро пожаловать в Black Jack
        q-input.name(v-model="name", fill, outlined, :rules="[val => !!val]", bg-color="white", label="Введите ваше имя")
        q-btn(color="primary", @click="startGame", :disabled="name == '' ? true : false", label="Начать", unelevated)
</template>

<script>
import Game from '../models/game'
import path from 'path'

export default {
  data () {
    return {
      name: '',
      start: false,
      game: null,
      end: false,
      showDealerCards: false,
      choosed: false,
      canBet: false,
      notMoney: false,
      bet: 0
    }
  },
  watch: {
    bet: function (newVal) { this.bet = Number(newVal) }
  },
  computed: {
    playerScore () {
      return this.game.player.score
    },
    dealerScore () {
      return this.game.dealer.score
    },
    userCardLimit () {
      return this.game.isCardLimit(this.game.player)
    }
  },
  methods: {
    cardImage (rank, suit = '') {
      if (!rank) { return }
      return path.join(__statics, `/images/${rank}${suit}.png`)
    },
    validateBet (val) {
      return new Promise((resolve, reject) => {
        if (val < 0) { resolve(false || 'Сумма не может быть меньше нуля') }
        if (val > this.game.player.bank) { resolve(false || 'У вас недостаточно фишек') }
        if (val > this.game.dealer.bank) { resolve(false || 'У дилера нет столько фишек') }
        resolve(true)
      })
    },
    newGame () {
      this.game = new Game(this.name)
      this.notMoney = false
      this.canBet = true
    },
    newBet () {
      if (this.game.isMoneyEmpty()) {
        this.notMoney = true
        return
      }
      this.canBet = true
    },
    newRound () {
      this.$refs.bet.validate()
      if (this.$refs.bet.hasError) { return }
      this.showDealerCards = false
      this.game.newRound(this.bet)
      this.end = false
      this.choosed = false
      this.canBet = false
    },
    startGame () {
      this.start = true
      this.game = new Game(this.name)
      this.canBet = true
    },
    takeCard () {
      if (this.game.isCardLimit(this.game.player)) {
        console.log('Слишком много карт ')
      } else {
        this.game.player.takeCard(this.game.deck)
        this.dealerStep()
      }
      this.finish()
    },
    pass () {
      this.dealerStep()
      this.finish()
    },
    openCards () {
      this.finish()
    },
    dealerStep () {
      setTimeout(() => {
        this.game.dealer.step(this.game.deck)
      }, 500)
    },
    finish () {
      this.choosed = true
      setTimeout(() => {
        this.showDealerCards = true
        this.game.moneyToWinner()

        let message = 'Победила дружба'
        let color = 'primary'
        let winner = this.game.winner()
        if (winner) {
          message = `Победил ${winner.name}`
          color = winner === this.game.player ? 'positive' : 'negative'
        }
        this.$q.notify({
          message: message,
          color: color,
          timeout: 1000
        })
      }, 1000)
      setTimeout(() => {
        this.end = true
      }, 3000)
    }
  }
}
</script>
