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

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let validity=true;

    for (let i=0;i<fields.length;i++) {
        let cur_validity = validate_field(fields[i]);
        
        if (!cur_validity) {
            validity = false;
        }
    }

    if (validity) {
        form.style.display="none";
        success_msg.style.display="block";
    }
});




