ns('Admin.Site.Header.Logout')
Admin.Site.Header.Logout.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Control.bntLogout().click(base.Event.bntLogoutClick);
        base.Function.GetCountPendingPurchase();
        base.Function.GetCountPendingWholesaleOrder();
        setInterval(function () {
            base.Function.GetCountPendingPurchase();
            base.Function.GetCountPendingWholesaleOrder();

        }, 30000);
        base.Function.clsRedirectNotificationPurchase();
        base.Function.clsRedirectNotificationOrderWholesale();
    };
    base.Parameters = {
        pendingPurchaseCount: 0,
        pendingWholesaleCount: 0
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
            if (data && data.isSuccess) {
                base.Parameters.pendingPurchaseCount = Number(data.data) || 0;
                base.Function.RenderNotifications();
            }
        },
        AjaxGetCountPendingWholesaleOrderSuccess: function (data) {
            if (data && data.isSuccess) {
                base.Parameters.pendingWholesaleCount = Number(data.data) || 0;
                base.Function.RenderNotifications();
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
        AjaxGetCountPendingWholesaleOrder: new Admin.Site.UI.Web.Components.Ajax({
            action: Admin.Site.Header.Actions.GetCountPendingWholesaleOrder,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetCountPendingWholesaleOrderSuccess
        }),
    };
    base.Function = {
        RenderNotifications: function () {
            const ul = base.Control.ulHeaderNotification();
            ul.empty();
            const total = base.Parameters.pendingPurchaseCount + base.Parameters.pendingWholesaleCount;

            base.Control.spnHeaderQuantityNotification().text(total);

            // Compras normales
            if (base.Parameters.pendingPurchaseCount > 0) {
                const textPurchase = base.Parameters.pendingPurchaseCount > 1 ? "Compras pendientes" : "Compra pendiente";
                ul.append(
                    '<li class="redirectNotificationPurchase">' +
                    '<div class="timeline-panel">' +
                    '<div class="media me-2 media-primary">' +
                    '<i class="fa fa-shopping-cart"></i>' +
                    '</div>' +
                    '<div class="media-body">' +
                    '<h6 class="mb-1">' +
                    base.Parameters.pendingPurchaseCount +
                    ' ' +
                    textPurchase +
                    '</h6>' +
                    '</div>' +
                    '</div>' +
                    '</li>'
                );
            }

            // Compras mayoristas
            if (base.Parameters.pendingWholesaleCount > 0) {
                const textWholesale = base.Parameters.pendingWholesaleCount > 1 ? "Compras Mayorista pendientes" : "Compra Mayorista pendiente";
                ul.append(
                    '<li class="redirectNotificationOrderWholesale">' +
                    '<div class="timeline-panel">' +
                    '<div class="media me-2 media-primary">' +
                    '<i class="fa fa-shopping-cart"></i>' +
                    '</div>' +
                    '<div class="media-body">' +
                    '<h6 class="mb-1">' +
                    base.Parameters.pendingWholesaleCount +
                    ' ' +
                    textWholesale +
                    '</h6>' +
                    '</div>' +
                    '</div>' +
                    '</li>'
                );
            }
        },
        GetCountPendingPurchase: function () {
            base.Ajax.AjaxGetCountPendingPurchase.data = {
                statusPurchase: 'Pendiente'
            };
            base.Ajax.AjaxGetCountPendingPurchase.submit();
        },
        GetCountPendingWholesaleOrder: function () {
            base.Ajax.AjaxGetCountPendingWholesaleOrder.data = {
                statusPurchase: 'Pendiente'
            };
            base.Ajax.AjaxGetCountPendingWholesaleOrder.submit();
        },
        clsRedirectNotificationPurchase: function () {
            var parentElement = $(document);
            parentElement.on('click', '.redirectNotificationPurchase', function () {
                window.location.href = Admin.Site.Header.Actions.RedirectPendingPurchase;
            });
        },
        clsRedirectNotificationOrderWholesale: function () {
            var parentElement = $(document);
            parentElement.on('click', '.redirectNotificationOrderWholesale', function () {
                window.location.href = Admin.Site.Header.Actions.RedirectPendingOrderWholesale;
            });
        },
    };
}