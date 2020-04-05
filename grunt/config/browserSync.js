module.exports = function (grunt) {
    return {
        dev: {
            bsFiles: {
                src: [
                    '<%= paths.static %>/img/**/*.{jpg,jpeg,png,gif,ico,svg}',
                    '<%= paths.static %>/generated/**/*.{css,js}',
                    '<%= paths.static %>/**/*.html',
                ],
            },
            options: {
                open: false,
                online: true,
                watchTask: true,
                port: grunt.option('port') || 3000,
                ui: {
                    port: grunt.option('port') + 1 || 3001,
                },
                server: {
                    baseDir: ['<%= paths.static %>'],
                },
                ghostMode: false,
            },
        },
    };
};
