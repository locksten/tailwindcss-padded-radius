const tailwindcss = require("tailwindcss");
const postcss = require("postcss");
const cssMatcher = require("jest-matcher-css");
const paddedRadiusPlugin = require("./index.js");

expect.extend({
  toMatchCss: cssMatcher,
});

const generatePluginCss = (
  { variant = true, pluginConfig = {} } = {
    variant,
    pluginConfig,
  }
) => {
  return postcss(
    tailwindcss({
      theme: {
        borderRadius: {
          sm: "0.125rem",
          lg: "0.5rem",
        },
        spacing: {
          px: "1px",
          "0": "0",
          "1": "0.25rem",
          "2": "0.5rem",
          "3": "0.75rem",
        },
        extend: { paddedRadius: pluginConfig },
      },
      corePlugins: ["borderRadius"],
      plugins: [paddedRadiusPlugin],
      variants: {
        borderRadius: variant ? ["paddedRadius"] : [],
      },
    })
  )
    .process("@tailwind utilities", {
      from: undefined,
    })
    .then((result) => {
      return result.css;
    });
};

it("generates nothing by default", () => {
  return generatePluginCss({
    variant: false,
  }).then((css) => {
    expect(css).toMatchCss(`
    .rounded-sm {
        border-radius: 0.125rem
      }
  
      .rounded-lg {
        border-radius: 0.5rem
      }
  
      .rounded-t-sm {
        border-top-left-radius: 0.125rem;
        border-top-right-radius: 0.125rem
      }
  
      .rounded-r-sm {
        border-top-right-radius: 0.125rem;
        border-bottom-right-radius: 0.125rem
      }
  
      .rounded-b-sm {
        border-bottom-right-radius: 0.125rem;
        border-bottom-left-radius: 0.125rem
      }
  
      .rounded-l-sm {
        border-top-left-radius: 0.125rem;
        border-bottom-left-radius: 0.125rem
      }
  
      .rounded-t-lg {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem
      }
  
      .rounded-r-lg {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem
      }
  
      .rounded-b-lg {
        border-bottom-right-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem
      }
  
      .rounded-l-lg {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem
      }
  
      .rounded-tl-sm {
        border-top-left-radius: 0.125rem
      }
  
      .rounded-tr-sm {
        border-top-right-radius: 0.125rem
      }
  
      .rounded-br-sm {
        border-bottom-right-radius: 0.125rem
      }
  
      .rounded-bl-sm {
        border-bottom-left-radius: 0.125rem
      }
  
      .rounded-tl-lg {
        border-top-left-radius: 0.5rem
      }
  
      .rounded-tr-lg {
        border-top-right-radius: 0.5rem
      }
  
      .rounded-br-lg {
        border-bottom-right-radius: 0.5rem
      }
  
      .rounded-bl-lg {
        border-bottom-left-radius: 0.5rem
      }
      `);
  });
});

