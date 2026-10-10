import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { t, useProps } from "@odoo/owl";
import { CharField, charField, charFieldProps } from "@web/views/fields/char/char_field";
import { TextField, textField, textFieldProps } from "@web/views/fields/text/text_field";

const counterSupportedOptions = [
    {
        label: _t("Counter max"),
        name: "counter_max",
        type: "number",
        help: _t("Target length shown as \"n / max\". Leave empty to just show the count."),
    },
    {
        label: _t("Counter type"),
        name: "counter_type",
        type: "string",
        help: _t("\"characters\" (default) or \"words\"."),
    },
];

function extractCounterProps(options) {
    return {
        counterMax: options.counter_max ? Number(options.counter_max) : undefined,
        counterType: options.counter_type === "words" ? "words" : "characters",
    };
}

// Odoo 20 replaced OWL's `static props = {...}` with an instance
// `props = useProps(schema)` built from the `t` type helpers, and core exports
// each field's schema (charFieldProps, textFieldProps) so an extension can
// spread it. The mixin therefore takes the base component's schema alongside
// the component itself; redeclaring `props` in the subclass is the pattern
// core's own derived fields use, the later class field simply wins.
export const CounterMixin = (Base, baseProps) =>
    class extends Base {
        props = useProps({
            ...baseProps,
            counterMax: t.number().optional(),
            counterType: t.string().optional(),
        });

        get counterValue() {
            const value = this.props.record.data[this.props.name] || "";
            if (this.props.counterType === "words") {
                const trimmed = value.trim();
                return trimmed ? trimmed.split(/\s+/).length : 0;
            }
            return value.length;
        }
        get counterMaxValue() {
            return this.props.counterMax || (typeof this.maxLength === "number" ? this.maxLength : 0);
        }
        get counterOverLimit() {
            return this.counterMaxValue > 0 && this.counterValue > this.counterMaxValue;
        }
        get counterLabel() {
            const unit = this.props.counterType === "words" ? _t("words") : _t("characters");
            return this.counterMaxValue
                ? `${this.counterValue} / ${this.counterMaxValue} ${unit}`
                : `${this.counterValue} ${unit}`;
        }
    };

export class CharCounterField extends CounterMixin(CharField, charFieldProps) {
    static template = "web_field_char_counter.CharCounterField";
}

registry.category("fields").add("char_counter", {
    ...charField,
    component: CharCounterField,
    displayName: _t("Char (with counter)"),
    supportedOptions: [...charField.supportedOptions, ...counterSupportedOptions],
    extractProps(staticInfo, dynamicInfo) {
        return {
            ...charField.extractProps(staticInfo, dynamicInfo),
            ...extractCounterProps(staticInfo.options),
        };
    },
});

export class TextCounterField extends CounterMixin(TextField, textFieldProps) {
    static template = "web_field_char_counter.TextCounterField";
    // Text fields have no native `size`/maxLength.
    get maxLength() {
        return 0;
    }
}

registry.category("fields").add("text_counter", {
    ...textField,
    component: TextCounterField,
    displayName: _t("Text (with counter)"),
    supportedOptions: [...textField.supportedOptions, ...counterSupportedOptions],
    extractProps(staticInfo, dynamicInfo) {
        return {
            ...textField.extractProps(staticInfo, dynamicInfo),
            ...extractCounterProps(staticInfo.options),
        };
    },
});
