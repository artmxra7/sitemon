function showChildInput(context) {
  var userType = $('option:selected', context).data('userType');
  
  $('#witelInput, #regionalInput').hide();

  switch (userType) {
      case 3:
          $('#witelInput').show();
          break;
      case 4:
          $('#regionalInput').show();
          break;
  }
}

jQuery(document).ready(function() {
    initSelect2('#select2_level','~ Pilih level');
    initSelect2('#select2_jk', 'Pilih jenis kelamin');

    setTimeout(function() {
      initSelect2('#select2_witel','~ Pilih witel');
      initSelect2('#select2_regional', '~ Pilih regional');
    }, 100);
});
