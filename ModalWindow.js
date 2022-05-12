let Name = false;
let Mail = false;
let Phone = false;
let Already = false;

function ShowWindow(text){
    let ground = document.getElementById("ground");
    let del = document.getElementById("form");
    del?.remove();

    let message = document.createElement("div");
    message.className = "modalWindow";
    ground.append(message);

    let closer = document.createElement("i");
    closer.classList.add("closer");
    closer.classList.add("fa-regular");
    closer.classList.add("fa-circle-xmark");
    closer.addEventListener("click", ()=>{ground.remove()});
    message.append(closer);

    let content = document.createElement("p");
    content.className = "for-message";
    content.textContent = text;
    message.append(content);

    let but = document.createElement("button");
    but.className = "normal-button";
    but.textContent = "back";
    but.addEventListener("click", ()=>{ground.remove()});
    message.append(but);

    setTimeout(() => {ground.remove();}, 5000);
}

function removeClick(){
    let wrapper = document.getElementById("ground");
    wrapper?.remove();
    document.body.style.overflow = "auto";
    document.body.style.filter = "none";
}

function Modal(){
    let back = document.createElement("div");
    back.id = "ground";
    back.className = "ground";
    document.documentElement.prepend(back);

    if (Already){
        ShowWindow("The subscription has already been issued.");
        return;
    }
    let modalWindow = document.createElement("div");
    modalWindow.id = "form";
    modalWindow.className = "modalWindow";
    back.append(modalWindow);

    let closer = document.createElement("i");
    closer.classList.add("closer");
    closer.classList.add("fa-regular");
    closer.classList.add("fa-circle-xmark");
    closer.addEventListener("click",()=>{back.remove();})
    modalWindow.append(closer);

    let name = document.createElement("div");
    let labelName = document.createElement("label");
    labelName.className = "for-label";
    labelName.textContent = "Name:";
    name.append(labelName);
    let inputName = document.createElement("input");
    inputName.className = "for-input";
    inputName.type = "text";
    const regName = /^[a-z]+$/i;
    inputName.addEventListener("input",(event)=> {
        if (regName.test(event.target.value)) {
            event.target.style.color = "green";
            Name = true;
        } else {
            event.target.style.color = "red";
            Name = false;
        }
        if(Name && Mail && Phone) submit.className = "normal-button";
        else submit.className = "for-button";
    });
    name.append(inputName);
    modalWindow.append(name);

    let mail = document.createElement("div");
    let labelMail = document.createElement("label");
    labelMail.className = "for-label";
    labelMail.textContent = "E-mail:";
    mail.append(labelMail);
    let inputMail = document.createElement("input");
    inputMail.className = "for-input";
    inputMail.type = "text";
    const regMail = /^\w[\w-.]*@[\w-]+\.[a-z]{2,4}$/i;
    inputMail.addEventListener("input",(event)=>{
        if(regMail.test(event.target.value)){
            event.target.style.color = "green";
            Mail = true;
        }else{
            event.target.style.color = "red";
            Mail = false;
        }
        if(Name && Mail && Phone) submit.className = "normal-button";
        else submit.className = "for-button";
    });
    mail.append(inputMail);
    modalWindow.append(mail);

    let phone = document.createElement("div");
    let labelPhone = document.createElement("label");
    labelPhone.className = "for-label";
    labelPhone.textContent = "Phone number:";
    phone.append(labelPhone);
    let inputPhone = document.createElement("input");
    inputPhone.className = "for-input";
    inputPhone.type = "text";
    const regPhone = /^[+]\d{12}$/;
    inputPhone.addEventListener("input",(event)=>{
        if(regPhone.test(event.target.value)){
            event.target.style.color = "green";
            Phone = true;
        }else{
            event.target.style.color = "red";
            Phone = false;
        }
        if(Name && Mail && Phone) submit.className = "normal-button";
        else submit.className = "for-button";
    });
    phone.append(inputPhone);
    modalWindow.append(phone);

    let submit = document.createElement("button");
    submit.className = "for-button";
    submit.textContent = "submit";
    submit.addEventListener("click", ()=>{
        if(Name && Mail && Phone){
            ShowWindow("The registration was successful. Expect an email message.");
            Already = true;
            localStorage.setItem("Already","1");
        }
    });
    modalWindow.append(submit);
}

function Proc(){
    let boxes = document.querySelectorAll(".price");
    for(let div of boxes){
        let button = div.querySelector(".btn.signup");
        button.addEventListener("click", Modal);
    }
}

let prem = localStorage.getItem("Already");
if(prem){
    Already = Boolean(prem);
}
Proc();
