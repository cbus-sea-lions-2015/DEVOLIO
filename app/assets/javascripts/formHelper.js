// Add employment positions
function addEmploymentPosition() {
  var i = 1;
  $(document).on('click','.add-position', function(e){
    e.preventDefault();
    var sibling = $(this).siblings(".skill-position"),
        parent = $(this).parent('fieldset');
    var positionForm = '<div class="position col-xs-12">
        <fieldset>
          <label for="position" class="col-xs-12 col-sm-3">Position Title</label>
          <input class="col-xs-12 col-sm-6" type="text" name="positions[' + i + '][title]">
        </fieldset>
        <fieldset>
          <label for="company" class="col-xs-12 col-sm-3">Company</label>
          <input class="col-xs-12 col-sm-6" type="text" name="positions[' + i + '][company]">
        </fieldset>
        <fieldset>
          <label for="time" class="col-xs-12 col-sm-3">Date Range</label>
          <input class="col-xs-12 col-sm-6" type="text" name="positions[' + i + '][range]">
        </fieldset>
        <fieldset>
          <label for="position" class="col-xs-12 col-sm-3">Short Description</label>
          <input class="col-xs-12 col-sm-6" type="text" name="positions[' + i + '][description]">
        </fieldset>
      </div>';
    if( i > 3 ) {
      parent.find('.error').removeClass('hidden');
    } else {
      parent.find('.error').addClass('hidden');
      parent.append(skillMeter);
      sibling.val('');
      i += 1;
    }
  });
}

// Add tech skills
function addSkillMeters() {
  $(document).on('click','.add-skill', function(e){
    e.preventDefault();
    var sibling = $(this).siblings(".skill-label"),
        parent = $(this).parent('fieldset'),
      skill = sibling.val();
    var skillMeter = '<fieldset class="col-xs-12"><label for="skills[' + skill + ']" class="col-xs-3">' + skill + '</label><span class="col-sm-6"><input id="skill-' + skill + '"type="range" min="0" max="5" value="1" data-skill="skill" class="skill" name="skills[' + skill + ']"></span></fieldset>';
    if( !sibling.val() ) {
      parent.find('.error').removeClass('hidden');
    } else {
      parent.find('.error').addClass('hidden');
      parent.append(skillMeter);
      sibling.val('');
    }
  });
}
addEmploymentPosition();
addSkillMeters();