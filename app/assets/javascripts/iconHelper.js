function getIconMarkup(keyword) {
  switch(keyword.toLowerCase()) {
    case "animals":
      return '<i class="fa fa-paw"></i><span>Animals</span>';
    case "art":
      return '<i class="fa fa-paint-brush"></i><span>Art</span>';
    case "business":
      return '<i class="fa fa-briefcase"></i><span>Business</span>';
    case "coffee":
      return '<i class="fa fa-coffee"></i><span>Coffee</span>';
    case "cooking":
      return '<i class="fa fa-birthday-cake"></i><span>Cooking</span>';
    case "cycling":
      return '<i class="fa fa-bicycle"></i><span>Cycling</span>';
    case "diy":
      return '<i class="fa fa-wrench"></i><span>DIY</span>';
    case "games":
      return '<i class="fa fa-gamepad"></i><span>Games</span>';
    case "mentoring":
      return '<i class="fa fa-graduation-cap"></i><span>Mentoring</span>';
    case "music":
      return '<i class="fa fa-music"></i><span>Music</span>';
    case "outdoors":
      return '<i class="fa fa-leaf"></i><span>Outdoors</span>';
    case "photography":
      return '<i class="fa fa-camera-retro"></i><span>Photography</span>';
    case "reading":
      return '<i class="fa fa-book"></i><span>Reading</span>';
    case "research":
      return '<i class="fa fa-flask"></i><span>Research</span>';
    case "speaking":
      return '<i class="fa fa-microphone"></i><span>Speaking</span>';
    case "sports":
      return '<i class="fa fa-futbol-o"></i><span>Sports</span>';
    case "travel":
      return '<i class="fa fa-plane"></i><span>Travel</span>';
    case "tv/movies":
      return '<i class="fa fa-ticket"></i><span>TV/Movies</span>';
    case "writing":
      return '<i class="fa fa-pencil"></i><span>Writing</span>';
    default:
      return '<i class="fa fa-question-circle"></i><span>' + keyword + '</span>';
  }
}
