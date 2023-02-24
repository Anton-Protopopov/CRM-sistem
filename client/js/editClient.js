import { sendClientData } from "./clientsApi.js";
import { createContactItem } from "./createContact.js";
import { deleteClientModal } from "./createDeleteModal.js";
import { createClientsForm } from "./createModalForm.js";
import { canselValidateForm, ClientValidateForm } from "./formValidate.js";
import { createClientItem } from "./createClientItem.js";

export const editClietModal = (data) => {
    const editModal = document.createElement('div');
    const editModalContent = document.createElement('div');
    const createForm = createClientsForm();
    const titleId = document.createElement('span');

    titleId.classList.add('modal-id');
    editModal.classList.add('modal-edit', 'site-modal', 'modal-activ');
    editModalContent.classList.add('edit-modal__content', 'site-modal__content', 'modal-activ');

    titleId.textContent = 'ID:' + data.id.substr(0, 6);
    createForm.modalTittle.textContent = 'Изменить данные';
    createForm.canselBtn.textContent = 'Удалить клиента';
    createForm.inputName.value = data.name;
    createForm.inputSurname.value = data.surname;
    createForm.inputLastname.value = data.lastName;

    for (const contact of data.contacts) {
        const createContact = createContactItem();

        createContact.contactName.textContent = contact.type;
        createContact.contactInput.value = contact.value;

        createForm.contactsBlock.prepend(createContact.contact);
        createForm.contactsBlock.style.backgroundColor = 'var(--color-athens-gray)';
    }

    if (data.contacts.length == 10) {
        createForm.addContactBtn.classList.remove('modal__btn-contact--activ')
    }

    createForm.form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const contactTypes = document.querySelectorAll('.contact__name');
        const contactValues = document.querySelectorAll('.contact__input');
        let contacts = [];
        let client = {};

        for (let i = 0; i < contactTypes.length; i++) {
            contacts.push({
                type: contactTypes[i].innerHTML,
                value: contactValues[i].value,
            });
        };

        client.name = createForm.inputName.value;
        client.surname = createForm.inputSurname.value;
        client.lastName = createForm.inputLastname.value;
        client.contacts = contacts;

        const spinner = document.querySelector('.modal__spinner');
        const block = document.querySelector('.modal__block');

        try {
            spinner.style.display = 'block';
            block.style.display = 'block';
            const editedData = await sendClientData(client, 'PATCH', data.id);

            canselValidateForm();
            if (editedData.errors) {
                ClientValidateForm(editedData);
            } else {
                setTimeout(() => {
                document.getElementById(editedData.id).remove();
                document.querySelector('.clients__tbody').append(createClientItem(editedData));
                document.querySelector('.modal-activ').remove();
            }, 1500);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => block.style.display = 'none', 1500);
            setTimeout(() => spinner.style.display = 'none', 1500);
        }
    });

    createForm.canselBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const deleteModal = deleteClientModal();
        document.body.append(deleteModal.deleteModal);

        import('./clientsApi.js').then(({ deleteClientItem }) => {
            deleteModal.deleteModalDelete.addEventListener('click', () => {
                try {
                    deleteModal.deleteSpinner.style.display = 'block'

                    setTimeout(() => {
                    deleteClientItem(data.id);
                    document.getElementById(data.id).remove();
                    deleteModal.deleteModal.remove();
                    document.querySelector('.modal-activ').remove();
                    }, 1500);

                } catch (error) {
                    console.log(error);
                }finally{
                    setTimeout(() => deleteModal.deleteSpinner.style.display = 'none', 1500)
                }
            });
        });
    });

    createForm.modalClose.addEventListener('click', () => {
        editModal.remove();
    });

    document.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.remove();
        }
    });



    createForm.modalTittle.append(titleId);
    editModalContent.append(createForm.modalClose, createForm.modalTittle, createForm.form);
    editModal.append(editModalContent);




    return {
        editModal,
        editModalContent
    };
}