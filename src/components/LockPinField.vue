<template>
    <div class="window-height window-width">
        <q-dialog v-model="showDialog">
            <q-card flat>
                <q-card-section align="center">
                    <div class="text-h6">Enter Pin to continue.</div>
                </q-card-section>
                <q-card-section>
                    <q-form @submit="validate">
                        <div class="flex">
                            <q-input outlined v-model="pin" mask="####" fill-mask="****" input-style="text-align: left">
                                <template v-slot:append>
                                    <q-btn flat icon="close" @click="$emit('onClose')"></q-btn>
                                </template>
                            </q-input>
                        </div>
                    </q-form>
                </q-card-section>
                <q-card-actions>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import { pinStore } from '../stores/global-store';
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            pin: '',
            pinStore: pinStore()
        }
    },
    methods: {
        validate() {
            this.$emit('onValidate', this.pinStore.validate(this.pin));
        }
    },
    computed: {
        showDialog() {
            return this.show;
        }
    }
}
</script>

