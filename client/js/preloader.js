
export const createPreloader = () => {
    const preloaderBlock = document.createElement('div');

    preloaderBlock.classList.add('preloader');

    return preloaderBlock;
} 