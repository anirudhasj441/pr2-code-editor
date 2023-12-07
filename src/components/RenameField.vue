<template>
    <div class="fit q-ma-none z-top">
        <q-form @submit="renameFile">
            <q-input dense outlined v-model="fileName">
                <template v-slot:append>
                    <q-btn dense flat icon="close" @click.stop="$emit('onClose')"></q-btn>
                </template>
            </q-input>
        </q-form>
    </div>
</template>

<script>
export default {
    props: {
        path: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            fileName: '',
        };
    },
    methods: {
        renameFile() {
            let url = '/api/rename_file';
            let pathList = this.path.split('/');
            console.log("fileName: ", this.fileName);
            pathList[pathList.length - 1] = this.fileName;
            let newPath = pathList.join('/');
            let data = {
                old_path: this.path,
                new_path: newPath
            }

            const xhr = new XMLHttpRequest();
            xhr.open('post', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => {
                let response = JSON.parse(xhr.response);
                console.log(response);
                this.$emit('onRename');
            }
            xhr.send(JSON.stringify(data));
        }
    },
    mounted() {
        let dirs = this.path.split('/');
        this.fileName = dirs[dirs.length - 1];
    },
    computed: {
        // fileName() {
        //     return dirs[dirs.length - 1];
        // }
    },
};
</script>
