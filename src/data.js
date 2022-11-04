import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => {
    return {
      wordList: [],
      progress: {
        dataURL: '',
        progressList: [],
        cursor: 0,
        round: 0
      }
    }
  },
  actions: {
    load() { // these datas are loaded from localstorage
      if (!this.loadWordList(localStorage.getItem('wordList'))) {
        this.resetWordList()
      }
      if (!this.loadProgress(localStorage.getItem('progress'))) {
        this.resetProgress()
      }
      this.fillProgressList()
    },

    saveWordList() {
      localStorage.setItem('wordList', JSON.stringify(this.wordList))
    },

    loadWordList(strs) {
      try {
        let localWordList = JSON.parse(strs)
        if (localWordList == null) return false
        this.wordList = localWordList
      } catch (e) {
        return false
      }
      return true
    },

    resetWordList() {
      this.wordList = []
      this.saveWordList()
    },

    saveProgress() {
      localStorage.setItem('progress', JSON.stringify(this.progress))
    },

    loadProgress(strs) {
      try {
        let localProgress = JSON.parse(strs)
        if (localProgress == null) return false
        this.progress = localProgress
      } catch (e) {
        return false
      }
      return true
    },

    resetProgress() {
      this.progress = {
        dataURL: 'https://raw.githubusercontent.com/wzy1935/GRE-Endless-Mode/master/wordlist/fj_shuffled.json',
        progressList: [],
        cursor: 0,
        round: 0
      }
      this.saveProgress()
    },

    fillProgressList() {
      if (this.wordList.length == 0) return
      while (this.progress.progressList.length < 12) {
        let word = this.wordList[this.progress.cursor]
        if (this.progress.cursor + 1 >= this.wordList.length) this.progress.round++
        this.progress.cursor = (this.progress.cursor + 1) % this.wordList.length
        this.progress.progressList.push({'en': word.en, 'ch': word.ch, 'age': 2})
      }
    },

    getWord() {
      if (this.wordList.length == 0) {
        return {'en': 'WORDLIST_EMPTY', 'ch': '请先设置词汇表'}
      }
      return this.progress.progressList[0]
    },

    update(state) {
      if (this.wordList.length == 0) {
        return
      }
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