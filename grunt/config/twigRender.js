module.exports = function (grunt) {
    return {
        options: {
            namespaces: {
                data: '<%= paths.src %>/html/data/',
                layouts: '<%= paths.src %>/html/layouts/',
                partials: '<%= paths.src %>/html/partials/',
                components: '<%= paths.src %>/components/',
                macros: '<%= paths.src %>/html/macros/',
            },
            extensions: [
                function (Twig) {
                    Twig.exports.extendFunction('data', function (filename) {
                        const namespacePath = Twig.path.parsePath.apply(this, [this, filename]);

                        if (/\.yml$/i.test(namespacePath) || /\.yaml/i.test(namespacePath)) {
                            return grunt.file.readYAML(namespacePath);
                        }
                        return grunt.file.readJSON(namespacePath);

                    });
                },
            ],
        },
        dev: {
            files: [
                {
                    data: {
                        production: false,
                        currentTimestamp: (new Date()).getTime(),
                    },
                    expand: true,
                    cwd: '<%= paths.src %>/html/pages/',
                    src: ['**/*.twig'],
                    dest: '<%= paths.static %>/',
                    ext: '.html',
                },
            ],
        },
        dist: {
            files: [
                {
                    data: [
                        {
                            production: true,
                            currentTimestamp: (new Date()).getTime(),
                        },
                    ],
                    expand: true,
                    cwd: '<%= paths.src %>/html/pages/',
                    src: ['**/*.twig'],
                    dest: '<%= paths.static %>/',
                    ext: '.html',
                },
            ],
        },
    };
};
