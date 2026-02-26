
window.EMAILJS_CONFIG = {
    PUBLIC_KEY: "gHw_cnsTESbcxXb_k",
    SERVICE_ID: "service_hn1zl9b",
    TEMPLATE_ID: "template_50vakxl"
};
const EMAILJS_CONFIG = window.EMAILJS_CONFIG;

console.log("✓ EmailJS Config loaded from config.js:", EMAILJS_CONFIG);


function initContactForm() {
    console.log("Form handler initializing...");
    console.log("EmailJS Config:", EMAILJS_CONFIG);
    

    if (!EMAILJS_CONFIG || !EMAILJS_CONFIG.PUBLIC_KEY || !EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID) {
        console.error("EmailJS configuration missing!");
        console.error("Config object:", EMAILJS_CONFIG);
        return;
    }

    
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    } else {
        console.error("EmailJS library not loaded. Make sure the script tag is included in your HTML.");
        return;
    }

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submit-btn');
    const formResponse = document.getElementById('form-response');

    
    if (!contactForm || !submitBtn || !formResponse) {
        console.error("Contact form elements not found.");
        return;
    }


    function handleFormSubmit(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
        
        console.log("Form submitted, handling submission");

        const name = document.getElementById('form_name');
        const email = document.getElementById('form_email');
        const message = document.getElementById('form_message');

        
        let isValid = true;
        document.querySelectorAll('.error-msg').forEach(el => el.innerText = "");
        [name, email, message].forEach(el => el.classList.remove('invalid'));

        
        
        
        if (name.value.trim().length < 2) {
            document.getElementById('name-error').innerText = "Please enter your name.";
            name.classList.add('invalid');
            isValid = false;
        }

        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            document.getElementById('email-error').innerText = "Please enter a valid email.";
            email.classList.add('invalid');
            isValid = false;
        }

        
        if (message.value.trim().length < 10) {
            document.getElementById('message-error').innerText = "Message must be at least 10 characters.";
            message.classList.add('invalid');
            isValid = false;
        }

        if (isValid) {
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            
            emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, contactForm)
                .then(() => {
                    submitBtn.innerText = "Message Sent! ✅";
                    formResponse.innerText = "Thank you! I will contact you soon.";
                    formResponse.className = "form-success success";
                    
                    contactForm.reset();
                    
                    setTimeout(() => {
                        submitBtn.innerText = "Send Message";
                        submitBtn.disabled = false;
                        formResponse.innerText = "";
                        formResponse.className = "";
                    }, 5000);

                }, (err) => {
                    submitBtn.innerText = "Error! ❌";
                    submitBtn.disabled = false;
                    formResponse.innerText = "Something went wrong. Please try again.";
                    formResponse.className = "error";
                    console.error("EmailJS Error:", err);
                });
        } else {
            console.log("Form validation failed");
        }
    }

    // Attach handler to form submit event
    contactForm.addEventListener('submit', handleFormSubmit);
    console.log("Form submit handler attached");
    
    // Also attach to button click as backup
    submitBtn.addEventListener('click', function(event) {
        console.log("Button clicked");
        event.preventDefault();
        handleFormSubmit(event);
    });
    console.log("Button click handler attached");
    
    console.log("Form handler attached successfully!");
    console.log("Form element:", contactForm);
    console.log("Button element:", submitBtn);
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    
    initContactForm();
}