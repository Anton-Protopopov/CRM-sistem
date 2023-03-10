import { contactTooltip } from "./createTooltip.js";
import { svgEmail, svgFb, svgOther, svgPhone, svgVk } from "./svg.js";

export const createContactLink = (type, value, element, svg, item) => {
    const settooltip = contactTooltip(type, value);
    element = document.createElement('a');
    element.classList.add('contacts__link');
    element.innerHTML = svg;

    if (type === 'Email') {
        element.href = `mailto:${value.trim()}`;
    } else if (type === 'Телефон') {
        element.href = `tel:${value.trim()}`;
        settooltip.tooltipValue.style.color = 'var(--color-white)';
        settooltip.tooltipValue.style.textDecoration = 'none';
    } else {
        element.href = value.trim();
    }

    element.append(settooltip.tooltip);
    item.append(element);
}

export const createContactItemType = (type, value, item) => {
    switch (type) {
        case 'Телефон':
            let phone;
            createContactLink(type, value, phone, svgPhone, item);
            break
        case 'Facebook':
            let fb;
            createContactLink(type, value, fb, svgFb, item);
            break
        case 'VK':
            let vk;
            createContactLink(type, value, vk, svgVk, item);
            break
        case 'Email':
            let email;
            createContactLink(type, value, email, svgEmail, item);
            break
        case 'Другое':
            let other;
            createContactLink(type, value, other, svgOther, item);
            break

        default:
            break;
    }
}

export const formatDate = (data) => {
    const newDate = new Date(data);

    const correctDate = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }

    const resultDate = newDate.toLocaleString('ru', correctDate);

    return resultDate;
}

export const formatTime = (data) => {
    const newDate = new Date(data);

    const correctDate = {
        hour: 'numeric',
        minute: 'numeric',
    }

    const resultTime = newDate.toLocaleString('ru', correctDate);

    return resultTime;
}