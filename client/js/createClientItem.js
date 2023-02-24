import { deleteClientModal } from './createDeleteModal.js';
import { editClietModal } from './editClient.js';
import { createContactItemType, formatDate, formatTime } from './utils.js'

export const createClientItem = (data) => {
    const clientTr = document.createElement('tr');
    const clientId = document.createElement('span');
    const clientIdTd = document.createElement('td');
    const clientFullName = document.createElement('td');
    const clientName = document.createElement('span');
    const clientSurname = document.createElement('span');
    const clientLastname = document.createElement('span');
    const clientCreated = document.createElement('td');
    const createDate = document.createElement('span');
    const createTime = document.createElement('span');
    const clientChanged = document.createElement('td');
    const changedDate = document.createElement('span');
    const changedTime = document.createElement('span');
    const clientContacts = document.createElement('td');
    const clientActions = document.createElement('td');
    const clientEdit = document.createElement('button');
    const clientDelete = document.createElement('button');
    const deleteClient = deleteClientModal();
    const editClaiet = editClietModal(data);

    clientTr.classList.add('clients__item');
    clientTr.id = data.id;
    clientIdTd.classList.add('clients__id');
    clientFullName.classList.add('clients__full-name');
    clientName.classList.add('clients__name');
    clientSurname.classList.add('clients__surname');
    clientLastname.classList.add('clients__lastname');
    clientCreated.classList.add('clients__created');
    createDate.classList.add('created__date');
    createTime.classList.add('created__time');
    clientChanged.classList.add('clients__changed');
    changedDate.classList.add('changed__date');
    changedTime.classList.add('changed__time');
    clientContacts.classList.add('clients__contacts');
    clientActions.classList.add('clients__actions');
    clientDelete.classList.add('clients__delete', 'btn-reset');
    clientEdit.classList.add('clients__edit', 'btn-reset');

    for (const contact of data.contacts) {
        createContactItemType(contact.type, contact.value, clientContacts)
    }

    const deleteById = () => {
        import('./clientsApi.js').then(({ deleteClientItem }) => {
            deleteClient.deleteModalDelete.addEventListener('click', () => {
                try {
                    deleteClient.deleteSpinner.style.display = 'block'

                    setTimeout(() => {
                    deleteClientItem(data.id);
                    document.getElementById(data.id).remove();
                    deleteClient.deleteModal.remove();
                    }, 1500);

                } catch (error) {
                    console.log(error);
                }finally{
                    setTimeout(() => deleteClient.deleteSpinner.style.display = 'none', 1500)
                }
            });
        });
    };

    clientDelete.addEventListener('click', () => {
        deleteById();
        document.body.append(deleteClient.deleteModal);
    });

    clientEdit.addEventListener('click', () => {
        document.body.append(editClaiet.editModal);
    });

    clientId.textContent = data.id.substr(0, 6);
    clientName.textContent = data.name;
    clientSurname.textContent = data.surname; 
    clientLastname.textContent = data.lastName;
    clientEdit.textContent = 'Изменить';
    clientDelete.textContent = 'Удалить';
    createDate.textContent = formatDate(data.createdAt);
    createTime.textContent = formatTime(data.createdAt);
    changedDate.textContent = formatDate(data.updatedAt)
    changedTime.textContent = formatTime(data.updatedAt)

    clientIdTd.append(clientId);
    clientFullName.append(clientSurname, clientName, clientLastname);
    clientCreated.append(createDate, createTime);
    clientChanged.append(changedDate, changedTime);
    clientActions.append(clientEdit, clientDelete);
    clientTr.append(
        clientIdTd,
        clientFullName,
        clientCreated,
        clientChanged,
        clientContacts,
        clientActions
    );

    return clientTr;
}