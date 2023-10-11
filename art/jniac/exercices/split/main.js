import { VisibilityTracker } from '../../../../common-resources/js/VisibilityTracker.js'

for (const img of document.querySelectorAll('.right img')) {
  const tracker = new  VisibilityTracker(img) 
  tracker.onPass({
    threshold: 1,
    above() {
      document.querySelector('.left').style.setProperty('background-image', `url(${img.src})`)
    },
  }) 
}