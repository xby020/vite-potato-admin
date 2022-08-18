<template>
  <n-card title="工作台" size="medium" class="w-full h-full bg-stone-100">
    <div class="w-full h-full overflow-y-auto" v-scrollbar>
      <!-- Content -->
      <div class="w-full flex flex-col gap-8">
        <!-- info card -->
        <div class="w-full">
          <n-grid :x-gap="32" :y-gap="5" :cols="3" class="h-48">
            <n-grid-item
              class="w-full h-full bg-light-50 rounded-md shadow-md transform transition-all duration-200 ease-in-out hover:(shadow-lg)"
            >
              <div
                class="w-full h-full p-4 flex flex-col justify-center items-center gap-2"
              >
                <h1 class="text-xl font-bold tracking-wider">发布政策</h1>
                <h1 class="font-number text-3xl font-semibold text-green-500">
                  <n-number-animation :from="0" :to="105" />
                </h1>
              </div>
            </n-grid-item>
            <n-grid-item
              class="w-full h-full bg-light-50 rounded-md shadow-md transform transition-all duration-200 ease-in-out hover:(shadow-lg)"
            >
              <div
                class="w-full h-full p-4 flex flex-col justify-center items-center gap-2"
              >
                <h1 class="text-xl font-bold tracking-wider">政策解读数</h1>
                <h1 class="font-number text-3xl font-semibold text-green-500">
                  <n-number-animation :from="0" :to="105" />
                </h1>
              </div>
            </n-grid-item>
            <n-grid-item
              class="w-full h-full bg-light-50 rounded-md shadow-md transform transition-all duration-200 ease-in-out hover:(shadow-lg)"
            >
              <div
                class="w-full h-full p-4 flex flex-col justify-center items-center gap-2"
              >
                <h1 class="text-xl font-bold tracking-wider">企业数量</h1>
                <h1 class="font-number text-3xl font-semibold text-green-500">
                  <n-number-animation :from="0" :to="105" />
                </h1>
              </div>
            </n-grid-item>
          </n-grid>
        </div>

        <!-- 政策查看人数 -->
        <div class="w-full" v-if="false">
          <n-grid :x-gap="32" :y-gap="5" :cols="2" class="h-120">
            <n-grid-item
              class="w-full h-full bg-light-50 rounded-md shadow-md transform transition-all duration-200 ease-in-out hover:(shadow-lg)"
              v-for="item in 2"
              :key="item"
            >
              <!-- Content -->
              <div class="w-full h-full flex flex-col p-4 gap-4">
                <!-- title -->
                <div class="w-full flex">
                  <h1 class="text-lg">政策查看人数</h1>
                </div>

                <!-- content -->
                <div class="w-full flex-auto flex flex-col gap-2">
                  <div
                    v-for="item in 40"
                    :key="item"
                    class="flex justify-between items-center"
                  >
                    <h1>发展管理办法</h1>
                    <h1>
                      <n-number-animation :from="0" :to="599" />
                    </h1>
                  </div>
                </div>
              </div>
            </n-grid-item>
          </n-grid>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts"></script>

<style scoped></style>
