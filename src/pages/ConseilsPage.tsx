import { SectionTitle } from '../components/Badges';

export function ConseilsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionTitle description="Les sorties les plus confortables sont celles qui respectent l’autonomie, la météo, les côtes et la logistique de retour.">
        Conseils
      </SectionTitle>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          'L’autonomie réelle baisse avec le vent, les côtes et le poids transporté.',
          'Pars avec la batterie pleine et emporte ton chargeur si la sortie dépasse le simple aller-retour.',
          'Vérifie la compatibilité 220V avant de compter sur une borne publique.',
          'Ne laisse pas la trottinette sans surveillance pendant une recharge ou une pause.',
          'Prévois antivol, eau, casque et éclairage.',
          'Vérifie les fermetures de massifs en été avant les sorties nature.',
          'Pour les sorties longues, le duo train + trottinette reste souvent le plus simple.',
        ].map((item) => (
          <article key={item} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-base leading-7 text-slate-700">{item}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

