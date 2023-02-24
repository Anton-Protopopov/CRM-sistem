import { sendClientData } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";
import { createClientsForm } from "./createModalForm.js"
import { canselValidateForm, ClientValidateForm } from "./formValidate.js";

export const addClientModal = () => {
    const createForm = createClientsForm();
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');

    modal.classList.add('modal', 'site-modal', 'modal-activ');
    modalContent.classList.add('modal', 'site-modal__content', 'modal-activ');
    createForm.form.classList.add('add-client');

    modal.append(modalContent);
    modalContent.append(createForm.modalClose, createForm.modalTittle, createForm.form);

    createForm.form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const contactTypes = document.querySelectorAll('.contact__name');
        const contactValues = document.querySelectorAll('.contact__input');
        let contacts = [];
        let clientObj = {};

        for (let i = 0; i < contactTypes.length; i++) {
            contacts.push({
                type: contactTypes[i].innerHTML,
                value: contactValues[i].value,
            });
        };

        clientObj.name = createForm.inputName.value;
        clientObj.surname = createForm.inputSurname.value;
        clientObj.lastName = createForm.inputLastname.value;
        clientObj.contacts = contacts;

        const spinner = document.querySelector('.modal__spinner');
        const block = document.querySelector('.modal__block');

        try {
            spinner.style.display = 'block';
            block.style.display = 'block';
            const data = await sendClientData(clientObj, 'POST');

            canselValidateForm();
            if (data.errors) {
                ClientValidateForm(data);
            }
            setTimeout(() => {
                document.querySelector('.clients__tbody').append(createClientItem(data));
                document.querySelector('.modal-activ').remove();
            }, 1500);

        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => spinner.style.display = 'none', 1500);
            setTimeout(() => block.style.display = 'none', 1500);
        }
    });
    createForm.modalClose.addEventListener('click', () => {
        modal.remove();
        canselValidateForm();
    });
    createForm.canselBtn.addEventListener('click', () => {
        modal.remove();
        canselValidateForm();
    });

    document.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.remove();
        }
        canselValidateForm();
    });



    return modal;
}