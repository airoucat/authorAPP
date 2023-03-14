<script lang="ts" setup>
  import { useGetFetch, usePostFetch } from '../../utils/fetch';

  const data = {
    name: 'k',
    id: '1111'
  }

  usePostFetch('/example/exa', data).then( res => {
    console.log(res)
  })


</script>

<style lang="scss" src="./_.scss" scoped />

<template>
  <nav class="toolWrapper">
    <ul>
      <li>
        创建书
      </li>
      <li>
        创建分卷
      </li>
      <li>
        创建章节
      </li>
      <li>
        导入书
      </li>
      <li>
        导出书
      </li>
    </ul>
  </nav>
  <div class="contentWrapper">
    <div class="leftWrapper">left </div>
    <div class="midWrapper">this authorAPP </div>
    <div class="rightWrapper">right</div>
  </div>
</template>