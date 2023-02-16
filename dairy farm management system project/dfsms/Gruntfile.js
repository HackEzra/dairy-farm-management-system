"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	jshint: {
		options: {
			jshintrc: '.jshintrc',
			reporter: require('jshint-stylish')
		},
		all: {
			src: [
				'Gruntfile.js',
				'!dist/js/*.js',
			]
		}
	},
    sass: {                              // Task 
		dist: {                            // Target 
		  options: {                       // Target options 
			style: 'expanded'
		  },
		  files: {                         
			'dist/css/style.css': 'src/scss/style.scss',       // 'destination': 'source' 
		  }
		}
	},
	
	watch: {
        src: {
		files: ['src/scss/style.scss'],
            tasks: ['sass:dist'],
            options: {
                spawn: false,
				livereload: 12344
            }
        }
	},
	connect: {
		server: {
		  options: {
			port: 9000,
			hostname: '0.0.0.0',
			base: '',
			open:true
		  }
		}
	},
	copy: {
	   main: {
		  files: [{
			expand: true,
			cwd: './node_modules',
			src: ['**','!**/.bin/**',
				'!**/grunt/**',
				'!**/grunt-contrib-connect/**',
				'!**/grunt-contrib-copy/**',
				'!**/grunt-contrib-jshint/**',
				'!**/grunt-contrib-sass/**',
				'!**/grunt-contrib-watch/**',
				'!**/grunt-jscs/**',
				'!**/jshint-stylish/**',
				'!**/grunt-open/**'
				],
			dest: 'vendors/',     // required when using cwd
		  }]
	   }  
	},
	  
});

  // Load all plugins.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  // Register all Tasks.
  grunt.registerTask('dist',['copy']);
  grunt.registerTask('default',  ['sass:dist','jshint:all','connect:server','watch:src']);
};