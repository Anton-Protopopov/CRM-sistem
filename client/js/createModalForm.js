import { createContactItem } from './createContact.js';
import { svgContactDefault, svgSpinner } from './svg.js'

export const createClientsForm = () => {
    const modalTittle = document.createElement('h2');
    const modalClose = document.createElement('button');
    const form = document.createElement('form');
    const inputName = document.createElement('input');
    const labelName = document.createElement('label');
    const inputSurname = document.createElement('input');
    const labelSurname = document.createElement('label');
    const inputLastname = document.createElement('input');
    const labelLastname = document.createElement('label');
    const requiredName = document.createElement('span');
    const requiredSurname = document.createElement('span');
    const addContactBtn = document.createElement('button');
    const addContactBtnSvgDefault = document.createElement('span');
    const seveBtn = document.createElement('button');
    const canselBtn = document.createElement('button');
    const contactsBlock = document.createElement('div');
    const formFloatingName = document.createElement('div');
    const formFloatingSurname = document.createElement('div');
    const formFloatingLastname = document.createElement('div');
    const seveSpinner = document.createElement('span');
    const modalBlock = document.createElement('div');

    const errorBlock = document.createElement('p');
    const errorName = document.createElement('span');
    const errorSurname = document.createElement('span');
    const errorContact = document.createElement('span');
    
    modalBlock.classList.add('modal__block');
    seveSpinner.classList.add('modal__spinner');
    errorBlock.classList.add('error');
    modalTittle.classList.add('modal__title');
    modalClose.classList.add('modal__close', 'btn-reset');
    form.classList.add('modal__form');
    formFloatingName.classList.add('form-floating');
    formFloatingSurname.classList.add('form-floating');
    formFloatingLastname.classList.add('form-floating');
    inputName.classList.add('modal__input');
    inputSurname.classList.add('modal__input');
    inputLastname.classList.add('modal__input');
    labelName.classList.add('modal__label');
    labelSurname.classList.add('modal__label');
    labelLastname.classList.add('modal__label');
    requiredName.classList.add('modal__label');
    requiredSurname.classList.add('modal__label');
    addContactBtn.classList.add('modal__btn-contact', 'modal__btn-contact--activ');
    seveBtn.classList.add('modal__btn-save', 'btn-reset', 'site-btn');
    canselBtn.classList.add('modal__btn-back', 'btn-reset');
    addContactBtnSvgDefault.classList.add('btn-contact__svg');
    contactsBlock.classList.add('modal__contact');
    labelName.for = 'floatingName';
    labelSurname.for = 'floatingSurname';
    labelLastname.for = 'floatingLastname';
    inputName.id = 'floatingName';
    inputSurname.id = 'floatingSurname';
    inputLastname.id = 'floatingLastname';
    inputName.type = 'text';
    inputSurname.type = 'text';
    inputLastname.type = 'text';
    inputName.placeholder = 'Имя';
    inputSurname.placeholder = 'Фамилия';
    inputLastname.placeholder = 'Отчество';
    errorName.id = 'errorNameId'
    errorSurname.id = 'errorSurnameId'
    errorContact.id = 'errorContactId'

    seveSpinner.innerHTML = svgSpinner;
    modalTittle.textContent = 'Новый клиент';
    labelName.textContent = 'Имя';
    labelSurname.textContent = 'Фамилия';
    labelLastname.textContent = 'Отчество';
    addContactBtn.textContent = 'Добавить контакт';
    seveBtn.textContent = 'Сохранить';
    canselBtn.textContent = 'Отмена';
    requiredName.textContent = '*';
    requiredSurname.textContent = '*';
    addContactBtnSvgDefault.innerHTML = svgContactDefault;

    labelName.append(requiredName);
    seveBtn.append(seveSpinner);
    labelSurname.append(requiredSurname);
    formFloatingLastname.append(inputLastname, labelLastname);
    formFloatingName.append(inputName, labelName);
    formFloatingSurname.append(inputSurname, labelSurname);
    errorBlock.append(errorSurname, errorName, errorContact);
    contactsBlock.append(addContactBtn);
    form.append(
        formFloatingSurname,
        formFloatingName,
        formFloatingLastname,
        contactsBlock,
        errorBlock,
        seveBtn,
        canselBtn,
        modalBlock
    );

    addContactBtn.append(addContactBtnSvgDefault);

    addContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactsItem = document.getElementsByClassName('contact');

        if (contactsItem.length < 9) {
            const contactItem = createContactItem();
            contactsBlock.prepend(contactItem.contact);
            if (contactsItem.length >= 5) {
                document.querySelector('.site-modal__content').style.top = '55%'
            } else {
                document.querySelector('.site-modal__content').style.top = '50%'
            }
        } else {
            const contactItem = createContactItem();
            contactsBlock.prepend(contactItem.contact);
            addContactBtn.classList.remove('modal__btn-contact--activ')
        }

    });


    return {
        form,
        modalClose,
        canselBtn,
        inputName,
        inputSurname,
        inputLastname,
        labelName,
        labelSurname,
        labelLastname,
        contactsBlock,
        addContactBtn,
        modalTittle,
        errorBlock,
        modalBlock
    }
}