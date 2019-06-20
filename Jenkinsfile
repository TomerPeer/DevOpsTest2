pipeline {

    environment {
        registry = "fleeing/counternodeapp"
        registryCredential = 'dockerhub'
        dockerImage = ''
    }

    agent any

    stages {        
        stage('Test') {

            agent { 
                dockerfile {
                        args "-p 3000:3000 --name test"
                    }
                }

            steps {
                sh 'npm start &'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }

        stage('Building Image') {
            steps{
                script {
                    dockerImage = docker.build registry + ":latest"
                }
            }
        }

        stage('Deploy Image to Docker Hub') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }

         stage('Deploy') {
            steps {
                input message: 'is the container still up?'
                sh './scripts/deploy.sh'
            }
        }

        stage('cleanup') {
            steps{
                sh "docker rmi $registry:latest"
            }
        }


    }
}