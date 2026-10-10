{
    'name': 'Field Character / Word Counter',
    'version': '17.0.1.0.1',
    'category': 'Productivity',
    'author': 'Meisanqo',
    'support': 'meisanqo@outlook.com',
    'summary': "Character counter and word counter for any field: a live \"42 / 160 characters\" line under the input that turns red past the character limit. Two drop-in widgets, char_counter for Char fields and text_counter for Text fields, with an optional counter_max target and a characters or words counter type; a field's own size limit is used when no target is set. Made for SEO meta descriptions, SMS and email templates, and any field with a length limit. Purely visual: it never blocks typing or saving.",
    'description': """
Field Character / Word Counter
=================================

Two drop-in field widgets that add a small, live "42 / 160 characters"
counter under a field as you type — turns red past the limit.

Usage
-----

::

    <field name="website_meta_description" widget="char_counter"
           options="{'counter_max': 160}"/>

    <field name="description" widget="text_counter"
           options="{'counter_max': 500, 'counter_type': 'words'}"/>

- `char_counter` for single-line Char fields, `text_counter` for
  multi-line Text fields — both otherwise behave exactly like the
  standard widget (`widget="char"` / `widget="text"`), the counter is
  purely additive.
- `counter_max` (optional): the target length. If the field already has a
  native size limit (Char fields with a `size`), it's used automatically
  when `counter_max` isn't set.
- `counter_type` (optional): `characters` (default) or `words`.

No server-side code, no model changes — the counter never blocks typing
or saving, it's purely a visual guide.
""",
    'depends': ['web'],
    'images': ['static/description/banner.png'],
    'data': [],
    'assets': {
        'web.assets_backend': [
            'web_field_char_counter/static/src/**/*',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}
