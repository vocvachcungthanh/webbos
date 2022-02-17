function scrollTop() {
    $("html, body").scrollTop(0);
}
function line() {
    let offsetTop = $(".control-list__item.active")[0].offsetTop + "px";
    let offsetHeight = $(".control-list__item.active")[0].offsetHeight +  "px";
    $(".line").css({
        top: offsetTop,
        height: offsetHeight,
    });
}
function tabLocalhost(tabsList) {
    if (tabsList) {
        const tabs = $(".control-list__item[tab-show='" + tabsList + "']");
        tabs.addClass("active");
        tabs.siblings().removeClass("active");
        $(tabs.attr("tab-show")).slideDown(300);
        $(tabs.attr("tab-show")).siblings().slideUp(300);
        tabs.parent(".control-list").removeClass("active");
        line();

        scrollTop();
    }
}
function addonTab() {
    const tabsList = $(location).attr("hash");

    $(window).on("hashchange", function () {
        tabLocalhost($(location).attr("hash"));
        line();
        // scrollTop();
    });
    tabLocalhost(tabsList);
    $(".control-list__item").click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $($(this).attr("tab-show")).slideDown(300);
        $($(this).attr("tab-show")).siblings().slideUp(300);
        $(this).parent(".control-list").removeClass("active");
        line();
        // scrollTop();
    });
}
addonTab();
