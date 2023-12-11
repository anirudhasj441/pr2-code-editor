<template>
    <div class="fit">
        <div ref="editor" class="fit"></div>
        <div class="action-buttons absolute-top-right flex justify-end z-top" style="bottom:
        200% !important;">
            <!-- <q-btn flat icon="share"></q-btn> -->
            <q-btn flat icon="save" @click="save">
                <q-tooltip>Save (Ctrl+S)</q-tooltip>
            </q-btn>
        </div>
    </div>
    <!-- <div class="">{{ fileChanged }}</div> -->
    <lock-pin-field :show="showPinInput" @onClose="showPinInput = false" @onValidate="onValidate"></lock-pin-field>
</template>

<script>
import * as monaco from 'monaco-editor';
import { editorStore, pinStore } from 'stores/global-store';
import LockPinField from './LockPinField.vue';
// import { editor } from 'monaco-editor';


export default {
    components: {
        LockPinField
    },
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
            pinStore: pinStore(),
            pinValidateResolve: null
            // editorModel: null
        }
    },
    methods: {
        onValidate(result) {
            this.pinStore.toggleInputField(false);
            this.pinValidateResolve(result);
        },
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
                ts: 'typescript',
                c: 'c',
                cpp: 'cpp'
            }
            let ext = this.path.split('.')[1];
            let editorModel = monaco.editor.createModel('', extLanguageMap[ext]);

            // editorObj.setModel(editorModel);
            return editorModel;
        },
        validatePin() {
            return new Promise((resolve) => {
                this.pinStore.toggleInputField(true);
                this.pinValidateResolve = resolve;
            })
        },
        async save() {
            let validation = await this.validatePin();
            if (!validation) return;
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
                console.log("save!!");

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
        // document.addEventListener("keydown", function (e) {
        //     if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        //         e.preventDefault();
        //         // alert('captured');
        //     }
        // }, false);

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
        },
        showPinInput() {
            return this.pinStore.getShowPinField;
        }
    }

}
</script>
