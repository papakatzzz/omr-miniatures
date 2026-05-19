import { config, collection, fields } from '@keystatic/core';

const COLLECTIONS = [
  'augustus', 'basileus', 'caesares', 'dominus', 'epistrategus',
  'fexillarius', 'generalissimus', 'honestior', 'imperator', 'justiciarius', 'komes',
] as const;

const COUNTRIES = [
  'united-kingdom', 'russian-empire', 'france', 'german-empire', 'austro-hungary',
  'netherlands', 'italy', 'ottoman-state', 'spain', 'portugal', 'sweden-norway',
  'belgium', 'bavaria', 'romania', 'saxony', 'baden', 'bulgaria', 'serbia',
  'greece', 'denmark', 'wurttemberg', 'montenegro', 'luxembourg', 'order-of-malta',
] as const;

export default config({
  storage: {
    kind: 'local',
  },

  collections: {
    figurines: collection({
      label: 'Figurines',
      slugField: 'nameEn',
      path: 'src/content/figurines/*',
      format: { data: 'json' },
      schema: {
        nameEn: fields.slug({ name: { label: 'Name (EN)' } }),
        nameEs: fields.text({ label: 'Name (ES)', validation: { isRequired: false } }),
        nameIt: fields.text({ label: 'Name (IT)', validation: { isRequired: false } }),
        collection: fields.select({
          label: 'Collection',
          options: COLLECTIONS.map(c => ({ label: c.charAt(0).toUpperCase() + c.slice(1), value: c })),
          defaultValue: 'augustus',
        }),
        countries: fields.multiselect({
          label: 'Countries',
          options: COUNTRIES.map(c => ({
            label: c.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            value: c,
          })),
        }),
        descriptionEn: fields.text({ label: 'Description (EN)', multiline: true, validation: { isRequired: false } }),
        descriptionEs: fields.text({ label: 'Description (ES)', multiline: true, validation: { isRequired: false } }),
        descriptionIt: fields.text({ label: 'Description (IT)', multiline: true, validation: { isRequired: false } }),
        images: fields.array(
          fields.image({ label: 'Image', directory: 'public/figurines' }),
          { label: 'Images', itemLabel: props => props.value ?? 'Image' },
        ),
        videoUrl: fields.url({ label: 'Video URL (YouTube / Vimeo)', validation: { isRequired: false } }),
        available: fields.checkbox({ label: 'Available for order', defaultValue: true }),
        featured: fields.checkbox({ label: 'Featured on homepage', defaultValue: false }),
        year: fields.integer({ label: 'Year created', validation: { isRequired: false } }),
      },
    }),
  },
});
