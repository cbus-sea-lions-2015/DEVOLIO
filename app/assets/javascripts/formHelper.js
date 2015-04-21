// Add employment positions

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
addSkillMeters();