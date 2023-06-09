export const errorForm = () => {
    const forms = document.querySelectorAll('.needs-validation');

      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          'submit',
          function (event: { preventDefault: () => void; stopPropagation: () => void; }) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add('was-validated');
          },
          false
        );
      });
}