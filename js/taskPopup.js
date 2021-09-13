
$('#newPopup').modal()

function openNewPopup() {
	$('#newPopup').modal()
}

function openTableDesc(that) {
	$(that).toggleClass('open')
	$(that).closest('td').find('.taskPopup-center-table-desc').slideToggle()
}


function openConfirmationPopup(that, val){

	$(that).closest('form').submit(function(e){
		return false;
	});
	console.log(val);
	$('.confirmation-popup[data-type="'+val+'"]').modal()
}

function closeConfirmationPopup(){
	$('.confirmation-popup').removeClass('active')
}


function toggleSchedule(){
	$('.schedule__btn').toggleClass('open')
	$('.schedule__center').slideToggle()
}


function changeTypeTask(type, that) {
	$(that).toggleClass('active')
	$('.taskPopup-center-table tr').hide()

	let arr =[]
	$('.taskPopup-top-btn').each(function (index, item){
		if($(item).hasClass('active')){
			arr.push($(item).attr('data-task'))
		}
	})

	arr.map((item) => {
		$('.taskPopup-center-table tr[data-type="'+item+'"]').show("slow");
	})


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
	if (type === 'history' || type === 'table') {
		$('.taskPopup-top-action').last().addClass('active')
	}
}

function changeCreateType(that, type) {
	$('.taskPopup-create-item').removeClass('active')
	$(that).addClass('active')
	$('.taskPopup-create-task').removeClass('active')
	$('.taskPopup-create-task[data-task="' + type + '"]').addClass('active')
}

function changeClarification(that) {
	// if ($(that).hasClass('showFields')) {
	// 	$('.fields-clarification').show()
	// } else {
	// 	$('.fields-clarification').hide()
	// }
	let deliveryType = $(that).attr('data-delivery-type')
	let form = $(that).closest('form')

	form.find('.taskPopup-select-block-item.active').removeClass('active')

	switch (deliveryType){
		case "courier":
			form.find('div[data-delivery-type="courier"]').addClass('active')
			break
		case "novaPoshta":
			form.find('div[data-delivery-type="novaPoshta"]').addClass('active')
			break
		case "ukrPoshta":
			form.find('div[data-delivery-type="ukrPoshta"]').addClass('active')
			break
		case "apt":
			form.find('div[data-delivery-type="apt"]').addClass('active')
			break
		case "meest":
			form.find('div[data-delivery-type="meest"]').addClass('active')
			break
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
		allowHTML: true,
		arrow: true,
		maxWidth: 708,
		placement: 'bottom',
		// delay: [100, 1000],
	});
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


	$('input[type="radio"][name="сlarification"]').click(function () {

	})

	$('#сlarification3').click(function () {

	})

	autosize(document.querySelectorAll('textarea'));
	// according left block

});
