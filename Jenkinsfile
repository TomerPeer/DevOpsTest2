pipeline {

    environment {
        registry = "fleeing/counternodeapp"
        registryCredential = ‘dockerhub’
        dockerImage = ''
    }

    agent any

    stages {        
        stage('Test') {

            agent { 
                dockerfile {
                        args "-p 3000:3000"
                    }
                }

            steps {
                sh 'npm start &'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }

        stage('Building image') {
            steps{
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }

        stage('Deploy Image') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Remove Unused docker image') {
            steps{
                sh "docker rmi $registry:$BUILD_NUMBER"
            }
        }
    }
}