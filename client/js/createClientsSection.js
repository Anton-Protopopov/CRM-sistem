import { addClientModal } from './addClient.js';
import { createPreloader } from './preloader.js';
import { svgAddUser } from './svg.js'

export const createClientSection = () => {
    const section = document.createElement('section');
    const h1 = document.createElement('h1');
    const conteiner = document.createElement('div');
    const main = document.createElement('main');
    const sortingDisplay = document.createElement('thead');
    const theadTr = document.createElement('tr');
    const sortingDisplayId = document.createElement('th');
    const sortingDisplayName = document.createElement('th');
    const sortingDisplayCreate = document.createElement('th');
    const sortingDisplayEdit = document.createElement('th');
    const sortingDisplayContacts = document.createElement('th');
    const sortingDisplayActions = document.createElement('th');
    const sortingDisplaySpan = document.createElement('span');
    const addUserBtn = document.createElement('button');
    const addUserBtnSwg = document.createElement('span');
    const tableWrapper = document.createElement('div');
    const clientsTable = document.createElement('table');
    const tbody = document.createElement('tbody');
    const createSpan = document.createElement('span');
    const editSpan = document.createElement('span');

    const sortDisplayItem = [sortingDisplayId, sortingDisplayName, sortingDisplayCreate, sortingDisplayEdit];

    for (const item of sortDisplayItem) {
        item.addEventListener('click', () => {
            if (item.classList.contains('sort-down')) {
                item.classList.remove('sort-down');
                item.classList.add('sort-up');
            } else {
                item.classList.add('sort-down');
                item.classList.remove('sort-up');
            }
        })

    };

    sortingDisplayCreate.addEventListener('click', () => {
        if (sortingDisplayCreate.classList.contains('sort-down')) {
            createSpan.classList.add('sort-up');
        } else {
            createSpan.classList.remove('sort-up');
        }
    });

    sortingDisplayEdit.addEventListener('click', () => {
        if (sortingDisplayEdit.classList.contains('sort-down')) {
            editSpan.classList.add('sort-up');
        } else {
            editSpan.classList.remove('sort-up');
        }
    });

    sortingDisplayId.setAttribute('data-type', 'id');
    sortingDisplayName.setAttribute('data-type', 'text');
    sortingDisplayCreate.setAttribute('data-type', 'create');
    sortingDisplayEdit.setAttribute('data-type', 'update');

    section.classList.add('clients');
    tableWrapper.classList.add('clients__wrapper');
    h1.classList.add('clients__heading');
    tbody.classList.add('clients__tbody');
    sortingDisplay.classList.add('clients__display', 'display-info');
    sortingDisplayId.classList.add('display-info__item', 'display-info__item--id', 'sort-up');
    sortingDisplayName.classList.add('display-info__item', 'display-info__item--name', 'sort-down');
    sortingDisplayCreate.classList.add('display-info__item', 'display-info__item--create', 'sort-down');
    sortingDisplayEdit.classList.add('display-info__item', 'display-info__item--change', 'sort-down');
    sortingDisplayContacts.classList.add('display-info__item', 'display-info__item--contacts');
    sortingDisplayActions.classList.add('display-info__item', 'display-info__item--actions');
    sortingDisplaySpan.classList.add('display-info__sorting');
    addUserBtn.classList.add('clients__btn', 'btn-reset');
    addUserBtnSwg.classList.add('clients__svg');
    conteiner.classList.add('conteiner', 'clients__conteiner');
    clientsTable.classList.add('clients__table');
    createSpan.classList.add('create__span');
    main.classList.add('main');
    editSpan.classList.add('change__span');

    h1.textContent = "Клиенты";
    sortingDisplayId.textContent = "ID";
    sortingDisplayName.textContent = "Фамилия Имя Отчество";
    sortingDisplaySpan.textContent = "а-я";
    sortingDisplayCreate.textContent = "Дата и время";
    sortingDisplayEdit.textContent = "Последние";
    sortingDisplayContacts.textContent = "Контакты";
    sortingDisplayActions.textContent = "Действия";
    addUserBtn.textContent = "Добавить клиента";
    addUserBtnSwg.innerHTML = svgAddUser;

    addUserBtn.addEventListener('click', () => {
        document.body.append(addClientModal())
    });

    main.append(section);
    section.append(conteiner);
    sortingDisplayName.appendChild(sortingDisplaySpan);
    sortingDisplayCreate.appendChild(createSpan);
    sortingDisplayEdit.appendChild(editSpan);
    theadTr.append(
        sortingDisplayId,
        sortingDisplayName,
        sortingDisplayCreate,
        sortingDisplayEdit,
        sortingDisplayContacts,
        sortingDisplayActions,
    );
    sortingDisplay.append(theadTr);
    tableWrapper.append(clientsTable, createPreloader());
    clientsTable.append(sortingDisplay, tbody);
    addUserBtn.append(addUserBtnSwg);
    conteiner.append(h1, tableWrapper, addUserBtn);

    return {
        main,
        clientsTable,
        tbody
    };
}