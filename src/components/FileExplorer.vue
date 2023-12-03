<template>
    <div class="fit">
        <div class="text-md explorer-header bg-editor items-center text-weight-bold q-px-md flex">
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
                    label: "Folder 1",
                    avatar: new URL('../assets/editor-icons/default_folder.svg', import.meta.url).href,
                    selectable: false,
                    children: [
                        {
                            label: "Flder 2",
                            avatar: new URL('../assets/editor-icons/default_folder.svg', import.meta.url).href,
                            selectable: false,
                            children: [
                                {
                                    label: 'main.js',
                                    avatar: new URL('../assets/editor-icons/default_file.svg', import.meta.url).href,
                                    selectable: true,
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
        }
    }
}
</script>

<style lang="scss" scoped></style>
