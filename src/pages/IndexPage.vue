<template>
    <q-page class="" :style-fn="pageStyleStore.setStyle">
        <div class="fit flex column">
            <q-tabs v-model="editorTab" dense class="bg-main text-white" no-caps align="left" active-class="tab-active"
                indicator-color="none" breakpoint="0">
                <q-tab name="main.py" :disable="editorTab == 'main.js'">
                    <div class="flex items-center">
                        <div>main.js</div>
                        <q-btn dense flat icon="cancel"></q-btn>
                    </div>
                </q-tab>
            </q-tabs>
            <div class="col-grow">
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
            editorTab: '',
            pageStyleStore: pageStyleStore()
        }
    }
})
</script>
