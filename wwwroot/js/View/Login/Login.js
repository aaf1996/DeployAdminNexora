ns('Admin.Site.Login.PageLogin')
Admin.Site.Login.PageLogin.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Control.btnLogin().click(base.Event.btnLoginClick);
    };
    base.Parameters = {
    };
    base.Control = {
        txtUserId: function () { return $('#txtUserId'); },
        txtPassword: function () { return $('#txtPassword'); },
        btnLogin: function () { return $('#btnLogin'); }
    };
    base.Event = {
        btnLoginClick: function () {
            base.Ajax.AjaxValidateLogin.data = {
                userId: base.Control.txtUserId().val(),
                password: base.Control.txtPassword().val()
            };
            base.Ajax.AjaxValidateLogin.submit();
        },
        AjaxValidateLoginSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    window.location.href = Admin.Site.Login.Actions.RedirectIndexAdmin;
                }
                else {
                    Swal.fire("Oops...", data.message, "error") 
                }
            }
        }
    };
    base.Ajax = {
        AjaxValidateLogin: new Admin.Site.UI.Web.Components.Ajax({
            action: Admin.Site.Login.Actions.ValidateLogin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxValidateLoginSuccess
        })
    };
    base.Function = {

    };
}