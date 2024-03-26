
(function () {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
        publicKey: "eNw-MRWitQfVHEsXd",
    });

    window.onload = function () {
        document.getElementById('contact-form').addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Use emailjs.sendForm for form data
            emailjs.send('service_f938fg4', 'template_34etyzp', {
                from_name: "Vibrant Ventures",
                user_name: name,
                user_email: email,
                message: message
            })
                .then(() => {
                    alert('Inquiry sent!');
                    console.log('Inquiry sent!');

                    // Clear form after successful submission
                    document.getElementById('contact-form').reset();
                }, (error) => {
                    alert('Failed to send inquiry!');
                    console.log('Failed to send inquiry!', error);
                });
        });
    };
})();
