let modalList = $('#newPopup2');
let lists     =  modalList.find('ul.delivery_list_center_list li');



class FilterLists {

    static search() {

        lists.show();

        let isFilterSelect     = modalList.find('select.delivery_list_btn_select option:selected').val().length,
            isFilterMenu       = modalList.find('#menu').prop('checked'),
            isFilterAutomatic  = modalList.find('#automatic').prop('checked'),
            isFilterText       = modalList.find('input[name=search]').val();



        if(isFilterSelect)
            this.select()

        if(isFilterMenu)
            this.checkbox('displayed')

        if(isFilterAutomatic)
            this.checkbox('automatic')





    }

    static checkbox(valueFilter) {

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

            console.log(valueFilter,valueList);

        })

    }

    static text() {

    }
}

