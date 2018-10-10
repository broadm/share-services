name := """rest-api"""
organization := "com.example"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.12.6"

libraryDependencies += guice
libraryDependencies += "aopalliance" % "aopalliance" % "1.0"
libraryDependencies += "io.dropwizard.metrics" % "metrics-core" % "3.2.1"

// test dependencies
libraryDependencies += "org.mockito" % "mockito-all" % "1.9.5" % "test"
