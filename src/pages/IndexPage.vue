<template>
    <q-page :style-fn="pageStyleStore.setStyle">
        <div class="fit flex bg-main">
            <div class="full-width" style="height: 36px">
                <q-scroll-area class="fit">
                    <q-tabs v-model="editorTab" dense class="text-white fit-feight" no-caps align="left"
                        active-class="tab-active" indicator-color="none" breakpoint="0" :shrink="false">
                        <q-tab v-for="tab in openTabs" v-bind:key="tab" :name="tab.path" class="q-px-sm">
                            <div class="flex items-center q-gutter-x-sm no-wrap">
                                <div>{{ tab.label }}</div>
                                <q-btn dense flat icon="close" size="sm" @click.stop="closeTab(tab)"
                                    style="z-index: 999999"></q-btn>
                            </div>
                        </q-tab>
                    </q-tabs>
                </q-scroll-area>
            </div>
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
import { defineComponent } from "vue";
import { pageStyleStore, tabStore } from "src/stores/global-store";
import CodeEditor from "components/CodeEditor.vue";
export default defineComponent({
    name: "IndexPage",
    components: {
        CodeEditor,
    },
    data() {
        return {
            editorTab: "main.js",
            pageStyleStore: pageStyleStore(),
            tabStore: tabStore(),
        };
    },
    methods: {
        closeTab(tab) {
            console.log("!!clicked");
            this.tabStore.closeTab(tab);
        },
        setTabHeight() {
            if (!document.getElementsByClassName("q-tab")[0]) return 0;
            let tabElm = document.getElementsByClassName("q-tab")[0];
            console.log("tabElm: ", tabElm);

            let height = tabElm.offsetHeight;
            // console.log(height);

            return `${height}px`;
        },
    },
    mounted() {
        this.setTabHeight();
        if (this.hasQuery) {
            let filePath = this.$route.query.file;
            let fileList = filePath.split('/');
            let fileName = fileList[fileList.length - 1];
            console.log(fileName)
            let node = {
                path: filePath,
                label: fileName
            }
            this.tabStore.openTab(node);
        }
        console.log(this.$route.query.file);
    },
    computed: {
        openTabs() {
            return this.tabStore.getOpenTabs;
        },
        activeTab() {
            return this.tabStore.getActiveTab;
        },
        tabHeight() {
            return this.setTabHeight();
        },
        hasQuery() {
            return this.$route.query != {};
        }
    },
    watch: {
        activeTab(value) {
            this.editorTab = value.path;
        },
    },
});
</script>
