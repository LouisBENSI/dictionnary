<script lang="ts" setup>
import type {Word} from "~/models/Word";

const searchWord = ref(''),
    result = ref([] as Word[]),
    searchWordValidate = ref(false as boolean),
    errorSearch = ref(),
    errorLengthSearch = ref(false as boolean)

watch(searchWord, async () => {

  errorLengthSearch.value = searchWord.value.length == 0;

  const {
    data,
    pending,
    error,
    refresh
  } = await useFetch<Word[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord.value}`, {

    onResponse({request, response, options}) {
      // Process the response data
      searchWordValidate.value = true
      result.value = response._data as Word[];
      errorSearch.value = false;
    },

    onResponseError({request, response, options}) {
      searchWordValidate.value = false
      errorSearch.value = true;
      result.value = response._data as Word[];
    }
  })
})

</script>


<template>

  <section class="container mx-auto px-6 space-y-8">
    <section class="relative">
      <div class="relative mb-2">
        <input v-model="searchWord" type="text" placeholder="Search for any word…"
               class="block input bg-gray-100 w-full" :class="{ 'border-red-500' : errorLengthSearch }"/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="absolute w-4 h-4 right-6 top-[16px] text-primary" :class="{ 'text-red-500' : errorLengthSearch }">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
        </svg>
      </div>
      <p v-if="errorLengthSearch" class="text-red-500">Whoops, can’t be empty…</p>
    </section>

    <div v-if="errorSearch && !result.length" class="space-y-4 text-center">
      <span class="block text-4xl">😕</span>
      <p class="text-xl font-bold">{{ result.title }}</p>
      <p class="text-gray-600">{{ result.message }} {{ result.resolution }}</p>
    </div>

    <div class="space-y-12" v-else-if="searchWordValidate && result[0] && !errorSearch">
      <div v-for="(r, index) in result">
        <h3>Définition n°{{ index + 1 }}</h3>
        <section class="flex items-center justify-between mb-6">
          <hgroup class="space-y-4">
            <h1 v-if="r.word" class="text-3xl font-bold lg:text-4xl">{{ r.word }}</h1>
            <p v-if="r.phonetics.length" class="text-lg text-primary">
              <span class="block" v-for="p in r.phonetics.slice(0, 1)">{{ p.text }}</span>
            </p>
          </hgroup>

          <div class="w-12 h-12 bg-primary/25 flex items-center justify-center rounded-full lg:w-[75px] lg:h-[75px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 class="w-4 h-4 text-primary lg:w-6 lg:h-6">
              <path fill-rule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clip-rule="evenodd"/>
            </svg>
          </div>

          <audio src="">
            <source src=""/>
          </audio>
        </section>

        <section class="space-y-6">
          <div v-for="meaning in r.meanings">
            <div class="flex items-center gap-6 mb-5">
              <p class="text-lg font-bold">{{ meaning.partOfSpeech }}</p>
              <hr class="h-[1px] w-full">
            </div>

            <h3 class="text-gray-600 mb-4">Meaning</h3>

            <ul class="space-y-6 mb-4 list-disc pl-4">
              <li v-for="definition in meaning.definitions" class="space-y-2">
                <p>{{ definition.definition }}</p>
                <p v-if="definition.example" class="text-gray-400">"{{ definition.example }}"</p>
              </li>
            </ul>

            <div class="flex gap-8" v-if="meaning.synonyms.length">
              <p>Synonyms</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="s in meaning.synonyms" class="text-primary underline cursor-pointer hover:opacity-50"
                      @click="searchWord = s">{{ s }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>