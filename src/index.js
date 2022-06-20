import './styles/index.scss'
import $ from 'jquery';

let diagramBox = document.querySelector('.diagram.timer');
let showModal = false;
let seconds = null;
let timerTik = null;

$(function() {
    $(".btn").click(callBack)
});

$(function() {
    $(".modal-close-btn").click(callBack);
    $(".modal-bg").click(callBack)
});

function callBack() {
    console.log('test', showModal)
    const cards = [
        {
            data: $(this).attr('data-size'),
            className: '.item-size',
            options: ''
        },
        {
            data: $(this).attr('data-oldprice'),
            className: '.item-oldprice',
            options: ''
        },
        {
            data: $(this).attr('data-newprice'),
            className: '.item-newprice',
            options: ''
        },
        {
            data: $(this).attr('data-credits'),
            className: '.item-credits',
            options: 'credits'
        },
        {
            data: $(this).attr('data-recipients'),
            className: '.item-recipients',
            options: 'recipients'
        },
        {
            data: $(this).attr('data-users'),
            className: '.item-users',
            options: 'users'
        },
        {
            data: $(this).attr('data-export'),
            className: '.item-export',
            options: 'export'
        },
        {
            data: $(this).attr('data-integrations'),
            className: '.item-integrations',
            options: 'integrations'
        }
    ]

    if(!showModal) {
        cards.forEach(item => {
            SetContentModal(item)
        })
        showModal = true;
        timer();
    } else {
        cards.forEach(item => {
            DeleteContentModal(item)
        })

        showModal = false;
        seconds = null;
        clearTimeout(timerTik)
    }
}

function timer(val){
    seconds = val || diagramBox.dataset.seconds;

    let deg = (360 * seconds / diagramBox.dataset.seconds) + 180;
    if(seconds >= diagramBox.dataset.seconds / 2){
        diagramBox.classList.add('over_50');
    }else{
        diagramBox.classList.remove('over_50');
    }

    // diagramBox.querySelector('.piece.right').style.transform = 'rotate('+deg+'deg)';
    diagramBox.querySelector('.text b').innerText = seconds;

    timerTik = setTimeout(function(){
        if (seconds === 1) {
            callBack();
            seconds = null;
        } else {
            timer(seconds - 1)
        }
    }, 1000);

}

function SetContentModal(item) {
    $(item.className).append(`${item.data} <span>${item.options}</span>`);
    $('.modal').addClass('modal-show')
}

function DeleteContentModal(item) {
    $(item.className).empty('');
    $('.diagram.timer').attr('data-seconds', '20');
    $('.modal').removeClass('modal-show');
}

