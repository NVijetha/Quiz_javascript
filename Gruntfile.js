module.exports = function(grunt){
    grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
		jshint: {
		    all: ['scripts/main.js', 'scripts/quiz.js', 'scripts/questions.js']
		},
		concat: {
			'myproject': {
				src: ['scripts/main.js', 'scripts/questions.js', 'scripts/quiz.js'],
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
		    'myproject' : {
				src: 'build/**/*.min.js',
				options: {
					specs: 'spec/**/*_spec.js'
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.registerTask('default',['jshint', 'concat', 'uglify', 'jasmine']);
};