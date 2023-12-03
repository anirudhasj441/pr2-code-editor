<template>
    <q-page :style-fn="pageStyleStore.setStyle">
        <div class="fit flex bg-main">
            <q-tabs v-model="editorTab" dense class="text-white" no-caps align="left" active-class="tab-active"
                indicator-color="none" breakpoint="0">
                <q-tab name="main.py" class="q-px-sm">
                    <div class="flex items-center q-gutter-x-sm">
                        <div>main.js</div>
                        <q-btn dense flat icon="close" size="sm"></q-btn>
                    </div>
                </q-tab>
            </q-tabs>
            <div class="col-grow full-width">
                <code-editor></code-editor>
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { pageStyleStore } from 'src/stores/global-store';
import CodeEditor from 'components/CodeEditor.vue';
export default defineComponent({
    name: 'IndexPage',
    components: {
        CodeEditor
    },
    data() {
        return {
            editorTab: 'main.js',
            pageStyleStore: pageStyleStore()
        }
    }
})
</script>
