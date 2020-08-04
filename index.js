const plugin = require("tailwindcss/plugin");

module.exports = plugin(
  function ({ e, theme, addVariant }) {
    const {
      numberOfSpacings,
      baseSpacing,
      generateNegative,
      spacings: configSpacings,
    } = theme("paddedRadius");

    const spacings =
      configSpacings ??
      [...Array(numberOfSpacings).keys()].reduce((obj, spacing, idx) => {
        obj[idx + 1] = `${spacing + 1} * ${baseSpacing}`;
        return obj;
      }, {});

    const generate = (container, rule, name, spacing, negative) => {
      const newRule = rule.clone();
      newRule.selector = `.${e(
        `${rule.selector.slice(1)}-${negative ? "-" : ""}${name}`
      )}`;
      newRule.walkDecls((decl) => {
        decl.value = `calc(${decl.value} ${negative ? "-" : "+"} ${spacing})`;
      });
      container.prepend(newRule);
    };

    addVariant("paddedRadius", ({ container }) => {
      container.walkRules((rule) => {
        Object.entries(spacings).map(([name, spacing]) => {
          generate(container, rule, name, spacing, false);
          generateNegative && generate(container, rule, name, spacing, true);
        });
      });
    });
  },
  {
    theme: {
      paddedRadius: (theme) => ({
        baseSpacing: theme("spacing")["1"],
        numberOfSpacings: 64,
        spacings: undefined,
        generateNegative: false,
      }),
    },
  }
);
