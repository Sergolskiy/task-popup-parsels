let modalList = $('#newPopup2');
let lists     =  modalList.find('ul.delivery_list_center_list li');



class FilterLists {

    static search() {
        //все показываем
        lists.show();

        // проверям или включены фильтры
        let isFilterSelect     = modalList.find('select.delivery_list_btn_select option:selected').val().length,
            isFilterMenu       = modalList.find('#menu').prop('checked'),
            isFilterAutomatic  = modalList.find('#automatic').prop('checked'),
            isFilterText       = modalList.find('input[name=search]').val().length;

        // в зависимости от включенных фильтруем елементы
        if(isFilterSelect)
            this.select()

        if(isFilterMenu)
            this.checkbox('displayed')

        if(isFilterAutomatic)
            this.checkbox('automatic')

        if(isFilterText)
            this.text()

        // проверяем списки которые проходят под условия
        this.whenListNotFound();

    }

    static checkbox(valueFilter) {

        $.each(lists,function (k,list){
            let listEl     =  $(list),
                valueList  = listEl.attr('data-filter');

            //когда data filter пустое
            if( valueList === undefined || ! valueList.length)
                listEl.hide();
            else
            if(valueList.indexOf(valueFilter) === -1)
                listEl.hide();

        })

    }

    static select() {
        let valueFilter =  modalList.find('select.delivery_list_btn_select option:selected').val();

        $.each(lists,function (k,list){

           let listEl     =  $(list),
               valueList  = listEl.attr('data-filter');

                //когда data filter пустое
                if( valueList === undefined || ! valueList.length)
                    listEl.hide();

                else
                    if(valueFilter.indexOf(valueList) === -1)
                        listEl.hide();


        })

    }

    static text() {

        let valueFilter = modalList.find('input[name=search]').val().toLowerCase();

        $.each(lists,function (k,list){

            let listEl     =  $(list),
                valueList  = (listEl.find('.delivery_list_center_card_title').text()
                              + listEl.find('.delivery_list_center_card_text').text()).toLowerCase();

            //когда valueList пустое
            if( valueList === undefined || ! valueList.length)
                listEl.hide();
            else
            if(valueList.indexOf(valueFilter) === -1)
                listEl.hide();

        })

    }

    static  whenListNotFound() {

        let isListNotFound = lists.filter(function () { return $(this).css('display') !== 'none'}).length

        if(! isListNotFound) {
            modalList.find('.delivery_list_search_empty').addClass('active')
            modalList.find('.delivery_list_center_list-wrap').removeClass('active')
        } else {
            modalList.find('.delivery_list_search_empty').removeClass('active')
            modalList.find('.delivery_list_center_list-wrap').addClass('active')
        }
    }
}

