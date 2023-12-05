<template>
    <div class="fit">
        <div class="text-md explorer-header bg-editor items-center text-weight-bold q-pl-sm flex">
            <div class="q-ma-none">EXPLORER</div>
            <q-space></q-space>
            <div class="file-actions flex">
                <q-btn dense flat class="text-weight-thin" icon="mdi-file-plus-outline">
                    <q-tooltip>
                        New File...
                    </q-tooltip>
                </q-btn>
                <q-btn dense flat class="text-weight-thin" icon="mdi-folder-plus-outline">
                    <q-tooltip>
                        New Folder...
                    </q-tooltip>
                </q-btn>
                <q-btn dense flat class="text-weight-thin" icon="refresh">
                    <q-tooltip>
                        Refresh Explorer
                    </q-tooltip>
                </q-btn>
                <q-btn dense flat class="text-weight-thin" icon="mdi-collapse-all-outline" @click="collapseTree">
                    <q-tooltip>
                        Collapse Folders in Explorer
                    </q-tooltip>
                </q-btn>
            </div>
        </div>
        <q-tree :nodes="treeModel" ref="fileExplorerTree" node-key="label" dense no-connectors :selected="selected"
            @update:selected="selectFile">
            <template v-slot:default-header="prop">
                <div class="row q-gutter-x-sm items-center full-width">
                    <q-icon :name="'img:' + prop.node.avatar"></q-icon>
                    <q-label>{{ prop.node.label }}</q-label>
                    <q-space></q-space>
                    <div class="actions " style="z-index: 999999;">
                        <q-btn v-if="prop.node.type == 'folder'" dense flat class="text-weight-thin"
                            icon="mdi-file-plus-outline" @click="createNewFile(prop.node)">
                            <q-tooltip>
                                New File...
                            </q-tooltip>
                        </q-btn>
                        <q-btn v-if="prop.node.type == 'folder'" dense flat class="text-weight-thin"
                            icon="mdi-folder-plus-outline">
                            <q-tooltip>
                                New Folder...
                            </q-tooltip>
                        </q-btn>
                        <q-btn dense flat class="text-weight-thin" icon="edit">
                            <q-tooltip>
                                Rename...
                            </q-tooltip>
                        </q-btn>
                        <q-btn dense flat class="text-weight-thin" icon="delete">
                            <q-tooltip>
                                Delete...
                            </q-tooltip>
                        </q-btn>
                    </div>

                </div>
            </template>
            <!-- <template v-slot:header-=""></template> -->
        </q-tree>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selected: '',
            treeModel: [
                {
                    nodeKey: '1',
                    label: "Folder 1",
                    avatar: new URL('../assets/editor-icons/default_folder.svg', import.meta.url).href,
                    selectable: false,
                    type: 'folder',
                    path: '/Folder 1',
                    children: [
                        {
                            label: "Flder 2",
                            avatar: new URL('../assets/editor-icons/default_folder.svg', import.meta.url).href,
                            selectable: false,
                            type: 'folder',
                            path: 'Folder 1/Folder 2',
                            children: [
                                {
                                    label: 'main.js',
                                    avatar: new URL('../assets/editor-icons/default_file.svg', import.meta.url).href,
                                    selectable: true,
                                    type: 'file',
                                    path: 'Folder 1/Folder 2/main.js',
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        selectFile(target) {
            console.log(target)
            if (target === null) return;
            selected.value = target;

        },
        collapseTree() {
            this.$refs.fileExplorerTree.collapseAll();
        },
        createNewFile(node) {
            this.$refs.fileExplorerTree.setExpanded(node.nodeKey, true);
            console.log(node);
        }
    }
}
</script>

<style lang="scss" scoped></style>
