$('#newPopup2').modal()

function openNewPopup2() {
    $('#newPopup2').modal()
}


function showList() {
    $('.delivery_list_center_search input').val('')
    $('#menu').prop('checked',false)
    $('#automatic').prop('checked',false)

    $('.delivery_list_search_empty').removeClass('active')
    $('.delivery_list_center_list-wrap').addClass('active')

    $('#newPopup2').find('ul.delivery_list_center_list li').show()

}

function toggleVisibilityDeliveryPopup(that) {
    let curAttr = $(that).attr('data-btn-id');
    let curentForm = $(that).closest('.delivery_list_content').find("[data-popup-id='" + curAttr + "']");
    let titleCard = $(that).closest('.delivery_list_center_card').find('.delivery_list_center_card_title').text();
    let descrCard = $(that).closest('.delivery_list_center_card').find('.delivery_list_center_card_text').text();

    $(that).closest('.delivery_list_content').find("[data-popup-id]").removeClass('active')

    if (curAttr === 'form_info') {
        $(curentForm).find('.delivery_list_right_info_title').html(titleCard)
        $(curentForm).find('.delivery_list_right_info_text').html(descrCard)
    }

    if (curAttr === 'form_clear') {
        let cardId = $(that).closest('.delivery_list_center_card').attr('data-card-id');
        $(curentForm).find('.name_list').html(titleCard)
        $(curentForm).find('.delivery_list_right_remove_text').attr('data-item-name', cardId)
    }

    if (curAttr === 'form_remove') {
        let cardId = $(that).closest('.delivery_list_center_card').attr('data-card-id');
        $(curentForm).find('.name_list').html(titleCard)
        $(curentForm).find('.delivery_list_right_remove_text').attr('data-item-name', cardId)
    }

    if (curAttr === 'form_remove_from_title') {
        let curTitle = $(that).attr('data-item-name')
        let cardId = $(that).attr('data-card-id')
        $(that).closest('.delivery_list_right').find('.delivery_list_right_remove_text').attr('data-item-name', cardId)
        $(that).closest('.delivery_list_right').find('.delivery_list_right_remove .name_list').html(curTitle)
        $(that).closest('.delivery_list_content').find("[data-popup-id='form_remove']").addClass('active');
    }

    if (curAttr === 'form_info') {
        let cardId = $(that).closest('.delivery_list_center_card').attr('data-card-id')
        $(that).closest('.delivery_list_content').find('.delivery_list_right_info .delivery_list_center_card_btn_remove').attr("data-item-name", titleCard)
        $(that).closest('.delivery_list_content').find('.delivery_list_right_info .delivery_list_center_card_btn_remove').attr("data-card-id", cardId)
    }
        $(that).closest('.delivery_list_content').find('.delivery_list_center_card').removeClass('active');
        $(that).closest('.delivery_list_center_card').addClass('active');

    $(curentForm).addClass('active')
}

function removeCard(that) {
    let cardtId = $(that).closest('.delivery_list_right_remove').find('.delivery_list_right_remove_text').attr('data-item-name')
    $(that).closest('.delivery_list_content').find(".delivery_list_center_card[data-card-id =" + cardtId + "]").remove()
    $('.delivery_list_right_form.delivery_list_right_remove.active').removeClass('active')
}

function clearForm(that){
    $(that).closest('form').find('input').each(function (index, item){
        $(item).val('')
    })
    $(that).closest('form').find('textarea').each(function (index, item){
        $(item).val('')
    })
    $(that).closest('form').find('.delivery_list_show_users').each(function (index, item){
        $(item).select2('val', '')
    })
    $(that).closest('form').find('.taskPopup-create-task-radio-input').each(function (index, item){
        $(item).prop('checked',false);
    })
}

function clearForms(that){
    $(that).find('input').each(function (index, item){
        $(item).val('')
    })
    $(that).find('textarea').each(function (index, item){
        $(item).val('')
    })
    $(that).find('.delivery_list_show_users').each(function (index, item){
        $(item).select2('val', '')
    })
    $(that).find('.taskPopup-create-task-radio-input').each(function (index, item){
        $(item).prop('checked',false);
    })
}

function editAnimation(){
    $('.delivery_list_content .delivery_list_center_card.active').addClass('active-animation');
    setTimeout(() => {
        $('.delivery_list_content .delivery_list_center_card.active-animation').removeClass('active-animation');
    }, 3000)
}

function filterCheckbox(){
    searchCard($('.delivery_list_center_search_ico')[0]);
}

$(document).ready(function () {

    $('.delivery_list_show_users').select2();


    $('#newPopup').on('hidden.bs.modal', function () {
        clearForms(this)
    });

})


$('.delivery_list_btn_select').select2();

$('.delivery_list_btn_select').change(function (){
    searchCard($('.delivery_list_center_search_ico')[0]);
})