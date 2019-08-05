pipeline {

    environment {
        registry = "fleeing/counternodeapp"
        registryCredential = 'dockerhub'
        dockerImage = ''
    }

    agent { label 'nodejnlp2' }

    stages {

        stage('Building Test Image') {
            steps{
                script {
                    docker.build registry + ":test"
                }
            }
        }

        stage('Test') {

            agent { 
                docker {
                        label 'nodejnlp2'
                        image "fleeing/counternodeapp:test"
                        args "-p 3001:3000 --name test"
                    }
                }

            steps {
                sh 'npm start &'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }

        stage('Paralell Runs'){
            parallel {
                stage('Run1') {
                    steps{
                        sh './scripts/lol.sh'
                    }
                }
                stage('Run2') {
                    steps{
                        sh './scripts/lol.sh'
                    }
                }
                stage('Run3') {
                    steps{
                        sh './scripts/lol.sh'
                    }
                }
            }
        }

        stage('Building Prod Image') {
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

        stage('Ansible Test') {

            agent { label 'ansible' }

            steps {
                    sh 'ansible-playbook -i ./inventories/hosts.ini -u jkdk ./yml/ping.yml'
            }
        }

         stage('Ansible Deploy') {

            agent { label 'ansible' }
            
            steps {
                sh 'ansible-playbook -i ./inventories/hosts.ini -u jkdk ./yml/deploy.yml'
            }
        }

        stage('Kubertenes Deploy') {

            agent { label 'kub' }

            steps {
                    sh './scripts/kubdeploy.sh'
            }
        }

        stage('cleanup') {
            steps{
                sh './scripts/cleanup.sh'
                sh 'echo done yay'
            }
        }
    }
}