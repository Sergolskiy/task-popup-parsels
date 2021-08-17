
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
    $(that.closest('.according-item').querySelector('.accordion-content')).slideToggle()
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
