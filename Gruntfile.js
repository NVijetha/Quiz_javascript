//Gruntfile.js
module.exports = function(grunt){
	var srcFiles = 'scripts/*.js';
    grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
		jshint: {
		    all: [srcFiles]
		},
		concat: {
			'myproject': {
				src: [srcFiles],
				dest: 'build/fileoutput.js'
			}
		},
		uglify: {
			my_target: {
				files: {
					'build/main.min.js': ['build/fileoutput.js']
				}
			}
		},
		jasmine: {
			pivotal: {
				src: [srcFiles],
				options: {
					specs: 'scripts/spec/test_spec.js',
					timeout : 10000,
					template: require('grunt-template-jasmine-requirejs')
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'jasmine']);
};