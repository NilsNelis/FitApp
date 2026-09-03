import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Activity, Bike, ChevronLeft, CircleCheck, Dumbbell, ExternalLink, Home, Play, Plus, Timer, TrendingUp } from 'lucide-react'
import './style.css'

type Exercise = { name: string; sets: number; range: string; cues: string[]; visual: string; previous: string }
type Workout = { day: string; focus: string; color: string; exercises: Exercise[] }

const workouts: Workout[] = [
  { day: 'Dag 1', focus: 'Borst & triceps', color: '#e85d3f', exercises: [
    { name: 'Dumbbell floor press', sets: 3, range: '8 - 12', visual: 'floor-press', previous: '2 x 10 kg · 10, 9, 8', cues: ['Lig met voeten stevig op de vloer', 'Houd ellebogen 45 graden van je lichaam', 'Druk uit tot armen bijna gestrekt zijn'] },
    { name: 'Dumbbell fly', sets: 2, range: '10 - 15', visual: 'fly', previous: '2 x 6 kg · 12, 11', cues: ['Houd een lichte buiging in je ellebogen', 'Open langzaam en gecontroleerd', 'Knijp je borst samen bovenaan'] },
    { name: 'Overhead triceps extension', sets: 2, range: '10 - 15', visual: 'extension', previous: '12 kg · 12, 10', cues: ['Houd je bovenarmen stil', 'Laat het gewicht achter je hoofd zakken', 'Strek krachtig maar beheerst'] }
  ]},
  { day: 'Dag 2', focus: 'Benen & core', color: '#e1a427', exercises: [
    { name: 'Goblet squat', sets: 3, range: '8 - 12', visual: 'squat', previous: '20 kg · 12, 11, 10', cues: ['Borstelkas trots, buik aangespannen', 'Zakken tot je heupen onder je knien komen', 'Duw de vloer weg vanuit je hielen'] },
    { name: 'Romanian deadlift', sets: 3, range: '8 - 12', visual: 'hinge', previous: '30 kg · 10, 10, 9', cues: ['Houd je rug neutraal', 'Duw je heupen ver naar achter', 'Voel rek op je hamstrings'] },
    { name: 'Dead bug', sets: 2, range: '8 - 12', visual: 'core', previous: '10, 10', cues: ['Druk je onderrug in de vloer', 'Beweeg langzaam en diagonaal', 'Adem uit bij het strekken'] }
  ]},
  { day: 'Dag 3', focus: 'Rug & biceps', color: '#318e83', exercises: [
    { name: 'Barbell row', sets: 3, range: '8 - 12', visual: 'row', previous: '30 kg · 10, 10, 8', cues: ['Buig vanuit je heupen', 'Trek de halter naar je navel', 'Houd je nek lang en neutraal'] },
    { name: 'One-arm dumbbell row', sets: 2, range: '10 - 15', visual: 'row', previous: '14 kg · 12, 12', cues: ['Steun met een hand op je knie', 'Trek je elleboog naar je heup', 'Vermijd draaien in je romp'] },
    { name: 'Hammer curl', sets: 2, range: '10 - 15', visual: 'curl', previous: '2 x 8 kg · 12, 10', cues: ['Houd je bovenarmen langs je zij', 'Polsen blijven neutraal', 'Laat langzaam terugzakken'] }
  ]},
  { day: 'Dag 4', focus: 'Schouders & core', color: '#736baf', exercises: [
    { name: 'Dumbbell shoulder press', sets: 3, range: '8 - 12', visual: 'press', previous: '2 x 8 kg · 10, 9, 8', cues: ['Span je buik en billen aan', 'Druk recht omhoog', 'Eindig met je armen naast je oren'] },
    { name: 'Lateral raise', sets: 2, range: '12 - 15', visual: 'raise', previous: '2 x 4 kg · 15, 13', cues: ['Houd een kleine buiging in je ellebogen', 'Leid vanuit je ellebogen', 'Niet hoger dan schouderhoogte'] },
    { name: 'Side plank', sets: 2, range: '30 - 45 sec', visual: 'core', previous: '35 sec, 35 sec', cues: ['Elleboog onder je schouder', 'Houd je lichaam in een rechte lijn', 'Duw actief van de vloer weg'] }
  ]}
]