it("respects numberOfSpacings", () => {
  return generatePluginCss({ pluginConfig: { numberOfSpacings: 3 } }).then(
    (css) => {
      expect(css).toMatchCss(`
      .rounded-sm {
        border-radius: 0.125rem
      }
  
      .rounded-lg {
        border-radius: 0.5rem
      }
  
      .rounded-t-sm {
        border-top-left-radius: 0.125rem;
        border-top-right-radius: 0.125rem
      }
  
      .rounded-r-sm {
        border-top-right-radius: 0.125rem;
        border-bottom-right-radius: 0.125rem
      }
  
      .rounded-b-sm {
        border-bottom-right-radius: 0.125rem;
        border-bottom-left-radius: 0.125rem
      }
  
      .rounded-l-sm {
        border-top-left-radius: 0.125rem;
        border-bottom-left-radius: 0.125rem
      }
  
      .rounded-t-lg {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem
      }
  
      .rounded-r-lg {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem
      }
  
      .rounded-b-lg {
        border-bottom-right-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem
      }
  
      .rounded-l-lg {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem
      }
  
      .rounded-tl-sm {
        border-top-left-radius: 0.125rem
      }
  
      .rounded-tr-sm {
        border-top-right-radius: 0.125rem
      }
  
      .rounded-br-sm {
        border-bottom-right-radius: 0.125rem
      }
  
      .rounded-bl-sm {
        border-bottom-left-radius: 0.125rem
      }
  
      .rounded-tl-lg {
        border-top-left-radius: 0.5rem
      }
  
      .rounded-tr-lg {
        border-top-right-radius: 0.5rem
      }
  
      .rounded-br-lg {
        border-bottom-right-radius: 0.5rem
      }
  
      .rounded-bl-lg {
        border-bottom-left-radius: 0.5rem
      }
  
      .rounded-bl-lg-3 {
        border-bottom-left-radius: calc(0.5rem + 3 * 0.25rem)
      }
  
      .rounded-bl-lg-2 {
        border-bottom-left-radius: calc(0.5rem + 2 * 0.25rem)
      }
  
      .rounded-bl-lg-1 {
        border-bottom-left-radius: calc(0.5rem + 1 * 0.25rem)
      }
  
      .rounded-br-lg-3 {
        border-bottom-right-radius: calc(0.5rem + 3 * 0.25rem)
      }
  
      .rounded-br-lg-2 {
        border-bottom-right-radius: calc(0.5rem + 2 * 0.25rem)
      }
  
      .rounded-br-lg-1 {
        border-bottom-right-radius: calc(0.5rem + 1 * 0.25rem)
      }
  
      .rounded-tr-lg-3 {
        border-top-right-radius: calc(0.5rem + 3 * 0.25rem)
      }
  
      .rounded-tr-lg-2 {
        border-top-right-radius: calc(0.5rem + 2 * 0.25rem)
      }
  
      .rounded-tr-lg-1 {
        border-top-right-radius: calc(0.5rem + 1 * 0.25rem)
      }
  
      .rounded-tl-lg-3 {
        border-top-left-radius: calc(0.5rem + 3 * 0.25rem)
      }
  
      .rounded-tl-lg-2 {
        border-top-left-radius: calc(0.5rem + 2 * 0.25rem)
      }
  
      .rounded-tl-lg-1 {
        border-top-left-radius: calc(0.5rem + 1 * 0.25rem)
      }
  
      .rounded-bl-sm-3 {
        border-bottom-left-radius: calc(0.125rem + 3 * 0.25rem)
      }
  
      .rounded-bl-sm-2 {
        border-bottom-left-radius: calc(0.125rem + 2 * 0.25rem)
      }
  
      .rounded-bl-sm-1 {
        border-bottom-left-radius: calc(0.125rem + 1 * 0.25rem)
      }
  
      .rounded-br-sm-3 {
        border-bottom-right-radius: calc(0.125rem + 3 * 0.25rem)
      }
  
      .rounded-br-sm-2 {
        border-bottom-right-radius: calc(0.125rem + 2 * 0.25rem)
      }
  
      .rounded-br-sm-1 {
        border-bottom-right-radius: calc(0.125rem + 1 * 0.25rem)
      }
  
      .rounded-tr-sm-3 {
        border-top-right-radius: calc(0.125rem + 3 * 0.25rem)
      }
  
      .rounded-tr-sm-2 {
        border-top-right-radius: calc(0.125rem + 2 * 0.25rem)
      }
  
      .rounded-tr-sm-1 {
        border-top-right-radius: calc(0.125rem + 1 * 0.25rem)
      }
  
      .rounded-tl-sm-3 {
        border-top-left-radius: calc(0.125rem + 3 * 0.25rem)
      }
  
      .rounded-tl-sm-2 {
        border-top-left-radius: calc(0.125rem + 2 * 0.25rem)
      }
  
      .rounded-tl-sm-1 {
        border-top-left-radius: calc(0.125rem + 1 * 0.25rem)
      }
  
      .rounded-l-lg-3 {
        border-top-left-radius: calc(0.5rem + 3 * 0.25rem);
        border-bottom-left-radius: calc(0.5rem + 3 * 0.25rem)
      }
  
      .rounded-l-lg-2 {
        border-top-left-radius: calc(0.5rem + 2 * 0.25rem);
        border-bottom-left-radius: calc(0.5rem + 2 * 0.25rem)
      }
  
      .rounded-l-lg-1 {
        border-top-left-radius: calc(0.5rem + 1 * 0.25rem);
        border-bottom-left-radius: calc(0.5rem + 1 * 0.25rem)
      }
  
      .rounded-b-lg-3 {
        border-bottom-right-radius: calc(0.5rem + 3 * 0.25rem);
        border-bottom-left-radius: calc(0.5rem + 3 * 0.25rem)
      }
  
      .rounded-b-lg-2 {
        border-bottom-right-radius: calc(0.5rem + 2 * 0.25rem);
        border-bottom-left-radius: calc(0.5rem + 2 * 0.25rem)
      }
  
      .rounded-b-lg-1 {
        border-bottom-right-radius: calc(0.5rem + 1 * 0.25rem);
        border-bottom-left-radius: calc(0.5rem + 1 * 0.25rem)
      }
  
      .rounded-r-lg-3 {
        border-top-right-radius: calc(0.5rem + 3 * 0.25rem);
        border-bottom-right-radius: calc(0.5rem + 3 * 0.25rem)
      }
  
      .rounded-r-lg-2 {
        border-top-right-radius: calc(0.5rem + 2 * 0.25rem);
        border-bottom-right-radius: calc(0.5rem + 2 * 0.25rem)
      }
  
      .rounded-r-lg-1 {
        border-top-right-radius: calc(0.5rem + 1 * 0.25rem);
        border-bottom-right-radius: calc(0.5rem + 1 * 0.25rem)
      }
  
      .rounded-t-lg-3 {
        border-top-left-radius: calc(0.5rem + 3 * 0.25rem);
        border-top-right-radius: calc(0.5rem + 3 * 0.25rem)
      }
  
      .rounded-t-lg-2 {
        border-top-left-radius: calc(0.5rem + 2 * 0.25rem);
        border-top-right-radius: calc(0.5rem + 2 * 0.25rem)
      }
  
      .rounded-t-lg-1 {
        border-top-left-radius: calc(0.5rem + 1 * 0.25rem);
        border-top-right-radius: calc(0.5rem + 1 * 0.25rem)
      }
  
      .rounded-l-sm-3 {
        border-top-left-radius: calc(0.125rem + 3 * 0.25rem);
        border-bottom-left-radius: calc(0.125rem + 3 * 0.25rem)
      }
  
      .rounded-l-sm-2 {
        border-top-left-radius: calc(0.125rem + 2 * 0.25rem);
        border-bottom-left-radius: calc(0.125rem + 2 * 0.25rem)
      }
  
      .rounded-l-sm-1 {
        border-top-left-radius: calc(0.125rem + 1 * 0.25rem);
        border-bottom-left-radius: calc(0.125rem + 1 * 0.25rem)
      }
  
      .rounded-b-sm-3 {
        border-bottom-right-radius: calc(0.125rem + 3 * 0.25rem);
        border-bottom-left-radius: calc(0.125rem + 3 * 0.25rem)
      }
  
      .rounded-b-sm-2 {
        border-bottom-right-radius: calc(0.125rem + 2 * 0.25rem);
        border-bottom-left-radius: calc(0.125rem + 2 * 0.25rem)
      }
  
      .rounded-b-sm-1 {
        border-bottom-right-radius: calc(0.125rem + 1 * 0.25rem);
        border-bottom-left-radius: calc(0.125rem + 1 * 0.25rem)
      }
  
      .rounded-r-sm-3 {
        border-top-right-radius: calc(0.125rem + 3 * 0.25rem);
        border-bottom-right-radius: calc(0.125rem + 3 * 0.25rem)
      }
  
      .rounded-r-sm-2 {
        border-top-right-radius: calc(0.125rem + 2 * 0.25rem);
        border-bottom-right-radius: calc(0.125rem + 2 * 0.25rem)
      }
  
      .rounded-r-sm-1 {
        border-top-right-radius: calc(0.125rem + 1 * 0.25rem);
        border-bottom-right-radius: calc(0.125rem + 1 * 0.25rem)
      }
  
      .rounded-t-sm-3 {
        border-top-left-radius: calc(0.125rem + 3 * 0.25rem);
        border-top-right-radius: calc(0.125rem + 3 * 0.25rem)
      }
  
      .rounded-t-sm-2 {
        border-top-left-radius: calc(0.125rem + 2 * 0.25rem);
        border-top-right-radius: calc(0.125rem + 2 * 0.25rem)
      }
  
      .rounded-t-sm-1 {
        border-top-left-radius: calc(0.125rem + 1 * 0.25rem);
        border-top-right-radius: calc(0.125rem + 1 * 0.25rem)
      }
  
      .rounded-lg-3 {
        border-radius: calc(0.5rem + 3 * 0.25rem)
      }
  
      .rounded-lg-2 {
        border-radius: calc(0.5rem + 2 * 0.25rem)
      }
  
      .rounded-lg-1 {
        border-radius: calc(0.5rem + 1 * 0.25rem)
      }
  
      .rounded-sm-3 {
        border-radius: calc(0.125rem + 3 * 0.25rem)
      }
  
      .rounded-sm-2 {
        border-radius: calc(0.125rem + 2 * 0.25rem)
      }
  
      .rounded-sm-1 {
        border-radius: calc(0.125rem + 1 * 0.25rem)
      }
  
      .rounded-sm {
        border-radius: 0.125rem
      }
  
      .rounded-lg {
        border-radius: 0.5rem
      }
  
      .rounded-t-sm {
        border-top-left-radius: 0.125rem;
        border-top-right-radius: 0.125rem
      }
  
      .rounded-r-sm {
        border-top-right-radius: 0.125rem;
        border-bottom-right-radius: 0.125rem
      }
  
      .rounded-b-sm {
        border-bottom-right-radius: 0.125rem;
        border-bottom-left-radius: 0.125rem
      }
  
      .rounded-l-sm {
        border-top-left-radius: 0.125rem;
        border-bottom-left-radius: 0.125rem
      }
  
      .rounded-t-lg {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem
      }
  
      .rounded-r-lg {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem
      }
  
      .rounded-b-lg {
        border-bottom-right-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem
      }
  
      .rounded-l-lg {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem
      }
  
      .rounded-tl-sm {
        border-top-left-radius: 0.125rem
      }
  
      .rounded-tr-sm {
        border-top-right-radius: 0.125rem
      }
  
      .rounded-br-sm {
        border-bottom-right-radius: 0.125rem
      }
  
      .rounded-bl-sm {
        border-bottom-left-radius: 0.125rem
      }
  
      .rounded-tl-lg {
        border-top-left-radius: 0.5rem
      }
  
      .rounded-tr-lg {
        border-top-right-radius: 0.5rem
      }
  
      .rounded-br-lg {
        border-bottom-right-radius: 0.5rem
      }
  
      .rounded-bl-lg {
        border-bottom-left-radius: 0.5rem
      }
`);
    }
  );
});

