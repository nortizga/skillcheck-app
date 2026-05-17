import { useState } from 'react';
import { SKILLS } from '../lib/i18n';
import SkillChip from '../components/SkillChip';
import type { Lang } from '../types';

interface Props {
  onBack: () => void;
  lang: Lang;
  onSwitchLang: () => void;
}

interface SkillTechnique {
  name: string;
  name_es: string;
  description: string;
  description_es: string;
  steps?: string[];
  steps_es?: string[];
}

interface SkillContent {
  id: string;
  summary: string;
  summary_es: string;
  techniques: SkillTechnique[];
}

const SKILL_CONTENT: SkillContent[] = [
  {
    id: 'wise_mind',
    summary: 'The balance between Reasonable Mind (logic) and Emotion Mind (feelings). Wise Mind is your inner wisdom — the calm center where reason and emotion meet.',
    summary_es: 'El equilibrio entre la Mente Razonable (lógica) y la Mente Emocional (sentimientos). La Mente Sabia es tu sabiduría interior — el centro tranquilo donde la razón y la emoción se encuentran.',
    techniques: [
      {
        name: 'Reasonable Mind',
        name_es: 'Mente Razonable',
        description: 'Thinking logically, focusing on facts and rational analysis. Useful for planning and problem-solving.',
        description_es: 'Pensar lógicamente, enfocándose en hechos y análisis racional. Útil para planificar y resolver problemas.',
      },
      {
        name: 'Emotion Mind',
        name_es: 'Mente Emocional',
        description: 'Thinking and acting driven by current feelings. Can be intense and cloud judgment.',
        description_es: 'Pensar y actuar guiado por los sentimientos actuales. Puede ser intenso y nublar el juicio.',
      },
      {
        name: 'Finding Wise Mind',
        name_es: 'Encontrar la Mente Sabia',
        description: 'Pause and breathe. Ask yourself: "What do I know deep down is right?" Trust the stillness you find.',
        description_es: 'Pausa y respira. Pregúntate: "¿Qué sé en lo más profundo que es correcto?" Confía en la calma que encuentres.',
        steps: ['Breathe deeply and slow down', 'Ask "What does my wise mind know?"', 'Notice the quiet sense of knowing', 'Act from that centered place'],
        steps_es: ['Respira profundo y desacelera', 'Pregunta "¿Qué sabe mi mente sabia?"', 'Nota esa sensación tranquila de saber', 'Actúa desde ese lugar centrado'],
      },
    ],
  },
  {
    id: 'mindfulness',
    summary: 'Intentionally paying attention to the present moment without judgment. Mindfulness is the foundation of all DBT skills.',
    summary_es: 'Prestar atención intencionalmente al momento presente sin juzgar. Mindfulness es la base de todas las habilidades DBT.',
    techniques: [
      {
        name: 'Observe',
        name_es: 'Observar',
        description: 'Just notice your experiences — sensations, thoughts, feelings — without getting caught up in them.',
        description_es: 'Solo observa tus experiencias — sensaciones, pensamientos, sentimientos — sin quedarte atrapado en ellos.',
      },
      {
        name: 'Describe',
        name_es: 'Describir',
        description: 'Put words on your experience. Stick to the facts — describe what you observe without interpreting.',
        description_es: 'Pon palabras a tu experiencia. Apégate a los hechos — describe lo que observas sin interpretar.',
      },
      {
        name: 'Participate',
        name_es: 'Participar',
        description: 'Throw yourself fully into the current activity. Become one with what you are doing.',
        description_es: 'Lánzate completamente a la actividad actual. Conviértete en uno con lo que estás haciendo.',
      },
      {
        name: 'Nonjudgmentally',
        name_es: 'Sin juzgar',
        description: 'See but don\'t evaluate. Let go of "good" and "bad." Acknowledge consequences without judging.',
        description_es: 'Observa pero no evalúes. Suelta lo "bueno" y lo "malo." Reconoce las consecuencias sin juzgar.',
      },
      {
        name: 'One-Mindfully',
        name_es: 'Con atención plena',
        description: 'Do one thing at a time. Focus all attention on the current activity.',
        description_es: 'Haz una cosa a la vez. Enfoca toda la atención en la actividad actual.',
      },
      {
        name: 'Effectively',
        name_es: 'Efectivamente',
        description: 'Focus on what works. Do what is needed in each situation — let go of being "right."',
        description_es: 'Enfócate en lo que funciona. Haz lo que se necesita en cada situación — suelta el ser "correcto."',
      },
    ],
  },
  {
    id: 'distressTolerance',
    summary: 'Skills to survive crisis situations without making them worse. When you cannot change the situation, you can change how you cope with it.',
    summary_es: 'Habilidades para sobrevivir situaciones de crisis sin empeorarlas. Cuando no puedes cambiar la situación, puedes cambiar cómo la manejas.',
    techniques: [
      {
        name: 'STOP',
        name_es: 'PARE',
        description: 'Stop, Take a step back, Observe, Proceed mindfully. Use this when urges feel overwhelming.',
        description_es: 'Para, Aléjate un paso, Observa, Procede conscientemente. Úsalo cuando los impulsos se sienten abrumadores.',
        steps: ['Stop — don\'t act impulsively', 'Take a step back and breathe', 'Observe what\'s happening inside and outside', 'Proceed mindfully with awareness'],
        steps_es: ['Para — no actúes impulsivamente', 'Aléjate un paso y respira', 'Observa lo que sucede dentro y fuera', 'Procede conscientemente con atención'],
      },
      {
        name: 'Pros & Cons',
        name_es: 'Pros y Contras',
        description: 'List the pros and cons of tolerating distress vs. acting on the crisis urge. Review the list when urges are strong.',
        description_es: 'Enumera los pros y contras de tolerar el malestar vs. actuar en el impulso de crisis. Revisa la lista cuando los impulsos son fuertes.',
      },
      {
        name: 'ACCEPTS',
        name_es: 'ACEPTA',
        description: 'Activities, Contributing, Comparisons, Emotions (opposite), Pushing away, Thoughts (other), Sensations — distraction strategies for surviving crises.',
        description_es: 'Actividades, Contribuir, Comparaciones, Emociones (opuestas), Alejar, Pensamientos (otros), Sensaciones — estrategias de distracción para sobrevivir crisis.',
      },
      {
        name: 'IMPROVE the Moment',
        name_es: 'MEJORA el Momento',
        description: 'Imagery, Meaning, Prayer, Relaxation, One thing at a time, Vacation (brief), Encouragement.',
        description_es: 'Imaginación, Significado, Oración, Relajación, Una cosa a la vez, Vacación (breve), Ánimo.',
      },
      {
        name: 'Willingness',
        name_es: 'Disposición',
        description: 'Open yourself to doing what is needed in this moment. Let go of willfulness — the refusal to accept what is.',
        description_es: 'Ábrete a hacer lo que se necesita en este momento. Suelta la obstinación — el rechazo a aceptar lo que es.',
      },
    ],
  },
  {
    id: 'tipp',
    summary: 'Fast-acting biological techniques to quickly reduce extreme emotion. TIPP works by changing your body chemistry to lower emotional intensity.',
    summary_es: 'Técnicas biológicas de acción rápida para reducir rápidamente las emociones extremas. TIPP funciona cambiando la química de tu cuerpo para reducir la intensidad emocional.',
    techniques: [
      {
        name: 'Temperature',
        name_es: 'Temperatura',
        description: 'Dip your face in cold water (50–60°F / 10–15°C) or hold ice. This activates the dive reflex, rapidly slowing heart rate.',
        description_es: 'Sumerge tu cara en agua fría (10–15°C) o sostén hielo. Esto activa el reflejo de buceo, reduciendo rápidamente la frecuencia cardíaca.',
        steps: ['Fill a bowl with cold water and ice', 'Hold your breath', 'Dip face into the water for 30 seconds', 'Repeat as needed'],
        steps_es: ['Llena un tazón con agua fría y hielo', 'Retén el aliento', 'Sumerge la cara en el agua por 30 segundos', 'Repite según sea necesario'],
      },
      {
        name: 'Intense Exercise',
        name_es: 'Ejercicio Intenso',
        description: 'Do intense aerobic exercise for 20 minutes — run, jump, do burpees. This burns off stress hormones.',
        description_es: 'Haz ejercicio aeróbico intenso por 20 minutos — corre, salta, haz burpees. Esto quema las hormonas del estrés.',
      },
      {
        name: 'Paced Breathing',
        name_es: 'Respiración Pausada',
        description: 'Breathe deeply from the belly. Exhale more slowly than you inhale. Try inhaling 4 counts, exhaling 6 counts.',
        description_es: 'Respira profundo desde el abdomen. Exhala más lentamente de lo que inhala. Intenta inhalar 4 tiempos, exhalar 6 tiempos.',
        steps: ['Sit comfortably', 'Breathe in slowly for 4 counts', 'Breathe out slowly for 6 counts', 'Repeat for several minutes'],
        steps_es: ['Siéntate cómodamente', 'Inhala lentamente por 4 tiempos', 'Exhala lentamente por 6 tiempos', 'Repite por varios minutos'],
      },
      {
        name: 'Paired Muscle Relaxation',
        name_es: 'Relajación Muscular Progresiva',
        description: 'Tense muscle groups as you inhale, release tension as you exhale slowly. Pair the release with the word "relax."',
        description_es: 'Tensa grupos musculares al inhalar, libera la tensión al exhalar lentamente. Empareja la liberación con la palabra "relax."',
        steps: ['Tense a muscle group while breathing in', 'Hold for 5–10 seconds', 'Release fully while breathing out slowly', 'Notice the feeling of relaxation', 'Move to the next muscle group'],
        steps_es: ['Tensa un grupo muscular mientras inhalas', 'Sostén por 5-10 segundos', 'Suelta completamente mientras exhalas lentamente', 'Nota la sensación de relajación', 'Muévete al siguiente grupo muscular'],
      },
    ],
  },
  {
    id: 'emotionRegulation',
    summary: 'Skills to understand, reduce vulnerability to, and change unwanted emotions. The goal is not to suppress emotions but to have the emotions you want to have.',
    summary_es: 'Habilidades para entender, reducir la vulnerabilidad a y cambiar emociones no deseadas. El objetivo no es suprimir las emociones sino tener las emociones que deseas tener.',
    techniques: [
      {
        name: 'Check the Facts',
        name_es: 'Verificar los Hechos',
        description: 'Ask whether your emotion and its intensity fit the actual facts of the situation, not just your interpretation.',
        description_es: 'Pregúntate si tu emoción y su intensidad se ajustan a los hechos reales de la situación, no solo a tu interpretación.',
        steps: ['Name the emotion you want to change', 'Identify the event that prompted it', 'List your interpretations and assumptions', 'Ask: do the facts support my interpretation?', 'Consider other possible interpretations'],
        steps_es: ['Nombra la emoción que deseas cambiar', 'Identifica el evento que la provocó', 'Enumera tus interpretaciones y suposiciones', 'Pregunta: ¿los hechos apoyan mi interpretación?', 'Considera otras interpretaciones posibles'],
      },
      {
        name: 'Problem Solving',
        name_es: 'Resolución de Problemas',
        description: 'If the emotion fits the facts, change the situation causing the emotion. Identify the problem and brainstorm solutions.',
        description_es: 'Si la emoción se ajusta a los hechos, cambia la situación que está causando la emoción. Identifica el problema y genera soluciones.',
      },
      {
        name: 'ABC PLEASE',
        name_es: 'ABC CUIDA',
        description: 'Accumulate positives, Build mastery, Cope ahead, and reduce Physical vulnerability: treat iLlness, balance Eating, Avoid mood-altering substances, balance Sleep, Exercise.',
        description_es: 'Acumula experiencias positivas, Construye maestría, Anticipa afrontamiento, y reduce vulnerabilidad física: trata Enfermedades, equilibra la Alimentación, evita Sustancias que alteran el estado de ánimo, equilibra el Sueño, haz Ejercicio.',
      },
      {
        name: 'Build Mastery',
        name_es: 'Construir Maestría',
        description: 'Do one thing each day that gives you a sense of accomplishment or competence. Start small and build.',
        description_es: 'Haz una cosa cada día que te dé una sensación de logro o competencia. Empieza pequeño y ve creciendo.',
      },
      {
        name: 'Cope Ahead',
        name_es: 'Anticipar el Afrontamiento',
        description: 'Imagine a difficult situation and rehearse coping with it. Practice the skill in your mind before you need it.',
        description_es: 'Imagina una situación difícil y ensaya cómo afrontarla. Practica la habilidad en tu mente antes de necesitarla.',
      },
    ],
  },
  {
    id: 'interpersonal',
    summary: 'Skills to get what you need from relationships, keep relationships healthy, and maintain your self-respect when interacting with others.',
    summary_es: 'Habilidades para obtener lo que necesitas de las relaciones, mantener las relaciones saludables y conservar tu autorespeto al interactuar con los demás.',
    techniques: [
      {
        name: 'DEAR MAN',
        name_es: 'DEAR MAN',
        description: 'For getting what you want/need: Describe, Express, Assert, Reinforce, Mindful, Appear confident, Negotiate.',
        description_es: 'Para obtener lo que quieres/necesitas: Describe, Expresa, Afirma, Refuerza, Consciente, Aparenta confianza, Negocia.',
        steps: ['Describe the situation factually', 'Express how you feel ("I feel...")', 'Assert clearly what you want', 'Reinforce — explain why it benefits them too', 'Stay Mindful — keep to your point', 'Appear confident in body language', 'Negotiate — offer alternatives'],
        steps_es: ['Describe la situación objetivamente', 'Expresa cómo te sientes ("Me siento...")', 'Afirma claramente lo que deseas', 'Refuerza — explica por qué también les beneficia', 'Mantente Consciente — apégate a tu punto', 'Aparenta confianza en el lenguaje corporal', 'Negocia — ofrece alternativas'],
      },
      {
        name: 'GIVE',
        name_es: 'GIVE',
        description: 'For keeping the relationship: Gentle, Interested, Validate, Easy manner.',
        description_es: 'Para mantener la relación: Gentil, Interesado, Valida, Manera fácil.',
        steps: ['Gentle — no attacks or threats', 'Interested — listen and appear interested', 'Validate — acknowledge their feelings and perspective', 'Easy manner — use humor, be light-hearted when possible'],
        steps_es: ['Gentil — sin ataques ni amenazas', 'Interesado — escucha y muestra interés', 'Valida — reconoce sus sentimientos y perspectiva', 'Manera fácil — usa el humor, sé ligero cuando sea posible'],
      },
      {
        name: 'FAST',
        name_es: 'FAST',
        description: 'For keeping your self-respect: Fair, Apologies (no excessive ones), Stick to values, Truthful.',
        description_es: 'Para mantener tu autorespeto: Justo, Disculpas (sin excesos), Apégate a los valores, Sincero.',
        steps: ['Fair — be fair to yourself and others', 'No excessive Apologies — don\'t apologize for existing or having needs', 'Stick to values — don\'t compromise what matters to you', 'Truthful — no lies, no acting helpless'],
        steps_es: ['Justo — sé justo contigo y con los demás', 'Sin disculpas excesivas — no te disculpes por existir o tener necesidades', 'Apégate a los valores — no comprometas lo que te importa', 'Sincero — sin mentiras, sin actuar indefenso'],
      },
      {
        name: 'Validation',
        name_es: 'Validación',
        description: 'Communicate that the other person\'s feelings, thoughts, and actions make sense given their history and current situation.',
        description_es: 'Comunica que los sentimientos, pensamientos y acciones de la otra persona tienen sentido dada su historia y situación actual.',
      },
    ],
  },
  {
    id: 'oppositeAction',
    summary: 'Change an emotion by acting opposite to its action urge. When your emotion does not fit the facts, do the opposite of what it urges you to do.',
    summary_es: 'Cambia una emoción actuando de manera opuesta a su impulso de acción. Cuando tu emoción no se ajusta a los hechos, haz lo opuesto de lo que te impulsa a hacer.',
    techniques: [
      {
        name: 'Fear → Approach',
        name_es: 'Miedo → Aproximarse',
        description: 'Fear urges avoidance. Do the opposite: approach what you fear (when the fear doesn\'t fit facts), repeatedly and fully.',
        description_es: 'El miedo impulsa la evitación. Haz lo opuesto: acércate a lo que temes (cuando el miedo no se ajusta a los hechos), repetida y completamente.',
      },
      {
        name: 'Anger → Kindness',
        name_es: 'Enojo → Amabilidad',
        description: 'Anger urges attacking. Opposite action: avoid the person who angered you, be kind instead of attacking, imagine sympathy for them.',
        description_es: 'El enojo impulsa a atacar. Acción opuesta: evita a la persona que te enojó, sé amable en lugar de atacar, imagina simpatía por ellos.',
      },
      {
        name: 'Sadness → Get Active',
        name_es: 'Tristeza → Activarse',
        description: 'Sadness urges withdrawal. Opposite action: get active, approach activities you feel like avoiding, build more positive events.',
        description_es: 'La tristeza impulsa el aislamiento. Acción opuesta: actívate, acércate a actividades que sientes que quieres evitar, construye más eventos positivos.',
      },
      {
        name: 'Shame → Disclose',
        name_es: 'Vergüenza → Revelar',
        description: 'Shame urges hiding. When shame doesn\'t fit the facts: share with trusted people, act according to your values publicly.',
        description_es: 'La vergüenza impulsa a esconderse. Cuando la vergüenza no se ajusta a los hechos: comparte con personas de confianza, actúa según tus valores públicamente.',
      },
      {
        name: 'How to Do It Effectively',
        name_es: 'Cómo Hacerlo Efectivamente',
        description: 'Act opposite ALL THE WAY. Half-hearted actions don\'t work. Repeat until the emotion changes.',
        description_es: 'Actúa de manera opuesta COMPLETAMENTE. Las acciones a medias no funcionan. Repite hasta que la emoción cambie.',
        steps: ['Identify the emotion and its action urge', 'Check: does this emotion fit the facts?', 'If not, identify the opposite action', 'Act opposite — all the way, not halfway', 'Repeat until emotion reduces'],
        steps_es: ['Identifica la emoción y su impulso de acción', 'Verifica: ¿esta emoción se ajusta a los hechos?', 'Si no, identifica la acción opuesta', 'Actúa de manera opuesta — completamente, no a medias', 'Repite hasta que la emoción disminuya'],
      },
    ],
  },
  {
    id: 'grounding',
    summary: 'Techniques to anchor yourself to the present moment and your body when feeling overwhelmed, dissociated, or caught in distressing thoughts.',
    summary_es: 'Técnicas para anclarte al momento presente y a tu cuerpo cuando te sientes abrumado, disociado o atrapado en pensamientos perturbadores.',
    techniques: [
      {
        name: '5-4-3-2-1 Senses',
        name_es: '5-4-3-2-1 Sentidos',
        description: 'Engage each sense to bring attention back to the present moment.',
        description_es: 'Involucra cada sentido para traer la atención de vuelta al momento presente.',
        steps: ['Name 5 things you can SEE', 'Name 4 things you can TOUCH', 'Name 3 things you can HEAR', 'Name 2 things you can SMELL', 'Name 1 thing you can TASTE'],
        steps_es: ['Nombra 5 cosas que puedes VER', 'Nombra 4 cosas que puedes TOCAR', 'Nombra 3 cosas que puedes ESCUCHAR', 'Nombra 2 cosas que puedes OLER', 'Nombra 1 cosa que puedes SABOREAR'],
      },
      {
        name: 'Body Scan',
        name_es: 'Escaneo Corporal',
        description: 'Slowly scan your body from head to toe, noticing sensations without judgment. Reconnect with physical presence.',
        description_es: 'Escanea lentamente tu cuerpo de la cabeza a los pies, notando sensaciones sin juzgar. Reconéctate con la presencia física.',
        steps: ['Sit or lie comfortably', 'Close your eyes and breathe deeply', 'Start at the top of your head', 'Move attention slowly downward', 'Notice tension, warmth, tingling — just observe', 'End at your feet'],
        steps_es: ['Siéntate o acuéstate cómodamente', 'Cierra los ojos y respira profundo', 'Comienza en la parte superior de tu cabeza', 'Mueve la atención lentamente hacia abajo', 'Nota tensión, calor, hormigueo — solo observa', 'Termina en tus pies'],
      },
      {
        name: 'Physical Anchoring',
        name_es: 'Anclaje Físico',
        description: 'Press your feet into the floor, hold something cold or textured, or splash cold water on your face to return to the present.',
        description_es: 'Presiona tus pies contra el suelo, sostén algo frío o con textura, o salpica agua fría en tu cara para volver al presente.',
      },
    ],
  },
  {
    id: 'radicalAcceptance',
    summary: 'Accepting reality completely and fully, as it is, without fighting it. Radical acceptance does not mean approval — it means stopping the struggle against what cannot be changed.',
    summary_es: 'Aceptar la realidad completamente y totalmente, tal como es, sin luchar contra ella. La aceptación radical no significa aprobación — significa detener la lucha contra lo que no puede cambiarse.',
    techniques: [
      {
        name: 'Accept with Your Mind',
        name_es: 'Aceptar con la Mente',
        description: 'Acknowledge what is true. Stop arguing with reality. Replace "why is this happening?" with "this is what is happening."',
        description_es: 'Reconoce lo que es verdad. Deja de discutir con la realidad. Reemplaza "¿por qué está pasando esto?" con "esto es lo que está pasando."',
      },
      {
        name: 'Accept with Your Heart',
        name_es: 'Aceptar con el Corazón',
        description: 'Allow yourself to feel the grief, sadness, or pain of accepting difficult realities. Feeling the pain is part of acceptance.',
        description_es: 'Permítete sentir el duelo, la tristeza o el dolor de aceptar realidades difíciles. Sentir el dolor es parte de la aceptación.',
      },
      {
        name: 'Turning the Mind',
        name_es: 'Girar la Mente',
        description: 'Acceptance is a choice you make again and again. Every time you notice rejection of reality, turn your mind toward acceptance.',
        description_es: 'La aceptación es una elección que haces una y otra vez. Cada vez que notas el rechazo de la realidad, gira tu mente hacia la aceptación.',
        steps: ['Notice when you are rejecting reality ("this shouldn\'t be!")', 'Make a commitment to accept it', 'Turn your mind toward what is true', 'Repeat as often as needed — this is normal'],
        steps_es: ['Nota cuando estás rechazando la realidad ("¡esto no debería ser!")', 'Comprométete a aceptarlo', 'Gira tu mente hacia lo que es verdad', 'Repite tantas veces como sea necesario — esto es normal'],
      },
      {
        name: 'Willingness vs. Willfulness',
        name_es: 'Disposición vs. Obstinación',
        description: 'Willingness = doing what is needed. Willfulness = refusing to accept reality or trying to control what you cannot. Choose willingness.',
        description_es: 'Disposición = hacer lo que se necesita. Obstinación = negarse a aceptar la realidad o intentar controlar lo que no se puede. Elige la disposición.',
      },
    ],
  },
  {
    id: 'selfSoothe',
    summary: 'Comfort and nurture yourself through your five senses. Self-soothing is about treating yourself with kindness and care during difficult moments.',
    summary_es: 'Confortarte y nutrirte a través de tus cinco sentidos. El auto-consuelo consiste en tratarte con amabilidad y cuidado durante momentos difíciles.',
    techniques: [
      {
        name: 'Vision',
        name_es: 'Vista',
        description: 'Look at something beautiful — nature, art, candles, stars, a sunset, flowers. Let your eyes rest on something calming.',
        description_es: 'Mira algo hermoso — naturaleza, arte, velas, estrellas, una puesta de sol, flores. Deja que tus ojos descansen en algo calmante.',
      },
      {
        name: 'Hearing',
        name_es: 'Audición',
        description: 'Listen to soothing music, nature sounds, or silence. Pay close attention to sounds around you.',
        description_es: 'Escucha música relajante, sonidos de la naturaleza o silencio. Presta atención a los sonidos a tu alrededor.',
      },
      {
        name: 'Smell',
        name_es: 'Olfato',
        description: 'Use calming scents — lavender, baked goods, a candle, fresh air, coffee, or any scent that feels comforting.',
        description_es: 'Usa aromas calmantes — lavanda, productos horneados, una vela, aire fresco, café, o cualquier aroma que se sienta reconfortante.',
      },
      {
        name: 'Taste',
        name_es: 'Gusto',
        description: 'Eat or drink something slowly and mindfully. Savor a warm drink, a piece of chocolate, or your favorite food.',
        description_es: 'Come o bebe algo lentamente y con atención. Saborea una bebida caliente, un trozo de chocolate o tu comida favorita.',
      },
      {
        name: 'Touch',
        name_es: 'Tacto',
        description: 'Use comforting physical sensations — a warm bath, soft blanket, pet, massage, or comfortable clothing.',
        description_es: 'Usa sensaciones físicas reconfortantes — un baño caliente, una manta suave, una mascota, un masaje o ropa cómoda.',
      },
    ],
  },
];

