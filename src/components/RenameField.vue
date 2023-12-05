<template>
    <div class="fit q-ma-none z-top">
        <q-input v-if="showInput" dense outlined v-model="fileName">
            <template v-slot:append>
                <q-btn
                    dense
                    flat
                    icon="close"
                    @click.stop="$emit('onClose')"
                ></q-btn>
            </template>
        </q-input>
    </div>
</template>

<script>
export default {
    props: {
        node: {
            type: Object,
            required: true,
        },
        show: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        fileName() {
            return this.node.label;
        },
        showInput() {
            return this.show;
        },
    },
};
</script>
