import { defineStore } from 'pinia';

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
        async setTheme(editor, theme) {
            let url = themeFiles[theme];
            let response = await fetch(url);
            let themeData = await response.json();
            editor.defineTheme(theme, themeData);
            editor.setTheme(theme);
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
            if (!this.openTabs.includes(tab)) {
                this.openTabs.push(tab)
            }
            this.activeTab = node;
        }
    }
})
