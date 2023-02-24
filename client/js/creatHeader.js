export const createClientHeader = () => {
  const header = document.createElement('header');  
  const logo = document.createElement('a');  
  const logoImg = document.createElement('img');  
  const form = document.createElement('form');  
  const input = document.createElement('input');  
  const conteiner = document.createElement('div');  
  const wrapper = document.createElement('div');  
  const inner = document.createElement('div');
  const findList = document.createElement('ul');

  findList.classList.add('find-list', 'hide');
  header.classList.add('header');
  conteiner.classList.add('conteiner','header__conteiner');
  logo.classList.add('logo','header__logo');
  logoImg.classList.add('logo__img');
  form.classList.add('header__form');
  input.classList.add('header__input');
  input.placeholder = 'Ведите запрос';
  wrapper.classList.add('header__wrapper');
  inner.classList.add('header__iner');
  logoImg.src = 'img/logo.png';
  logoImg.alt = 'logo';

  inner.append(input, findList)
  header.append(conteiner);
  logo.append(logoImg);
  form.append(inner);
  conteiner.append(logo, form);

  return header;
}