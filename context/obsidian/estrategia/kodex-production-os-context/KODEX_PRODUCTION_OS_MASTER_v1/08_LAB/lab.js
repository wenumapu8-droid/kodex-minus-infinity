const sceneFiles = [
  '00-threshold.json','01-observe.json','02-descent.json','03-archive.json',
  '04-machine.json','05-cosmology.json','06-return.json'
];

const scenes = await Promise.all(
  sceneFiles.map(file => fetch(`../02_SCENES/${file}`).then(r => r.json()))
);
const budgets = await fetch('../05_QA/performance-budgets.json').then(r => r.json());
const matrix = await fetch('../05_QA/visual-matrix.json').then(r => r.json());

document.querySelector('#sceneCount').textContent = scenes.length;
document.querySelector('#viewportCount').textContent = matrix.viewports.length;
document.querySelector('#profileCount').textContent = Object.keys(budgets.profiles).length;
document.querySelector('#testCount').textContent =
  Object.values(matrix.states).reduce((sum, states) => sum + states.length, 0) * matrix.modes.length * matrix.viewports.length;

document.querySelector('#sceneGrid').innerHTML = scenes.map(scene => `
  <article class="scene" style="--accent:${scene.accent}">
    <h2>${String(scene.index).padStart(2,'0')} · ${scene.title}</h2>
    <div class="meta">
      <span>VERB <b>${scene.verb}</b></span>
      <span>MODULE <b>${scene.heroModule}</b></span>
      <span>CTA <b>${scene.primaryAction}</b></span>
      <span>EVENT <b>${scene.completionEvent}</b></span>
    </div>
    <p>${scene.states.map(x => `<span class="tag">${x}</span>`).join('')}</p>
    <small>${scene.memoryWrites.join(' · ')}</small>
  </article>
`).join('');

document.querySelector('#budgetRows').innerHTML = Object.entries(budgets.profiles).map(([name, value]) => `
  <tr>
    <td>${name}</td>
    <td>${value.targetFps}</td>
    <td>${value.dprMax}</td>
    <td>${value.maxPasses}</td>
    <td class="${value.targetFps >= 30 ? 'good' : 'warn'}">${value.targetFps >= 30 ? 'ACTIVE' : 'FALLBACK READY'}</td>
  </tr>
`).join('');
