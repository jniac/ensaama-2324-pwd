import { compyteGrayScale, rand255 } from '../../common-resources/js/color-utils.js'
import { loadExercise as loadEvaluations, loadInfo } from './load.js'

const info = await loadInfo()
const exercises = await loadEvaluations()

/** 
 * @type {{
 *   exerciseName: string
 *   student: import('./load.js').Person
 *   evaluation: import('./load.js').Evaluation
 * }[]} 
 */
const showInfoArgs = []

Object.assign(window, {
  showInfo: (event, index) => {
    const { exerciseName, student, evaluation } = showInfoArgs[index]
    /** @type{HTMLDivElement} */
    const srcDiv = event.target
    let lines = Array.isArray(evaluation.comment) ? evaluation.comment : [evaluation.comment]
    lines = lines.map(line => {
        return `<div>${line}</div>`
      })

    const infoBlock = document.querySelector('.overlay .info-block')

    infoBlock.querySelector('.content').innerHTML = `
      <div>
        <h3>${student.names.join(' ')} — ${exerciseName}</h3>
        ${lines.join('\n')}
      </div>
    `     
      
    const srcRect = srcDiv.getBoundingClientRect()
    const infoRect = infoBlock.getBoundingClientRect()
    const x = srcRect.left + 44
    const y = srcRect.top + srcRect.height / 2 - infoRect.height / 2
    infoBlock.classList.remove('hidden')
    infoBlock.style.left = `${x}px`
    infoBlock.style.top = `${y}px`
    infoBlock.style.width = `${window.innerWidth - x - 32}px`
    
    const r = rand255()
    const g = rand255()
    const b = rand255()
    const gray = compyteGrayScale(r / 256, g / 256, b / 256)
    document.documentElement.style.setProperty('--accent-color-rgb', `${r}, ${g}, ${b}`)
    infoBlock.style.color = gray < .6 ? 'white' : 'black'
  },
  hideInfo: () => {
    const infoBlock = document.querySelector('.overlay .info-block')
    infoBlock.classList.add('hidden')
  },
})

let lines = info.students
  .map((student, index) =>
  {
    const studentEvaluations = exercises
      .map(exercise => {
        const index = showInfoArgs.length
        const evaluation = exercise[student.github] ?? {}
        showInfoArgs.push({ student, evaluation, exerciseName: exercise.exercise })
        return (`
          <div class="w-40 grade click-stop" onpointerover="showInfo(event, ${index})" onpointerleave="hideInfo()">
            <div class="ctr">${evaluation?.grade ?? '???'}</div>
          </div>`
        )
      })

    return /* html */`
      <div class="student">
        <div class="w-40 dim">${index + 1}</div>
        <div class="w-200">${student.names.join(' ')}</div>
        <div class="w-100">${student.github}</div>

        ${studentEvaluations.join('\n')}
      </div>
    `
  })

lines = lines
  .map(line => [
    line,
    `<div class="student-separator"></div>`,
  ])
  .flat()

document.querySelector('main').innerHTML = lines.join('\n')