<template>
  <main class=" h-screen min-h-screen w-screen bg-slate-50 flex justify-center">
    <div class="max-w-xl w-full h-full bg-white flex flex-col justify-between">
      <div>
        <div class=" flex justify-between p-4">
          <!-- header -->
          <div class=" text-sm">R{{ round }}-W{{ word }}</div>
          <div class=" text-sm cursor-pointer text-emerald-500" @click="settingClk">设置</div>
        </div>
        <hr />
        <div>
          <!-- center -->
          <div class=" mt-48 flex flex-col justify-center items-center">
            <div class=" text-2xl font-bold p-4"
              :class="showingState == SHOWN_TRUE ? ' text-emerald-500' : showingState == SHOWN_FALSE ? ' text-red-500' : ''">
              {{ currentWord.en }}
            </div>
            <pre class=" font-sans text-center" v-if="showingState != HIDDEN">{{ currentWord.ch }}</pre>
          </div>

        </div>
      </div>
      <div>
        <div class="h-48 p-8">
          <!-- buttons -->
          <div v-if="showingState == HIDDEN" class=" flex flex-col space-y-4">
            <button class=" bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-md"
              @click="showingState = SHOWN_TRUE">我认识</button>
            <button class=" bg-red-500 hover:bg-red-400 text-white p-2 rounded-md"
              @click="showingState = SHOWN_FALSE">我不认识</button>
          </div>

          <div v-if="showingState == SHOWN_TRUE" class=" flex flex-col space-y-4">
            <button class=" bg-orange-500 hover:bg-orange-400 text-white p-2 rounded-md"
              @click="showingState = SHOWN_FALSE">我记错了</button>
            <button class=" bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-md" @click="nextClk">下一个</button>
          </div>

          <div v-if="showingState == SHOWN_FALSE" class=" flex flex-col space-y-4">
            <button class=" bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-md invisible">--</button>
            <button class=" bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-md" @click="nextClk">下一个</button>
          </div>

        </div>
      </div>
    </div>
    <div class=" absolute w-full bg-slate-300/25 h-full max-w-xl p-8" v-if="dialog">
      <div class=" h-full w-full bg-white shadow-md overflow-y-auto">
        <div class=" flex justify-between p-2">
          <div class="text-gray-500 text-lg p-2">
            设置
          </div>
          <div class=" text-gray-500 text-lg cursor-pointer p-2" @click="dialog = false">
            ×
          </div>
        </div>
        <div class=" p-4 flex flex-col space-y-4 text-sm">

          <div>
            <div class=" my-2">词汇源</div>
            <div class=" flex w-full">
              <input type="text" class=" mr-2 bg-slate-100 p-2 rounded-sm w-full focus:outline-slate-200"
                v-model="wordURLText" />
              <button class=" rounded-sm text-white p-2 shrink-0"
                :class="downloading ? 'bg-gray-500 cursor-default' : 'bg-emerald-500 hover:bg-emerald-400'"
                @click="wordURLSettingClk">下载</button>
            </div>
          </div>

          <div>
            <div class=" my-2">词汇数据</div>
            <div class=" flex w-full">
              <textarea type="text" class=" h-32 bg-slate-100 rounded-sm p-2 w-full focus:outline-slate-200" wrap="off"
                v-model="wordDataText" />

            </div>
            <div class=" flex space-x-2 mt-2">
              <button class=" bg-emerald-500 text-white hover:bg-emerald-400 rounded-sm px-4 py-2 shrink-0"
                @click="wordDataSettingClk">更新</button>
              <button class=" bg-red-500 text-white hover:bg-red-400 rounded-sm px-4 py-2 shrink-0"
                @click="wordDataResetClk">清空</button>
            </div>
          </div>

          <div>
            <div class=" my-2">进度数据</div>
            <div class=" flex w-full">
              <textarea type="text" class=" h-32 bg-slate-100 rounded-sm p-2 w-full focus:outline-slate-200" wrap="off"
                v-model="progressDataText" />
            </div>
            <div class=" flex space-x-2 mt-2">
              <button class=" bg-emerald-500 text-white hover:bg-emerald-400 rounded-sm px-4 py-2 shrink-0"
                @click="progressDataSettingClk">更新</button>
              <button class=" bg-red-500 text-white hover:bg-red-400 rounded-sm px-4 py-2 shrink-0"
                @click="progressDataResetClk">清空</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import axios from 'axios'
import { useDataStore } from './data'
import { ref } from 'vue'
const data = useDataStore()

const HIDDEN = 0
const SHOWN_TRUE = 1
const SHOWN_FALSE = 2

// screen related
let dialog = ref(false)


// word related
data.load()
let currentWord = ref(data.getWord())
let showingState = ref(HIDDEN)
let round = ref(data.progress.round + 1)
let word = ref(data.progress.cursor + 1)

function nextClk() {
  data.update(showingState.value == SHOWN_TRUE ? true : false)
  data.saveProgress()
  showingState.value = HIDDEN
  currentWord.value = data.getWord()
  round.value = data.progress.round + 1
  word.value = data.progress.cursor + 1
}

//config related
let wordURLText = ref(data.progress.dataURL)
let wordDataText = ref(JSON.stringify(data.wordList, null, 2))
let progressDataText = ref(JSON.stringify(data.progress, null, 2))
let downloading = ref(false)

function settingClk() {
  wordURLText.value = data.progress.dataURL
  wordDataText.value = JSON.stringify(data.wordList, null, 2)
  progressDataText.value = JSON.stringify(data.progress, null, 2)
  dialog.value = true
}

async function wordURLSettingClk() {
  if (downloading.value) return
  downloading.value = true
  try {
    let resp = await axios.get(wordURLText.value, { timeout: 5 * 1000 })
    data.loadWordList(JSON.stringify(resp.data))
    data.saveWordList()
    data.progress.dataURL = wordURLText.value // save URL
    data.saveProgress()
  } catch (e) {
    console.log(e)
  }
  settingClk()
  downloading.value = false
}

function wordDataSettingClk() {
  data.loadWordList(wordDataText.value)
  data.saveWordList()
  settingClk()
}

function progressDataSettingClk() {
  data.loadProgress(progressDataText.value) // update pinia
  data.saveProgress()
  settingClk()
}

function wordDataResetClk() {
  data.resetWordList()
  settingClk()
}

function progressDataResetClk() {
  data.resetProgress()
  settingClk()
}

</script>

