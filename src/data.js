import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => {
    return {
      wordList: [],
      progress: {
        progressList: [],
        cursor: 0,
        round: 0
      }
    }
  },
  actions: {
    load() { // these datas are loaded from localstorage
      this.listName = 'test'
      this.wordList = [
        {'en': 'abnegation', 'ch': '否认'},
        {'en': 'accessible', 'ch': '容易理解的'},
        {'en': 'accustomed', 'ch': '习惯的'},
        {'en': 'admirable', 'ch': '令⼈敬佩的'},
        {'en': 'anecdote', 'ch': '趣闻轶事'},
        {'en': 'assuage', 'ch': '减轻，缓和'},
        {'en': 'authoritative', 'ch': '有权威的'},
        {'en': 'betoken', 'ch': '表示'},
        {'en': 'bland', 'ch': '乏味的'},
        {'en': 'calumny', 'ch': '诽谤'},
        {'en': 'chic', 'ch': '时髦的'},
        {'en': 'circumstantial', 'ch': '依情况⽽定的'},
        {'en': 'civility', 'ch': '礼貌'},
        {'en': 'coalesce', 'ch': '合并'},
        {'en': 'collude', 'ch': '串通'},
        {'en': 'compartmentalize', 'ch': '分开'},
        {'en': 'comprise', 'ch': '包含'},
        {'en': 'conducive', 'ch': '有助于...的'},
        {'en': 'consensus', 'ch': '⼀致意⻅'},
        {'en': 'consummate', 'ch': '完美的'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
        {'en': 'DONE', 'ch': 'DONE'},
      ]
      this.progress.cursor = 0
      this.progress.progressList = [
      ]
      this.fillProgressList()
    },

    fillProgressList() {
      while (this.progress.progressList.length < 12) {
        let word = this.wordList[this.progress.cursor]
        this.progress.cursor = (this.progress.cursor + 1) % this.wordList.length
        this.progress.progressList.push({'en': word.en, 'ch': word.ch, 'age': 2})
      }
    },

    getWord() {
      return this.progress.progressList[0]
    },

    update(state) {
      this.fillProgressList() // make sure length is 12 before operating
      let word = this.progress.progressList.shift()

      if (state) {
        if (word.age == 0) {
          word.age++
          this.progress.progressList.splice(7, 0, word)

        } else if (word.age == 1) {
          word.age++
          this.progress.progressList.splice(11, 0, word)

        } else {
          this.fillProgressList() // word finished. insert new
        }
      } else {
        word.age = 0
        this.progress.progressList.splice(3, 0, word) // fail... recite again.
      }
    }



  }

})