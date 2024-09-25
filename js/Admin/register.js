let elRegisterForm = document.querySelector(".register-form")


elRegisterForm.addEventListener("submit" , function(e){
  e.preventDefault()
  const data = {
    newUsername:e.target.newUsername.value,
    newPassword:e.target.newPassword.value
  }
  elRegisterForm.children[7].innerHTML = `
    <img class="mx-auto scale-[1.4]" src="./images/infinity.svg" alt="loading img" width="40">
  `
  
  localStorage.setItem("registeredUser", JSON.stringify(data))
  setTimeout(() => location.pathname = "index.html", 1000)
})