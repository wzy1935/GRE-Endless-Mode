<template>
  <main class=" h-screen min-h-screen w-screen bg-slate-50 flex justify-center">
    <div class="max-w-md w-full h-full bg-white flex flex-col justify-between">
      <div>
        <div class=" flex justify-between p-4">
          <!-- header -->
          <div class=" text-sm">R1-W1</div>
          <div class=" text-sm cursor-pointer text-emerald-500" @click="dialog = true">设置</div>
        </div>
        <hr />
        <div>
          <!-- center -->
          <div class=" mt-64 flex flex-col justify-center items-center">
            <div class=" text-2xl font-bold p-4" :class="showingState == SHOWN_TRUE ? ' text-emerald-500' : showingState == SHOWN_FALSE ? ' text-red-500' : ''">
              word
            </div>
            <pre class=" font-sans" v-if="showingState != HIDDEN">des des</pre>
          </div>

        </div>
      </div>
      <div>
        <div class="h-48 p-8">
          <!-- buttons -->
          <div v-if="showingState == HIDDEN" class=" flex flex-col space-y-4">
            <button class=" bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-md">我认识</button>
            <button class=" bg-red-500 hover:bg-red-400 text-white p-2 rounded-md">我不认识</button>
          </div>

          <div v-if="showingState == SHOWN_TRUE" class=" flex flex-col space-y-4">
            <button class=" bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-md">下一个</button>
            <button class=" bg-orange-500 hover:bg-orange-400 text-white p-2 rounded-md">我记错了</button>
          </div>

          <div v-if="showingState == SHOWN_FALSE" class=" flex flex-col space-y-4">
            <button class=" bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-md invisible">--</button>
            <button class=" bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-md">下一个</button>
          </div>

        </div>
      </div>
    </div>
    <div class=" absolute w-full bg-slate-300/25 h-full max-w-md p-8" v-if="dialog">
      <div class=" h-full w-full bg-white shadow-md">
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
              <input type="text" class=" mr-2 bg-slate-100 p-2 rounded-sm w-full focus:outline-slate-200"/>
              <button class=" bg-emerald-500 hover:bg-emerald-400 rounded-sm text-white p-2 shrink-0">设置</button>
            </div>
          </div>

          <div>
            <div class=" my-2">词汇数据</div>
            <div class=" flex w-full">
              <textarea type="text" class=" mr-2 h-32 bg-slate-100 rounded-sm p-2 w-full focus:outline-slate-200"/>
              <button class=" bg-emerald-500 text-white hover:bg-emerald-400 rounded-sm p-2 shrink-0">更新</button>
            </div>
          </div>

          <div>
            <div class=" my-2">进度数据</div>
            <div class=" flex w-full">
              <textarea type="text" class=" mr-2 h-32 bg-slate-100 rounded-sm p-2 w-full focus:outline-slate-200"/>
              <button class=" bg-emerald-500 text-white hover:bg-emerald-400 rounded-sm p-2 shrink-0">更新</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
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

</script>

