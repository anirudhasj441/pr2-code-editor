<template>
    <div ref="editor" class="fit" @keydown="handleKeyDown"></div>
    <!-- <div class="">{{ fileChanged }}</div> -->
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
            editorObj: null,
            editorText: 'Hello',
            editorStore: editorStore(),
            // editorModel: null
        }
    },
    methods: {
        createEditor() {
            let editorObj = monaco.editor.create(this.$refs.editor, {
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

            this.editorModel = this.createModel();

            editorObj.setModel(this.editorModel);


            editorObj.addCommand(
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
                () => {
                    // services available in `ctx`
                    // alert("my command is executing!");
                    this.save()
                },
            );

            return editorObj;

            // editorModel.setValue("Hello")
            // this.editorModel = this.editor.createModel('');

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
                this.editorText = response.file_content;
                this.editorModel.setValue(this.editorText);
                // console.log(this.platform.is.platform)
            }
            xhr.send(JSON.stringify(data));
        },
        createModel() {
            const extLanguageMap = {
                py: 'python',
                js: 'javascript',
                html: 'html',
                ts: 'typescript'
            }
            let ext = this.path.split('.')[1];
            let editorModel = monaco.editor.createModel('', extLanguageMap[ext]);

            // editorObj.setModel(editorModel);
            return editorModel;
        },
        save() {
            let url = "/api/save_file";
            let data = {
                path: this.path,
                file_content: this.editorModel.getValue()
            }
            const xhr = new XMLHttpRequest();
            xhr.open("post", url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => {
                let response = JSON.parse(xhr.response);
                this.editorText = this.editorModel.getValue();


            }
            xhr.send(JSON.stringify(data));
            console.log(data);
        },
    },
    mounted() {
        this.editorObj = this.createEditor();
        console.log("editor: ", this.editorObj);
        // this.editorObj.setModel(this.editorModel);
        this.editorStore.setTheme('monokai');

        this.getFileContent();

        console.log(this.$q.platform);
        document.addEventListener("keydown", function (e) {
            if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                // alert('captured');
            }
        }, false);

    },
    computed: {
        // editorModel() {
        //     return this.editor.getModel();
        // }
        isMobile: function () {

            return this.$q.screen.width < 1023;

        },
        platform() {
            console.log("platform", this.$q.platform);
            return this.$q.platform.is.platform;
        },
        fileChanged() {
            if (this.editorModel) {
                return this.editorText !== this.editorModel.getValue();
            }
            return false;
        }
    }

}
</script>
