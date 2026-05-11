interface Props {
  onBack: () => void;
}

export default function TermsPage({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-background font-body">
      <div className="max-w-[680px] mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-brand-navy text-sm font-semibold transition-colors"
        >
          ← Back
        </button>

        <h1 className="font-display font-bold text-[32px] text-brand-navy tracking-tight mb-2">
          Terms of Service
        </h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: May 6, 2026</p>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">1. About SkillCheck</h2>
            <p>
              SkillCheck is a personal digital diary card tool designed to support Dialectical Behavior
              Therapy (DBT) skill tracking. It allows you to log daily behaviors, thoughts, emotions, and
              DBT skills practiced.
            </p>
            <p className="mt-3">
              SkillCheck is <strong>not</strong> a medical device, a mental health service, or a substitute
              for professional clinical care. It is a personal journaling aid only.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">2. Eligibility</h2>
            <p>
              By using SkillCheck, you confirm that you are at least 13 years of age. If you are under 18,
              you should use this app only with the knowledge and consent of a parent or guardian.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">3. Not a Crisis Service</h2>
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
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">4. Your Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Keep your account credentials secure and do not share them.</li>
              <li>Use SkillCheck only for lawful, personal purposes.</li>
              <li>Do not attempt to access, modify, or interfere with another user's data.</li>
              <li>You are responsible for the accuracy of the information you enter.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">5. No Warranties</h2>
            <p>
              SkillCheck is provided <strong>"as is"</strong> without warranties of any kind. We do not
              guarantee uninterrupted access, data preservation, or fitness for any particular purpose.
              Always maintain your own backups of important records using the PDF export feature.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, SkillCheck and its developers shall not be liable for
              any indirect, incidental, special, or consequential damages arising from your use of, or
              inability to use, the app.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">7. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Continued use of SkillCheck after
              changes are posted constitutes your acceptance of the revised terms.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
          <span>SkillCheck · Personal DBT Diary Card</span>
          <button
            onClick={onBack}
            className="hover:text-brand-navy transition-colors font-semibold"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
