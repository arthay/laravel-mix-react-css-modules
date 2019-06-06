(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('path'), require('laravel-mix')) :
	typeof define === 'function' && define.amd ? define(['path', 'laravel-mix'], factory) :
	(factory(global.path,global.mix));
}(this, (function (path,mix) {

path = path && path.hasOwnProperty('default') ? path['default'] : path;
mix = mix && mix.hasOwnProperty('default') ? mix['default'] : mix;

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



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlYWN0Q1NTTW9kdWxlcy5qcyhvcmlnaW5hbCkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxVQUFVO0FBQ2pCLEtBQUEsQ0FBTSx1QkFBdUIsQ0FDM0I7SUFDRSxPQUFPLFFBRFQsQ0FBQTtJQUVFLGFBQWE7RUFFZjtJQUNFLE9BQU8sU0FEVCxDQUFBO0lBRUUsYUFBYTtFQUVmO0lBQ0UsT0FBTyxTQURULENBQUE7SUFFRSxhQUFhO0VBRWY7SUFDRSxPQUFNLFNBRFIsQ0FBQTtJQUVFLGFBQWE7O0FBSWpCLE1BQU0sZ0JBQWdCO0lBTXBCLGNBQWM7UUFDWixJQUFBLENBQUssVUFBTCxDQUFBLENBQUEsQ0FBa0IsSUFBQSxDQUFLLGlCQUFMO0lBQ3RCO0lBVUUsT0FBTztRQUNMLE9BQU87SUFDWDtJQU9FLG9CQUFvQjtRQUNsQixPQUFPO0lBQ1g7SUFPRSxlQUFlO1FBQ2IsT0FBTyxDQUFDLGlDQUFrQyxlQUFnQjtJQUM5RDtJQWVFLFNBQVMsWUFBWTtRQUNuQixJQUFJLFlBQVk7WUFDZCxJQUFBLENBQUssVUFBTCxDQUFBLENBQUEsQ0FBa0I7UUFDeEI7SUFDQTtJQVFFLGNBQWMsUUFBUTtRQUVwQixLQUFBLENBQU0sV0FBVztRQUNqQixLQUFLLEtBQUEsQ0FBTSxRQUFRLE1BQUEsQ0FBTyxNQUFQLENBQWMsT0FBTztZQUN0QyxJQUFJLENBQUMsSUFBQSxDQUFLLFNBQVM7Z0JBQ2pCO1lBQ1I7WUFDUSxHQUFBLENBQUksVUFBVSxNQUFBLENBQU8sTUFBUCxDQUFjLElBQUk7WUFFbEMsS0FBQSxDQUFNLGFBQWEsb0JBQUEsQ0FBcUIsU0FBckIsQ0FBK0IsbUJBQUEsSUFBdUIsTUFBQSxDQUFPLG1CQUFBLENBQW9CLE1BQTNCLENBQUEsR0FBQSxDQUFzQyxNQUFBLENBQU8sSUFBQSxDQUFLO1lBRTNILElBQUcsVUFBQSxDQUFBLEdBQUEsQ0FBZSxDQUFDLEdBQUc7Z0JBQ3BCLElBQUEsQ0FBSyxPQUFMLENBQUEsQ0FBQSxDQUFlLElBQUEsQ0FBSyxPQUFMLENBQUEsRUFBQSxDQUFnQixJQUFBLENBQUssT0FBTCxDQUFhLFdBQWIsQ0FBQSxHQUFBLENBQTZCLEtBQTdDLEdBQXFELElBQUEsQ0FBSyxPQUFMLENBQWEsTUFBYixDQUFxQixDQUFDLG9CQUFBLENBQXFCLFdBQXJCLENBQWlDLGdCQUFnQixvQkFBQSxDQUFxQixXQUFyQixDQUFpQztnQkFDNUssT0FBQSxDQUFRLElBQVIsQ0FBQSxDQUFBLENBQWUsb0JBQUEsQ0FBcUIsV0FBckIsQ0FBaUM7WUFDeEQsT0FBYTtnQkFDSDtZQUNWO1lBR00sT0FBQSxDQUFRLE9BQVIsQ0FBQSxDQUFBLENBQWtCLE9BQUEsQ0FBUSxPQUFSLENBQWdCLEdBQWhCLENBQW9CLE1BQUEsSUFBVTtnQkFDOUMsSUFBSSxNQUFBLENBQU8sTUFBUCxDQUFBLEdBQUEsQ0FBa0IsWUFBbEIsQ0FBQSxFQUFBLENBQWtDLE1BQUEsQ0FBQSxHQUFBLENBQVcsY0FBYztvQkFFN0QsR0FBQSxDQUFJLFVBQVU7d0JBQ1osU0FBUyxJQURHLENBQUE7d0JBRVosZ0JBQWdCLElBQUEsQ0FBSzs7b0JBSXZCLE1BQUEsQ0FBQSxDQUFBLENBQ0ksTUFBQSxDQUFPLE1BQVAsQ0FBQSxHQUFBLENBQWtCLFFBQWxCLEdBQ007d0JBQ0E7d0JBRUEsTUFBQSxDQUFPLE1BQVAsQ0FBYyxJQUFJO29CQUc1QixNQUFBLENBQU8sT0FBUCxDQUFBLENBQUEsQ0FBaUIsTUFBQSxDQUFPLE9BQVAsR0FDWCxNQUFBLENBQU8sTUFBUCxDQUFjLElBQUksTUFBQSxDQUFPLFNBQVMsV0FDbEM7Z0JBQ2hCO2dCQUVRLE9BQU87WUFDZjtZQUVNLFFBQUEsQ0FBUyxJQUFULENBQWM7UUFDcEI7UUFFSSxNQUFBLENBQU8sTUFBUCxDQUFjLEtBQWQsQ0FBQSxDQUFBLENBQXNCLENBQUMsR0FBRyxNQUFBLENBQU8sTUFBUCxDQUFjLE1BQU8sR0FBRztRQUVsRCxPQUFPO0lBQ1g7SUFPRSxjQUFjO1FBQ1osT0FBTztZQUNMLFNBQVMsQ0FDUCxDQUNFLG9CQUNBO2dCQUNFLFdBQVc7b0JBQ1QsU0FBUzt3QkFDUCxRQUFRLGNBREQsQ0FBQTt3QkFFUCxTQUFTLENBQUM7O2lCQUpoQixDQUFBO2dCQU9FLFNBQVMsY0FQWCxDQUFBO2dCQVFFLHdCQUF3QixNQVIxQixDQUFBO2dCQVNFLG9CQUFvQixJQUFBLENBQUssVUFUM0IsQ0FBQTtnQkFjRSxTQUFTLElBQUEsQ0FBSyxPQUFMLENBQWEsU0FBQSxDQUFBLENBQUEsQ0FBWTs7O0lBSzlDO0FBQ0E7QUFFQSxlQUFlO0FBektmIiwiZmlsZSI6IlJlYWN0Q1NTTW9kdWxlcy5qcyhvcmlnaW5hbCkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmNvbnN0IHN0eWxlRXh0ZW5zaW9uc1JlZ2V4ID0gW1xuICB7XG4gICAgcmVnZXg6IC9cXC5jc3MkLyxcbiAgICBtb2R1bGVSZWdleDogL1xcLm1vZHVsZVxcLmNzcyQvXG4gIH0sXG4gIHtcbiAgICByZWdleDogL1xcLnNhc3MkLyxcbiAgICBtb2R1bGVSZWdleDogL1xcLm1vZHVsZVxcLnNhc3MkLyxcbiAgfSxcbiAge1xuICAgIHJlZ2V4OiAvXFwuc2NzcyQvLFxuICAgIG1vZHVsZVJlZ2V4OiAvXFwubW9kdWxlXFwuc2NzcyQvLFxuICB9LFxuICB7XG4gICAgcmVnZXg6L1xcLmxlc3MkLyxcbiAgICBtb2R1bGVSZWdleDogL1xcLm1vZHVsZVxcLmxlc3MkL1xuICB9XG5dO1xuXG5jbGFzcyBSZWFjdENTU01vZHVsZXMge1xuICAvKipcbiAgICogSW5pdGlhbGlzZSB0aGUgY2xhc3NcbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2NvcGVkTmFtZSA9IHRoaXMuZGVmYXVsdFNjb3BlZE5hbWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgb3B0aW9uYWwgbmFtZSB0byBiZSB1c2VkIHdoZW4gY2FsbGVkIGJ5IE1peC5cbiAgICogRGVmYXVsdHMgdG8gdGhlIGNsYXNzIG5hbWUsIGxvd2VyY2FzZWQuXG4gICAqXG4gICAqIEV4OiBtaXguZXhhbXBsZSgpO1xuICAgKlxuICAgKiBAcmV0dXJuIHtTdHJpbmd8QXJyYXl9XG4gICAqL1xuICBuYW1lKCkge1xuICAgIHJldHVybiBcInJlYWN0Q1NTTW9kdWxlc1wiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZGVmYXVsdCBzY29wZWQgbmFtZSB2YWx1ZVxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBkZWZhdWx0U2NvcGVkTmFtZSgpIHtcbiAgICByZXR1cm4gXCJbbmFtZV1fX1tsb2NhbF1fX19baGFzaDpiYXNlNjQ6NV1cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGwgZGVwZW5kZW5jaWVzIHRoYXQgc2hvdWxkIGJlIGluc3RhbGxlZCBieSBNaXguXG4gICAqXG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKi9cbiAgZGVwZW5kZW5jaWVzKCkge1xuICAgIHJldHVybiBbXCJiYWJlbC1wbHVnaW4tcmVhY3QtY3NzLW1vZHVsZXNcIiwgXCJwb3N0Y3NzLXNjc3NcIiwgXCJwb3N0Y3NzLW5lc3RlZFwiXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciB0aGUgY29tcG9uZW50LlxuICAgKlxuICAgKiBXaGVuIHlvdXIgY29tcG9uZW50IGlzIGNhbGxlZCwgYWxsIHVzZXIgcGFyYW1ldGVyc1xuICAgKiB3aWxsIGJlIHBhc3NlZCB0byB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogRXg6IHJlZ2lzdGVyKHNyYywgb3V0cHV0KSB7fVxuICAgKiBFeDogbWl4LnlvdXJQbHVnaW4oJ3NyYy9wYXRoJywgJ291dHB1dC9wYXRoJyk7XG4gICAqXG4gICAqIEBwYXJhbSAgeyp9IC4uLnBhcmFtc1xuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKlxuICAgKi9cbiAgcmVnaXN0ZXIoc2NvcGVkTmFtZSkge1xuICAgIGlmIChzY29wZWROYW1lKSB7XG4gICAgICB0aGlzLnNjb3BlZE5hbWUgPSBzY29wZWROYW1lO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSB0aGUgZ2VuZXJhdGVkIHdlYnBhY2sgY29uZmlndXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSB3ZWJwYWNrQ29uZmlnXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICB3ZWJwYWNrQ29uZmlnKGNvbmZpZykge1xuICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgcnVsZXNcbiAgICBjb25zdCBuZXdSdWxlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgcnVsZSBvZiBjb25maWcubW9kdWxlLnJ1bGVzKSB7XG4gICAgICBpZiAoIXJ1bGUubG9hZGVycykge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgICBsZXQgbmV3UnVsZSA9IE9iamVjdC5hc3NpZ24oe30sIHJ1bGUpO1xuXG4gICAgICBjb25zdCByZWdleEluZGV4ID0gc3R5bGVFeHRlbnNpb25zUmVnZXguZmluZEluZGV4KHN0eWxlRXh0ZW5zaW9uUmVnZXggPT4gU3RyaW5nKHN0eWxlRXh0ZW5zaW9uUmVnZXgucmVnZXgpID09PSBTdHJpbmcocnVsZS50ZXN0KSk7XG5cbiAgICAgIGlmKHJlZ2V4SW5kZXggIT09IC0xKSB7XG4gICAgICAgIHJ1bGUuZXhjbHVkZSA9IHJ1bGUuZXhjbHVkZSAmJiBydWxlLmV4Y2x1ZGUuY29uc3RydWN0b3IgPT09IEFycmF5ID8gcnVsZS5leGNsdWRlLmNvbmNhdCggW3N0eWxlRXh0ZW5zaW9uc1JlZ2V4W3JlZ2V4SW5kZXhdLm1vZHVsZVJlZ2V4XSkgOiBzdHlsZUV4dGVuc2lvbnNSZWdleFtyZWdleEluZGV4XS5tb2R1bGVSZWdleDtcbiAgICAgICAgbmV3UnVsZS50ZXN0ID0gc3R5bGVFeHRlbnNpb25zUmVnZXhbcmVnZXhJbmRleF0ubW9kdWxlUmVnZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgbG9hZGVyc1xuICAgICAgbmV3UnVsZS5sb2FkZXJzID0gbmV3UnVsZS5sb2FkZXJzLm1hcChsb2FkZXIgPT4ge1xuICAgICAgICBpZiAobG9hZGVyLmxvYWRlciA9PT0gXCJjc3MtbG9hZGVyXCIgfHwgbG9hZGVyID09PSBcImNzcy1sb2FkZXJcIikge1xuICAgICAgICAgIC8vIEFkZCBvdXIgb3B0aW9ucyB0byB0aGUgbG9hZGVyXG4gICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtb2R1bGVzOiB0cnVlLFxuICAgICAgICAgICAgbG9jYWxJZGVudE5hbWU6IHRoaXMuc2NvcGVkTmFtZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBDb252ZXJ0IHN0cmluZyBzeW50YXggdG8gb2JqZWN0IHN5bnRheCBpZiBuZWNjZXNzYXJ5XG4gICAgICAgICAgbG9hZGVyID1cbiAgICAgICAgICAgICAgdHlwZW9mIGxvYWRlciA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRlclxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgOiBPYmplY3QuYXNzaWduKHt9LCBsb2FkZXIpO1xuXG4gICAgICAgICAgLy8gSW5qZWN0IG91ciBvcHRpb25zIGludG8gdGhlIGxvYWRlclxuICAgICAgICAgIGxvYWRlci5vcHRpb25zID0gbG9hZGVyLm9wdGlvbnNcbiAgICAgICAgICAgICAgPyBPYmplY3QuYXNzaWduKHt9LCBsb2FkZXIub3B0aW9ucywgb3B0aW9ucylcbiAgICAgICAgICAgICAgOiBvcHRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxvYWRlcjtcbiAgICAgIH0pO1xuXG4gICAgICBuZXdSdWxlcy5wdXNoKG5ld1J1bGUpO1xuICAgIH1cblxuICAgIGNvbmZpZy5tb2R1bGUucnVsZXMgPSBbLi4uY29uZmlnLm1vZHVsZS5ydWxlcywgLi4ubmV3UnVsZXNdO1xuXG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBCYWJlbCBjb25maWcgdG8gYmUgbWVyZ2VkIHdpdGggTWl4J3MgZGVmYXVsdHMuXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGJhYmVsQ29uZmlnKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwbHVnaW5zOiBbXG4gICAgICAgIFtcbiAgICAgICAgICBcInJlYWN0LWNzcy1tb2R1bGVzXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZmlsZXR5cGVzOiB7XG4gICAgICAgICAgICAgIFwiLnNjc3NcIjoge1xuICAgICAgICAgICAgICAgIHN5bnRheDogXCJwb3N0Y3NzLXNjc3NcIixcbiAgICAgICAgICAgICAgICBwbHVnaW5zOiBbXCJwb3N0Y3NzLW5lc3RlZFwiXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXhjbHVkZTogXCJub2RlX21vZHVsZXNcIixcbiAgICAgICAgICAgIGhhbmRsZU1pc3NpbmdTdHlsZU5hbWU6IFwid2FyblwiLFxuICAgICAgICAgICAgZ2VuZXJhdGVTY29wZWROYW1lOiB0aGlzLnNjb3BlZE5hbWUsXG4gICAgICAgICAgICAvLyBUSElTIElTIERJUlRZIEhBQ0tcbiAgICAgICAgICAgIC8vIEFwcGVhcmFudGx5IHRoZSBjb250ZXh0IGZvciBsYXJhdmVsLW1peCBsaXZlcyBpbiB0aGUgbm9kZV9tb2R1bGVzIGZvbGRlclxuICAgICAgICAgICAgLy8gd2hlbiBjYWxjdWxhdGluZyBoYXNoZXMgZm9yIHRoZSBpZGVudCBuYW1lcy4gVGhpcyBpcyBwcmV0dHkgc2hpdHR5IGJlaGF2aW91cixcbiAgICAgICAgICAgIC8vIGJ1dCBJIGFtIHRvbyBsYXp5IHJpZ2h0IG5vdyB0byBmaXggaXQuXG4gICAgICAgICAgICBjb250ZXh0OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lICsgXCIvLi4vLi4vbGFyYXZlbC1taXgvc3JjL2J1aWxkZXJcIilcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0Q1NTTW9kdWxlcztcbiJdfQ==

mix.extend("reactCSSModules", new ReactCSSModules());


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxxQkFBcUI7QUFFNUIsR0FBQSxDQUFJLE1BQUosQ0FBVyxtQkFBbUIsSUFBSSxlQUFKO0FBSDlCIiwiZmlsZSI6ImluZGV4LmpzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtaXggZnJvbSBcImxhcmF2ZWwtbWl4XCI7XG5pbXBvcnQgUmVhY3RDU1NNb2R1bGVzIGZyb20gXCIuL1JlYWN0Q1NTTW9kdWxlc1wiO1xuXG5taXguZXh0ZW5kKFwicmVhY3RDU1NNb2R1bGVzXCIsIG5ldyBSZWFjdENTU01vZHVsZXMoKSk7XG4iXX0=

})));
