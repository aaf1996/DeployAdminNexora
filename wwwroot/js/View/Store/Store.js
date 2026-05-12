ns('Admin.Site.Store.Index')
Admin.Site.Store.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Function.clsNumberPagination();
        base.Function.GetStoreForAdmin();
        base.Function.clsUpdateDataClick();

        base.Control.btnSearch().click(base.Event.btnSearchClick);
        base.Control.btnClear().click(base.Event.btnClearClick);
        base.Control.btnCreateStore().click(base.Event.btnCreateStoreClick);
        base.Control.btnUpdateModal().click(base.Event.btnUpdateModalClick);
        base.Control.btnCreateModal().click(base.Event.btnCreateModalClick);
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10,
        storeId: 0
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbodyStore'); },
        txtStoreNameFilter: function () { return $('#txtStoreNameFilter'); },
        btnSearch: function () { return $('#btnSearch'); },
        btnClear: function () { return $('#btnClear'); },
        modalSave: function () { return $('#modalSave'); },
        btnCreateModal: function () { return $('#btnCreateModal'); },
        btnUpdateModal: function () { return $('#btnUpdateModal'); },
        txtStoreName: function () { return $('#txtStoreName'); },
        txtPhone: function () { return $('#txtPhone'); },
        slcActive: function () { return $('#slcActive'); },
        txtMail: function () { return $('#txtMail'); },
        txtAddress: function () { return $('#txtAddress'); },
        txtReference: function () { return $('#txtReference'); },
        txtLatitude: function () { return $('#txtLatitude'); },
        txtLongitude: function () { return $('#txtLongitude'); },
        txtOrder: function () { return $('#txtOrder'); },
        slcIsWarehouse: function () { return $('#slcIsWarehouse'); },
        btnCreateStore: function () { return $('#btnCreateStore'); },
        txtUserNameWholesale: function () { return $('#txtUserNameWholesale'); },
        txtPasswordWholesale: function () { return $('#txtPasswordWholesale'); },
    };
    base.Event = {
        AjaxGetStoreForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.storeForAdmin);
                }
            }
        },
        AjaxGetDetailStoreForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Function.FillDataModal(data.data);
                    base.Control.modalSave().modal('show');
                }
            }
        },
        AjaxUpdateUpdateStoreForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "Mayorista actualizado !!", "success");
                    base.Control.modalSave().modal('hide');
                }
                else {
                    Swal.fire("Oops...", data.message, "error");
                }
                base.Function.GetStoreForAdmin();
            }
        },
        AjaxCreateSaveStoreForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "Mayorista registrado !!", "success");
                    base.Control.modalSave().modal('hide');
                }
                else {
                    Swal.fire("Oops...", data.message, "error");
                }
                base.Function.GetStoreForAdmin();
            }
        },
        btnSearchClick: function () {
            base.Parameters.currentPage = 1;
            base.Function.GetStoreForAdmin();
        },
        btnClearClick: function () {
            base.Function.ClearFilters();
            base.Parameters.currentPage = 1;
            base.Function.GetStoreForAdmin();
        },
        btnUpdateModalClick: function () {
            base.Ajax.AjaxUpdateUpdateStoreForAdmin.data = {
                storeId: base.Parameters.storeId,
                storeName: base.Control.txtStoreName().val(),
                active: base.Control.slcActive().val() === "true",
                isWarehouse: base.Control.slcIsWarehouse().val() === "true",
                address: base.Control.txtAddress().val(),
                reference: base.Control.txtReference().val(),
                latitude: base.Control.txtLatitude().val(),
                longitude: base.Control.txtLongitude().val(),
                phone: base.Control.txtPhone().val(),
                mail: base.Control.txtMail().val(),
                orderList: base.Control.txtOrder().val(),
                userName: base.Control.txtUserNameWholesale().val(),
                password: base.Control.txtPasswordWholesale().val(),
            };
            base.Ajax.AjaxUpdateUpdateStoreForAdmin.submit();
        },
        btnCreateModalClick: function () {
            base.Ajax.AjaxCreateSaveStoreForAdmin.data = {
                storeName: base.Control.txtStoreName().val(),
                active: base.Control.slcActive().val() === "true",
                isWarehouse: base.Control.slcIsWarehouse().val() === "true",
                address: base.Control.txtAddress().val(),
                reference: base.Control.txtReference().val(),
                latitude: base.Control.txtLatitude().val(),
                longitude: base.Control.txtLongitude().val(),
                phone: base.Control.txtPhone().val(),
                mail: base.Control.txtMail().val(),
                orderList: base.Control.txtOrder().val(),
                userName: base.Control.txtUserNameWholesale().val(),
                password: base.Control.txtPasswordWholesale().val(),
            };
            base.Ajax.AjaxCreateSaveStoreForAdmin.submit();
        },
        btnCreateStoreClick: function () {
            base.Control.txtStoreName().val("");
            base.Control.txtPhone().val("");
            base.Control.txtMail().val("");
            base.Control.txtAddress().val("");
            base.Control.txtReference().val("");
            base.Control.txtLatitude().val("");
            base.Control.txtLongitude().val("");
            base.Control.txtOrder().val("");
            base.Control.slcActive().val("true");
            base.Control.slcActive().selectpicker('refresh');
            base.Control.slcIsWarehouse().val("false");
            base.Control.slcIsWarehouse().selectpicker('refresh');

            base.Control.btnUpdateModal().hide();
            base.Control.btnCreateModal().show();
            base.Control.modalSave().modal('show');
        },
    };
    base.Ajax = {
        AjaxGetStoreForAdmin: new Admin.Site.UI.Web.Components.Ajax({
            action: Admin.Site.Store.Actions.GetStoreForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetStoreForAdminSuccess
        }),
        AjaxCreateSaveStoreForAdmin: new Admin.Site.UI.Web.Components.Ajax({
            action: Admin.Site.Store.Actions.SaveStoreForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxCreateSaveStoreForAdminSuccess
        }),
        AjaxUpdateUpdateStoreForAdmin: new Admin.Site.UI.Web.Components.Ajax({
            action: Admin.Site.Store.Actions.UpdateStoreForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxUpdateUpdateStoreForAdminSuccess
        }),
        AjaxGetDetailStoreForAdmin: new Admin.Site.UI.Web.Components.Ajax({
            action: Admin.Site.Store.Actions.DetailStoreForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetDetailStoreForAdminSuccess
        }),
    };
    base.Function = {
        UpdatePagination: function () {
            base.Control.divPagination().empty();
            base.Control.divPagination().append('<li class="page-item page-indicator"><a class="page-link" href="#" id="prev">«</a></li>');

            if (base.Parameters.totalPages <= 5) {
                for (var i = 1; i <= base.Parameters.totalPages; i++) {
                    base.Control.divPagination().append('<li class="page-item ' + (i === base.Parameters.currentPage ? 'active' : '') + '"><a class="page-link" href="#">' + i + '</a></li>');
                }
            } else {
                var startPage = Math.max(1, base.Parameters.currentPage - 2);
                var endPage = Math.min(base.Parameters.totalPages, base.Parameters.currentPage + 2);

                if (base.Parameters.currentPage >= base.Parameters.totalPages - 2) {
                    startPage = base.Parameters.totalPages - 4;
                }

                if (startPage > 1) {
                    base.Control.divPagination().append('<li class="page-item"><a class="page-link" href="#">1</a></li>');
                    if (startPage > 2) {
                        if (base.Parameters.currentPage != base.Parameters.totalPages) {
                            endPage--;
                        }
                        startPage++;
                        var valueHidden = startPage - 1;
                        base.Control.divPagination().append('<li class="page-item page-indicator"><a value-hidden="' + valueHidden + '" class="page-link" href="#">..</a></li>');
                    }
                }

                for (var i = startPage; i <= endPage; i++) {
                    base.Control.divPagination().append('<li class="page-item ' + (i === base.Parameters.currentPage ? 'active' : '') + '"><a class="page-link" href="#">' + i + '</a></li>');
                }

                if (endPage < base.Parameters.totalPages) {
                    if (endPage < base.Parameters.totalPages - 1) {
                        var valueHidden = endPage + 1;
                        base.Control.divPagination().append('<li class="page-item page-indicator"><a value-hidden="' + valueHidden + '" class="page-link" href="#">..</a></li>');
                    }
                    base.Control.divPagination().append('<li class="page-item"><a class="page-link" href="#">' + base.Parameters.totalPages + '</a></li>');
                }
            }

            base.Control.divPagination().append('<li class="page-item page-indicator"><a class="page-link" href="#" id="next">»</a></li>');
        },
        clsNumberPagination: function () {
            var parentElement = $(document);
            parentElement.on('click', '.page-link', function () {
                var page = $(this).text();
                if (page === '«') {
                    if (base.Parameters.currentPage > 1) {
                        base.Parameters.currentPage--;
                    }
                } else if (page === '»') {
                    if (base.Parameters.currentPage < base.Parameters.totalPages) {
                        base.Parameters.currentPage++;
                    }
                } else if (page === '..') {
                    base.Parameters.currentPage = parseInt($(this).attr('value-hidden'));
                } else {
                    base.Parameters.currentPage = parseInt(page);
                }
                base.Function.GetStoreForAdmin();
            });
        },
        GetStoreForAdmin: function () {
            base.Ajax.AjaxGetStoreForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                storeName: base.Control.txtStoreNameFilter().val()
            };
            base.Ajax.AjaxGetStoreForAdmin.submit();
        },
        FillData: function (listData) {
            base.Control.tbodyTable().empty();
            listData.forEach(function (data) {
                var status = data.active ? "Activo" : "Inactivo";
                base.Control.tbodyTable().append('<tr style="text-align: center;">' +
                    '<td>' +
                    '<div class="dropdown">' +
                    '<button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">' +
                    '<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">' +
                    '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                    '<rect x="0" y="0" width="24" height="24" /><circle fill="#000000" cx="5" cy="12" r="2" /><circle fill="#000000" cx="12" cy="12" r="2" /><circle fill="#000000" cx="19" cy="12" r="2" />' +
                    '</g>' +
                    '</svg>' +
                    '</button>' +
                    '<div class="dropdown-menu">' +
                    '<a class="dropdown-item updateData" value="' + data.storeId + '" href="#">Actualizar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.storeId + '</strong></td>' +
                    '<td>' + data.storeName + '</td>' +
                    '<td>' + status + '</td>' +
                    '<td>' + data.phone + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        clsUpdateDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateData', function () {
                var storeId = $(this).attr('value');
                base.Control.btnUpdateModal().show();
                base.Control.btnCreateModal().hide();
                base.Parameters.storeId = storeId;
                base.Ajax.AjaxGetDetailStoreForAdmin.data = {
                    storeId: storeId
                };
                base.Ajax.AjaxGetDetailStoreForAdmin.submit();
            });
        },
        FillDataModal: function (data) {
            base.Control.txtStoreName().val(data.storeName);
            base.Control.txtPhone().val(data.phone);
            base.Control.txtMail().val(data.mail);
            base.Control.txtAddress().val(data.address);
            base.Control.txtReference().val(data.reference);
            base.Control.txtLatitude().val(data.latitude);
            base.Control.txtLongitude().val(data.longitude);
            base.Control.txtOrder().val(data.orderList);
            base.Control.txtUserNameWholesale().val(data.userName);
            base.Control.slcActive().val(data.active.toString());
            base.Control.slcActive().selectpicker('refresh');
            base.Control.slcIsWarehouse().val(data.isWarehouse.toString());
            base.Control.slcIsWarehouse().selectpicker('refresh');
        },
        ClearFilters: function () {
            base.Control.txtStoreNameFilter().val("");
        },
    };
}