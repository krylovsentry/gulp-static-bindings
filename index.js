'use strict';
const gutil = require('gulp-util');
const through = require('through2');

const PluginError = gutil.PluginError;

const regex = /\[(.*?)\]=\"\'(.*?)\'\"/g;
const propRegex= /\[(.*?)\]/;
const valueRegex = /\"\'(.*?)\'\"/;
const PLUGIN_NAME = 'gulp-static-bindings'

module.exports = () => {
    return through.obj(function(file, enc, cb) {
        if (file === null) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return;
        }

        try {
            const data = file.contents.toString()
                .split('\n')
                .map((line) => {
                    const matches = line.match(regex);
                    let copyLine = line;
                    if (matches) {
                        matches.forEach((matchInLine) => {
                            const property = matchInLine.match(propRegex)[1];
                            const value = matchInLine.match(valueRegex)[1];

                            copyLine = copyLine.replace(matchInLine, `${property}="${value}"`);
                        });
                    }
                    return copyLine;
                })
                .join('\n');
            file.contents = new Buffer(data);
            this.push(file);
        } catch (err) {
            this.emit('error', new PluginError(PLUGIN_NAME, err));
        }

        cb();
    });
};
