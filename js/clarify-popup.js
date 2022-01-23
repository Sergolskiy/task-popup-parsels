
$('#clarify-popup').modal()

function openClarifyPopup() {
    $('#clarify-popup').modal()
}

function openConfirmationPopup(){
    $('.confirmation-popup').addClass('active')
}

function closeConfirmationPopup(){
    $('.confirmation-popup').removeClass('active')
}

function scrollToBottomClarifyPopup(){
    $(".clarify-timeline-items").animate({ scrollTop: $('.clarify-timeline-items').height() }, 0);
}


function editClarify(that) {
    let block = $(that).closest('.clarify-timeline-user-txt')
    block.removeClass('active')
    block.next().addClass('active')
}

function confirmClarify(that) {
    let block = $(that).closest('.clarify-timeline-user-input')
    block.removeClass('active')
    block.prev().addClass('active')
}

function closeClarify(that) {
    let block = $(that).closest('.clarify-timeline-user-input')
    block.removeClass('active')
    block.prev().addClass('active')
}

function accordingInfo(that) {
    $(that.querySelector('.accordion-title-ico')).toggleClass('_active')
    $(that.closest('.according-item').querySelector('.accordion-content')).slideToggle(200)
    //  .toggleClass('_active')
}

var templateText = document.querySelector('.taskPopup-create-task-tooltype-text');
if (templateText) {
    tippy('.js_popper_task', {
        content: templateText.innerHTML,
        animation: 'fade',
        arrow: true,
        maxWidth: 708,
        placement: 'bottom',
        delay: [100, 1000],
    });
}

function changeRadioType(that){
    if($(that).prev().is(':checked')){
        $('.clarify-create-btn').removeClass('open')
        setTimeout(() => {
            $(that).prev().prop('checked', false);
        },1)
        return
    }
    $('.clarify-create-btn').addClass('open')
}

function closeTask() {
    $('#close-task-popup').modal()
}

function closeTaskNo() {
    $('#close-task-popup').modal()
}

function reOpenTask() {
    $('.reopen-hide').slideToggle()
}


function openConfirmationPopup2(that){

    $(that).closest('form').submit(function(e){
        return false;
    });

    $('.confirmation-popup').modal()
}

function icoCalendar(thatClass) {
    if ($('.daterangepicker').is(":visible")) {
        return
    }
    let curClass = "." + thatClass;

    setTimeout(function () {
        $(curClass).click()
    }, 10)

}

function acceptRequest(){
    $('.request-number--meest').addClass('hide')
    $('.request-number--notino').removeClass('hide')
}

$(document).ready(function (){
    // let today = moment()
    $('.daterange-input-2').daterangepicker({
        "singleDatePicker": true,
        "linkedCalendars": false,
        "autoUpdateInput": true,
        "showCustomRangeLabel": false,
        "autoApply": true,
        // "startDate": today.format('MM/DD/YYYY'),
        // "minDate": today.format('MM/DD/YYYY'),

        locale: {
            "format": 'MM/DD/YYYY',
            "applyLabel": "Ок",
            "cancelLabel": "Отмена",
            "fromLabel": "От",
            "toLabel": "До",
            "customRangeLabel": "Произвольный",
            "daysOfWeek": [
                "Вс",
                "Пн",
                "Вт",
                "Ср",
                "Чт",
                "Пт",
                "Сб"
            ],
            "monthNames": [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ],
            "firstDay": 1
        }
    });
})

// document.querySelectorAll('textarea').forEach(el => {
//     el.style.height = el.setAttribute('style', 'height: ' + (el.scrollHeight + 1) + 'px');
//     el.classList.add('auto');
//     el.addEventListener('input', e => {
//         el.style.height = 'auto';
//         el.style.height = (el.scrollHeight + 1) + 'px';
//     });
// });
