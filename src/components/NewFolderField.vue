<template>
    <div class="fit q-ma-none z-top">
        <q-form @submit="createFolder">
            <q-input dense outlined v-model="newFolder">
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
            newFolder: ''
        };
    },
    methods: {
        createFolder() {
            let dirPath = this.path + "/" + this.newFolder;
            console.log("path: ", dirPath);
            let data = {
                path: dirPath
            }
            let url = "/api/create_folder";
            const xhr = new XMLHttpRequest();
            xhr.open('post', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => {
                let response = JSON.parse(xhr.response);
                console.log(response);
                this.$emit('onCreated');
            }
            xhr.send(JSON.stringify(data))
        }
    },
    computed: {
    },
};
</script>
