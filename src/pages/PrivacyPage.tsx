import { useState } from 'react';
import type { Lang } from '../types';

interface Props {
  onBack: () => void;
}

const CONTENT = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: May 6, 2026',
    back: '← Back',
    langSwitch: 'ES',
    footer: 'SkillCheck · Personal DBT Diary Card',
    sections: [
      {
        heading: '1. Overview',
        body: (
          <p>
            SkillCheck takes your privacy seriously, especially given the sensitive nature of mental
            health data. This policy explains what information we collect, how it is stored, and how it
            is used.
          </p>
        ),
      },
      {
        heading: '2. What We Collect',
        body: (
          <>
            <p className="mb-3">When you use SkillCheck, we collect the following:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Account information:</strong> Your email address and an encrypted password, used
                solely for authentication.
              </li>
              <li>
                <strong>Diary entries:</strong> Daily logs including behavior responses, thoughts,
                emotion intensity ratings, DBT skills practiced, and free-text notes.
              </li>
              <li>
                <strong>Preferences:</strong> Your selected language (English or Spanish), stored locally
                in your browser.
              </li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> collect device identifiers, IP addresses for tracking, analytics
              data, or any information beyond what is necessary to run the app.
            </p>
          </>
        ),
      },
      {
        heading: '3. How Your Data Is Stored',
        body: (
          <p>
            Your diary entries are stored in a secure database provided by{' '}
            <strong>Supabase</strong>, hosted on infrastructure that encrypts data at rest and in
            transit. Row-Level Security (RLS) policies ensure that <strong>only you</strong> can
            read or modify your own entries — even at the database level, your data is scoped to your
            account.
          </p>
        ),
      },
      {
        heading: '4. Who Can Access Your Data',
        body: (
          <>
            <p>Your diary data is private by design. Access is restricted to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong>You</strong> — via your authenticated account.</li>
              <li>
                <strong>Database administrators</strong> — only in the event of a technical emergency
                (e.g., data recovery), and only to the minimum extent necessary.
              </li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell, share, rent, or otherwise disclose your personal or
              health data to third parties for any commercial purpose.
            </p>
          </>
        ),
      },
      {
        heading: '5. Sensitive Health Information',
        body: (
          <div className="bg-brand-sage-light border border-brand-sage-dark/30 rounded-xl p-4 text-brand-navy/80">
            <p>
              SkillCheck stores mental health-related data including mood, behaviors, and personal
              notes. This information is sensitive. We recommend:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Using a strong, unique password for your account.</li>
              <li>Logging out when using a shared device.</li>
              <li>Exporting and downloading PDF backups periodically.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '6. Data Retention & Deletion',
        body: (
          <p>
            Your data is retained as long as your account is active. You may request deletion of your
            account and all associated diary entries at any time by contacting us at the email below.
            We will process deletion requests within 30 days.
          </p>
        ),
      },
      {
        heading: '7. Cookies & Local Storage',
        body: (
          <p>
            SkillCheck uses your browser's <strong>localStorage</strong> only to remember your
            language preference. We do not use cookies for advertising or cross-site tracking.
            Authentication sessions are managed securely by Supabase.
          </p>
        ),
      },
      {
        heading: '8. Changes to This Policy',
        body: (
          <p>
            We may update this Privacy Policy to reflect changes in our practices or for other
            operational, legal, or regulatory reasons. We will update the "Last updated" date at the
            top of this page when changes are made.
          </p>
        ),
      },
    ],
  },
  es: {
    title: 'Política de Privacidad',
    updated: 'Última actualización: 6 de mayo de 2026',
    back: '← Volver',
    langSwitch: 'EN',
    footer: 'SkillCheck · Tarjeta diaria de DBT',
    sections: [
      {
        heading: '1. Descripción General',
        body: (
          <p>
            SkillCheck toma tu privacidad muy en serio, especialmente dada la naturaleza sensible de los
            datos de salud mental. Esta política explica qué información recopilamos, cómo se almacena y
            cómo se utiliza.
          </p>
        ),
      },
      {
        heading: '2. Qué Recopilamos',
        body: (
          <>
            <p className="mb-3">Cuando usas SkillCheck, recopilamos lo siguiente:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Información de cuenta:</strong> Tu dirección de correo electrónico y una
                contraseña encriptada, utilizadas únicamente para la autenticación.
              </li>
              <li>
                <strong>Entradas del diario:</strong> Registros diarios que incluyen respuestas de
                conducta, pensamientos, calificaciones de intensidad emocional, habilidades de DBT
                practicadas y notas de texto libre.
              </li>
              <li>
                <strong>Preferencias:</strong> Tu idioma seleccionado (inglés o español), almacenado
                localmente en tu navegador.
              </li>
            </ul>
            <p className="mt-3">
              <strong>No</strong> recopilamos identificadores de dispositivo, direcciones IP para
              seguimiento, datos de análisis, ni ninguna información más allá de lo necesario para
              ejecutar la aplicación.
            </p>
          </>
        ),
      },
      {
        heading: '3. Cómo Se Almacenan tus Datos',
        body: (
          <p>
            Tus entradas del diario se almacenan en una base de datos segura proporcionada por{' '}
            <strong>Supabase</strong>, alojada en infraestructura que encripta los datos en reposo y
            en tránsito. Las políticas de Seguridad a Nivel de Fila (RLS) garantizan que{' '}
            <strong>solo tú</strong> puedas leer o modificar tus propias entradas — incluso a nivel de
            base de datos, tus datos están vinculados a tu cuenta.
          </p>
        ),
      },
      {
        heading: '4. Quién Puede Acceder a tus Datos',
        body: (
          <>
            <p>Tus datos del diario son privados por diseño. El acceso está restringido a:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong>Tú</strong> — a través de tu cuenta autenticada.</li>
              <li>
                <strong>Administradores de base de datos</strong> — solo en caso de emergencia técnica
                (por ejemplo, recuperación de datos), y solo en la medida mínima necesaria.
              </li>
            </ul>
            <p className="mt-3">
              <strong>No</strong> vendemos, compartimos, alquilamos ni divulgamos de ninguna otra forma
              tus datos personales o de salud a terceros para ningún propósito comercial.
            </p>
          </>
        ),
      },
      {
        heading: '5. Información de Salud Sensible',
        body: (
          <div className="bg-brand-sage-light border border-brand-sage-dark/30 rounded-xl p-4 text-brand-navy/80">
            <p>
              SkillCheck almacena datos relacionados con la salud mental, incluyendo estado de ánimo,
              conductas y notas personales. Esta información es sensible. Recomendamos:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Usar una contraseña segura y única para tu cuenta.</li>
              <li>Cerrar sesión cuando uses un dispositivo compartido.</li>
              <li>Exportar y descargar copias de seguridad en PDF periódicamente.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '6. Retención y Eliminación de Datos',
        body: (
          <p>
            Tus datos se conservan mientras tu cuenta esté activa. Puedes solicitar la eliminación de
            tu cuenta y todas las entradas del diario asociadas en cualquier momento contactándonos al
            correo indicado a continuación. Procesaremos las solicitudes de eliminación en un plazo de
            30 días.
          </p>
        ),
      },
      {
        heading: '7. Cookies y Almacenamiento Local',
        body: (
          <p>
            SkillCheck usa el <strong>localStorage</strong> de tu navegador únicamente para recordar
            tu preferencia de idioma. No utilizamos cookies para publicidad ni seguimiento entre sitios.
            Las sesiones de autenticación son gestionadas de forma segura por Supabase.
          </p>
        ),
      },
      {
        heading: '8. Cambios en esta Política',
        body: (
          <p>
            Podemos actualizar esta Política de Privacidad para reflejar cambios en nuestras prácticas
            o por otras razones operativas, legales o regulatorias. Actualizaremos la fecha de "última
            actualización" en la parte superior de esta página cuando se realicen cambios.
          </p>
        ),
      },
    ],
  },
};

export default function PrivacyPage({ onBack }: Props) {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem('skillcheck-lang') as Lang) || 'en'
  );

  const c = CONTENT[lang];

  const toggleLang = () => {
    const next: Lang = lang === 'en' ? 'es' : 'en';
    setLang(next);
    localStorage.setItem('skillcheck-lang', next);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <div className="max-w-[680px] mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-brand-navy text-sm font-semibold transition-colors"
          >
            {c.back}
          </button>
          <button
            onClick={toggleLang}
            className="border border-brand-navy/20 text-brand-navy hover:bg-brand-navy/5 rounded-full font-bold text-[13px] px-3 py-1.5 transition-colors"
          >
            {c.langSwitch}
          </button>
        </div>

        <h1 className="font-display font-bold text-[32px] text-brand-navy tracking-tight mb-2">
          {c.title}
        </h1>
        <p className="text-muted-foreground text-sm mb-10">{c.updated}</p>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          {c.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display font-bold text-lg text-brand-navy mb-3">{section.heading}</h2>
              {section.body}
            </section>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
          <span>{c.footer}</span>
          <button
            onClick={onBack}
            className="hover:text-brand-navy transition-colors font-semibold"
          >
            {c.back}
          </button>
        </div>
      </div>
    </div>
  );
}
