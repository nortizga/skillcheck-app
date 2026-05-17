import { useState } from 'react';
import type { Lang } from '../types';

interface Props {
  onBack: () => void;
}

const CONTENT = {
  en: {
    title: 'Terms of Service',
    updated: 'Last updated: May 6, 2026',
    back: '← Back',
    langSwitch: 'ES',
    footer: 'SkillCheck · Personal DBT Diary Card',
    sections: [
      {
        heading: '1. About SkillCheck',
        body: (
          <>
            <p>
              SkillCheck is a personal digital diary card tool designed to support Dialectical Behavior
              Therapy (DBT) skill tracking. It allows you to log daily behaviors, thoughts, emotions, and
              DBT skills practiced.
            </p>
            <p className="mt-3">
              SkillCheck is <strong>not</strong> a medical device, a mental health service, or a substitute
              for professional clinical care. It is a personal journaling aid only.
            </p>
          </>
        ),
      },
      {
        heading: '2. Eligibility',
        body: (
          <p>
            By using SkillCheck, you confirm that you are at least 13 years of age. If you are under 18,
            you should use this app only with the knowledge and consent of a parent or guardian.
          </p>
        ),
      },
      {
        heading: '3. Not a Crisis Service',
        body: (
          <div className="bg-brand-amber/15 border border-brand-amber/40 rounded-xl p-4 text-brand-amber-dark">
            <p className="font-semibold">
              SkillCheck is not a crisis intervention service. If you are in immediate danger or
              experiencing a mental health crisis, please contact emergency services or a crisis line:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>United States: <strong>988 Suicide &amp; Crisis Lifeline</strong> — call or text 988</li>
              <li>Crisis Text Line: text <strong>HOME</strong> to 741741</li>
              <li>Emergency services: <strong>911</strong></li>
            </ul>
          </div>
        ),
      },
      {
        heading: '4. Your Responsibilities',
        body: (
          <ul className="list-disc list-inside space-y-2">
            <li>Keep your account credentials secure and do not share them.</li>
            <li>Use SkillCheck only for lawful, personal purposes.</li>
            <li>Do not attempt to access, modify, or interfere with another user's data.</li>
            <li>You are responsible for the accuracy of the information you enter.</li>
          </ul>
        ),
      },
      {
        heading: '5. No Warranties',
        body: (
          <p>
            SkillCheck is provided <strong>"as is"</strong> without warranties of any kind. We do not
            guarantee uninterrupted access, data preservation, or fitness for any particular purpose.
            Always maintain your own backups of important records using the PDF export feature.
          </p>
        ),
      },
      {
        heading: '6. Limitation of Liability',
        body: (
          <p>
            To the fullest extent permitted by law, SkillCheck and its developers shall not be liable for
            any indirect, incidental, special, or consequential damages arising from your use of, or
            inability to use, the app.
          </p>
        ),
      },
      {
        heading: '7. Changes to These Terms',
        body: (
          <p>
            We may update these Terms of Service from time to time. Continued use of SkillCheck after
            changes are posted constitutes your acceptance of the revised terms.
          </p>
        ),
      },
    ],
  },
  es: {
    title: 'Términos de Servicio',
    updated: 'Última actualización: 6 de mayo de 2026',
    back: '← Volver',
    langSwitch: 'EN',
    footer: 'SkillCheck · Tarjeta diaria de DBT',
    sections: [
      {
        heading: '1. Acerca de SkillCheck',
        body: (
          <>
            <p>
              SkillCheck es una tarjeta de diario digital personal diseñada para apoyar el seguimiento de
              habilidades de la Terapia Dialéctica Conductual (DBT). Te permite registrar conductas,
              pensamientos, emociones y habilidades de DBT practicadas cada día.
            </p>
            <p className="mt-3">
              SkillCheck <strong>no</strong> es un dispositivo médico, un servicio de salud mental, ni un
              sustituto de la atención clínica profesional. Es únicamente una herramienta de diario personal.
            </p>
          </>
        ),
      },
      {
        heading: '2. Elegibilidad',
        body: (
          <p>
            Al usar SkillCheck, confirmas que tienes al menos 13 años de edad. Si eres menor de 18 años,
            debes usar esta aplicación únicamente con el conocimiento y consentimiento de un padre, madre
            o tutor legal.
          </p>
        ),
      },
      {
        heading: '3. No es un Servicio de Crisis',
        body: (
          <div className="bg-brand-amber/15 border border-brand-amber/40 rounded-xl p-4 text-brand-amber-dark">
            <p className="font-semibold">
              SkillCheck no es un servicio de intervención en crisis. Si estás en peligro inmediato o
              experimentas una crisis de salud mental, comunícate con los servicios de emergencia o una
              línea de crisis:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Estados Unidos: <strong>988 Suicide &amp; Crisis Lifeline</strong> — llama o envía texto al 988</li>
              <li>Puerto Rico: <strong>Línea PAS</strong> — lineapas.assmca.pr.gov</li>
              <li>Servicios de emergencia: <strong>911</strong></li>
            </ul>
          </div>
        ),
      },
      {
        heading: '4. Tus Responsabilidades',
        body: (
          <ul className="list-disc list-inside space-y-2">
            <li>Mantén tus credenciales de cuenta seguras y no las compartas.</li>
            <li>Usa SkillCheck únicamente para fines personales y legales.</li>
            <li>No intentes acceder, modificar ni interferir con los datos de otro usuario.</li>
            <li>Eres responsable de la exactitud de la información que ingresas.</li>
          </ul>
        ),
      },
      {
        heading: '5. Sin Garantías',
        body: (
          <p>
            SkillCheck se proporciona <strong>"tal como está"</strong> sin garantías de ningún tipo. No
            garantizamos acceso ininterrumpido, preservación de datos ni idoneidad para ningún propósito
            particular. Mantén siempre tus propias copias de seguridad de los registros importantes
            utilizando la función de exportación a PDF.
          </p>
        ),
      },
      {
        heading: '6. Limitación de Responsabilidad',
        body: (
          <p>
            En la máxima medida permitida por la ley, SkillCheck y sus desarrolladores no serán
            responsables de ningún daño indirecto, incidental, especial o consecuente que surja de tu
            uso, o imposibilidad de uso, de la aplicación.
          </p>
        ),
      },
      {
        heading: '7. Cambios en estos Términos',
        body: (
          <p>
            Podemos actualizar estos Términos de Servicio ocasionalmente. El uso continuado de SkillCheck
            después de que se publiquen los cambios constituye tu aceptación de los términos revisados.
          </p>
        ),
      },
    ],
  },
};

export default function TermsPage({ onBack }: Props) {
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
