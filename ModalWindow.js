function ShowWindow(content, top, left, time, style=""){
    let message = document.createElement("pre");
    message.className = "message";
    message.textContent = content;
    message.style.top = top + "px";
    message.style.left = left + "px";
    document.documentElement.append(message);
    if (style !== "") message.classList.add(style);
    setTimeout(() => {message.remove();}, time);
}

function Modal(event){
    let back = document.createElement("div");
    back.className = "ground";
    document.documentElement.prepend(back);

    let modalWindow = document.createElement("div");
    modalWindow.className = "modalWindow";
    back.append(modalWindow);

    let closer = document.createElement("i");
    closer.classList.add("closer");
    closer.addEventListener("click",()=>{back.remove();})
    modalWindow.append(closer);

    let name = document.createElement("div");
    let labelName = document.createElement("label");
    labelName.textContent = "Name:";
    name.append(labelName);
    let inputName = document.createElement("input");
    inputName.type = "text";
    const regName = /^[a-z]+$/i;
    inputName.addEventListener("input",(event)=> {
        if (regName.test(event.target.value)) {
            event.target.style.color = "green";
        } else {
            event.target.style.color = "green";
        }
    });
    name.append(inputName);
    modalWindow.append(name);

    let mail = document.createElement("div");
    let labelMail = document.createElement("label");
    labelMail.textContent = "E-mail:";
    mail.append(labelMail);
    let inputMail = document.createElement("input");
    inputMail.type = "text";
    const regMail = /^\w[\w-.]*@[\w-]+\.[a-z]{2,4}$/i;
    inputMail.addEventListener("input",(event)=>{
        if(regMail.test(event.target.value)){
            event.target.style.color = "green";
        }else{
            event.target.style.color = "red";
        }
    });
    mail.append(inputMail);
    modalWindow.append(mail);

    let phone = document.createElement("div");
    let labelPhone = document.createElement("label");
    labelPhone.textContent = "Phone number:";
    phone.append(labelPhone);
    let inputPhone = document.createElement("input");
    inputPhone.type = "text";
    const regPhone = /^[+][\d]{12}$/;
    inputPhone.addEventListener("input",(event)=>{
        if(regPhone.test(event.target.value)){
            event.target.style.color = "green";
        }else{
            event.target.style.color = "red";
        }
    });
    phone.append(inputPhone);
    modalWindow.append(phone);

    let submit = document.createElement("button");
    submit.textContent = "submit";
//    submit.addEventListener("click", );
    modalWindow.append(submit);
}

function Proc(){
    let boxes = document.querySelectorAll(".price");
    for(let div of boxes){
        let button = div.querySelector(".btn .signup");
        button.addEventListener("click",Modal);
    }
}

Proc();
