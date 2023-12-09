<template>
    <div class="fit">
        <q-scroll-area class="fit">
            <div class="text-md explorer-header bg-editor items-center text-weight-bold q-pl-sm flex">
                <div class="q-ma-none">EXPLORER</div>
                <q-space></q-space>
                <div class="file-actions flex">
                    <q-btn dense flat class="text-weight-thin" icon="mdi-file-plus-outline"
                        @click="() => { newFolderField = false; newFileField = true }">
                        <q-tooltip> New File... </q-tooltip>
                    </q-btn>
                    <q-btn dense flat class="text-weight-thin" icon="mdi-folder-plus-outline"
                        @click="() => { newFileField = false; newFolderField = true }">
                        <q-tooltip> New Folder... </q-tooltip>
                    </q-btn>
                    <q-btn dense flat class="text-weight-thin" icon="refresh" @click="fetchTreeModel">
                        <q-tooltip> Refresh Explorer </q-tooltip>
                    </q-btn>
                    <q-btn dense flat class="text-weight-thin" icon="mdi-collapse-all-outline" @click="collapseTree">
                        <q-tooltip> Collapse Folders in Explorer </q-tooltip>
                    </q-btn>
                </div>
            </div>
            <div>
                <new-file-field v-if="newFileField" path="" @onCreate="fileCreated"
                    @onClose="newFileField = false"></new-file-field>
                <new-folder-field v-if="newFolderField" path="" @onCreated="folderCreated"
                    @onClose="newFolderField = false"></new-folder-field>
            </div>
            <q-tree :nodes="treeModel" ref="fileExplorerTree" node-key="path" dense no-connectors :selected="selected"
                no-selection-unset @update:selected="selectFile">
                <template v-slot:default-header="prop">
                    <div class="row q-gutter-x-sm items-center full-width node-header" style="height: 2rem;">
                        <q-icon :name="'img:' + nodeAvatar[prop.node.avatar]"></q-icon>
                        <div class="row col-grow items-center">
                            <div>{{ prop.node.label }}</div>
                            <q-space></q-space>
                            <div class="actions" style="z-index: 999999">
                                <q-btn v-if="prop.node.type == 'folder'" dense flat class="text-weight-thin"
                                    icon="mdi-file-plus-outline" @click.stop="createNewFileInNode(prop.node)">
                                    <q-tooltip> New File... </q-tooltip>
                                </q-btn>
                                <q-btn v-if="prop.node.type == 'folder'" dense flat class="text-weight-thin"
                                    icon="mdi-folder-plus-outline" @click.stop="createNewFolderInNode(prop.node)">
                                    <q-tooltip> New Folder... </q-tooltip>
                                </q-btn>
                                <q-btn dense flat class="text-weight-thin" icon="edit" @click.stop="renameNode(prop.node)">
                                    <q-tooltip> Rename... </q-tooltip>
                                </q-btn>
                                <q-btn dense flat class="text-weight-thin" icon="delete">
                                    <q-tooltip> Delete... </q-tooltip>
                                </q-btn>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:default-body="prop">
                    <rename-field v-if="prop.node.renameActive" :path="prop.node.path"
                        @onClose="prop.node.renameActive = false" @onRename="fileRenamed"></rename-field>
                    <new-file-field v-if="prop.node.newFileActive" :path="prop.node.path" @onCreate="fileCreated"
                        @onClose="prop.node.newFileActive = false"></new-file-field>
                    <new-folder-field v-if="prop.node.newFolderActive" :path="prop.node.path"
                        @onClose="prop.node.newFolderActive = false"
                        @onCreated="folderCreated(prop.node)"></new-folder-field>
                </template>
                <!-- <template v-slot:header-=""></template> -->
            </q-tree>
        </q-scroll-area>
    </div>
</template>
<script>
import RenameField from "components/RenameField.vue";
import NewFileField from "./NewFileField.vue";
import NewFolderField from "./NewFolderField.vue";
import { tabStore } from '../stores/global-store';
export default {
    components: {
        RenameField,
        NewFileField,
        NewFolderField
    },
    data() {
        return {
            selected: "",
            newFileField: false,
            newFolderField: false,
            nodeAvatar: {
                folder: new URL("../assets/editor-icons/default_folder.svg", import.meta.url).href,
                file: new URL("../assets/editor-icons/default_file.svg", import.meta.url).href
            },
            treeModel: [],
            tabStore: tabStore()
        };
    },
    methods: {
        selectFile(target) {
            this.selected = target;
            let node = this.$refs.fileExplorerTree.getNodeByKey(target);
            console.log("target: ", node);
            this.tabStore.openTab(node);
        },
        collapseTree() {
            this.$refs.fileExplorerTree.collapseAll();
        },
        renameNode(node) {
            this.$refs.fileExplorerTree.setExpanded(node.path, true);
            node.renameActive = true;
            node.newFileActive = false;
            node.newFolderActive = false;
            this.newFileField = false;
            this.newFolderField = false
        },
        createNewFileInNode(node) {
            this.$refs.fileExplorerTree.setExpanded(node.path, true);
            node.newFileActive = true;
            node.renameActive = false;
            node.newFolderActive = false;
            this.newFileField = false;
            this.newFolderField = false
        },
        createNewFolderInNode(node) {
            this.$refs.fileExplorerTree.setExpanded(node.path, true);
            node.newFolderActive = true;
            node.newFileActive = false;
            node.renameActive = false;
            this.newFileField = false;
            this.newFolderField = false
        },
        fetchTreeModel() {
            return new Promise((resolve) => {
                let url = "/api/list_files";
                const xhr = new XMLHttpRequest();
                xhr.open('get', url);
                xhr.onload = () => {
                    let response = JSON.parse(xhr.response);
                    console.log(response);
                    this.treeModel = response.tree;
                    resolve();
                }
                xhr.send();
            })
        },
        folderCreated(node = null) {
            console.log("Folder Created!!!!")
            if (node) {
                // node.newFolderActive = false;
            }
            else {
                this.newFolderField = false;
            }
            this.fetchTreeModel();
        },
        async fileCreated(filePath) {
            await this.fetchTreeModel();
            console.log("File Created!!!!")
            console.log("filePath: ", filePath);
            console.log("treeModel: ", this.treeModel);
            let node = this.$refs.fileExplorerTree.getNodeByKey(filePath)
            console.log("node: ", node);
            if (node) {
                // node.newFolderActive = false;
                this.tabStore.openTab(node);
                this.newFileField = false;
            }
        },
        async fileRenamed(oldPath, newPath) {
            await this.fetchTreeModel();
            console.log("treeModel: ", this.treeModel);
            console.log("oldPath: ", oldPath)
            console.log("newPath: ", newPath)
            let node = this.$refs.fileExplorerTree.getNodeByKey(newPath);
            this.tabStore.updateTab(oldPath, newPath);
            node.renameActive = false;
        }
    },
    mounted() {
        this.fetchTreeModel();
    },
    watch: {
        newFileField(value) {
            console.log(value)
            if (value) {
                this.newFolderField = false;
            }
        },
        NewFolderField(value) {
            console.log(value)
            if (value) {
                this.newFileField = false;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.node-header {
    .actions {
        display: none;
    }

    &:hover {
        .actions {
            display: initial;
        }
    }
}
</style>
