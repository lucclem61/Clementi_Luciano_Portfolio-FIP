export function contactForm() {
  const contactFormElement = document.querySelector("#contact-form");
  const feedbackElement = document.querySelector(".form-message");

  if (!contactFormElement || !feedbackElement) return;

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new URLSearchParams({
      fname: contactFormElement.elements.fname.value,
      lname: contactFormElement.elements.lname.value,
      email: contactFormElement.elements.email.value,
      city: contactFormElement.elements.city.value,
      comments: contactFormElement.elements.comments.value,
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
