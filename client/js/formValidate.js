export const ClientValidateForm = (data) => {
    for (const error of data.errors) {
        if (error.field === 'surname') {
            document.querySelector('#floatingSurname').style.borderColor = 'var(--color-burnt-sienna)';
            document.querySelector('#errorSurnameId').textContent = error.message;
        }

        if (error.field === 'name') {
            document.querySelector('#floatingName').style.borderColor = 'var(--color-burnt-sienna)';
            document.querySelector('#errorNameId').textContent = error.message;
        }
        if (error.field === 'contacts') {
            document.querySelector('.contact__input').style.borderColor = 'var(--color-burnt-sienna)';
            document.querySelector('#errorContactId').textContent = error.message;
        }
    }
}

export const canselValidateForm = () => {
    document.querySelector('#floatingSurname').style.borderColor = 'var(--color-gray-suit)';
    document.querySelector('#errorSurnameId').textContent = '';
    document.querySelector('#floatingName').style.borderColor = 'var(--color-gray-suit)';
    document.querySelector('#errorNameId').textContent = '';
    if (document.querySelector('.contact__input') !== null) {
        document.querySelector('.contact__input').style.borderColor = 'var(--color-gray-suit)';
        document.querySelector('#errorContactId').textContent = '';
    }
}