function ExerciseDemo({ kind }: { kind: string }) {
  const floor = ['floor-press', 'fly', 'core'].includes(kind)
  const lower = ['squat', 'hinge'].includes(kind)
  const pull = ['row', 'curl'].includes(kind)
  const title = floor ? 'Liggende beweging' : lower ? 'Staande beenbeweging' : pull ? 'Trekkende beweging' : 'Duwende beweging'

  return <div className={`exercise-visual demo-${kind}`} aria-label={`${title}: start- en eindhouding`}>
    <div className="demo-legend"><span>1. START</span><span>2. BEWEEG</span><span>3. EIND</span></div>
    <div className="demo-position"><span>START</span><svg viewBox="0 0 120 130" aria-hidden="true">
      {floor ? <><circle cx="35" cy="86" r="10" /><path d="M43 88 L75 88 L98 110 M75 88 L93 65 M75 88 L96 96" /><path className="weight" d="M87 63 L101 63 M89 59 L89 67 M99 59 L99 67" /></> : lower ? <><circle cx="60" cy="24" r="10" /><path d={kind === 'squat' ? 'M60 35 L57 71 L35 97 M57 71 L78 97 M58 48 L38 59 M58 48 L78 59' : 'M60 35 L43 68 L30 100 M43 68 L68 98 M49 54 L28 58 M49 54 L65 70'} /><path className="weight" d="M25 54 L39 54 M27 50 L27 58 M37 50 L37 58" /></> : <><circle cx="60" cy="25" r="10" /><path d={pull ? 'M60 35 L55 72 L38 105 M55 72 L75 105 M58 45 L35 65 M58 45 L78 62' : 'M60 35 L60 74 L42 106 M60 74 L78 106 M60 47 L43 69 M60 47 L77 69'} /><path className="weight" d="M29 65 L41 65 M31 61 L31 69 M39 61 L39 69" /></>}
    </svg></div>
    <div className="motion-arrow">&#8594;<small>BEHEERST</small></div>
    <div className="demo-position end"><span>EIND</span><svg viewBox="0 0 120 130" aria-hidden="true">
      {floor ? <><circle cx="35" cy="86" r="10" /><path d="M43 88 L75 88 L98 110 M75 88 L75 47 M75 88 L96 96" /><path className="weight" d="M68 45 L82 45 M70 41 L70 49 M80 41 L80 49" /></> : lower ? <><circle cx="60" cy="24" r="10" /><path d="M60 35 L60 72 L42 105 M60 72 L78 105 M60 48 L38 58 M60 48 L82 58" /><path className="weight" d="M32 57 L44 57 M34 53 L34 61 M42 53 L42 61" /></> : <><circle cx="60" cy="25" r="10" /><path d={pull ? 'M60 35 L53 70 L38 105 M53 70 L73 105 M57 45 L45 57 M57 45 L73 50' : 'M60 35 L60 74 L42 106 M60 74 L78 106 M60 47 L48 28 M60 47 L72 28'} /><path className="weight" d={pull ? 'M39 57 L51 57 M41 53 L41 61 M49 53 L49 61' : 'M43 27 L55 27 M45 23 L45 31 M53 23 L53 31'} /></>}
    </svg></div>
    <div className="demo-caption"><span className="motion-dot"></span>{title}</div>
  </div>
}

