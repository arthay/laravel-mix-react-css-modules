import path from 'path';
const styleExtensionsRegex = [
  {
    regex: /\.css$/,
    moduleRegex: /\.module\.css$/
  },
  {
    regex: /\.sass$/,
    moduleRegex: /\.module\.sass$/,
  },
  {
    regex: /\.scss$/,
    moduleRegex: /\.module\.scss$/,
  },
  {
    regex:/\.less$/,
    moduleRegex: /\.module\.less$/
  }
];

class ReactCSSModules {
  /**
   * Initialise the class
   *
   * @return {void}
   */
  constructor() {
    this.scopedName = this.defaultScopedName();
  }

  /**
   * The optional name to be used when called by Mix.
   * Defaults to the class name, lowercased.
   *
   * Ex: mix.example();
   *
   * @return {String|Array}
   */
  name() {
    return "reactCSSModules";
  }

  /**
   * Return the default scoped name value
   *
   * @return {string}
   */
  defaultScopedName() {
    return "[name]__[local]___[hash:base64:5]";
  }

  /**
   * All dependencies that should be installed by Mix.
   *
   * @return {Array}
   */
  dependencies() {
    return ["babel-plugin-react-css-modules", "postcss-scss", "postcss-nested"];
  }

  /**
   * Register the component.
   *
   * When your component is called, all user parameters
   * will be passed to this method.
   *
   * Ex: register(src, output) {}
   * Ex: mix.yourPlugin('src/path', 'output/path');
   *
   * @param  {*} ...params
   * @return {void}
   *
   */
  register(scopedName) {
    if (scopedName) {
      this.scopedName = scopedName;
    }
  }

  /**
   * Override the generated webpack configuration.
   *
   * @param  {Object} webpackConfig
   * @return {void}
   */
  webpackConfig(config) {
    // Loop through all rules
    const newRules = [];
    for (const rule of config.module.rules) {
      if (!rule.loaders) {
        continue
      }
        let newRule = Object.assign({}, rule);

      const regexIndex = styleExtensionsRegex.findIndex(styleExtensionRegex => String(styleExtensionRegex.regex) === String(rule.test));

      if(regexIndex !== -1) {
        rule.exclude = rule.exclude && rule.exclude.constructor === Array ? rule.exclude.concat( [styleExtensionsRegex[regexIndex].moduleRegex]) : styleExtensionsRegex[regexIndex].moduleRegex;
        newRule.test = styleExtensionsRegex[regexIndex].moduleRegex;
      } else {
          continue
      }

      // Loop through all loaders
      newRule.loaders = newRule.loaders.map(loader => {
        if (loader.loader === "css-loader" || loader === "css-loader") {
          // Add our options to the loader
          let options = {
            modules: true,
            localIdentName: this.scopedName
          };

          // Convert string syntax to object syntax if neccessary
          loader =
              typeof loader === "string"
                  ? {
                    loader
                  }
                  : Object.assign({}, loader);

          // Inject our options into the loader
          loader.options = loader.options
              ? Object.assign({}, loader.options, options)
              : options;
        }

        return loader;
      });

      newRules.push(newRule);
    }

    config.module.rules = [...config.module.rules, ...newRules];

    return config;
  }

  /**
   * Babel config to be merged with Mix's defaults.
   *
   * @return {Object}
   */
  babelConfig() {
    return {
      plugins: [
        [
          "react-css-modules",
          {
            filetypes: {
              ".scss": {
                syntax: "postcss-scss",
                plugins: ["postcss-nested"]
              }
            },
            exclude: "node_modules",
            handleMissingStyleName: "warn",
            generateScopedName: this.scopedName,
            // THIS IS DIRTY HACK
            // Appearantly the context for laravel-mix lives in the node_modules folder
            // when calculating hashes for the ident names. This is pretty shitty behaviour,
            // but I am too lazy right now to fix it.
            context: path.resolve(__dirname + "/../../laravel-mix/src/builder")
          }
        ]
      ]
    };
  }
}

export default ReactCSSModules;
