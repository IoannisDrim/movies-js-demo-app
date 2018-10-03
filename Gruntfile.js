module.exports = function(grunt) {

  var appConfig = {
    app: 'app',
    dist: 'dist'
  }

  var watchTasks = {
    js: ['jshint'],
    css: [],
    html: [],
    img: []
  };

  grunt.initConfig({
    config: appConfig,
    connect: {
        server: {
            options: {
                port: 9000,
                hostname: 'localhost',
                base: '<%= config.app %>',
                debug: false,
                livereload: true,
                open: true
            }
        }
    },

    watch: {
      js: {
          files: [
              '<%= config.app %>/*.js',
              '<%= config.app %>/**/*.js'
          ],
          tasks:  watchTasks.js,
          options: {
              livereload: '<%= connect.server.options.livereload %>',
              spawn: false
          }
      },
      css: {
          files: [
              '<%= config.app %>/*.css',
              '<%= config.app %>/**/*.css'
          ],
          tasks:  watchTasks.css,
          options: {
              livereload:'<%= connect.server.options.livereload %>'
          }
      },
      html: {
          files: [
              '<%= config.app %>/*.html',
              '<%= config.app %>/**/*.html'
          ],
          tasks:  watchTasks.html,
          options: {
              livereload:'<%= connect.server.options.livereload %>'
          }
      }
    },

    jshint: {
      options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-stylish')
      }
    },

    injector: {
      options: {
        relative: true,
        addRootSlash: false,
        sort: function(a,b) {
          if ( a.indexOf('jqyery.min.js') >=0 ) {
            return -1;
          }
          else {
            return 1;
          }
        },
        transform: function(filePath) {
          if ( filePath.indexOf('.js') >= 0 ) {
            if ( filePath.indexOf('app.js') >=0 ) {
              return '<script src="' + filePath + '" type="module"></script>';
            }
            else {
              return '<script src="' + filePath + '"></script>';
            }
            
          }

          if ( filePath.indexOf('.css') >= 0 ) {
            return '<link rel="stylesheet" href="' + filePath + '">';
          }

          if ( filePath.indexOf('.html') >= 0 ) {
            return '<link rel="import" href="' + filePath + '">';
          }

        }
      },
      local_dependencies: {
        files: {
          '<%= config.app %>/index.html': ['<%= config.app %>/*.js', '<%= config.app %>/assets/**/*.js', '<%= config.app %>/*.css', '<%= config.app %>/**/*.css'],
        }
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, src: ['./node_modules/bootstrap/dist/css/bootstrap.min.css'], dest: '<%= config.app %>/assets/bootsrap', filter: 'isFile'},
          {expand: true, src: ['./node_modules/bootstrap/dist/js/bootstrap.min.js'], dest: '<%= config.app %>/assets/bootsrap', filter: 'isFile'},
          {expand: true, src: ['./node_modules/jquery/dist/jquery.min.js'], dest: '<%= config.app %>/assets/lib', filter: 'isFile'},
          {expand: true, src: ['./node_modules/@fortawesome/fontawesome-free/css/all.css','./node_modules/@fortawesome/fontawesome-free/webfonts/*'], dest: '<%= config.app %>/assets/lib'}
        ],
      },
    }

  })

  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('serve', [
    'copy',
    'injector',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('build', [
    ''
  ]);

};