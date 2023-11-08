import { VisibilityTracker } from '../../../../../../common-resources/js/VisibilityTracker.js'
import { setLeftImageSrc } from './left.js'

for (const img of document.querySelectorAll('.right img')) {
  const tracker = new VisibilityTracker(img)
  tracker.onPass({
    threshold: 1,
    above() {
      setLeftImageSrc(img.src)
    },
  })
}
