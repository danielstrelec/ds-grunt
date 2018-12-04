module.exports = function(grunt) {

  // načítání tasků
  require('jit-grunt')(grunt);

  // konfigurace projektu
  grunt.initConfig({

    // sledování změn v souborech
    watch: {
      grunt: {
        files: ['Gruntfile.js']
      },
      javascript: {
        files: ['js/**/*.js', '!js/scripts.js'],
        tasks: ['makejs']
      },
      sass: {
        files: ['css/**/*.scss', 'css/**/*.css', '!css/styles.css'],
        tasks: ['makecss']
      }
    },

    // JavaScript - spojení souborů
    concat: {
      dist: {
        src: ['js/components/**/*.js', 'js/main.js'],
        dest: 'js/scripts.js'
      }
    },

    // JavaScript - minifikace
    uglify: {
      my_target: {
        files: {
          'js/scripts.js': ['js/scripts.js']
        }
      }
    },

    // CSS - generování SASS
    sass: {
      dist: {
        files: {
          'css/styles.css': 'css/styles.scss'
        }
      }
    },

    // CSS - autoprefixer
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 5 versions', 'ie >= 10', 'ios >= 7', 'android >= 4.4']
        },
        files: {
          'css/styles.css': 'css/styles.css'
        }
      }
    },

    // CSS - minifikace
    cssmin: {
      options: {
        shorthandCompacting: true
      },
      dist: {
        files: {
          'css/styles.css': 'css/styles.css'
        }
      }
    },

    // optimalizace obrázků
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

    // browser sync
    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "css/*.css",
            "js/*.js",
            "*.html",
            "*.htm",
            "*.php"
          ]
        },
        options: {
          watchTask: true,
          proxy: "http://ds-grunt.test/"
        }
      }
    }

  });

  // tasky
    // JavaScript - vytvoření
    grunt.registerTask('makejs', ['concat', 'uglify']);
    // CSS - vytvoření
    grunt.registerTask('makecss', ['sass', 'autoprefixer', 'cssmin']);
    // obrázky - optimalizace
    grunt.registerTask('images', ['newer:imagemin']);
    // defaultní task
    grunt.registerTask('default', ['browserSync', 'watch']);

};
