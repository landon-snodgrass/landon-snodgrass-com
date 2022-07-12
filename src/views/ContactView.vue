<script>
import { faMehRollingEyes } from '@fortawesome/free-solid-svg-icons';

export default {
    inject: ['backendUrl'],
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
            const msg = {
                fromName: this.fromName,
                fromEmail: this.fromEmail,
                msgSubject: this.msgSubject,
                msgType: this.msgType,
                msgBody: this.msgBody,
            };

            fetch(`${this.backendUrl}/api/contact`, {
                method: 'POST',
                body: JSON.stringify({ msg }),
                headers: {
                    'content-type': 'application/json',
                },
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
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
                email.
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
        <div class="form">
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
                    <select
                        class="half"
                        name="msgType"
                        v-model="msgType"
                        required
                    >
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
                    <input type="submit" value="Submit" class="main-button" />
                </div>
            </form>
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
    }
}
</style>
