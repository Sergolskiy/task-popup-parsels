$(document).ready(function () {

    $.ajaxSetup({

        headers: {

            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

        }

    });


    filterChange();

    $('#search_key').change(function () {
        filterChange();
    });


    function filterChange(option) {

        var el = $('#search_key option:selected').val();

        if ($('#operator').text()) el = 'current_status';

        console.log(el);
        if (el == 'status_active' || el == 'current_status') {

            $('#input-filter input').attr({'type': 'hidden', 'disabled': true});
            $('.f-remove').remove();
            if ($('#input-filter > #filter_status').length == 0)
                $('#input-filter').prepend($('#input-filter').data('search_status'));


        } else {
            $('.f-remove').remove();
            $('#input-filter input').attr({'type': 'text', 'disabled': false});
        }
    }



// check Max VALUE IN FIELD
 $('input[data-max-field]').on('keyup',function () {
     var input = $(this),
      maxField = input.attr('data-max-field'),
      value =   input.val(),
      message = input.data('max-validate-message'),
     elementForMessage =     input.siblings('.invalid-feedback');

     elementForMessage.text('');

     const regexp = /[0-9]+/g;
     const matches = [...value.matchAll(regexp)];
     for (const match of matches) {
             if(parseInt(match[0])>=maxField){
                 var re = new RegExp(match[0],'gi');
                 value =   value.replace(re, maxField);
                 elementForMessage.text(message);
             }
     }

     $(this).val(value);

 });


    //когда отрыто несколько модальных окон то одно перекрывает другое
    $('.modal').on("hidden.bs.modal", function (e) {
        if($('.modal:visible').length)
        {
            $('.modal-backdrop').first().css('z-index', parseInt($('.modal:visible').last().css('z-index')) - 10);
            $('body').addClass('modal-open');
        }
    }).on("show.bs.modal", function (e) {
        if($('.modal:visible').length)
        {
            $('.modal-backdrop.in').first().css('z-index', parseInt($('.modal:visible').last().css('z-index')) + 10);
            $(this).css('z-index', parseInt($('.modal-backdrop.in').first().css('z-index')) + 10);
        }
    });






});



function addAndRemoreElementsOflist(action) {

    // romore and add in lists
    var $toListBtn = $('#to_list_btn');
    var route = $toListBtn.data("route");
    var $checkedBoxes = $('#dataTable input[type=checkbox]:checked').not('.select_all');
    var model = $toListBtn.data('model');
    var params = {model: model, items_ids: '', action: action};
    var form = $('#searh_form');
    var count = $checkedBoxes.length;

    if (count > 0) {
        $.each($checkedBoxes, function () {
            var value = $(this).val();
            params.items_ids += value + ',';
        })
        params.items_ids = params.items_ids.substring(0, params.items_ids.length - 1);


    } else if (action == 'add')
        params = Object.assign(getFormData(form), params)

    else if (action == 'remove')
      return   toastr.warning('You did not select  items!');


    // $('#to-list').modal('show');


    console.log('test"');

    var list = $('#to-list .modal-body').find('tbody tr td.readItem');

    if (list.length == 0 && action == 'add')
        return toastr.warning('You did not select a list!');

    params.list_id = list.data('list-id');
    params.previous_list = $toListBtn.data('previous-list');

    // $('#to-list').modal('hide');
    // $('#voyager-loader').show();


    $.ajax({
        type: 'POST',
        url: route,
        data: params,
        beforeSend: function () {
            $('#to-list').modal('hide');
            $('#voyager-loader').show();
        }
        , success: function (data) {

            if(data.action =='remove')
              return   window.location.reload();
                // $.each(data.parcel_ids, function () {
                //     $('#dataTable tbody tr td input[value='+this+']').closest('tr').remove();
                // });


            $('#voyager-loader').hide();

            if (data.alert_type == 'success')
                toastr.success(data.message)


        }

    });


    console.log(params);

    return '';


}



function readCheckBoxex() {
    var $checkedBoxes = $('#dataTable input[type=checkbox]:checked').not('.select_all');
    var count = $checkedBoxes.length;
    return [count, $checkedBoxes];



}