const UI_TEXT = {
  en: {
    title: 'DBT Skills Reference',
    subtitle: 'Explore and learn your DBT skills',
    allSkills: 'All Skills',
    back: '← Back',
    steps: 'Steps',
    techniques: 'Techniques',
    langSwitch: 'ES',
    footer: 'SkillCheck · DBT Skills Reference',
  },
  es: {
    title: 'Referencia de Habilidades DBT',
    subtitle: 'Explora y aprende tus habilidades de DBT',
    allSkills: 'Todas las habilidades',
    back: '← Volver',
    steps: 'Pasos',
    techniques: 'Técnicas',
    langSwitch: 'EN',
    footer: 'SkillCheck · Referencia de Habilidades de DBT',
  },
};

export default function SkillsPage({ onBack, lang, onSwitchLang }: Props) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const ui = UI_TEXT[lang];

  const filteredContent = activeFilter
    ? SKILL_CONTENT.filter((s) => s.id === activeFilter)
    : SKILL_CONTENT;

  const getSkillLabel = (skillId: string) => {
    const skill = SKILLS.find((s) => s.id === skillId);
    return skill ? skill[lang] : skillId;
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <div className="bg-brand-navy px-5 pt-[22px] pb-[18px] text-white relative overflow-hidden">
        <div
          className="absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(189,217,191,0.07) 100%)' }}
        />
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-[30px] font-display font-bold tracking-tight text-white m-0">
              SkillCheck
            </h1>
            <p className="text-[13px] text-brand-sage/70 font-body tracking-wide mt-0.5 mb-0">
              {ui.subtitle}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={onSwitchLang}
              className="border border-white/20 text-white hover:bg-white/10 rounded-full font-bold text-[13px] font-body px-3 py-1.5"
            >
              {ui.langSwitch}
            </button>
            <button
              onClick={onBack}
              className="border border-white/20 text-white hover:bg-white/10 rounded-full font-semibold text-[12px] font-body px-3 py-1.5 whitespace-nowrap"
            >
              {ui.back}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[680px] mx-auto px-4 py-6">
        <h2 className="font-display font-bold text-[24px] text-brand-navy tracking-tight mb-1">
          {ui.title}
        </h2>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mt-4 mb-6">
          <SkillChip
            label={ui.allSkills}
            active={activeFilter === null}
            onClick={() => setActiveFilter(null)}
          />
          {SKILLS.map((skill) => (
            <SkillChip
              key={skill.id}
              label={skill[lang]}
              active={activeFilter === skill.id}
              onClick={() => setActiveFilter(activeFilter === skill.id ? null : skill.id)}
            />
          ))}
        </div>

        {/* Skill cards */}
        <div className="space-y-6">
          {filteredContent.map((skillContent) => (
            <div
              key={skillContent.id}
              className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
            >
              {/* Card header */}
              <div className="bg-brand-navy/5 border-b border-border px-5 py-4">
                <h3 className="font-display font-bold text-[18px] text-brand-navy">
                  {getSkillLabel(skillContent.id)}
                </h3>
                <p className="text-sm text-foreground/70 mt-1 leading-relaxed">
                  {lang === 'en' ? skillContent.summary : skillContent.summary_es}
                </p>
              </div>

              {/* Techniques */}
              <div className="divide-y divide-border">
                {skillContent.techniques.map((technique) => (
                  <div key={technique.name} className="px-5 py-4">
                    <h4 className="font-semibold text-[14px] text-brand-navy mb-1">
                      {lang === 'en' ? technique.name : technique.name_es}
                    </h4>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {lang === 'en' ? technique.description : technique.description_es}
                    </p>
                    {technique.steps && (
                      <ol className="mt-3 space-y-1">
                        {(lang === 'en' ? technique.steps : technique.steps_es ?? technique.steps).map(
                          (step, i) => (
                            <li key={i} className="flex gap-2 text-sm text-foreground/80">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-sage/30 text-brand-navy text-[11px] font-bold flex items-center justify-center mt-0.5">
                                {i + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          )
                        )}
                      </ol>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
          <span>{ui.footer}</span>
          <button
            onClick={onBack}
            className="hover:text-brand-navy transition-colors font-semibold"
          >
            {ui.back}
          </button>
        </div>
      </div>
    </div>
  );
}
