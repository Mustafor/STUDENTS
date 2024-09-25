let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")
let elPoolsList = document.querySelector(".pool-tbody")
let elSearchInput = document.querySelector(".search-input")


let products = JSON.parse(localStorage.getItem("products")) || []


// Add part start

function handleAddProductBtnClick(){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = `
    <h3 class="text-center mt-[15px] text-[#F2EAE1] text-[28px]">ADD NEW STUDENT</h3>
        <form class="add-product-form" autocomplete="off">
        <input type="checkbox" class="hidden" name="chackbox" id="checkbox"/>
            <label class="block">
                <input class="add-choose-input hidden" type="file">
                <img class="add-choose-img mx-auto py-2 rounded-md" src="./images/avatar.svg" alt="avatar" width="250" height="150">
            </label>
                    <label for="username" class="inline-block ml-[30px]">
                        <span class="block text-[18px] mb-[5px] text-[#F2EAE1] font-bold">Name</span>
                        <input class="add-choose-input w-[200px] h-[50px] mb-[10px] py-[25px] px-[15px] outline-none text-[18px]" type="text" name="username" id="username" placeholder="Name" required>
                    </label>
                    <label for="email" class="inline-block ml-[30px]">
                        <span  class="block text-[18px] mb-[5px] text-[#F2EAE1] font-bold">Email</span>
                        <input class="add-choose-input w-[200px] h-[50px] mb-[10px] py-[25px] px-[15px] text-[18px] outline-none" type="email" name="email" id="email" placeholder="Email" required>
                    </label>
                    <label for="phone" class="inline-block ml-[30px]">
                        <span  class="block text-[18px] mb-[5px] text-[#F2EAE1] font-bold">Phone</span>
                        <input class="add-choose-input w-[200px] h-[50px] mb-[10px] py-[25px] px-[15px] text-[18px] outline-none" type="number" name="phone" id="phone" placeholder="Phone" required>
                    </label>
                    <label for="enroll-number" class="inline-block ml-[30px]">
                        <span  class="block text-[18px] mb-[5px] text-[#F2EAE1] font-bold">Enroll Number</span>
                        <input class="add-choose-input w-[200px] h-[50px] mb-[10px] py-[25px] px-[15px] text-[18px] outline-none" type="number" name="enroll-number" id="enroll-number" placeholder="Enroll Number" required>
                    </label>
                    <label for="admission" class="inline-block ml-[30px]">
                        <span  class="block text-[18px] mb-[5px] text-[#F2EAE1] font-bold">Date admission</span>
                        <input class="add-choose-input w-[200px] h-[50px] mb-[10px] py-[25px] px-[15px] text-[18px] outline-none" type="date" name="admission" id="admission" required>
                    </label>
            <button class="add-product-btn w-[300px] hover:border-[2px] border-[#F2EAE1] hover:bg-transparent duration-300 hover:text-[#F2EAE1] mt-[15px] block mx-auto py-[6px] bg-white text-[#FEAF00] text-[20px] text-center font-bold rounded-[8px]">Add</button>
        </form>
    `
    
    let elProductForm = document.querySelector(".add-product-form")
    let elChooseInput = document.querySelector(".add-choose-input")
    let elChooseImg = document.querySelector(".add-choose-img")
    
    if (elProductForm){
        elProductForm.addEventListener("submit", function (e){
            e.preventDefault()
            
            const data = {
                id: Date.now(),
                imgUrl: elChooseImg.src,
                username: e.target.username.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                enrollNumber: e.target['enroll-number'].value,
                admission: e.target.admission.value
            }
            
            let addButton = e.target.querySelector(".add-product-btn")
            addButton.innerHTML = `<img class="mx-auto scale-[1.4]" src="./images/infinity.svg" alt="loading img" width="40">`
            
            setTimeout(() => {
                addButton.innerHTML = "ADD"
                products.push(data)
                localStorage.setItem("products", JSON.stringify(products))
                elModalWrapper.classList.add("scale-0")
                renderPools(products)
            }, 1000)        
        })
    }
    
    if (elChooseInput && elChooseImg) {
        elChooseInput.addEventListener("change", function (e) {
            const file = e.target.files[0];
            if(file){
                elChooseImg.src = URL.createObjectURL(file)
            } 
            else{
                elChooseImg.src = "./images/avatar.svg"
            }
        })
    }
    
}