it("respects baseSpacing", () => {
  return generatePluginCss({
    pluginConfig: { numberOfSpacings: 3, baseSpacing: "1em" },
  }).then((css) => {
    expect(css).toMatchCss(`
    .rounded-sm {
      border-radius: 0.125rem
    }

    .rounded-lg {
      border-radius: 0.5rem
    }

    .rounded-t-sm {
      border-top-left-radius: 0.125rem;
      border-top-right-radius: 0.125rem
    }

    .rounded-r-sm {
      border-top-right-radius: 0.125rem;
      border-bottom-right-radius: 0.125rem
    }

    .rounded-b-sm {
      border-bottom-right-radius: 0.125rem;
      border-bottom-left-radius: 0.125rem
    }

    .rounded-l-sm {
      border-top-left-radius: 0.125rem;
      border-bottom-left-radius: 0.125rem
    }

    .rounded-t-lg {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem
    }

    .rounded-r-lg {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem
    }

    .rounded-b-lg {
      border-bottom-right-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem
    }

    .rounded-l-lg {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem
    }

    .rounded-tl-sm {
      border-top-left-radius: 0.125rem
    }

    .rounded-tr-sm {
      border-top-right-radius: 0.125rem
    }

    .rounded-br-sm {
      border-bottom-right-radius: 0.125rem
    }

    .rounded-bl-sm {
      border-bottom-left-radius: 0.125rem
    }

    .rounded-tl-lg {
      border-top-left-radius: 0.5rem
    }

    .rounded-tr-lg {
      border-top-right-radius: 0.5rem
    }

    .rounded-br-lg {
      border-bottom-right-radius: 0.5rem
    }

    .rounded-bl-lg {
      border-bottom-left-radius: 0.5rem
    }

    .rounded-bl-lg-3 {
      border-bottom-left-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-bl-lg-2 {
      border-bottom-left-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-bl-lg-1 {
      border-bottom-left-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-br-lg-3 {
      border-bottom-right-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-br-lg-2 {
      border-bottom-right-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-br-lg-1 {
      border-bottom-right-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-tr-lg-3 {
      border-top-right-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-tr-lg-2 {
      border-top-right-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-tr-lg-1 {
      border-top-right-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-tl-lg-3 {
      border-top-left-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-tl-lg-2 {
      border-top-left-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-tl-lg-1 {
      border-top-left-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-bl-sm-3 {
      border-bottom-left-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-bl-sm-2 {
      border-bottom-left-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-bl-sm-1 {
      border-bottom-left-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-br-sm-3 {
      border-bottom-right-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-br-sm-2 {
      border-bottom-right-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-br-sm-1 {
      border-bottom-right-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-tr-sm-3 {
      border-top-right-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-tr-sm-2 {
      border-top-right-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-tr-sm-1 {
      border-top-right-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-tl-sm-3 {
      border-top-left-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-tl-sm-2 {
      border-top-left-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-tl-sm-1 {
      border-top-left-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-l-lg-3 {
      border-top-left-radius: calc(0.5rem + 3 * 1em);
      border-bottom-left-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-l-lg-2 {
      border-top-left-radius: calc(0.5rem + 2 * 1em);
      border-bottom-left-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-l-lg-1 {
      border-top-left-radius: calc(0.5rem + 1 * 1em);
      border-bottom-left-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-b-lg-3 {
      border-bottom-right-radius: calc(0.5rem + 3 * 1em);
      border-bottom-left-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-b-lg-2 {
      border-bottom-right-radius: calc(0.5rem + 2 * 1em);
      border-bottom-left-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-b-lg-1 {
      border-bottom-right-radius: calc(0.5rem + 1 * 1em);
      border-bottom-left-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-r-lg-3 {
      border-top-right-radius: calc(0.5rem + 3 * 1em);
      border-bottom-right-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-r-lg-2 {
      border-top-right-radius: calc(0.5rem + 2 * 1em);
      border-bottom-right-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-r-lg-1 {
      border-top-right-radius: calc(0.5rem + 1 * 1em);
      border-bottom-right-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-t-lg-3 {
      border-top-left-radius: calc(0.5rem + 3 * 1em);
      border-top-right-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-t-lg-2 {
      border-top-left-radius: calc(0.5rem + 2 * 1em);
      border-top-right-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-t-lg-1 {
      border-top-left-radius: calc(0.5rem + 1 * 1em);
      border-top-right-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-l-sm-3 {
      border-top-left-radius: calc(0.125rem + 3 * 1em);
      border-bottom-left-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-l-sm-2 {
      border-top-left-radius: calc(0.125rem + 2 * 1em);
      border-bottom-left-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-l-sm-1 {
      border-top-left-radius: calc(0.125rem + 1 * 1em);
      border-bottom-left-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-b-sm-3 {
      border-bottom-right-radius: calc(0.125rem + 3 * 1em);
      border-bottom-left-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-b-sm-2 {
      border-bottom-right-radius: calc(0.125rem + 2 * 1em);
      border-bottom-left-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-b-sm-1 {
      border-bottom-right-radius: calc(0.125rem + 1 * 1em);
      border-bottom-left-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-r-sm-3 {
      border-top-right-radius: calc(0.125rem + 3 * 1em);
      border-bottom-right-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-r-sm-2 {
      border-top-right-radius: calc(0.125rem + 2 * 1em);
      border-bottom-right-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-r-sm-1 {
      border-top-right-radius: calc(0.125rem + 1 * 1em);
      border-bottom-right-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-t-sm-3 {
      border-top-left-radius: calc(0.125rem + 3 * 1em);
      border-top-right-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-t-sm-2 {
      border-top-left-radius: calc(0.125rem + 2 * 1em);
      border-top-right-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-t-sm-1 {
      border-top-left-radius: calc(0.125rem + 1 * 1em);
      border-top-right-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-lg-3 {
      border-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-lg-2 {
      border-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-lg-1 {
      border-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-sm-3 {
      border-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-sm-2 {
      border-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-sm-1 {
      border-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-sm {
      border-radius: 0.125rem
    }

    .rounded-lg {
      border-radius: 0.5rem
    }

    .rounded-t-sm {
      border-top-left-radius: 0.125rem;
      border-top-right-radius: 0.125rem
    }

    .rounded-r-sm {
      border-top-right-radius: 0.125rem;
      border-bottom-right-radius: 0.125rem
    }

    .rounded-b-sm {
      border-bottom-right-radius: 0.125rem;
      border-bottom-left-radius: 0.125rem
    }

    .rounded-l-sm {
      border-top-left-radius: 0.125rem;
      border-bottom-left-radius: 0.125rem
    }

    .rounded-t-lg {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem
    }

    .rounded-r-lg {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem
    }

    .rounded-b-lg {
      border-bottom-right-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem
    }

    .rounded-l-lg {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem
    }

    .rounded-tl-sm {
      border-top-left-radius: 0.125rem
    }

    .rounded-tr-sm {
      border-top-right-radius: 0.125rem
    }

    .rounded-br-sm {
      border-bottom-right-radius: 0.125rem
    }

    .rounded-bl-sm {
      border-bottom-left-radius: 0.125rem
    }

    .rounded-tl-lg {
      border-top-left-radius: 0.5rem
    }

    .rounded-tr-lg {
      border-top-right-radius: 0.5rem
    }

    .rounded-br-lg {
      border-bottom-right-radius: 0.5rem
    }

    .rounded-bl-lg {
      border-bottom-left-radius: 0.5rem
    }
    `);
  });
});

