const form=document.getElementById("contactForm");
const success_msg=document.getElementById("success_msg");

const fields=["name", "email", "subject", "message"];

function showError(id, message) {
    const field=document.getElementById(id);
    const err=document.getElementById(`${id}_err`);
    
    field.style.borderColor="var(--color-error)";
    err.textContent=message;
};

function clear_error(id) {
    const field=document.getElementById(id);
    const err=document.getElementById(`${id}_err`);
    
    field.style.borderColor="";
    err.textContent="";
};

function validate_field (id) {
    const field=document.getElementById(id);
    const value=field.value.trim();

    if (id==="email") {
        if (!value) {
            showError("email", "Email is required.");
            return false;
        }
        if (!field.checkValidity()) {
            showError("email", "Please enter a valid email address.");
            return false;
        }
        clear_error("email");
        return true;
    }

    if (!value) {
        if(id==="name") {
            showError(id, "Name is required.");
        }
        else if(id==="subject") {
            showError(id, "Subject is required.");
        }
        else if(id==="message") {
            showError(id, "Message is required.");
        }
        
        return false;
    }
    
    clear_error(id);
    return true;
};

fields.forEach(id => {
    const field=document.getElementById(id);
    field.addEventListener("input", () => validate_field(id));
    field.addEventListener("blur", () => validate_field(id));
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let validity=true;

    for (let i=0;i<fields.length;i++) {
        let cur_validity=validate_field(fields[i]);
        
        if (!cur_validity) {
            validity = false;
        }
    }

    if (validity) {
        const submitBtn = form.querySelector('.form_submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        
        try {
            const formData = new FormData();
            formData.append("access_key", "bd7d18e1-8d55-4121-a5cf-d99f8573276b");
            formData.append("name", document.getElementById("name").value);
            formData.append("email", document.getElementById("email").value);
            formData.append("subject", document.getElementById("subject").value);
            formData.append("message", document.getElementById("message").value);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                form.style.display = "none";
                success_msg.style.display = "block";
            } else {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            submitBtn.textContent = originalText;
            alert("Something went wrong. Please try again later.");
        }
    }
});




