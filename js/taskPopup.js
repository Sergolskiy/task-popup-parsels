
$('#newPopup').modal()

function openNewPopup() {
	$('#newPopup').modal()
}

function openTableDesc(that) {
	$(that).toggleClass('open')
	$(that).next().slideToggle()
}


function changeTypeTask(type, that) {
	$('.taskPopup-top-btn').removeClass('active')
	$(that).toggleClass('active')
	$('.taskPopup-center-table tr').hide()
	$('.taskPopup-center-table tr[data-type="' + type + '"]').show("slow")

	switch (type) {
		case 'history':
			$('.taskPopup-center-table tr[data-type]').show("slow");
		default:
			break;
	}
}

function changeOptionType(that, type) {
	$('.taskPopup-top-action').removeClass('active')
	$(that).addClass('active')
	$('.taskPopup-center-inner').removeClass('active')
	$('.taskPopup-center-inner[data-center="' + type + '"]').addClass('active')
	$('.taskPopup-right-inner').removeClass('active')
	$('.taskPopup-right-inner[data-right="' + type + '"]').addClass('active')
	if (type === 'comments') {
		$('.taskPopup-center-inner[data-center="table"]').addClass('active')
	}
}

function changeCreateType(that, type) {
	$('.taskPopup-create-item').removeClass('active')
	$(that).addClass('active')
	$('.taskPopup-create-task').removeClass('active')
	$('.taskPopup-create-task[data-task="' + type + '"]').addClass('active')
}

function changeClarification(that) {
	if ($(that).hasClass('showFields')) {
		$('.fields-clarification').show()
	} else {
		$('.fields-clarification').hide()
	}
}
function toggleActiveClass(that) {
	$(that).toggleClass('_active');
	$(that).siblings('.taskPopup-comments-send').toggleClass('active');
}

function showWarningsDetail(that) {
	$(that).hide();
	$(that).closest('.js_error_top').find('.detail-hide').show()
	$(that).closest('.js_error_body').find('.taskPopup-error-text-detail').slideToggle()
}

function hideWarningsDetail(that) {
	$(that).hide();
	$(that).closest('.js_error_top').find('.detail-show').show()
	$(that).closest('.js_error_body').find('.taskPopup-error-text-detail').slideToggle()
}

function changeForwarding(that) {
	if ($(that).hasClass('showForwarding')) {
		$('.fields-forwarding').show()
	} else {
		$('.fields-forwarding').hide()
	}
}

function accordingInfo(that) {
	$(that.querySelector('.accordion-title-ico')).toggleClass('_active')
	$(that.closest('.according-item').querySelector('.accordion-content')).slideToggle()
	//  .toggleClass('_active')
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


function searchCard(that) {
	let list = $(that).closest('.delivery_list_center_inner').find('.delivery_list_center_card');

	let filter = $(that).prev().val().toLowerCase();
	list.each(function (index, item) {
		let flag = false
		let itemTitle = $(item).find('.delivery_list_center_card_title')
		let itemText = $(item).find('.delivery_list_center_card_text')
		let itemTitleTxt
		let itemTextTxt
		if(itemTitle.length > 0){
			itemTitleTxt = itemTitle.html().toLowerCase()
			if(itemTitleTxt.indexOf(filter) > -1){
				flag = true
			}
		}
		if(itemText.length > 0){
			itemTextTxt = itemText.html().toLowerCase()
			if(itemTextTxt.indexOf(filter) > -1){
				flag = true
			}
		}

		if(flag){
			$(item).show()
		} else {
			$(item).hide()
		}
	});

	// lists.forEach(card => {
	//
	// 	let txtValue,
	// 		filter = that.value.toLowerCase(),
	//
	// 		cardTitle = card.querySelector('.delivery_list_center_card_title[data-card-title]')
	//
	// 	txtValue = cardTitle.textContent || cardTitle.innerText;
	//
	// 	if (txtValue.toLowerCase().indexOf(filter) > -1) {
	// 		card.style.display = "";
	// 		console.log(filter)
	// 	} else {
	// 		card.style.display = "none";
	// 	}
	// })
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
		console.log($(that).closest('.delivery_list_content').find('.delivery_list_right_info .delivery_list_center_card_btn_remove').attr("data-card-id", cardId))
		
	}

	$(curentForm).addClass('active')
}

function removeCard(that) {
	console.log(that);
	let cardtId = $(that).closest('.delivery_list_right_remove').find('.delivery_list_right_remove_text').attr('data-item-name')
	$(that).closest('.delivery_list_content').find(".delivery_list_center_card[data-card-id =" + cardtId + "]").remove()
	$('.delivery_list_right_form.delivery_list_right_remove.active').removeClass('active')
}



$(document).ready(function () {
	let today = moment()
	let lastDay = moment(today.format('MM/DD/YYYY'), "MM/DD/YYYY").add(10, 'days');

	var picker = $('.daterange-input').daterangepicker({
		"singleDatePicker": true,
		"linkedCalendars": false,
		"autoUpdateInput": true,
		"showCustomRangeLabel": false,
		"autoApply": true,
		"startDate": today.format('MM/DD/YYYY'),
		"minDate": today.format('MM/DD/YYYY'),
		"maxDate": lastDay.format('MM/DD/YYYY'),

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

	$('.daterange-input').val('')

	$('.daterangepicker').addClass('no-active')

	picker.on('apply.daterangepicker', function (ev, picker) {
		let money = $('.daterange-input[data-money]').attr('data-money')

		$('.daterangepicker').removeClass('no-active')
		$('.daterange-input').val(picker.startDate.format('DD/MM/YYYY'))

		if (today.format('YYYY-MM-DD') === picker.startDate.format('YYYY-MM-DD')) {
			$('.select-money').html(money)
		} else {
			let diff = picker.startDate.diff(today, 'day') + 2
			$('.select-money').html(diff * parseInt(money))
		}

	});

	var picker2 = $('.daterange-input-2').daterangepicker({
		"singleDatePicker": true,
		"linkedCalendars": false,
		"autoUpdateInput": true,
		"showCustomRangeLabel": false,
		"autoApply": true,
		"startDate": today.format('MM/DD/YYYY'),
		"minDate": today.format('MM/DD/YYYY'),
		"maxDate": lastDay.format('MM/DD/YYYY'),

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

	$('.taskPopup-select').select2();

	$('.delivery_list_show_users').select2();

	$('input[type="radio"][name="сlarification"]').click(function () {

	})

	$('#сlarification3').click(function () {

	})

	// according left block

});
