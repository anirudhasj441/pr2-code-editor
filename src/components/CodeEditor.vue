<template>
    <div ref="editor" class="fit"></div>
</template>

<script>
import * as monaco from 'monaco-editor';
import { editorStore } from 'stores/global-store';
// import { editor } from 'monaco-editor';


export default {
    props: {
        path: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            editor: monaco.editor,
            editorStore: editorStore()
        }
    },
    methods: {
        createEditor() {
            const editorText = '';
            this.editor.create(this.$refs.editor, {
                editorText,
                language: 'javascript',
                theme: 'vs-dark',
                automaticLayout: true,
                scrollbar: {
                    useShadows: false
                }
                // minimap: {
                //     enabled: true,
                // },

            })
            this.editor.getModel().setValue("Hello");
        },
        getFileContent() {
            let url = '/api/get_file_content';
            let data = {
                path: this.path
            }
            const xhr = new XMLHttpRequest();
            xhr.open('post', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => {
                let response = JSON.parse(xhr.response);
                // this.editor.getModel().setValue("response.file_content");
            }
            xhr.send(JSON.stringify(data));
        }
    },
    mounted() {
        this.createEditor();
        this.editorStore.setTheme(this.editor, 'monokai');
        this.getFileContent();
    },
    computed: {
        editorModel() {
            return this.editor.getModel();
        }
    }

}
</script>
