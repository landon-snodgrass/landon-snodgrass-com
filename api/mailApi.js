const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

function createFormSubmissionBody(formData) {
    let html = '<p>';
    for (const field in formData) {
        html += `<p><strong>${field}:</strong> ${formData[field]}</p>`;
    }
    html += '</p>';
    return html;
}

const sendContactForm = (req, res) => {
    const submissionMsg = createFormSubmissionBody(req.body.msg);

    const msg = {
        to: 'g.l.snodgrass95@gmail.com',
        from: 'g.l.snodgrass95@gmail.com',
        subject: 'Contact form submission from LandonSnodgrass.com',
        html: submissionMsg,
    };

    sgMail
        .send(msg)
        .then((response) => {
            res.status(response[0].statusCode).send('Okay!');
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

module.exports = {
    sendContactForm,
};
