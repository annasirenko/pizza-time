const form = document.querySelector('.form');
const sendButton = document.querySelector('.form__button');

sendButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (validateForm(form)) {
        const data = {
            pizza: form.elements.pizza.value,
            price: form.elements.price.value,
            size: form.elements.size.value,
            name: form.elements.name.value,
            phone: form.elements.phone.value,
            address: form.elements.address.value
        }
        let formData = new FormData(form);
        formData.append("pizza", form.elements.pizza.value);
        formData.append("price", form.elements.price.value);
        formData.append("size", form.elements.size.value);
        formData.append("name", form.elements.name.value);
        formData.append("phone", form.elements.phone.value);
        formData.append("address", form.elements.address.value);

        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', './php/sendmail.php');
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(formData);
        xhr.addEventListener('load', () => {
            if (xhr.response) {
                document.querySelector('.popup__thanks').classList.add('active');
                form.reset();
            } else {
                document.querySelector('.popup__error').classList.add('active');

            }
        })
    }
});

function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
        valid = false;
    }
    if (!validateField(form.elements.phone)) {
        valid = false;
    }
    if (!validateField(form.elements.address)) {
        valid = false;
    }
    return valid;
}

function validateField(field) {
    field.nextElementSibling.textContent = field.validationMessage;
    return field.checkValidity();
    //   if (!field.checkValidity()) {
    //       field.nextElementSibling.textContent = field.validationMessage;
    //       return false;
    //   } else {
    //       field.nextElementSibling.textContent = '';
    //       return true;
    //   }
}



// window.addEventListener('DOMContentLoaded', () => {
//     const forms = () => {
//         const form = document.querySelectorAll('.form-send'),
//               inputs = document.querySelectorAll('input');
    
//         const message = {
//             success: document.querySelector('.popup__thanks'),
//             error: 'Что-то пошло не так...'
//         };
    
//         const postData = async (url, data) => {
//             let res = await fetch(url, {
//                 method: "POST",
//                 body: data
//             });
    
//             return await res.text();
    
//         };
    
//         const clearInputs = () => {
//             inputs.forEach(item => {
//                 item.value = '';
//             })
//         }
    
    
    
//         form.forEach(item => {
//             item.addEventListener('submit', (e) => {
//                 e.preventDefault();
    
//                 let statusMessage = document.createElement('div');
//                 statusMessage.classList.add('error');
//                 item.appendChild(statusMessage);
    
//                 const formData = new FormData(item);
    
//                 postData('php/mail.php', formData)
//                     .then(res => {
//                         console.log(res);
//                         message.success.classList.add('active');
//                     })
//                      .catch(() => statusMessage.textContent = message.error)
//                      .finally(() => {
//                         clearInputs();
//                         statusMessage.remove();
//                      }, 5000);
//             })
//         })
//     }
// })