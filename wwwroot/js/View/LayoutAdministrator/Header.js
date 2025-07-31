ns('Admin.Site.Header.Logout')
Admin.Site.Header.Logout.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Control.bntLogout().click(base.Event.bntLogoutClick);
        setInterval(function () {
            base.Function.GetCountPendingPurchase();
        }, 30000);
        base.Function.clsRedirectNotificationPurchase();
    };
    base.Parameters = {
    };
    base.Control = {
        bntLogout: function () { return $('.logoutProcess'); },
        spnHeaderQuantityNotification: function () { return $('#spnHeaderQuantityNotification'); },
        ulHeaderNotification: function () { return $('#ulHeaderNotification'); },
    };
    base.Event = {
        bntLogoutClick: function () {
            base.Ajax.AjaxLogout.submit();
        },
        AjaxLogoutSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    window.location.href = Admin.Site.Header.Actions.RedirectLogin;
                }
            }
        },
        AjaxGetCountPendingPurchaseSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.ulHeaderNotification().empty();
                    base.Control.spnHeaderQuantityNotification().text(data.data);
                    if (data.data > 0) {
                        var textPurchase = data.data > 1 ? "Compras pendientes" : "Compra pendiente";
                        base.Control.ulHeaderNotification().append('<li class="redirectNotificationPurchase">' +
                            '<div class="timeline-panel">' +
                            '<div class="media me-2 media-primary">' +
                            '<i class="fa fa-shopping-cart"></i>' +
                            '</div>' +
                            '<div class="media-body">' +
                            '<h6 class="mb-1">' + data.data + ' ' + textPurchase +'</h6>' +
                            '</div>' +
                            '</div>' +
                            '</li>');
                    }
                    else {
                    }
                }
            }
        },
    };
    base.Ajax = {
        AjaxLogout: new Admin.Site.UI.Web.Components.Ajax({
            action: Admin.Site.Header.Actions.LogoutSession,
            autoSubmit: false,
            onSuccess: base.Event.AjaxLogoutSuccess
        }),
        AjaxGetCountPendingPurchase: new Admin.Site.UI.Web.Components.Ajax({
            action: Admin.Site.Header.Actions.GetCountPendingPurchase,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetCountPendingPurchaseSuccess
        }),
    };
    base.Function = {
        GetCountPendingPurchase: function () {
            base.Ajax.AjaxGetCountPendingPurchase.data = {
                statusPurchase: 'Pendiente'
            };
            base.Ajax.AjaxGetCountPendingPurchase.submit();
        },
        clsRedirectNotificationPurchase: function () {
            var parentElement = $(document);
            parentElement.on('click', '.redirectNotificationPurchase', function () {
                window.location.href = Admin.Site.Header.Actions.RedirectPendingPurchase;
            });
        },
    };
}