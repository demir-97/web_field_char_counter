# Field Character / Word Counter

**A live "42 / 160 characters" counter under any field.**

Two drop-in field widgets that add a small, live counter under a field as
you type — turns red once you're past the limit. Handy for SEO meta
descriptions, tag lines, or any field with a soft length guideline that
Odoo doesn't enforce on its own.

## Usage

```xml
<field name="website_meta_description" widget="char_counter"
       options="{'counter_max': 160}"/>

<field name="description" widget="text_counter"
       options="{'counter_max': 500, 'counter_type': 'words'}"/>
```

- `char_counter` for single-line Char fields, `text_counter` for
  multi-line Text fields — both otherwise behave exactly like the
  standard widget, the counter is purely additive.
- `counter_max` (optional): the target length. If the field already has a
  native size limit (Char fields with a `size`), it's used automatically
  when `counter_max` isn't set.
- `counter_type` (optional): `characters` (default) or `words`.

The counter never blocks typing or saving — it's a visual guide only.

---
Author: Meisanqo — meisanqo@outlook.com
