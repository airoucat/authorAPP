<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, onUpdated } from 'vue'
import { Editor } from '@wangeditor/editor-for-vue'
import type { IDomEditor } from '@wangeditor/editor'

export default {
  components: { Editor },
  props: {
    onChange: {
      type: Function,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    let valueHtml = ref();
      valueHtml.value = props.content.split(/\n/).map(line => `<p>${line}</p>`).join('\n')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
    })

    const toolbarConfig = {}
    const editorConfig = { 
      placeholder: '请输入内容...',
    }

    onUpdated(()=>{
      const editor = editorRef.value
        if (editor == null) return
      console.log(editor.getText())
      props.onChange(editor.getText())
    })

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor:IDomEditor) => {
      // console.log(editor)
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
    };
  }
}
</script>    
<style lang="scss" src="./_.scss" scoped />

<template>
  <div class="editorWrapper">
    <Editor
      style="overflow-y: hidden;"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>