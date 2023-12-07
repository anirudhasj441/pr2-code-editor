<template>
    <div class="fit q-ma-none z-top">
        <q-form @submit="createFile">
            <q-input dense outlined v-model="newFileName">
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
            newFileName: ''
        };
    },
    methods: {
        createFile() {
            let filePath = this.path + "/" + this.newFileName;
            console.log("file path: ", filePath)
            let data = {
                path: filePath
            }
            let url = '/api/create_file';
            const xhr = new XMLHttpRequest();
            xhr.open('post', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => {
                let response = JSON.parse(xhr.response);
                console.log(response);
                this.$emit('onCreate')
            }
            xhr.send(JSON.stringify(data))
        }
    },
    computed: {
    },
};
</script>