it("respects generateNegative", () => {
  return generatePluginCss({
    pluginConfig: {
      numberOfSpacings: 3,
      baseSpacing: "1em",
      generateNegative: true,
    },
  }).then((css) => {
    expect(css).toMatchCss(`
    .rounded-sm {
      border-radius: 0.125rem
    }

    .rounded-lg {
      border-radius: 0.5rem
    }

    .rounded-t-sm {
      border-top-left-radius: 0.125rem;
      border-top-right-radius: 0.125rem
    }

    .rounded-r-sm {
      border-top-right-radius: 0.125rem;
      border-bottom-right-radius: 0.125rem
    }

    .rounded-b-sm {
      border-bottom-right-radius: 0.125rem;
      border-bottom-left-radius: 0.125rem
    }

    .rounded-l-sm {
      border-top-left-radius: 0.125rem;
      border-bottom-left-radius: 0.125rem
    }

    .rounded-t-lg {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem
    }

    .rounded-r-lg {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem
    }

    .rounded-b-lg {
      border-bottom-right-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem
    }

    .rounded-l-lg {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem
    }

    .rounded-tl-sm {
      border-top-left-radius: 0.125rem
    }

    .rounded-tr-sm {
      border-top-right-radius: 0.125rem
    }

    .rounded-br-sm {
      border-bottom-right-radius: 0.125rem
    }

    .rounded-bl-sm {
      border-bottom-left-radius: 0.125rem
    }

    .rounded-tl-lg {
      border-top-left-radius: 0.5rem
    }

    .rounded-tr-lg {
      border-top-right-radius: 0.5rem
    }

    .rounded-br-lg {
      border-bottom-right-radius: 0.5rem
    }

    .rounded-bl-lg {
      border-bottom-left-radius: 0.5rem
    }

    .rounded-bl-lg--3 {
      border-bottom-left-radius: calc(0.5rem - 3 * 1em)
    }

    .rounded-bl-lg-3 {
      border-bottom-left-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-bl-lg--2 {
      border-bottom-left-radius: calc(0.5rem - 2 * 1em)
    }

    .rounded-bl-lg-2 {
      border-bottom-left-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-bl-lg--1 {
      border-bottom-left-radius: calc(0.5rem - 1 * 1em)
    }

    .rounded-bl-lg-1 {
      border-bottom-left-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-br-lg--3 {
      border-bottom-right-radius: calc(0.5rem - 3 * 1em)
    }

    .rounded-br-lg-3 {
      border-bottom-right-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-br-lg--2 {
      border-bottom-right-radius: calc(0.5rem - 2 * 1em)
    }

    .rounded-br-lg-2 {
      border-bottom-right-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-br-lg--1 {
      border-bottom-right-radius: calc(0.5rem - 1 * 1em)
    }

    .rounded-br-lg-1 {
      border-bottom-right-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-tr-lg--3 {
      border-top-right-radius: calc(0.5rem - 3 * 1em)
    }

    .rounded-tr-lg-3 {
      border-top-right-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-tr-lg--2 {
      border-top-right-radius: calc(0.5rem - 2 * 1em)
    }

    .rounded-tr-lg-2 {
      border-top-right-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-tr-lg--1 {
      border-top-right-radius: calc(0.5rem - 1 * 1em)
    }

    .rounded-tr-lg-1 {
      border-top-right-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-tl-lg--3 {
      border-top-left-radius: calc(0.5rem - 3 * 1em)
    }

    .rounded-tl-lg-3 {
      border-top-left-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-tl-lg--2 {
      border-top-left-radius: calc(0.5rem - 2 * 1em)
    }

    .rounded-tl-lg-2 {
      border-top-left-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-tl-lg--1 {
      border-top-left-radius: calc(0.5rem - 1 * 1em)
    }

    .rounded-tl-lg-1 {
      border-top-left-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-bl-sm--3 {
      border-bottom-left-radius: calc(0.125rem - 3 * 1em)
    }

    .rounded-bl-sm-3 {
      border-bottom-left-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-bl-sm--2 {
      border-bottom-left-radius: calc(0.125rem - 2 * 1em)
    }

    .rounded-bl-sm-2 {
      border-bottom-left-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-bl-sm--1 {
      border-bottom-left-radius: calc(0.125rem - 1 * 1em)
    }

    .rounded-bl-sm-1 {
      border-bottom-left-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-br-sm--3 {
      border-bottom-right-radius: calc(0.125rem - 3 * 1em)
    }

    .rounded-br-sm-3 {
      border-bottom-right-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-br-sm--2 {
      border-bottom-right-radius: calc(0.125rem - 2 * 1em)
    }

    .rounded-br-sm-2 {
      border-bottom-right-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-br-sm--1 {
      border-bottom-right-radius: calc(0.125rem - 1 * 1em)
    }

    .rounded-br-sm-1 {
      border-bottom-right-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-tr-sm--3 {
      border-top-right-radius: calc(0.125rem - 3 * 1em)
    }

    .rounded-tr-sm-3 {
      border-top-right-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-tr-sm--2 {
      border-top-right-radius: calc(0.125rem - 2 * 1em)
    }

    .rounded-tr-sm-2 {
      border-top-right-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-tr-sm--1 {
      border-top-right-radius: calc(0.125rem - 1 * 1em)
    }

    .rounded-tr-sm-1 {
      border-top-right-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-tl-sm--3 {
      border-top-left-radius: calc(0.125rem - 3 * 1em)
    }

    .rounded-tl-sm-3 {
      border-top-left-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-tl-sm--2 {
      border-top-left-radius: calc(0.125rem - 2 * 1em)
    }

    .rounded-tl-sm-2 {
      border-top-left-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-tl-sm--1 {
      border-top-left-radius: calc(0.125rem - 1 * 1em)
    }

    .rounded-tl-sm-1 {
      border-top-left-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-l-lg--3 {
      border-top-left-radius: calc(0.5rem - 3 * 1em);
      border-bottom-left-radius: calc(0.5rem - 3 * 1em)
    }

    .rounded-l-lg-3 {
      border-top-left-radius: calc(0.5rem + 3 * 1em);
      border-bottom-left-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-l-lg--2 {
      border-top-left-radius: calc(0.5rem - 2 * 1em);
      border-bottom-left-radius: calc(0.5rem - 2 * 1em)
    }

    .rounded-l-lg-2 {
      border-top-left-radius: calc(0.5rem + 2 * 1em);
      border-bottom-left-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-l-lg--1 {
      border-top-left-radius: calc(0.5rem - 1 * 1em);
      border-bottom-left-radius: calc(0.5rem - 1 * 1em)
    }

    .rounded-l-lg-1 {
      border-top-left-radius: calc(0.5rem + 1 * 1em);
      border-bottom-left-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-b-lg--3 {
      border-bottom-right-radius: calc(0.5rem - 3 * 1em);
      border-bottom-left-radius: calc(0.5rem - 3 * 1em)
    }

    .rounded-b-lg-3 {
      border-bottom-right-radius: calc(0.5rem + 3 * 1em);
      border-bottom-left-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-b-lg--2 {
      border-bottom-right-radius: calc(0.5rem - 2 * 1em);
      border-bottom-left-radius: calc(0.5rem - 2 * 1em)
    }

    .rounded-b-lg-2 {
      border-bottom-right-radius: calc(0.5rem + 2 * 1em);
      border-bottom-left-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-b-lg--1 {
      border-bottom-right-radius: calc(0.5rem - 1 * 1em);
      border-bottom-left-radius: calc(0.5rem - 1 * 1em)
    }

    .rounded-b-lg-1 {
      border-bottom-right-radius: calc(0.5rem + 1 * 1em);
      border-bottom-left-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-r-lg--3 {
      border-top-right-radius: calc(0.5rem - 3 * 1em);
      border-bottom-right-radius: calc(0.5rem - 3 * 1em)
    }

    .rounded-r-lg-3 {
      border-top-right-radius: calc(0.5rem + 3 * 1em);
      border-bottom-right-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-r-lg--2 {
      border-top-right-radius: calc(0.5rem - 2 * 1em);
      border-bottom-right-radius: calc(0.5rem - 2 * 1em)
    }

    .rounded-r-lg-2 {
      border-top-right-radius: calc(0.5rem + 2 * 1em);
      border-bottom-right-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-r-lg--1 {
      border-top-right-radius: calc(0.5rem - 1 * 1em);
      border-bottom-right-radius: calc(0.5rem - 1 * 1em)
    }

    .rounded-r-lg-1 {
      border-top-right-radius: calc(0.5rem + 1 * 1em);
      border-bottom-right-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-t-lg--3 {
      border-top-left-radius: calc(0.5rem - 3 * 1em);
      border-top-right-radius: calc(0.5rem - 3 * 1em)
    }

    .rounded-t-lg-3 {
      border-top-left-radius: calc(0.5rem + 3 * 1em);
      border-top-right-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-t-lg--2 {
      border-top-left-radius: calc(0.5rem - 2 * 1em);
      border-top-right-radius: calc(0.5rem - 2 * 1em)
    }

    .rounded-t-lg-2 {
      border-top-left-radius: calc(0.5rem + 2 * 1em);
      border-top-right-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-t-lg--1 {
      border-top-left-radius: calc(0.5rem - 1 * 1em);
      border-top-right-radius: calc(0.5rem - 1 * 1em)
    }

    .rounded-t-lg-1 {
      border-top-left-radius: calc(0.5rem + 1 * 1em);
      border-top-right-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-l-sm--3 {
      border-top-left-radius: calc(0.125rem - 3 * 1em);
      border-bottom-left-radius: calc(0.125rem - 3 * 1em)
    }

    .rounded-l-sm-3 {
      border-top-left-radius: calc(0.125rem + 3 * 1em);
      border-bottom-left-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-l-sm--2 {
      border-top-left-radius: calc(0.125rem - 2 * 1em);
      border-bottom-left-radius: calc(0.125rem - 2 * 1em)
    }

    .rounded-l-sm-2 {
      border-top-left-radius: calc(0.125rem + 2 * 1em);
      border-bottom-left-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-l-sm--1 {
      border-top-left-radius: calc(0.125rem - 1 * 1em);
      border-bottom-left-radius: calc(0.125rem - 1 * 1em)
    }

    .rounded-l-sm-1 {
      border-top-left-radius: calc(0.125rem + 1 * 1em);
      border-bottom-left-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-b-sm--3 {
      border-bottom-right-radius: calc(0.125rem - 3 * 1em);
      border-bottom-left-radius: calc(0.125rem - 3 * 1em)
    }

    .rounded-b-sm-3 {
      border-bottom-right-radius: calc(0.125rem + 3 * 1em);
      border-bottom-left-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-b-sm--2 {
      border-bottom-right-radius: calc(0.125rem - 2 * 1em);
      border-bottom-left-radius: calc(0.125rem - 2 * 1em)
    }

    .rounded-b-sm-2 {
      border-bottom-right-radius: calc(0.125rem + 2 * 1em);
      border-bottom-left-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-b-sm--1 {
      border-bottom-right-radius: calc(0.125rem - 1 * 1em);
      border-bottom-left-radius: calc(0.125rem - 1 * 1em)
    }

    .rounded-b-sm-1 {
      border-bottom-right-radius: calc(0.125rem + 1 * 1em);
      border-bottom-left-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-r-sm--3 {
      border-top-right-radius: calc(0.125rem - 3 * 1em);
      border-bottom-right-radius: calc(0.125rem - 3 * 1em)
    }

    .rounded-r-sm-3 {
      border-top-right-radius: calc(0.125rem + 3 * 1em);
      border-bottom-right-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-r-sm--2 {
      border-top-right-radius: calc(0.125rem - 2 * 1em);
      border-bottom-right-radius: calc(0.125rem - 2 * 1em)
    }

    .rounded-r-sm-2 {
      border-top-right-radius: calc(0.125rem + 2 * 1em);
      border-bottom-right-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-r-sm--1 {
      border-top-right-radius: calc(0.125rem - 1 * 1em);
      border-bottom-right-radius: calc(0.125rem - 1 * 1em)
    }

    .rounded-r-sm-1 {
      border-top-right-radius: calc(0.125rem + 1 * 1em);
      border-bottom-right-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-t-sm--3 {
      border-top-left-radius: calc(0.125rem - 3 * 1em);
      border-top-right-radius: calc(0.125rem - 3 * 1em)
    }

    .rounded-t-sm-3 {
      border-top-left-radius: calc(0.125rem + 3 * 1em);
      border-top-right-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-t-sm--2 {
      border-top-left-radius: calc(0.125rem - 2 * 1em);
      border-top-right-radius: calc(0.125rem - 2 * 1em)
    }

    .rounded-t-sm-2 {
      border-top-left-radius: calc(0.125rem + 2 * 1em);
      border-top-right-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-t-sm--1 {
      border-top-left-radius: calc(0.125rem - 1 * 1em);
      border-top-right-radius: calc(0.125rem - 1 * 1em)
    }

    .rounded-t-sm-1 {
      border-top-left-radius: calc(0.125rem + 1 * 1em);
      border-top-right-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-lg--3 {
      border-radius: calc(0.5rem - 3 * 1em)
    }

    .rounded-lg-3 {
      border-radius: calc(0.5rem + 3 * 1em)
    }

    .rounded-lg--2 {
      border-radius: calc(0.5rem - 2 * 1em)
    }

    .rounded-lg-2 {
      border-radius: calc(0.5rem + 2 * 1em)
    }

    .rounded-lg--1 {
      border-radius: calc(0.5rem - 1 * 1em)
    }

    .rounded-lg-1 {
      border-radius: calc(0.5rem + 1 * 1em)
    }

    .rounded-sm--3 {
      border-radius: calc(0.125rem - 3 * 1em)
    }

    .rounded-sm-3 {
      border-radius: calc(0.125rem + 3 * 1em)
    }

    .rounded-sm--2 {
      border-radius: calc(0.125rem - 2 * 1em)
    }

    .rounded-sm-2 {
      border-radius: calc(0.125rem + 2 * 1em)
    }

    .rounded-sm--1 {
      border-radius: calc(0.125rem - 1 * 1em)
    }

    .rounded-sm-1 {
      border-radius: calc(0.125rem + 1 * 1em)
    }

    .rounded-sm {
      border-radius: 0.125rem
    }

    .rounded-lg {
      border-radius: 0.5rem
    }

    .rounded-t-sm {
      border-top-left-radius: 0.125rem;
      border-top-right-radius: 0.125rem
    }

    .rounded-r-sm {
      border-top-right-radius: 0.125rem;
      border-bottom-right-radius: 0.125rem
    }

    .rounded-b-sm {
      border-bottom-right-radius: 0.125rem;
      border-bottom-left-radius: 0.125rem
    }

    .rounded-l-sm {
      border-top-left-radius: 0.125rem;
      border-bottom-left-radius: 0.125rem
    }

    .rounded-t-lg {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem
    }

    .rounded-r-lg {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem
    }

    .rounded-b-lg {
      border-bottom-right-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem
    }

    .rounded-l-lg {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem
    }

    .rounded-tl-sm {
      border-top-left-radius: 0.125rem
    }

    .rounded-tr-sm {
      border-top-right-radius: 0.125rem
    }

    .rounded-br-sm {
      border-bottom-right-radius: 0.125rem
    }

    .rounded-bl-sm {
      border-bottom-left-radius: 0.125rem
    }

    .rounded-tl-lg {
      border-top-left-radius: 0.5rem
    }

    .rounded-tr-lg {
      border-top-right-radius: 0.5rem
    }

    .rounded-br-lg {
      border-bottom-right-radius: 0.5rem
    }

    .rounded-bl-lg {
      border-bottom-left-radius: 0.5rem
    }
    `);
  });
});

