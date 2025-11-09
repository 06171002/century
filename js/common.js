$(document).ready(function () {
  $(function () {
    var modalDialog = function () {
      var openModalBtn = $(".open_popup"),
        modalLayer = $(".popup_wrap");
      modalLayer.attr("aria-hidden", true);
      // 포커스 요소 추가
      modalLayer.prepend($('<div data-focus="focusStart" tabindex="0"></div>'));
      modalLayer
        .find("[role=dialog]")
        .append($('<div data-focus="focusEnd" tabindex="0"></div>'));

      openModalBtn.on("click", function () {
        var $this = $(this),
          openModal = $("#" + $this.attr("aria-controls")),
          modalDim = openModal.find(".layer_bg"),
          modal = openModal.find(".popup"),
          closeModal = openModal.find(".close_popup");

        $("html").addClass("not_scroll");
        openModal.addClass("active").attr("aria-hidden", false);

        // 포커스 이동 함수
        function modalFocus(modalId) {
          // 팝업 버튼 클릭하면 dialog에 포커스
          $(modalId).find("[role=dialog]").attr("tabindex", 0).focus();

          // 닫기 버튼에서 tab을 눌렀을 때 role=dialog로 포커스 이동
          $(modalId)
            .find("[data-focus=focusEnd]")
            .on("focus", function () {
              $(modalId).find("[role=dialog]").focus();
            });

          // role=dialog에서 shift + tab을 눌렀을 때 닫기 버튼으로 포커스 이동
          $(modalId)
            .find("[data-focus=focusStart]")
            .on("focus", function () {
              $(modalId).find(".close_popup").focus();
            });
        }
        modalFocus(openModal);

        // 닫기 버튼 함수
        function modlaClose() {
          $("html").removeClass("not_scroll");
          openModal.removeClass("active").removeAttr("aria-hidden", true);
          $this.focus(); // 팝업 닫으면 열었던 버튼으로 포커스 이동
          $(document).off("keyup.closeModal");
        }

        // 닫기 버튼 클릭 시 팝업차 닫기
        closeModal.on("click", modlaClose);

        // modalDim을 클릭해도 팝업창 닫기
        modalDim.on("click", function (e) {
          if (e.target === e.currentTarget) {
            modlaClose();
          }
        });

        // 팝업창이 열렸을 때 esc 키를 누르면 닫기
        $(document).on("keyup.closeModal", function (e) {
          var keycode = e.keycode || e.which;
          if (keycode == 27 && openModal.hasClass("active")) {
            modlaClose();
          }
        });
      });
    };
    modalDialog();
  });
});
