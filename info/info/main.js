import { compyteGrayScale, rand255 } from '../../common-resources/js/color-utils.js'
import { clamp } from '../../common-resources/js/math-utils.js'
import { loadExercise as loadEvaluations, loadInfo } from './load.js'

async function main() {
  const info = await loadInfo()
  const exercises = await loadEvaluations()

  /** 
   * @type {{
   *   exerciseName: string
   *   student: import('./load.js').Person
   *   evaluation: import('./load.js').Evaluation
   * }[]} 
   */
  const gradeInfos = []

  function gradeOnOver(event, index) {
    /** @type{HTMLDivElement} */
    const srcDiv = event.target

    const { exerciseName, student, evaluation } = gradeInfos[index]

    let lines = Array.isArray(evaluation.comment)
      ? evaluation.comment
      : [evaluation.comment ?? '...']

    lines = lines
      .map(line => {
        return `<div>${line}</div>`
      })

    if (evaluation.page) {
      const url = `https://jniac.github.io/ensaama-2324-pwd/art/${student.github}/${evaluation.page}`
      lines.push(`<div class="small">(click) ${url}</div>`)
    }

    const infoBlock = document.querySelector('.overlay .info-block')

    infoBlock.querySelector('.content').innerHTML = `
      <div>
        <h3>${student.names.join(' ')} (${student.github}) — ${exerciseName}</h3>
        ${lines.join('\n')}
      </div>
    `

    const srcRect = srcDiv.getBoundingClientRect()
    const infoRect = infoBlock.getBoundingClientRect()
    const x = srcRect.left + 44
    const y = srcRect.top + srcRect.height / 2 - infoRect.height / 2
    infoBlock.classList.remove('hidden')
    infoBlock.style.left = `${x}px`
    infoBlock.style.top = `${clamp(y, 32, window.innerHeight - infoRect.height - 32)}px`
    infoBlock.style.width = `${window.innerWidth - x - 32}px`

    const r = rand255()
    const g = rand255()
    const b = rand255()
    const gray = compyteGrayScale(r / 256, g / 256, b / 256)
    document.documentElement.style.setProperty('--accent-color-rgb', `${r}, ${g}, ${b}`)
    const fontColor = gray < .6 ? '255, 255, 255' : '33, 33, 33'
    document.documentElement.style.setProperty('--accent-font-color-rgb', fontColor)
  }

  function gradeOnLeave() {
    const infoBlock = document.querySelector('.overlay .info-block')
    infoBlock.classList.add('hidden')
  }

  function gradeOnClick(index) {
    const { student, evaluation } = gradeInfos[index]
    if (evaluation.page) {
      const url = `https://jniac.github.io/ensaama-2324-pwd/art/${student.github}/${evaluation.page}`
      window.open(url)
    }
  }

  Object.assign(window, {
    gradeOnOver,
    gradeOnLeave,
    gradeOnClick,
  })

  let lines = []

  lines.push(/* html */`
    <div class="info-row" style="opacity: 0.33;">
      <div class="w-40 dim"></div>
      <div class="w-200 bottom">nom</div>
      <div class="w-100 bottom">github</div>
      ${exercises.map(e => `<div class="w-40 vertical-text">${e.exercise}</div>`).join('\n')}
    </div>
 `)

  lines.push(...info.students
    .map((student, index) => {
      const studentEvaluations = exercises
        .map(exercise => {
          const index = gradeInfos.length
          const evaluation = exercise[student.github] ?? {}
          gradeInfos.push({ student, evaluation, exerciseName: exercise.exercise })
          return (`
            <div class="w-40 grade click-stop" onpointerover="gradeOnOver(event, ${index})" onpointerleave="gradeOnLeave()" onclick="gradeOnClick(${index})">
              <div class="ctr">
                <span class="ctr ${evaluation.page ? 'underline' : ''}">
                  ${evaluation?.grade ?? '???'}
                </span>
              </div>
            </div>`
          )
        })

      return /* html */`
        <div class="info-row">
          <div class="w-40 dim">${index + 1}</div>
          <div class="w-200">${student.names.join(' ')}</div>
          <div class="w-100">${student.github}</div>
  
          ${studentEvaluations.join('\n')}
        </div>
      `
    })
  )

  lines = lines
    .map((line, index) => index === 0 ? [line] : [
      `<div class="info-row-separator"></div>`,
      line,
    ])
    .flat()

  document.querySelector('main').innerHTML = lines.join('\n')
}

try {
  await main()
} catch (error) {
  document.querySelector('main').innerHTML = `
    <div style="background-color: #f99; padding: 2em">
      <pre>${error.mark.snippet}</pre>
    </div>
  `
}