it("respects spacings", () => {
  return generatePluginCss({
    pluginConfig: {
      spacings: { S: "1em", L: "2em" },
    },
  }).then((css) => {
    expect(css).toMatchCss(`
    .rounded-sm {
      border-radius: 0.125rem
    }

    .rounded-lg {
      border-radius: 0.5rem
    }

    .rounded-t-sm {
      border-top-left-radius: 0.125rem;
      border-top-right-radius: 0.125rem
    }

    .rounded-r-sm {
      border-top-right-radius: 0.125rem;
      border-bottom-right-radius: 0.125rem
    }

    .rounded-b-sm {
      border-bottom-right-radius: 0.125rem;
      border-bottom-left-radius: 0.125rem
    }

    .rounded-l-sm {
      border-top-left-radius: 0.125rem;
      border-bottom-left-radius: 0.125rem
    }

    .rounded-t-lg {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem
    }

    .rounded-r-lg {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem
    }

    .rounded-b-lg {
      border-bottom-right-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem
    }

    .rounded-l-lg {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem
    }

    .rounded-tl-sm {
      border-top-left-radius: 0.125rem
    }

    .rounded-tr-sm {
      border-top-right-radius: 0.125rem
    }

    .rounded-br-sm {
      border-bottom-right-radius: 0.125rem
    }

    .rounded-bl-sm {
      border-bottom-left-radius: 0.125rem
    }

    .rounded-tl-lg {
      border-top-left-radius: 0.5rem
    }

    .rounded-tr-lg {
      border-top-right-radius: 0.5rem
    }

    .rounded-br-lg {
      border-bottom-right-radius: 0.5rem
    }

    .rounded-bl-lg {
      border-bottom-left-radius: 0.5rem
    }

    .rounded-bl-lg-L {
      border-bottom-left-radius: calc(0.5rem + 2em)
    }

    .rounded-bl-lg-S {
      border-bottom-left-radius: calc(0.5rem + 1em)
    }

    .rounded-br-lg-L {
      border-bottom-right-radius: calc(0.5rem + 2em)
    }

    .rounded-br-lg-S {
      border-bottom-right-radius: calc(0.5rem + 1em)
    }

    .rounded-tr-lg-L {
      border-top-right-radius: calc(0.5rem + 2em)
    }

    .rounded-tr-lg-S {
      border-top-right-radius: calc(0.5rem + 1em)
    }

    .rounded-tl-lg-L {
      border-top-left-radius: calc(0.5rem + 2em)
    }

    .rounded-tl-lg-S {
      border-top-left-radius: calc(0.5rem + 1em)
    }

    .rounded-bl-sm-L {
      border-bottom-left-radius: calc(0.125rem + 2em)
    }

    .rounded-bl-sm-S {
      border-bottom-left-radius: calc(0.125rem + 1em)
    }

    .rounded-br-sm-L {
      border-bottom-right-radius: calc(0.125rem + 2em)
    }

    .rounded-br-sm-S {
      border-bottom-right-radius: calc(0.125rem + 1em)
    }

    .rounded-tr-sm-L {
      border-top-right-radius: calc(0.125rem + 2em)
    }

    .rounded-tr-sm-S {
      border-top-right-radius: calc(0.125rem + 1em)
    }

    .rounded-tl-sm-L {
      border-top-left-radius: calc(0.125rem + 2em)
    }

    .rounded-tl-sm-S {
      border-top-left-radius: calc(0.125rem + 1em)
    }

    .rounded-l-lg-L {
      border-top-left-radius: calc(0.5rem + 2em);
      border-bottom-left-radius: calc(0.5rem + 2em)
    }

    .rounded-l-lg-S {
      border-top-left-radius: calc(0.5rem + 1em);
      border-bottom-left-radius: calc(0.5rem + 1em)
    }

    .rounded-b-lg-L {
      border-bottom-right-radius: calc(0.5rem + 2em);
      border-bottom-left-radius: calc(0.5rem + 2em)
    }

    .rounded-b-lg-S {
      border-bottom-right-radius: calc(0.5rem + 1em);
      border-bottom-left-radius: calc(0.5rem + 1em)
    }

    .rounded-r-lg-L {
      border-top-right-radius: calc(0.5rem + 2em);
      border-bottom-right-radius: calc(0.5rem + 2em)
    }

    .rounded-r-lg-S {
      border-top-right-radius: calc(0.5rem + 1em);
      border-bottom-right-radius: calc(0.5rem + 1em)
    }

    .rounded-t-lg-L {
      border-top-left-radius: calc(0.5rem + 2em);
      border-top-right-radius: calc(0.5rem + 2em)
    }

    .rounded-t-lg-S {
      border-top-left-radius: calc(0.5rem + 1em);
      border-top-right-radius: calc(0.5rem + 1em)
    }

    .rounded-l-sm-L {
      border-top-left-radius: calc(0.125rem + 2em);
      border-bottom-left-radius: calc(0.125rem + 2em)
    }

    .rounded-l-sm-S {
      border-top-left-radius: calc(0.125rem + 1em);
      border-bottom-left-radius: calc(0.125rem + 1em)
    }

    .rounded-b-sm-L {
      border-bottom-right-radius: calc(0.125rem + 2em);
      border-bottom-left-radius: calc(0.125rem + 2em)
    }

    .rounded-b-sm-S {
      border-bottom-right-radius: calc(0.125rem + 1em);
      border-bottom-left-radius: calc(0.125rem + 1em)
    }

    .rounded-r-sm-L {
      border-top-right-radius: calc(0.125rem + 2em);
      border-bottom-right-radius: calc(0.125rem + 2em)
    }

    .rounded-r-sm-S {
      border-top-right-radius: calc(0.125rem + 1em);
      border-bottom-right-radius: calc(0.125rem + 1em)
    }

    .rounded-t-sm-L {
      border-top-left-radius: calc(0.125rem + 2em);
      border-top-right-radius: calc(0.125rem + 2em)
    }

    .rounded-t-sm-S {
      border-top-left-radius: calc(0.125rem + 1em);
      border-top-right-radius: calc(0.125rem + 1em)
    }

    .rounded-lg-L {
      border-radius: calc(0.5rem + 2em)
    }

    .rounded-lg-S {
      border-radius: calc(0.5rem + 1em)
    }

    .rounded-sm-L {
      border-radius: calc(0.125rem + 2em)
    }

    .rounded-sm-S {
      border-radius: calc(0.125rem + 1em)
    }

    .rounded-sm {
      border-radius: 0.125rem
    }

    .rounded-lg {
      border-radius: 0.5rem
    }

    .rounded-t-sm {
      border-top-left-radius: 0.125rem;
      border-top-right-radius: 0.125rem
    }

    .rounded-r-sm {
      border-top-right-radius: 0.125rem;
      border-bottom-right-radius: 0.125rem
    }

    .rounded-b-sm {
      border-bottom-right-radius: 0.125rem;
      border-bottom-left-radius: 0.125rem
    }

    .rounded-l-sm {
      border-top-left-radius: 0.125rem;
      border-bottom-left-radius: 0.125rem
    }

    .rounded-t-lg {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem
    }

    .rounded-r-lg {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem
    }

    .rounded-b-lg {
      border-bottom-right-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem
    }

    .rounded-l-lg {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem
    }

    .rounded-tl-sm {
      border-top-left-radius: 0.125rem
    }

    .rounded-tr-sm {
      border-top-right-radius: 0.125rem
    }

    .rounded-br-sm {
      border-bottom-right-radius: 0.125rem
    }

    .rounded-bl-sm {
      border-bottom-left-radius: 0.125rem
    }

    .rounded-tl-lg {
      border-top-left-radius: 0.5rem
    }

    .rounded-tr-lg {
      border-top-right-radius: 0.5rem
    }

    .rounded-br-lg {
      border-bottom-right-radius: 0.5rem
    }

    .rounded-bl-lg {
      border-bottom-left-radius: 0.5rem
    }
    `);
  });
});
