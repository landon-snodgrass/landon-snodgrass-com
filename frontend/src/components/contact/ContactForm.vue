<script>
import { VueRecaptcha } from 'vue-recaptcha';

export default {
    emits: ['formSubmit'],
    components: { VueRecaptcha },
    data() {
        return {
            fromName: '',
            fromEmail: '',
            msgSubject: '',
            msgType: '',
            msgBody: '',
        };
    },
    methods: {
        submitForm() {
            this.$refs.captcha.execute();
            const msg = {
                fromName: this.fromName,
                fromEmail: this.fromEmail,
                msgSubject: this.msgSubject,
                msgType: this.msgType,
                msgBody: this.msgBody,
            };
            this.$emit('formSubmit', msg);
        },
        clearForm() {
            this.fromName = '';
            this.fromEmail = '';
            this.msgSubject = '';
            this.msgType = '';
            this.msgBody = '';
        },
    },
    computed: {
        formValid() {
            if (
                this.fromName == '' ||
                this.fromEmail == '' ||
                this.msgSubject == '' ||
                this.msgType == '' ||
                this.msgBody == ''
            ) {
                return false;
            }

            return true;
        },
    },
};
</script>

<template>
    <form @submit.prevent="submitForm">
        <div class="form-row">
            <input
                type="text"
                placeholder="Your name"
                class="half"
                name="fromName"
                v-model="fromName"
                required
            />
            <input
                type="email"
                placeholder="Your email"
                class="half"
                name="fromEmail"
                v-model="fromEmail"
                required
            />
        </div>
        <div class="form-row">
            <input
                type="text"
                placeholder="Subject"
                class="half"
                name="msgSubject"
                v-model="msgSubject"
                required
            />
            <select class="half" name="msgType" v-model="msgType" required>
                <option disabled selected value="">Report type</option>
                <option value="message">Message</option>
                <option value="bugReport">Bug Report</option>
                <option value="allyReport">Accessibility Report</option>
                <option value="suggestion">Suggestion</option>
            </select>
        </div>
        <div class="form-row">
            <textarea
                placeholder="Your message"
                class="full"
                name="msgBody"
                v-model="msgBody"
                required
            ></textarea>
        </div>
        <div class="form-row" style="justify-content: end">
            <vue-recaptcha
                sitekey="6Lfo2ZMUAAAAAC8lvGVo3pZE3cGftutHigq4rB9Q"
                ref="captcha"
                size="invisible"
                v-if="formValid"
            ></vue-recaptcha>
            <input
                type="submit"
                value="Submit"
                class="main-button"
                v-if="formValid"
            />
            <input
                type="submit"
                value="Submit"
                class="main-button"
                disabled
                v-else
            />
        </div>
    </form>
</template>

<style lang="scss">
@import '@@/assets/variables.scss';

.form-row {
    display: flex;
    width: 100%;

    .half {
        flex: 1;
    }

    .full {
        flex: 1;
    }

    input[type='submit'] {
        margin: 10px;
    }
}

input[type='submit']:disabled {
    cursor: not-allowed;
    background: #aaa;
    box-shadow: none;
    color: #eee;

    &:hover {
        transform: none;
    }
}

input[type='text'],
input[type='email'],
textarea,
select {
    background: transparent;
    outline: none;
    border: none;
    border-bottom: solid 2px $color-dark;
    padding: 10px;
    margin: 10px;
    @include font-serif-bold;
    font-size: 22px;
}
</style>
