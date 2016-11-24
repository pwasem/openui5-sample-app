"use strict";

module.exports = function (grunt) {

  grunt.initConfig({

    dir: {
      webapp: "webapp",
      tmp: "tmp",
      dist: "dist",
      bower_components: "bower_components" // eslint-disable-line
    },

    connect: {
      options: {
        port: 8080,
        hostname: "*"
      },
      src: {},
      dist: {}
    },

    openui5_connect: { // eslint-disable-line
      options: {
        resources: [
          "<%= dir.bower_components %>/openui5-sap.ui.core/resources",
          "<%= dir.bower_components %>/openui5-sap.m/resources",
          "<%= dir.bower_components %>/openui5-themelib_sap_bluecrystal/resources",
          "<%= dir.bower_components %>/openui5-themelib_sap_belize/resources"
        ]
      },
      src: {
        options: {
          appresources: "<%= dir.webapp %>"
        }
      },
      dist: {
        options: {
          appresources: "<%= dir.dist %>"
        }
      }
    },

    openui5_preload: { // eslint-disable-line
      component: {
        options: {
          resources: {
            cwd: "<%= dir.tmp %>",
            prefix: "todo"
          },
          dest: "<%= dir.dist %>"
        },
        components: true
      }
    },

    clean: {
      tmp: "<%= dir.tmp %>/",
      dist: "<%= dir.dist %>/"
    },

    copy: {

      // Copy files from 'webapp' to 'tmp''
      tmp: {
        files: [{
          expand: true,
          cwd: "<%= dir.webapp %>",
          src: [
            "**",
            "!test/**",
            "!**/*.js" // ~ processed with babel
          ],
          dest: "<%= dir.tmp %>"
        }]
      },

      // copy files from 'tmp' to 'dist''
      dist: {
        files: [{
          expand: true,
          cwd: "<%= dir.tmp %>",
          src: "**",
          dest: "<%= dir.dist %>"
        }]
      }
    },

    eslint: {
      webapp: "<%= dir.tmp %>"
    },

    babel: {
      options: {
        presets: ["latest"],
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: "<%= dir.webapp %>",
            src: ["**/*.js"],
            dest: "<%= dir.tmp %>"
          }
        ]
      }
    },

    uglify: {
      dist: {
        files: [
          {
            expand: true,
            cwd: "<%= dir.dist %>",
            src: ["**/*.js"],
            dest: "<%= dir.dist %>"
          }
        ]
      }
    },

    cssmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: "<%= dir.dist %>",
            src: ["**/*.css"],
            dest: "<%= dir.dist %>"
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
        },
        files: [
          {
            expand: true,
            cwd: "<%= dir.dist %>",
            src: ["**/*.html"],
            dest: "<%= dir.dist %>"
          }
        ]
      }
    },

    xmlmin: {
      dist: {
        options: {
          preserveComments: false
        },
        files: [
          {
            expand: true,
            cwd: "<%= dir.dist %>",
            src: ["**/*.xml"],
            dest: "<%= dir.dist %>"
          }
        ]
      }
    },

    jsonmin: {
      dist: {
        options: {
          stripWhitespace: true
        },
        files: [
          {
            expand: true,
            cwd: "<%= dir.dist %>",
            src: ["**/*.json"],
            dest: "<%= dir.dist %>"
          }
        ]
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-openui5");
  grunt.loadNpmTasks("grunt-eslint");

  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-xmlmin");
  grunt.loadNpmTasks('grunt-jsonmin');

  // Server task
  grunt.registerTask("serve", (target) => {
    grunt.task.run("openui5_connect:" + (target || "src") + ":keepalive");
  });

  // Temporary task
  grunt.registerTask("tmp", [
    "copy:tmp",
    "babel"
  ]);

  // Linting task
  grunt.registerTask("lint", ["eslint"]);

  // Build task
  grunt.registerTask("build", [
    "tmp",
    "openui5_preload",
    "copy:dist",
    "clean:tmp",
    "uglify:dist",
    "cssmin:dist",
    "htmlmin:dist",
    "xmlmin:dist",
    "jsonmin:dist"
  ]);

  // Default task
  grunt.registerTask("default", [
    //"lint",
    "clean:dist",
    "build",
    "serve:dist"
  ]);
};
