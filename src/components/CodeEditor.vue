<template>
    <div ref="editor" class="fit"></div>
</template>

<script>
import * as monaco from 'monaco-editor';
import { editorStore } from 'stores/global-store';
// import { editor } from 'monaco-editor';
export default {
    data() {
        return {
            editor: monaco.editor,
            editorStore: editorStore()
        }
    },
    methods: {
        createEditor() {
            this.editor.create(this.$refs.editor, {
                language: 'javascript',
                theme: 'vs-dark',
                automaticLayout: true,
                // minimap: {
                //     enabled: true,
                // },

            })
        }
    },
    mounted() {
        this.createEditor();
        this.editorStore.setTheme(this.editor, 'monokai');
    }

}
</script>
