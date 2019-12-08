export function addLoader( element) {
    element.insertAdjacentHTML('afterbegin', template );
}

export function runLoader( element) {
    element.querySelector('.nice_loader').classList.add('go');
    element.querySelector('.nice_overlay').classList.add('show');
}

export function addAndRunLoader( element ) {
    addLoader( element );
    runLoader( element );
}

export function stopLoader( element ) {
    element.querySelector('.nice_loader').classList.remove('go');
    element.querySelector('.nice_overlay').classList.remove('show');
}

export function removeLoader( element ) {
    element.querySelector('.nice_overlay').classList.remove('show');
    setTimeout( () => {
        element.querySelector('.nice_overlay').remove();
    }, 1000 );
}

let template =
    `<div class="nice_overlay"><div class="nice_loader"></div></div>`;