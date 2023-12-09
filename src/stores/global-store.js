import { defineStore } from 'pinia';
import * as monaco from 'monaco-editor';

const themeFiles = {
    'monokai': new URL('../assets/editor-themes/monokai.json', import.meta.url).href
}

export const pageStyleStore = defineStore('pageStyle', {
    state: () => ({
        pageStyle: null
    }),
    actions: {
        setStyle(offset) {
            return { height: offset ? `calc(100svh - ${offset}px)` : '100svh' }
        }
    }
})

export const editorStore = defineStore('editor', {
    state: () => ({
        editor: null,
        theme: 'monokai',
    }),
    actions: {
        async setTheme(theme) {
            let url = themeFiles[theme];
            let response = await fetch(url);
            let themeData = await response.json();
            monaco.editor.defineTheme(theme, themeData);
            monaco.editor.setTheme(theme);
            this.theme = theme;
        }
    }

})

export const tabStore = defineStore('tab', {
    state: () => ({
        openTabs: [],
        activeTab: null
    }),
    getters: {
        getOpenTabs: (state) => (state.openTabs),
        getActiveTab: (state) => (state.activeTab)
    },
    actions: {
        openTab(node) {
            let tab = {
                path: node.path,
                label: node.label
            }
            console.log("openTabs: ", this.openTabs)
            console.log("tab: ", tab);
            const tabIsOpened = (openTabs, tab) => {
                for (let t of openTabs) {
                    if (t.path == tab.path) return true;
                }
                return false;
            }

            if (!tabIsOpened(this.openTabs, tab)) {
                this.openTabs.push(tab)
            }
            this.activeTab = node;
        },
        closeTab(tab) {
            const getTabIndex = (tab) => {
                for (let t of this.openTabs) {
                    if (t.path == tab.path) return this.openTabs.indexOf(t);
                }
            }
            console.log("before: ", this.openTabs);
            this.openTabs.splice(getTabIndex(tab), 1);
            console.log("after: ", this.openTabs);
            if (this.openTabs.length < 1) return;
            this.activeTab = this.openTabs[this.openTabs.length - 1]
        },
        updateTab(oldPath, newPath) {
            for (let t of this.openTabs) {
                if (t.path == oldPath) {
                    console.log(t)
                    let newPtahList = newPath.split('/');
                    let newTab = {
                        path: newPath,
                        label: newPtahList[newPtahList.length - 1]
                    }
                    console.log("newTab: ", newTab)
                    this.openTabs[this.openTabs.indexOf(t)] = newTab;
                    this.activeTab = newTab;
                }
            }
        }
    }
})
