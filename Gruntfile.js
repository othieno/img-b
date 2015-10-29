module.exports = function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON("package.json"),
        copy:{
            main:{
                src:"src/**",
                dest:"dist/uncompressed",
                flatten:true,
                expand:true,
                filter:"isFile"
            }
        },
        cssmin:{
            target:{
                files:[{
                    expand:true,
                    cwd:"<%= copy.main.dest %>",
                    src:["*.css", "!*.min.css"],
                    dest:"dist/compressed",
                    ext:".min.css"
                }]
            }
        },
        jshint:{
            files:[
                "Gruntfile.js",
                "src/**/*.js",
                "test/**/*.js"
            ],
            options:{
                globals:{
                    console:true,
                    module:true,
                    document:true
                }
            }
        },
        uglify:{
            options:{
                banner:"/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> License. Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author %>. */\n"
            },
            dist:{
                files:{
                    "dist/compressed/<%= pkg.name %>.min.js":["<%= copy.main.dest %>/<%= pkg.name %>.js"]
                }
            }
        },
        watch:{
            files:["<%= jshint.files %>"],
            tasks:["jshint", "qunit"]
        },
        qunit:{
            files:["test/**/*.html"]
        }
    });
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-qunit");

    grunt.registerTask("test", ["jshint","qunit"]);
    grunt.registerTask("default", ["jshint","qunit","copy","cssmin","uglify"]);
};