// Link To Excel
function linkToExcel(e) {
    var params = '',
        href = $(e).data('route'),
        $checkedBoxesForExcel = $('#to-export-file table.table input[type=checkbox]:checked').not('.select_modal_all'),
        file = ($('#excel-csv:checked').length == 1) ? 'excel' : 'csv',
        model = $(e).data('model'),
        slug = $(e).data('slug'),
        form = $('#searh_form');

    // Проверяем ели выбрали checkbox  то по айди если не то по полю поиска
    [count, $checkedBoxes] = readCheckBoxex();
    if (count == 0) {
// когда формы нету и нам необходимо сделалать ексель  по фильру, это бывает при перенаправлении с одной статници на другую
       var object =   getUrlVars(decodeURI(window.location.href));
        $.each(object,function (key,value) {
            params +="&"+key+"="+value;
       });
        params += $.param(form.serializeArray())

    }else {
        params += "&id="
        $.each($checkedBoxes, function () {
            console.log($(this).val());
            params += $(this).val() + encodeURIComponent("\r\n");
        });
        params = params.substring(0, params.length - encodeURIComponent("\r\n").length);
        params+="&_token="+form.find('input[name=_token]').val();

    }
// return '  ';

    // Gather
    params += '&table_field='
    $.each($checkedBoxesForExcel, function () {
        params += $(this).val() + ',';
    });
    params = params.substring(0, params.length - 1);
    params += '&file=' + file + '&model=' + model+'&slug='+slug;


    var data = getUrlVars(decodeURI(href + decodeURIComponent(params)));

    return post(href, data);
}


function readNotification(e) {
    $(e).closest('li').hide();

    var route = $(e).data('route');
    var badge = $('.header-notification>a>span.badge');
    badge.text(parseInt(badge.text()) - 1);
    $.get(route);

}



function getBackground(e) {
    $('#to-list .modal-body').find('tbody tr td').removeClass('readItem');
    $(e).addClass('readItem');
}



function modalCheckBox(e) {
    $('input[name="table_field"]').prop('checked', $(e).prop('checked')).trigger('change');
}



$(function () {
    $('#excel-csv').bootstrapToggle({
        on: 'EXCEL',
        off: 'CSV',
        width: 150,
        onstyle: 'success',
        offstyle: 'info',
    });
})


// function  routesPrevious(route_to,key,href) {
//
//     $.ajax({url:route_to,data:{route:window.location.href,key:key},
//     success:function () {
//         window.location.href = href;
//         }
//     });
// }

// Это логика смена метода GET on POST в форме когда количиство  символов в урл-строки превышает в 1500.
$('#searh_form').on('submit', function (e) {
    if (JSON.stringify($(this).serializeArray()).length > 1500) {
        $(this).attr('method', 'post');
    }
});



// Проверям пигинацию и количиство символов в атибете href в сылке. Если превышает в 1500 то мы отправляем место сылки форму. Форму мы генериреруем и отправяем на лету
$(document).on('click','.pagination .page-item a.page-link, #dataTable thead tr th a', function (e) {
    e.preventDefault();

        [url, params] = $(this).attr('href').split('?', 2);
        params        = $('#url_request').text() + '&' + params;

        var  linkData = getUrlVars(decodeURI(decodeURIComponent(params)).replace(/(\+)+/gi, ' '));


    // если длина сылки больше 1500 симфолов то пеключаем  метод GET on POST
    if ($(this).attr('href').length > 1500) {

        var form = $('#searh_form');

         return  post(form.attr('action'), linkData);


        // console.log(linkData);
    }else {
        //когда сымволов меньше 1500


        var newUrl    =  url + '?' + objectToUrl(linkData);

        return window.location.href = newUrl;
    }
})


function getUrlVars(url) {
    var hash;
    var myJson = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        myJson[hash[0]] = hash[1];
        // If you want to get in native datatypes
        // myJson[hash[0]] = JSON.parse(hash[1]);
    }
    return myJson;
}

