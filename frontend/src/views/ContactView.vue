<script>
import ContactForm from '../components/contact/ContactForm.vue';
import ContactLoader from '../components/contact/ContactLoader.vue';

export default {
    inject: ['backendUrl'],
    components: {
        ContactForm,
        ContactLoader,
    },
    data() {
        return {
            loading: false,
            error: false,
            success: false,
            formHeight: 0,
            sendStatus: -1,
        };
    },
    mounted() {
        this.formHeight = this.$refs.formContainer.clientHeight;
    },
    methods: {
        clearForm() {
            this.fromName = '';
            this.fromEmail = '';
            this.msgSubject = '';
            this.msgBody = '';
        },
        resetForm() {
            this.loading = false;
            this.error = false;
            this.success = false;
        },
        submitForm(msg) {
            this.loading = true;

            fetch(`${this.backendUrl}/api/contact`, {
                method: 'POST',
                body: JSON.stringify({ msg }),
                headers: {
                    'content-type': 'application/json',
                },
            })
                .then((res) => {
                    this.sendStatus = res.status;
                    this.clearForm();
                })
                .catch((err) => {
                    this.sendStatus = 500;
                    console.error(err);
                    this.clearForm();
                });
        },
    },
};
</script>

<template>
    <div class="contact-container">
        <div class="info">
            <div class="title-row">
                <p><strong>Contact</strong></p>
                <p>
                    <a href="mailto:g.l.snodgrass95@gmail.com">
                        g.l.snodgrass95@gmail.com
                    </a>
                </p>
            </div>
            <p>
                Below is a form you can use to talk to me but, to be honest,
                it's mostly just to prove I can make a form that works. I'm
                pretty sure if anyone needs to contact me, they'll just use my
                email. However, the animation is pretty neat so you might want
                to try it just for fun.
            </p>
            <br />
            <p>
                I did think it'd be fun to include a "bug reporting" feature. If
                you've encountered any bugs or accessibility issues you can
                report it with the form below. Also, any suggestions for the
                site are appreciated although I can't guarantee I'll implement
                them. Yeah, I know it's a little tacky to crowd source ideas for
                my portfolio site but web dev is hard...
            </p>
        </div>
        <div class="form" ref="formContainer">
            <Transition name="zoom" mode="out-in">
                <KeepAlive>
                    <contact-form
                        v-if="!loading"
                        @form-submit="submitForm"
                    ></contact-form>
                    <contact-loader
                        :height="formHeight"
                        :status="sendStatus"
                        v-else
                    ></contact-loader>
                </KeepAlive>
            </Transition>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';
@import '@/assets/common.scss';

.contact-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 30px auto;
    width: 1280px;
    padding: 40px 80px;

    .title-row {
        display: flex;
        justify-content: space-between;
    }

    .info {
        background: $color-orange;
        padding: 20px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom: 2px solid $color-dark;

        p,
        a {
            @include font-serif-bold;
            font-size: 22px;

            strong {
                @include font-display;
            }
        }
    }

    .form {
        border: solid 2px $color-dark;
        border-top: none;
        width: 100%;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .zoom-leave-from,
    .zoom-enter-to {
        transform: scale(1);
    }

    .zoom-leave-active,
    .zoom-enter-active {
        transition-duration: 0.3s;
    }

    .zoom-leave-to,
    .zoom-enter-from {
        transform: scale(0);
    }
}
</style>
