let elLoginForm = document.querySelector(".login-form")
let registeredUser = JSON.parse(localStorage.getItem("registeredUser"))



elLoginForm.addEventListener("submit" , function(e){
    e.preventDefault()
    const data = {
        username:e.target.username.value,
        password:e.target.password.value,
    }
    elLoginForm.children[7].innerHTML = `
    <img class="mx-auto scale-[1.4]" src="./images/infinity.svg" alt="loading img" width="40">
  `
    
    if(registeredUser){
        if(registeredUser.newUsername == data.username && registeredUser?.newPassword == data.password){
            localStorage.setItem("user", JSON.stringify(data))
            setTimeout(() => location.pathname = "./admin.html", 1000)
        }
        else{
            setTimeout(() => {
                elLoginForm.children[7].innerHTML = `
               <img class="mx-auto scale-[1.4]" src="./images/error.svg" alt="error img" width="40">
             `
            },800)
            setTimeout(() => {
                elLoginForm.children[7].innerHTML = `SIGN IN`
            },1600)
        }
    }
    
    else{
        if(data.username == "mustafo" && data.password == "123"){
            localStorage.setItem("user", JSON.stringify(data))
            setTimeout(() => location.pathname = "./admin.html", 1000)
        }
        
        else{
            setTimeout(() => {
                elLoginForm.children[7].innerHTML = `
                   <img class="mx-auto scale-[1.4]" src="./images/error.svg" alt="error img" width="40">
                 `
            },800)
            setTimeout(() => {
                elLoginForm.children[7].innerHTML = `SIGN IN`
            },1600)
        }
    }
})