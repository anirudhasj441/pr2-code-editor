<template>
    <q-page :style-fn="pageStyleStore.setStyle">
        <div class="fit flex bg-main">
            <q-tabs v-model="editorTab" dense class="text-white" no-caps align="left" active-class="tab-active"
                indicator-color="none" breakpoint="0">
                <q-tab v-for="tab in openTabs" v-bind:key="tab" :name="tab.path" class="q-px-sm">
                    <div class="flex items-center q-gutter-x-sm">
                        <div>{{ tab.label }}</div>
                        <q-btn dense flat icon="close" size="sm"></q-btn>
                    </div>
                </q-tab>
            </q-tabs>
            <div class="col-grow full-width">
                <q-tab-panels v-model="editorTab" class="fit" :animated="false" :swipeable="false" :keep-alive="true">
                    <q-tab-panel v-for="tab in openTabs" v-bind:key="tab" :name="tab.path" class="fit q-pa-none">
                        <code-editor :path="tab.path"></code-editor>
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { pageStyleStore, tabStore } from 'src/stores/global-store';
import CodeEditor from 'components/CodeEditor.vue';
export default defineComponent({
    name: 'IndexPage',
    components: {
        CodeEditor
    },
    data() {
        return {
            editorTab: 'main.js',
            pageStyleStore: pageStyleStore(),
            tabStore: tabStore()
        }
    },
    computed: {
        openTabs() {
            return this.tabStore.getOpenTabs;
        },
        activeTab() {
            return this.tabStore.getActiveTab;
        }
    },
    watch: {
        activeTab(value) {
            this.editorTab = value.path;
        }
    }
})
</script>