function objectToUrl(obj) {
    var str = "";
    for (var key in obj) {
        if (str !== "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);

    }
    return str;
}



// Генерируем форму на лету и отправлеем  методом пост и также удаляем
function post(path, params, csrf_field = '', method = 'post') {

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

// get csrt_token


    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
    form.remove();
}



function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};


    $.map(unindexed_array, function (n, i) {

        //проверяем когда мы хотим передать через форму масив пример (name = "test_names[]")
        // и есть несколько занчений с таким name то мы это отбрабатывоем
        if(new RegExp( /\[\]$/).test(n['name'])){

            if( !(n['name'] in indexed_array) )
                   indexed_array[n['name']] = [];

            indexed_array[n['name']].push(n['value']);

        }
        else
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}



function   changePerPage(e) {

   var form     =  $('#searh_form'),
       params   =  $('#url_request').text();
       params   =    getUrlVars(decodeURI(decodeURIComponent(params)).replace(/(\+)+/gi, ' '));

        //при смене количества позиций  переходим на первою страницу
       params.page = 1;

   var data   =    Object.assign(params,getFormData(form)),
       url = window.location.toString();
        //меняем текущый  параметер perPage url строки на новый
      if(url.includes('perPage'))
       url = url.replace(/perPage=[0-9]+/, 'perPage='+params.perPage);

      else{
          // проверяем на наличие параметоров
          url+=  (url.includes('?')) ? '&' : '?';
          url += 'perPage='+params.perPage;
      }

       window.history.pushState("", "", url);


    $.ajax({
        type:  'POST',
        url:   form.attr('action'),
        data:  data,
        beforeSend: function () {
            $('#voyager-loader').show();
        }
        , success: function (data) {

          $('#dataTable').replaceWith($(data).find('#dataTable'));
          $('.panel-body>.pull-left').replaceWith($(data).find('.panel-body>.pull-left'));
          $('.panel-body>.pull-right').replaceWith($(data).find('.panel-body>.pull-right'));
          $('#voyager-loader').hide();
           $('[data-toggle="tooltip"]').tooltip();

        }

    });


    $.ajax({
        type:'GET',
        url:'/cookie/set',
        data:{key:'perPage',value:params.perPage},
        success:function(response){
            console.log(response);
        }
    });

}

function getPerPageForDataTable(){
    var perPage = $('select[name="perPage"]').val();
    if (perPage === undefined) {
        perPage = 10;
    }
    return perPage;
}

function changePerPageForDatatable(e) {
    var form     =  $('#searh_form'),
        params   =  $('#url_request').text();
    params   =    getUrlVars(decodeURI(decodeURIComponent(params)).replace(/(\+)+/gi, ' '));

    //при смене количества позиций  переходим на первою страницу
    params.page = 1;

    var data   =    Object.assign(params,getFormData(form)),
        url = window.location.toString();
    //меняем текущый  параметер perPage url строки на новый
    if(url.includes('perPage'))
        url = url.replace(/perPage=[0-9]+/, 'perPage='+params.perPage);

    else{
        // проверяем на наличие параметоров
        url+=  (url.includes('?')) ? '&' : '?';
        url += 'perPage='+params.perPage;
    }

    window.history.pushState("", "", url);

    $.ajax({
        type:'GET',
        url:'/cookie/set',
        data:{key:'perPage',value:params.perPage},
        success:function(response){
            console.log(response);
        }
    });
}

function  changeShearchType(e) {

       var typeSearch  =  (e==false)?'input':'textarea',
           typeChange  =  (e==false)?'textarea':'input',
           form = $('#searh_form');

        form.find(typeChange+'[itemtype=list]').each(function () {

            const element = document.createElement(typeSearch);

            var   attrs   =  getAttributes($(this));
            $(this).replaceWith(element);
            $(element).attr(attrs);
        });


}



function getAttributes ( $node) {

    var attrs = {};
    $.each( $node[0].attributes, function ( index, attribute ) {
        attrs[attribute.name] = attribute.value;
    } );
    return attrs;
}



function clearDataAfterCloseModel(modal){

    modal.find('input[type=radio],input[type=checkbox]').removeAttr("disabled");
    modal.find('textarea,select,input:not(input[type=radio],input[type=checkbox],input[type=hidden])')
        .removeAttr("disabled").val('');


    //удаление блокировки кропки которыя отвечает за отправление формы
    modal.find('.bottom-block__btn .bottom-block__btn-success').removeAttr('data-disabled');

}



function getCrmTaskBody(id_body_task){
    var e =  $(id_body_task);
    e.siblings().addClass('display-none');
    e.removeClass('display-none');

    e.find(".crm_is_priority").bootstrapToggle();



    $(function() {
        $('input[name=phone_number_specification]').inputmask('+380(99)-99-99-999');
    });

    $(function() {
    $('.forward-city-ajax').select2({
        minimumInputLength: 3,
        minimumResultsForSearch: 20,
        ajax: {
            url: '/addresses/cities/search',
            data: function (params) {
                var query = {
                    q            : params.term,
                    dilivery_type: $(this).closest('form').find("input[name=crm_task_subtype_delivery_type]:checked").val(),
                    type         : 'public'
                }

                // Query parameters will be ?search=[term]&type=public
                return query;
            }
        }
    });
    });
    $(function () {
        $('.forward-division-ajax').select2({
            // minimumInputLength: 3,
            minimumResultsForSearch: 20,
            ajax: {
                url: '/addresses/warehouses/search',
                data: function (params) {
                    var query = {
                        q: params.term,
                        id: $('.forward-city-ajax').find(':selected').val(),
                        dilivery_type: $(this).closest('form').find("input[name=crm_task_subtype_delivery_type]:checked").val()
                    }

                    // Query parameters will be ?search=[term]&type=public
                    return query;
                },
                processResults: function (data) {
                    console.log(data);
                }
            }
        });
    });

    $(function() {
        $('.crm_date').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
        });
    });

    // console.log(id_body_task,e[0] );
}



