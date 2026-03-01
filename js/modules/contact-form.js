export function contactForm() {
  const contactFormElement = document.querySelector("#contact-form");
  const feedbackElement = document.querySelector(".form-message");

  if (!contactFormElement || !feedbackElement) return;

  function handleSubmit(event) {
    event.preventDefault();

    const thisForm = event.currentTarget;

    const formData = new URLSearchParams({
      fname: thisForm.elements.fname.value,
      lname: thisForm.elements.lname.value,
      email: thisForm.elements.email.value,
      city: thisForm.elements.city.value,
      comments: thisForm.elements.comments.value,
      company: thisForm.elements.company.value,
      botcheck: thisForm.elements.botcheck.value,
    });

    fetch("includes/scripts/send.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })
      .then(handleResponse)
      .then(handleResponseData)
      .catch(handleError);
  }

  function handleResponse(response) {
    return response.json();
  }

  function handleResponseData(responseData) {
    feedbackElement.innerHTML = "";

    if (responseData.errors) {
      for (let i = 0; i < responseData.errors.length; i += 1) {
        const errorElement = document.createElement("p");
        errorElement.textContent = responseData.errors[i];
        feedbackElement.appendChild(errorElement);
      }
    } else if (responseData.message) {
      const messageElement = document.createElement("p");
      messageElement.textContent = responseData.message;
      feedbackElement.appendChild(messageElement);
      contactFormElement.reset();
    }
  }

  function handleError() {
    feedbackElement.innerHTML = "";

    const errorElement = document.createElement("p");
    errorElement.textContent = "Something went wrong. Please try again.";
    feedbackElement.appendChild(errorElement);
  }

  contactFormElement.addEventListener("submit", handleSubmit);
}
