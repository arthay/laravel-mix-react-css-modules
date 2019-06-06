function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var mix = _interopDefault(require('laravel-mix'));

var styleExtensionsRegex = [{
    regex: /\.css$/,
    moduleRegex: /\.module\.css$/
},{
    regex: /\.sass$/,
    moduleRegex: /\.module\.sass$/
},{
    regex: /\.scss$/,
    moduleRegex: /\.module\.scss$/
},{
    regex: /\.less$/,
    moduleRegex: /\.module\.less$/
}];
var ReactCSSModules = function ReactCSSModules() {
    this.scopedName = this.defaultScopedName();
};
ReactCSSModules.prototype.name = function name () {
    return "reactCSSModules";
};
ReactCSSModules.prototype.defaultScopedName = function defaultScopedName () {
    return "[name]__[local]___[hash:base64:5]";
};
ReactCSSModules.prototype.dependencies = function dependencies () {
    return ["babel-plugin-react-css-modules","postcss-scss","postcss-nested"];
};
ReactCSSModules.prototype.register = function register (scopedName) {
    if (scopedName) {
        this.scopedName = scopedName;
    }
};
ReactCSSModules.prototype.webpackConfig = function webpackConfig (config) {
        var this$1 = this;

    var newRules = [];
    var loop = function () {
        var rule = list[i];

            if (!rule.loaders) {
            return;
        }
        var newRule = Object.assign({}, rule);
        var regexIndex = styleExtensionsRegex.findIndex(function (styleExtensionRegex) { return String(styleExtensionRegex.regex) === String(rule.test); });
        if (regexIndex !== -1) {
            rule.exclude = rule.exclude && rule.exclude.constructor === Array ? rule.exclude.concat([styleExtensionsRegex[regexIndex].moduleRegex]) : styleExtensionsRegex[regexIndex].moduleRegex;
            newRule.test = styleExtensionsRegex[regexIndex].moduleRegex;
        } else {
            return;
        }
        newRule.loaders = newRule.loaders.map(function (loader) {
            if (loader.loader === "css-loader" || loader === "css-loader") {
                var options = {
                    modules: true,
                    localIdentName: this$1.scopedName
                };
                loader = typeof loader === "string" ? {
                    loader: loader
                } : Object.assign({}, loader);
                loader.options = loader.options ? Object.assign({}, loader.options, options) : options;
            }
            return loader;
        });
        newRules.push(newRule);
    };

        for (var i = 0, list = config.module.rules; i < list.length; i += 1) loop();
    config.module.rules = config.module.rules.concat( newRules);
    return config;
};
ReactCSSModules.prototype.babelConfig = function babelConfig () {
    return {
        plugins: [["react-css-modules",{
            filetypes: {
                ".scss": {
                    syntax: "postcss-scss",
                    plugins: ["postcss-nested"]
                }
            },
            exclude: "node_modules",
            handleMissingStyleName: "warn",
            generateScopedName: this.scopedName,
            context: path.resolve(__dirname + "/../../laravel-mix/src/builder")
        }]]
    };
};

mix.extend("reactCSSModules", new ReactCSSModules());
