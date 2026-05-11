interface Props {
  onBack: () => void;
}

export default function PrivacyPage({ onBack }: Props) {
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
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: May 6, 2026</p>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">1. Overview</h2>
            <p>
              SkillCheck takes your privacy seriously, especially given the sensitive nature of mental
              health data. This policy explains what information we collect, how it is stored, and how it
              is used.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">2. What We Collect</h2>
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
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">3. How Your Data Is Stored</h2>
            <p>
              Your diary entries are stored in a secure database provided by{' '}
              <strong>Supabase</strong>, hosted on infrastructure that encrypts data at rest and in
              transit. Row-Level Security (RLS) policies ensure that <strong>only you</strong> can
              read or modify your own entries — even at the database level, your data is scoped to your
              account.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">4. Who Can Access Your Data</h2>
            <p>
              Your diary data is private by design. Access is restricted to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                <strong>You</strong> — via your authenticated account.
              </li>
              <li>
                <strong>Database administrators</strong> — only in the event of a technical emergency
                (e.g., data recovery), and only to the minimum extent necessary.
              </li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell, share, rent, or otherwise disclose your personal or
              health data to third parties for any commercial purpose.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">5. Sensitive Health Information</h2>
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
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">6. Data Retention &amp; Deletion</h2>
            <p>
              Your data is retained as long as your account is active. You may request deletion of your
              account and all associated diary entries at any time by contacting us at the email below.
              We will process deletion requests within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">7. Cookies &amp; Local Storage</h2>
            <p>
              SkillCheck uses your browser's <strong>localStorage</strong> only to remember your
              language preference. We do not use cookies for advertising or cross-site tracking.
              Authentication sessions are managed securely by Supabase.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-brand-navy mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy to reflect changes in our practices or for other
              operational, legal, or regulatory reasons. We will update the "Last updated" date at the
              top of this page when changes are made.
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