function App() {
  const [view, setView] = useState<'home' | 'workout' | 'progress'>('home')
  const [workoutIndex, setWorkoutIndex] = useState(0)
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [completedSets, setCompletedSets] = useState<number[]>([])
  const [weight, setWeight] = useState(localStorage.getItem('tempo-weight') ?? '')
  const [kilometers, setKilometers] = useState(localStorage.getItem('tempo-km') ?? '')
  const workout = workouts[workoutIndex]
  const exercise = workout.exercises[exerciseIndex]

  useEffect(() => { localStorage.setItem('tempo-weight', weight); localStorage.setItem('tempo-km', kilometers) }, [weight, kilometers])
  const begin = (index: number) => { setWorkoutIndex(index); setExerciseIndex(0); setCompletedSets([]); setView('workout') }
  const logSet = () => setCompletedSets((sets) => [...sets, sets.length + 1])
  const nextExercise = () => { if (exerciseIndex < workout.exercises.length - 1) { setExerciseIndex((index) => index + 1); setCompletedSets([]) } else setView('home') }

  return <main className="app-shell">
    {view === 'home' && <>
      <header><div><p className="eyebrow">JOUW KRACHTPLAN</p><h1>Goedemorgen,<br />Nils.</h1></div><div className="avatar">N</div></header>
      <section className="today"><div className="today-copy"><p>VOLGENDE TRAINING</p><h2>{workout.focus}</h2><span><Timer size={16} /> 15 min · 3 oefeningen</span><button onClick={() => begin(workoutIndex)}>Start training</button></div><div className="shape-dumbbell"><Dumbbell size={65} /></div></section>
      <section className="section-head"><div><p className="eyebrow">DEZE WEEK</p><h2>Jouw ritme</h2></div><strong>1 / 4</strong></section>
      <div className="week-row">{workouts.map((item, index) => <button key={item.day} onClick={() => begin(index)} className={`day-dot ${index === workoutIndex ? 'active' : ''}`} style={{ '--dot': item.color } as React.CSSProperties}><span>{item.day.replace('Dag ', '')}</span><i>{index === 0 ? <CircleCheck size={17} /> : <Dumbbell size={17} />}</i><small>{item.focus.split(' & ')[0]}</small></button>)}</div>
      <section className="section-head"><div><p className="eyebrow">SNEL INVOEREN</p><h2>Jouw gegevens</h2></div></section>
      <div className="metrics"><label><span><TrendingUp size={18} /> Gewicht</span><div><input inputMode="decimal" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder="--" /><b>kg</b></div></label><label><span><Bike size={18} /> Fietsen deze week</span><div><input inputMode="decimal" value={kilometers} onChange={(event) => setKilometers(event.target.value)} placeholder="--" /><b>km</b></div></label></div>
    </>}
    {view === 'workout' && <>
      <header className="workout-header"><button className="icon-button" onClick={() => setView('home')}><ChevronLeft /></button><div><p className="eyebrow">{workout.day.toUpperCase()}</p><h2>{workout.focus}</h2></div><span>{exerciseIndex + 1} / {workout.exercises.length}</span></header>
      <ExerciseDemo kind={exercise.visual} />
      <a className="video-guide" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${exercise.name} proper form tutorial`)}`} target="_blank" rel="noreferrer"><span><Play size={17} fill="currentColor" /> Bekijk de oefening in beweging</span><ExternalLink size={15} /></a>
      <section className="exercise-title"><p>OEFENING {exerciseIndex + 1}</p><h1>{exercise.name}</h1><div className="prescription"><strong>{exercise.sets} sets</strong><strong>{exercise.range} reps</strong><strong>60 sec rust</strong></div></section>
      <section className="technique"><h3>Techniek</h3>{exercise.cues.map((cue, index) => <p key={cue}><b>{index + 1}</b>{cue}</p>)}</section>
      <section className="log"><div><p>VORIGE KEER</p><strong>{exercise.previous}</strong></div><button onClick={logSet} disabled={completedSets.length >= exercise.sets}><Plus size={19} /> Set {completedSets.length + 1} loggen</button>{completedSets.length > 0 && <p className="logged">{completedSets.length} van {exercise.sets} sets voltooid</p>}</section>
      <button className="next" onClick={nextExercise}>{exerciseIndex === workout.exercises.length - 1 ? 'Training afronden' : 'Volgende oefening'}</button>
    </>}
    {view === 'progress' && <><header><div><p className="eyebrow">OVERZICHT</p><h1>Jouw progressie</h1></div></header><section className="progress-hero"><Activity size={30} /><h2>Consistentie wint.</h2><p>Je hebt deze week 1 van 4 krachttrainingen afgerond.</p></section><section className="history"><p className="eyebrow">LAATSTE SESSIES</p>{workouts.slice(0, 3).map((item, index) => <article key={item.day}><i style={{ background: item.color }}><Dumbbell size={18} /></i><div><strong>{item.focus}</strong><span>{index === 0 ? 'Vandaag' : `${index + 1} dagen geleden`} · 15 min</span></div><CircleCheck size={21} /></article>)}</section></>}
    <nav><button className={view === 'home' ? 'selected' : ''} onClick={() => setView('home')}><Home /><span>Vandaag</span></button><button className={view === 'progress' ? 'selected' : ''} onClick={() => setView('progress')}><TrendingUp /><span>Progressie</span></button></nav>
  </main>
}

export default App

createRoot(document.getElementById('root')!).render(<App />)