function changeCrmTaskSubType(e,ifInputDesabled=false){
  var id        =  $(e).data('element-id'),
      element   =  $(id),
      siblings  = element.siblings().not(id);

    element.removeClass('display-none');
    siblings.addClass('display-none');

    if(ifInputDesabled){

            element.find('input').removeAttr('disabled');

            siblings.find('input').attr('disabled', true);
    }

}



//при добавлении на старницу возможности отключить звук  необходимо добавить елемент с id  #checkbox-sound-switcher
// на старницу дабавить вызов вункции  soundSwitcher(page) для того что значение проставилось по-умолчанию
function soundSwitcher(page, isChecked = null) {

    var key = 'sound-page-' + page,
        defaultValue = true;

    if ([null, 'null', 'undefined'].includes(isChecked) === false)

        sessionStorage.setItem(key, isChecked);


    var isTurnedOnSound = sessionStorage.getItem(key);

    switch (isTurnedOnSound) {
        case 'true':
            isTurnedOnSound = true;
            break;
        case 'false':
            isTurnedOnSound = false;
            break;
    }


    if(isTurnedOnSound !== null && isChecked === true )
        //проигравание звука нотификации
        playMediaNotify();


    if (isTurnedOnSound === null)
        isTurnedOnSound = defaultValue;



    $('#checkbox-sound-switcher').prop('checked', isTurnedOnSound);



    return isTurnedOnSound;
}



function playMediaNotify() {

    var isTurnedOn = $('#checkbox-sound-switcher').prop('checked');

    if(isTurnedOn){
    var myAudio = new Audio('/sounds/notify.mp3');
    myAudio.play();
    }

}



function showImageFull(url,urlDownload = null,fileName = 'file'){

    var modal = $('#imagemodal_task');


    modal.find('.modal-body img').attr('src', url);


    if(urlDownload === null)
        urlDownload =  url;

    modal.find('.crm-download-file').attr({'href':urlDownload,'download':fileName}).find('span').text(fileName);

    modal.modal('show');

}



function tooltipShowCopied(e){

    var titleTooltip = '';

    //сохраняем текущий title если он не сохнанен
    if(titleTooltip.length === 0)
        titleTooltip =   $(e).attr('data-original-title');
    // меняем на Copied title
    $(e).attr('title','Copied!').tooltip('fixTitle').tooltip('hide').tooltip('toggle');
    //меняем обратно
    setTimeout(function() {
        $(e).attr('title',titleTooltip).tooltip('fixTitle').tooltip('hide');
    },1000);


}


//удаление класса в елементе  по регулярному выражению
(function($) {
    $.fn.removeClassWild = function(mask) {
        return this.removeClass(function(index, cls) {
            var re = mask.replace(/\*/g, '\\S+');
            return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
        });
    };
})(jQuery);


function formDataToObject(formData) {
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    // var json = JSON.stringify(object);

    return object;
}
let calendarConst = {
    minDate:"01/01/2020",//MM/DD/YYYY
    maxDate:moment().endOf('month'),
    ranges: {
        'Day': [moment().startOf('day'), moment().endOf('day')],
        'Week': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
        'Month': [moment().startOf('month'), moment().endOf('month')],
        'This Quarter': [moment().startOf('quarter'), moment().endOf('quarter')],
        '1Q': [moment().startOf('year'), moment().startOf('year').add(3, 'month').subtract(1, 'days')],
        '2Q': [moment().startOf('year').add(3, 'month'), moment().startOf('year').add(6, 'month').subtract(1, 'days')],
        '3Q': [moment().startOf('year').add(6, 'month'), moment().startOf('year').add(9, 'month').subtract(1, 'days')],
        '4Q': [moment().startOf('year').add(9, 'month'), moment().endOf('year')],
        'Year': [moment().startOf('year'), moment().endOf('year')]
    }
}
function getCalendarConst(key){
    return calendarConst[key];
}


