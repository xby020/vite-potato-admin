<template>
  <page-single :title="route.meta.title">
    <div class="w-full h-full p-2">
      <n-table :single-line="false">
        <thead>
          <tr>
            <th>Abandon</th>
            <th>Abormal</th>
            <th>Abolish</th>
            <th>...</th>
            <th>万事开头难</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>放弃</td>
            <td>反常的</td>
            <td>彻底废除</td>
            <td>...</td>
            <td>干！我刚才背的是啥</td>
          </tr>
          <tr>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
          </tr>
          <tr v-for="item in 42" :key="item">
            <td>放弃</td>
            <td>反常的</td>
            <td>彻底废除</td>
            <td>...</td>
            <td>干！我刚才背的是啥</td>
          </tr>
        </tbody>
      </n-table>
    </div>
  </page-single>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped></style>