elModalWrapper.addEventListener("click", (e) => {
    if (e.target.id == "wrapper") {
        elModalWrapper.classList.add("scale-0")
        setTimeout(() => {
            elModalInner.className = "modal-inner w-[500px] h-[300px] bg-[#FEAF00] rounded-[20px] absolute top-0 bottom-0 right-0 left-0 m-auto"
        }, 500)
    }
})

// Add part end


// Render start

function renderPools(products) {
    elPoolsList.innerHTML = null
    elPoolsList.innerHTML = products.map(product => `
        <tr>
            <td>
            <img class="m-auto" src="${product.imgUrl}" alt="${product.username}" width="55"/>
            </td>
            <td>${product.username}</td>
            <td>${product.email}</td>
            <td>${product.phone}</td>
            <td>${product.enrollNumber}</td>
            <td>${product.admission}</td>
            <td class="rounded-tr-[30px] rounded-br-[30px]">
                <div class="flex items-center gap-[18px]">
                    <button onclick="handleMoreBtnClick(${product.id})">
                        <img class="hover:scale-[1.5] duration-300" src="./images/more.svg" alt="chart img" width="15" height="15">
                    </button>
                    <button onclick="handleEditBtnClick(${product.id})">
                        <img class="hover:scale-[1.5] duration-300" src="./images/update.svg" alt="chart img" width="15" height="15">
                    </button>
                    <button onclick="handleDeleteBtnClick(${product.id})">
                        <img class="hover:scale-[1.5] duration-300" src="./images/delete.svg" alt="delete img" width="15" height="15">
                    </button>
                </div>
            </td>
        </tr>
    `).join('')
    }
    
    renderPools(products)
    
    // Render end
    
    
    // More start
    
    function handleMoreBtnClick(id) {
        const productToShow = products.find(item => item.id == id)
        elModalWrapper.classList.remove("scale-0")
        elModalInner.classList.remove("h-[300px]")
        elModalInner.classList.remove("w-[500px]")
        elModalInner.classList.add("w-[900px]")
        elModalInner.classList.add("h-[450px]")
        elModalInner.classList.add("bg-white")
        elModalInner.innerHTML = `
          <h3 class="text-center mt-[15px] text-[#000000] text-[28px]">STUDENT</h3>
          <ul class="flex p-[51px]">
            <div class="flex items-center gap-[50px]">
              <img class="add-choose-img rounded-md" src="${productToShow.imgUrl}" alt="avatar" width="206" height="150">
              <div class="flex flex-col">
                <li class="inline-block mb-[11px]">
                  <strong class="block text-[18px] font-bold text-[#ACACAC]">Name</strong>
                  <span class="font-bold text-[24px] text-[#000000]">${productToShow.username}</span>
                </li>
                <li class="inline-block mb-[11px]">
                  <strong class="block text-[18px] font-bold text-[#ACACAC]">Email</strong>
                  <span class="font-bold text-[24px] text-[#000000]">${productToShow.email}</span>
                </li>
                <li class="inline-block mb-[11px]">
                  <strong class="block text-[18px] font-bold text-[#ACACAC]">Phone</strong>
                  <span class="font-bold text-[24px] text-[#000000]">${productToShow.phone}</span>
                </li>
                <li class="inline-block mb-[11px]">
                  <strong class="block text-[18px] font-bold text-[#ACACAC]">Date admission</strong>
                  <span class="font-bold text-[20px] text-[#000000]">${productToShow.admission}</span>
                </li>
              </div>
            </div>
            <img class="ml-[450px]" src="./images/vector.svg" alt="vector" width="52" height="82"/>
          </ul>
        `
    }    
    
    // More end
    
    
    // Edit part start
    
    function handleEditBtnClick(id) {
        const productToEdit = products.find(item => item.id === id)
        elModalWrapper.classList.remove("scale-0")
        elModalInner.innerHTML = `
              <h3 class="text-center mt-[15px] text-[#F2EAE1] text-[28px]">EDIT STUDENT</h3>
                <form class="edit-product-form" autocomplete="off">
                <input type="checkbox" class="hidden" name="chackbox" id="checkbox"/>
                    <label class="block">
                        <input class="add-choose-input hidden" type="file">
                        <img class="add-choose-img mx-auto py-2 rounded-md" src="${productToEdit.imgUrl}" alt="avatar" width="250" height="150">
                    </label>
                            <label for="username" class="inline-block ml-[30px]">
                                <span class="block text-[18px] mb-[5px] text-[#F2EAE1] font-bold">Name</span>
                                <input class="add-choose-input w-[200px] h-[50px] mb-[10px] py-[25px] px-[15px] outline-none text-[18px]" type="text" name="username" id="username" value="${productToEdit.username}" required>
                            </label>
                            <label for="email" class="inline-block ml-[30px]">
                                <span  class="block text-[18px] mb-[5px] text-[#F2EAE1] font-bold">Email</span>
                                <input class="add-choose-input w-[200px] h-[50px] mb-[10px] py-[25px] px-[15px] text-[18px] outline-none" type="email" name="email" id="email" value="${productToEdit.email}" required>
                            </label>
                            <label for="phone" class="inline-block ml-[30px]">
                                <span  class="block text-[18px] mb-[5px] text-[#F2EAE1] font-bold">Phone</span>
                                <input class="add-choose-input w-[200px] h-[50px] mb-[10px] py-[25px] px-[15px] text-[18px] outline-none" type="number" name="phone" id="phone" value="${productToEdit.phone}" required>
                            </label>
                            <label for="enroll-number" class="inline-block ml-[30px]">
                                <span  class="block text-[18px] mb-[5px] text-[#F2EAE1] font-bold">Enroll Number</span>
                                <input class="add-choose-input w-[200px] h-[50px] mb-[10px] py-[25px] px-[15px] text-[18px] outline-none" type="number" name="enroll-number" id="enroll-number" value="${productToEdit.enrollNumber}" required>
                            </label>
                            <label for="admission" class="inline-block ml-[30px]">
                                <span  class="block text-[18px] mb-[5px] text-[#F2EAE1] font-bold">Date admission</span>
                                <input class="add-choose-input w-[200px] h-[50px] mb-[10px] py-[25px] px-[15px] text-[16px] outline-none" type="date" name="admission" id="admission" value="${productToEdit.admission}" required>
                            </label>
                    <button class="add-product-btn w-[300px] hover:border-[2px] border-[#F2EAE1] hover:bg-transparent duration-300 hover:text-[#F2EAE1] mt-[15px] block mx-auto py-[6px] bg-white text-[#FEAF00] text-[20px] text-center font-bold rounded-[8px]">Update</button>
                </form>
            `
        
        let elEditProductForm = document.querySelector(".edit-product-form")
        let elChooseInput = document.querySelector(".add-choose-input")
        let elChooseImg = document.querySelector(".add-choose-img")
        
        if (elEditProductForm) {
            elEditProductForm.addEventListener("submit", function (e) {
                e.preventDefault()
                const editedData = {
                    id: productToEdit.id,
                    imgUrl: elChooseImg.src,
                    username: e.target.username.value,
                    email: e.target.email.value,
                    phone: e.target.phone.value,
                    enrollNumber: e.target['enroll-number'].value,
                    admission: e.target.admission.value
                };
                
                e.target.lastElementChild.innerHTML = `<img class="mx-auto scale-[1.4]" src="./images/infinity.svg" alt="loading img" width="40">`;
                setTimeout(() => {
                    products[products.findIndex(item => item.id === id)] = editedData
                    localStorage.setItem("products", JSON.stringify(products))
                    elModalWrapper.classList.add("scale-0")
                    renderPools(products)
                }, 1000)
            })
        }
        
        if (elChooseInput && elChooseImg) {
            elChooseInput.addEventListener("change", function (e) {
                elChooseImg.src = URL.createObjectURL(e.target.files[0])
            });
        }
    }
    
    // Edit end
    
    
    // Delete start
    
    function handleDeleteBtnClick(id) {
        elModalWrapper.classList.remove("scale-0")
        elModalInner.classList.remove("h-[300px]")
        elModalInner.classList.remove("w-[500px]")
        elModalInner.classList.add("w-[500px]")
        elModalInner.classList.add("h-[200px]")
        
        elModalInner.innerHTML = `
          <div class="p-5 mt-[30px]">
              <h2 class="text-center text-[25px]">Do you want to delete this student?</h2>
              <div class="flex items-center justify-between">
                <button onclick="handleCancelBtnClick()" class="w-[49%] mt-[42px] block mx-auto py-[6px] bg-[#3F8C8E] text-white text-[20px] text-center font-bold rounded-[30px]">No</button>
                <button id="delete-btn-${id}" onclick="handleDeleteProduct(${id})" class="w-[49%] mt-[42px] block mx-auto py-[6px] bg-red-500 text-white text-[20px] text-center font-bold rounded-[30px]">Yes</button>
              </div>
          </div>
        `
    }
    
    function handleCancelBtnClick(){
        elModalWrapper.classList.add("scale-0")
        setTimeout(() => {
            elModalInner.className = "modal-inner w-[500px] h-[300px] bg-[#FEAF00] rounded-[20px] absolute top-0 bottom-0 right-0 left-0 m-auto"
        }, 500)
    }
    
    function handleDeleteProduct(id) {
        let elDeleteBtn = document.getElementById(`delete-btn-${id}`)
        if (elDeleteBtn) {
            elDeleteBtn.innerHTML = `<img class="mx-auto scale-[1.4]" src="./images/infinity.svg" alt="loading img" width="40">`
        }
        const deleteIndex = products.findIndex(item => item.id == id)
        const findedObj = products.find(item => item.id == id)
        setTimeout(() => {
            handleCancelBtnClick()
            products.splice(deleteIndex, 1)
            renderPools(products, findedObj.categoryId)
            localStorage.setItem("products", JSON.stringify(products))
        }, 1000)
    }
    
    // Delete end
    
    
    // Search start
    
    elSearchInput.addEventListener("input", function () {
        const searchQuery = elSearchInput.value.toLowerCase()
        const filteredProducts = products.filter(item => item.username.toLowerCase().includes(searchQuery))
        renderPools(filteredProducts)
    })
    
    // Search end
    
    
    // LogOut start
    
    function handleLogoutBtnClick() {
        elModalWrapper.classList.remove("scale-0")
        elModalInner.classList.remove("h-[300px]")
        elModalInner.classList.remove("w-[500px]")
        elModalInner.classList.add("w-[420px]")
        elModalInner.classList.add("h-[200px]")
        
        elModalInner.innerHTML = `
            <div class="p-5 mt-[30px]">
                <h2 class="text-center text-[25px]">Are you sure you want to log out?</h2>
                <div class="flex items-center justify-between">
                    <button onclick="handleCancelBtnClick()" class="w-[49%] mt-[42px] block mx-auto py-[6px] bg-[#3F8C8E] text-white text-[20px] text-center font-bold rounded-[30px]">No</button>
                    <button id="logout-confirm-btn" onclick="handleLogout()" class="w-[49%] mt-[42px] block mx-auto py-[6px] bg-red-500 text-white text-[20px] text-center font-bold rounded-[30px]">Yes</button>
                </div>
            </div>
        `
    }
    
    let elLogoutBtn = document.querySelector(".logout-btn")
    if (elLogoutBtn){
        elLogoutBtn.addEventListener("click", handleLogoutBtnClick)
    }
    
    function handleLogOut(){
        elModalInner.innerHTML = `
          <div class="flex items-center justify-center h-full">
            <img class="mx-auto scale-[1.4]" src="./images/infinity.svg" alt="loading img" width="40">
          </div>
        `
    }
    
    function handleLogout() {
        localStorage.clear()
        window.location.href = "index.html"
    }
    
    // LogOut end
    
    
    // Sort start
    
    function sortByUsername() {
        products.sort((a, b) => {
            let nameA = a.username.toLowerCase()
            let nameB = b.username.toLowerCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
        })
        renderPools(products)
    }
    
    document.querySelector(".sort-by-username-btn").addEventListener("click", sortByUsername)    
    
    // Sort end
    
    