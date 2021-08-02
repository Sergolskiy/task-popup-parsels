
$('#clarify-popup').modal()

function openClarifyPopup() {
    $('#clarify-popup').modal()
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