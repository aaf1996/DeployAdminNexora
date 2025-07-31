﻿ns('Admin.Site.Product.Index')
Admin.Site.Product.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Function.GetProductForAdmin();
        base.Function.clsNumberPagination();
        base.Function.clsUpdateDataClick();
        base.Function.clsAddOriginalProductClick();
        base.Function.clsRemoveOriginalProductClick();
        base.Function.clsProductPackageAutocomplete();
        base.Control.btnSearch().click(base.Event.btnSearchClick);
        base.Control.btnClear().click(base.Event.btnClearClick);
        base.Control.btnCreateProduct().click(base.Event.btnCreateProductClick);
        base.Control.slcIsOriginalProduct().change(base.Event.slcIsOriginalProductChange);
        base.Control.btnUpdateModal().click(base.Event.btnUpdateModalClick);
        base.Control.btnCreateModal().click(base.Event.btnCreateModalClick);
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10,
        oldImageName: ''
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbodyProduct'); },
        tbodyProductPackage: function () { return $('#tbodyProductPackage'); },
        txtProductIdFilter: function () { return $('#txtProductIdFilter'); },
        txtProductNameFilter: function () { return $('#txtProductNameFilter'); },
        btnSearch: function () { return $('#btnSearch'); },
        btnClear: function () { return $('#btnClear'); },
        modalUpdate: function () { return $('#modalUpdate'); },
        btnCreateProduct: function () { return $('#btnCreateProduct'); },
        btnUpdateModal: function () { return $('#btnUpdateModal'); },
        btnCreateModal: function () { return $('#btnCreateModal'); },
        txtProductIdModal: function () { return $('#txtProductIdModal'); },
        slcActive: function () { return $('#slcActive'); },
        slcWholesaleVisualisable: function () { return $('#slcWholesaleVisualisable'); },
        txtPointsWholesale: function () { return $('#txtPointsWholesale'); },
        txtCodeAdmin: function () { return $('#txtCodeAdmin'); },
        txtProductName: function () { return $('#txtProductName'); },
        txtDescription: function () { return $('#txtDescription'); },
        txtImageName: function () { return $('#txtImageName'); },
        txtPrice: function () { return $('#txtPrice'); },
        slcCategory: function () { return $('#slcCategory'); },
        txtActivationPoints: function () { return $('#txtActivationPoints'); },
        txtNetworkPoints: function () { return $('#txtNetworkPoints'); },
        txtDiscount: function () { return $('#txtDiscount'); },
        slcIsOriginalProduct: function () { return $('#slcIsOriginalProduct'); },
        txtIdOriginalProduct: function () { return $('#txtIdOriginalProduct'); },
        txtMultipack: function () { return $('#txtMultipack'); },
        slcPromotionPrice: function () { return $('#slcPromotionPrice'); },
        slcPromotionPoints: function () { return $('#slcPromotionPoints'); },
        divIdOriginalProduct: function () { return $('#divIdOriginalProduct'); },
        lblProductId: function () { return $('#lblProductId'); },
        rowProductPackage: function () { return $('#rowProductPackage'); },
        clsProductPackage: function () { return $('.productPackage'); },
    };
    base.Event = {
        AjaxGetProductForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.productForAdmin);
                }
            }
        },
        AjaxGetProductForEditSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Function.FillDataProductIntoModal(data.data);
                    base.Control.modalUpdate().modal('show');
                }
            }
        },
        AjaxSaveProductSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "El producto fue actualizado !!", "success")
                    base.Control.modalUpdate().modal('hide');
                    base.Function.GetProductForAdmin();
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                }
            }
        },
        btnSearchClick: function () {
            base.Parameters.currentPage = 1;
            var productId = (base.Control.txtProductIdFilter().val() == "") ? 0 : parseInt(base.Control.txtProductIdFilter().val());
            base.Ajax.AjaxGetProductForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                productId: productId,
                productName: base.Control.txtProductNameFilter().val()
            };
            base.Ajax.AjaxGetProductForAdmin.submit();
        },
        btnClearClick: function () {
            base.Function.ClearFilters();
            base.Parameters.currentPage = 1;
            var productId = (base.Control.txtProductIdFilter().val() == "") ? 0 : parseInt(base.Control.txtProductIdFilter().val());
            base.Ajax.AjaxGetProductForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                productId: productId,
                productName: base.Control.txtProductNameFilter().val()
            };
            base.Ajax.AjaxGetProductForAdmin.submit();
        },
        btnUpdateModalClick: function () {
            var formData = new FormData();
            var fileNameProduct = base.Parameters.oldImageName;
            var fileInput = $('#txtImageName')[0].files[0];
            if (fileInput) {
                formData.append('file', fileInput);
                fileNameProduct = fileInput.name;
            }
            var discount = base.Control.txtDiscount().val() == "" ? 0 : base.Control.txtDiscount().val();
            formData.append('productId', base.Control.txtProductIdModal().val());
            formData.append('active', base.Control.slcActive().val());
            formData.append('wholesaleVisualisable', base.Control.slcWholesaleVisualisable().val());
            formData.append('productName', base.Control.txtProductName().val());
            formData.append('codeAdmin', base.Control.txtCodeAdmin().val());
            formData.append('description', base.Control.txtDescription().val());
            formData.append('price', base.Control.txtPrice().val());
            formData.append('category', base.Control.slcCategory().val());
            formData.append('oldImageName', base.Parameters.oldImageName);
            formData.append('activationPoints', base.Control.txtActivationPoints().val());
            formData.append('pointsWholesale', base.Control.txtPointsWholesale().val());
            formData.append('networkPoints', base.Control.txtNetworkPoints().val());
            formData.append('discount', discount);
            formData.append('isOriginalProduct', base.Control.slcIsOriginalProduct().val());
            formData.append('idOriginalProduct', base.Control.txtIdOriginalProduct().val());
            formData.append('multipack', base.Control.txtMultipack().val());
            formData.append('promotionPrice', base.Control.slcPromotionPrice().val());
            formData.append('promotionPoints', base.Control.slcPromotionPoints().val());
            formData.append('imageName', fileNameProduct);
            var listProductPackage = [];
            $('.productPackage').each(function () {
                var valueHidden = $(this).attr('value-hidden');
                var productIdPackage = $("#hiddenProductId" + valueHidden).val();
                var quantityPackage = $("#quantity" + valueHidden).val();
                if (productIdPackage != null && productIdPackage != undefined) {
                    var objProductPackage = {
                        productId: productIdPackage,
                        quantity: quantityPackage
                    };
                    listProductPackage.push(objProductPackage);
                }
            });

            if (listProductPackage.length > 0) {
                formData.append('productPackageJson', JSON.stringify(listProductPackage));
            }

            $.ajax({
                url: Admin.Site.Product.Actions.UpdateProduct,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data) {
                        if (data.isSuccess) {
                            base.Control.txtImageName().val('');
                            Swal.fire("Excelente !!", "El producto fue actualizado !!", "success")
                            base.Control.modalUpdate().modal('hide');
                            base.Function.GetProductForAdmin();
                        }
                        else {
                            Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('Upload failed:', textStatus, errorThrown);
                }
            });
        },
        btnCreateModalClick: function () {
            var formData = new FormData();
            var fileNameProduct = "";
            var fileInput = $('#txtImageName')[0].files[0];
            if (fileInput) {
                formData.append('file', fileInput);
                fileNameProduct = fileInput.name;
            }
            var discount = base.Control.txtDiscount().val() == "" ? 0 : base.Control.txtDiscount().val();
            formData.append('active', base.Control.slcActive().val());
            formData.append('wholesaleVisualisable', base.Control.slcWholesaleVisualisable().val());
            formData.append('codeAdmin', base.Control.txtCodeAdmin().val());
            formData.append('productName', base.Control.txtProductName().val());
            formData.append('description', base.Control.txtDescription().val());
            formData.append('price', base.Control.txtPrice().val());
            formData.append('category', base.Control.slcCategory().val());
            formData.append('oldImageName', base.Parameters.oldImageName);
            formData.append('activationPoints', base.Control.txtActivationPoints().val());
            formData.append('networkPoints', base.Control.txtNetworkPoints().val());
            formData.append('pointsWholesale', base.Control.txtPointsWholesale().val());
            formData.append('discount', discount);
            formData.append('isOriginalProduct', base.Control.slcIsOriginalProduct().val());
            formData.append('idOriginalProduct', base.Control.txtIdOriginalProduct().val());
            formData.append('multipack', base.Control.txtMultipack().val());
            formData.append('promotionPrice', base.Control.slcPromotionPrice().val());
            formData.append('promotionPoints', base.Control.slcPromotionPoints().val());
            formData.append('imageName', fileNameProduct);

            var listProductPackage = [];
            $('.productPackage').each(function () {
                var valueHidden = $(this).attr('value-hidden');
                var productIdPackage =$("#hiddenProductId" + valueHidden).val();
                var quantityPackage =$("#quantity" + valueHidden).val();
                if (productIdPackage != null && productIdPackage != undefined) {
                    var objProductPackage = {
                        productId: productIdPackage,
                        quantity: quantityPackage
                    };
                    listProductPackage.push(objProductPackage);
                }
            });

            if (listProductPackage.length > 0) {
                formData.append('productPackageJson', JSON.stringify(listProductPackage));
            }

            $.ajax({
                url: Admin.Site.Product.Actions.SaveProduct,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data) {
                        if (data.isSuccess) {
                            base.Control.txtImageName().val('');
                            Swal.fire("Excelente !!", "El producto fue registrado !!", "success")
                            base.Control.modalUpdate().modal('hide');
                            base.Function.GetProductForAdmin();
                        }
                        else {
                            Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('Upload failed:', textStatus, errorThrown);
                }
            });
        },
        btnCreateProductClick: function () {
            base.Control.txtProductIdModal().hide();
            base.Control.lblProductId().hide();
            base.Control.slcActive().val("true");
            base.Control.slcActive().selectpicker('refresh');
            base.Control.slcWholesaleVisualisable().val("true");
            base.Control.slcWholesaleVisualisable().selectpicker('refresh');
            base.Control.txtCodeAdmin().val("");
            base.Control.txtProductName().val("");
            base.Control.txtDescription().val("");
            base.Control.txtPrice().val("0");
            base.Control.slcCategory().val("General");
            base.Control.slcCategory().selectpicker('refresh');
            base.Control.txtActivationPoints().val("0");
            base.Control.txtNetworkPoints().val("0");
            base.Control.txtPointsWholesale().val("0");
            base.Control.txtDiscount().val("0");
            base.Control.slcIsOriginalProduct().val("true");
            base.Control.slcIsOriginalProduct().selectpicker('refresh');
            base.Control.txtIdOriginalProduct().val("0");
            base.Control.txtMultipack().val("0");
            base.Control.slcPromotionPrice().val("false");
            base.Control.slcPromotionPrice().selectpicker('refresh');
            base.Control.slcPromotionPoints().val("false");
            base.Control.slcPromotionPoints().selectpicker('refresh');
            base.Control.txtImageName().val("");

            base.Control.btnUpdateModal().hide();
            base.Control.btnCreateModal().show();
            base.Control.modalUpdate().modal('show');
        },
        slcIsOriginalProductChange: function () {
            //var name = $(this).find('option:selected').text();
            var isOriginalProduct = $(this).val();
            if (isOriginalProduct == "true") {
                base.Control.tbodyProductPackage().empty();
                base.Control.rowProductPackage().hide();
            }
            else {
                base.Control.tbodyProductPackage().empty();
                base.Control.rowProductPackage().show();
                var rowCount = base.Control.tbodyProductPackage().children('tr').length;
                base.Function.AppendNewRowProductPackage(rowCount);
            }
        },
    };
    base.Ajax = {
        AjaxGetProductForAdmin: new Admin.Site.UI.Web.Components.Ajax({
            action: Admin.Site.Product.Actions.GetProductForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetProductForAdminSuccess
        }),
        AjaxGetProductForEdit: new Admin.Site.UI.Web.Components.Ajax({
            action: Admin.Site.Product.Actions.GetProductForEdit,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetProductForEditSuccess
        }),
        AjaxGetDropDownProduct: new Admin.Site.UI.Web.Components.Ajax({
            action: Admin.Site.Product.Actions.GetDropDownProduct,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetDropDownProductSuccess
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
                base.Function.GetProductForAdmin();
            });
        },
        GetProductForAdmin: function () {
            var productId = (base.Control.txtProductIdFilter().val() == "") ? 0 : parseInt(base.Control.txtProductIdFilter().val());
            base.Ajax.AjaxGetProductForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                productId: productId,
                productName: base.Control.txtProductNameFilter().val()
            };
            base.Ajax.AjaxGetProductForAdmin.submit();
        },
        FillData: function (listData) {
            base.Control.tbodyTable().empty();
            listData.forEach(function (data) {
                var statusProduct = data.active ? "Activo" : "Inactivo";
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
                    '<a class="dropdown-item updateData" value="' + data.productId + '" href="#">Actualizar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.productId + '</strong></td>' +
                    '<td>' + data.productName + '</td>' +
                    '<td><img src="https://api.soynexora.com/StaticFiles/ProductsImg/' + data.imageName + '" style="height: 80px"></td>' +
                    '<td>' + data.price + '</td>' +
                    '<td>' + data.activationPoints + '</td>' +
                    '<td>' + data.networkPoints + '</td>' +
                    '<td>' + statusProduct + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        clsUpdateDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateData', function () {
                var productId = $(this).attr('value');
                base.Control.txtProductIdModal().show();
                base.Control.lblProductId().show();
                base.Control.btnUpdateModal().show();
                base.Control.btnCreateModal().hide();
                base.Ajax.AjaxGetProductForEdit.data = {
                    productId: productId
                };
                base.Ajax.AjaxGetProductForEdit.submit();
            });
        },
        clsAddOriginalProductClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.btnAddOriginalProduct', function () {
                var valueHidden = $(this).attr('value-hidden');
                $("#btnAddProduct" + valueHidden + "").hide();
                $("#btnRemoveProduct" + valueHidden + "").hide();
                var rowCount = base.Control.tbodyProductPackage().children('tr').length;
                base.Function.AppendNewRowProductPackage(rowCount);
            });
        },
        clsRemoveOriginalProductClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.btnRemoveOriginalProduct', function () {
                var valueHidden = $(this).attr('value-hidden');
                var previousRow = parseInt(valueHidden) - 1;
                $("#btnAddProduct" + previousRow + "").show();
                if (previousRow > 0) {
                    $("#btnRemoveProduct" + previousRow + "").show();
                }
                $('#tbodyProductPackage tr').eq(parseInt(valueHidden)).remove();
            });
        },
        clsProductPackageAutocomplete: function () {
            $(document).on('focus', '.productPackage', function () {
                if (!$(this).data('ui-autocomplete')) {
                    $(this).autocomplete({
                        source: function (request, response) {
                            $.ajax({
                                type: 'POST',
                                url: Admin.Site.Product.Actions.GetDropDownProduct,
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    productName: request.term
                                }),
                                async: false,
                                success: function (data) {
                                    var results = $.map(data.data, function (tag) {
                                        return {
                                            label: tag.productName,
                                            value: tag.productId
                                        };
                                    });
                                    response(results);
                                },
                                error: function (jqXHR, t, exception) {
                                    console.log("Error");
                                }
                            });
                        },
                        minLength: 0,
                        maxResults: 6,
                        select: function (event, ui) {
                            var input = $(this);
                            var valueHidden = input.attr('value-hidden');
                            $("#product" + valueHidden).val(ui.item.label);
                            $("#hiddenProductId" + valueHidden).val(ui.item.value);
                            return false;
                        }
                    });
                }
            });
        },
        FillDataProductIntoModal: function (data) {
            base.Control.txtProductIdModal().val(data.productId);
            base.Control.slcActive().val(data.active.toString());
            base.Control.slcActive().selectpicker('refresh');
            base.Control.slcWholesaleVisualisable().val(data.wholesaleVisualisable.toString());
            base.Control.slcWholesaleVisualisable().selectpicker('refresh');
            base.Control.txtCodeAdmin().val(data.codeAdmin);
            base.Control.txtProductName().val(data.productName);
            base.Control.txtDescription().val(data.description);
            base.Parameters.oldImageName = data.imageName;
            base.Control.txtPrice().val(data.price);
            base.Control.slcCategory().val(data.category);
            base.Control.slcCategory().selectpicker('refresh');
            base.Control.txtActivationPoints().val(data.activationPoints);
            base.Control.txtNetworkPoints().val(data.networkPoints);
            base.Control.txtPointsWholesale().val(data.pointsWholesale);
            base.Control.txtDiscount().val(data.discount);
            base.Control.slcIsOriginalProduct().val(data.isOriginalProduct.toString());
            base.Control.slcIsOriginalProduct().selectpicker('refresh');
            base.Control.txtIdOriginalProduct().val(data.idOriginalProduct);
            base.Control.txtMultipack().val(data.multipack);
            base.Control.slcPromotionPrice().val(data.promotionPrice.toString());
            base.Control.slcPromotionPrice().selectpicker('refresh');
            base.Control.slcPromotionPoints().val(data.promotionPoints.toString());
            base.Control.slcPromotionPoints().selectpicker('refresh');
            base.Control.tbodyProductPackage().empty();

            if (data.isOriginalProduct.toString() == "true") {
                base.Control.rowProductPackage().hide();
            }
            else {
                base.Control.rowProductPackage().show();
                if (data.productPackages.length > 0) {
                    for (let i = 0; i < data.productPackages.length; i++) {
                        const item = data.productPackages[i];
                        if (i > 0) {
                            var lastItem = i - 1;
                            $("#btnAddProduct" + lastItem + "").hide();
                            $("#btnRemoveProduct" + lastItem + "").hide();
                        }
                        base.Function.AppendNewRowProductPackage(i);
                        $("#hiddenProductId" + i).val(item.productId);
                        $("#product" + i).val(item.productName);
                        $("#quantity" + i).val(item.quantity);
                    }
                }
            }
        },
        ClearFilters: function () {
            base.Control.txtProductIdFilter().val("");
            base.Control.txtProductNameFilter().val("");
        },
        AppendNewRowProductPackage: function (rowCount) {
            var hideRemove = rowCount == 0 ? "display:none;" : "";
            base.Control.tbodyProductPackage().append('<tr style="text-align: center;">' +
                '<td><input type="text" id="product' + rowCount + '" value-hidden="' + rowCount +'" value="" style="text-align: center;" class="form-control mb-xl-0 mb-1 productPackage"></td>' +
                '<td style="display:none;"><input type="hidden" id="hiddenProductId' + rowCount + '"></td>' +
                '<td><input type="text" id="quantity' + rowCount + '" value-hidden="' + rowCount +'" value="1" style="text-align: center;" class="form-control mb-xl-0 mb-1"></td>' +
                '<td>'+
                '<div class="btnAddOriginalProduct" value-hidden="' + rowCount + '" id="btnAddProduct' + rowCount +'">' +
                    '<a class= "btn btn-success shadow btn-s sharp me-1">' +
                    '<i class="fa-solid fa-plus"></i>' +
                    '</a>' +
                '</div></td>' +
                '<td>' +
                '<div class="btnRemoveOriginalProduct" style="' + hideRemove +'" value-hidden="' + rowCount + '" id="btnRemoveProduct' + rowCount + '">' +
                    '<a class= "btn btn-danger shadow btn-s sharp me-1">' +
                    '<i class="fa-solid fa-minus"></i>' +
                    '</a>' +
                '</div></td>' +
                '</tr>');
            //base.Control.btnUpdateModal().click(base.Event.btnUpdateModalClick);
            //base.Control.btnCreateModal().click(base.Event.btnCreateModalClick);

        },
    };
}