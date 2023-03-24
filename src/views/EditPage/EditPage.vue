<script lang="ts" setup>
  import { useGetFetch, usePostFetch } from '../../utils/fetch';
  import EditorContent from '../../components/EditorContent/EditorContent.vue'
  import { onMounted, onUpdated, ref } from 'vue';
  import { sendWebSocket, creatWebSocket, closeWebSocket,  } from '../../utils/websocket'

    const data = {
      name: 'k',
      id: '1111'
    }

    let getContent = ref('0');
    // let getContent = '0'
    // creatWebSocket()

    onMounted(() => {
      /* usePostFetch('/example/exa', data).then( res => {
        console.log(res)
      }) */
      useGetFetch('/example/exa').then(res=>{
        console.log(res)
      })

    })

    onUpdated(()=>{
      console.log('page update')
    })

    const handleContentChange = (value:string) => {
      console.log(JSON.stringify(value))
      getContent.value = value;
      // getContent = value;
    }

    /* const handleSendDataWebSocket = (data:string) => {
      sendWebSocket({
        flag: 'test',
        data:data
      })
    } */


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
    <div class="midWrapper">
      <EditorContent 
        :onChange="handleContentChange"
        :content="getContent"
      />  
    </div>
    <div class="rightWrapper">right</div>
  </div>
</template>