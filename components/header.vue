<script setup lang="ts">

const darkmode = ref(false as boolean),
    selectFont = ref('Inconsolata')

watch(darkmode, () => {
  if (darkmode.value == true) {
    document.querySelector("html").classList.add("dark")
  } else {
    document.querySelector("html").classList.remove("dark")
  }
})

watch(selectFont, () => {
  document.querySelector("html").style.fontFamily = `${selectFont.value}`
})

</script>

<template>
  <header class="p-6 container mx-auto">
    <nav class="flex items-center justify-between">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
           class="w-8 h-8 dark:text-white">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
      </svg>

      <div class="flex items-center gap-4">
        <select v-model="selectFont" class="select block w-[150px]">
          <option>Inconsolata</option>
          <option>sans-serif</option>
          <option>serif</option>
        </select>

        <div class="w-[1px] h-[32px] bg-slate-200"></div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <input v-model="darkmode" type="checkbox" class="toggle toggle-primary"/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6 ml-3 dark:text-white">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
            </svg>
          </label>
        </div>
      </div>
    </nav>

  </header>
</template>