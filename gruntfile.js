module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dist: {
                options: {
                    sassDir: 'css/sass',
                    cssDir: 'css',
                    require: 'susy',
                    outputStyle: 'expanded'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'css/*.css',
                dest: 'css'
            }
        },

        cssmin: {
            combine: {
                files: {
                    'css/global.css': ['css/global.css']
                }
            }
        },

        jshint: {
            beforeconcat: ['js/*.js']
        },

        concat: {
            dist: {
                src: [
                    'js/vendor/*.js',
                    'js/main.js'
                ],
                dest: 'js/build/production.js'
            }
        },

        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            html: {
                files: ['index.html'],
                options: {
                    spawn: false,
                }
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify', 'jshint'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['css/sass/*.scss', 'css/sass/partials/*.scss'],
                tasks: ['compass', 'autoprefixer', 'cssmin'],
                options: {
                    spawn: false,
                }
            },
            images: {
                files: ['img/**/*.{png,jpg,gif}', 'img/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: './'
                }
            }
        },

    });

    require('load-grunt-tasks')(grunt);

    // Default Task is basically a rebuild
    grunt.registerTask('default', ['concat', 'uglify', 'compass', 'autoprefixer', 'cssmin', 'imagemin']);

    grunt.registerTask('dev', ['connect', 'watch']);

};