pipeline {
    agent any

    options {
        timestamps()
        timeout(time:15, unit:'MINUTES')
        
    }

    stages {

        stage('checkout') {
            steps {
                deleteDir()
                echo 'Pulling... ' + env.GIT_BRANCH
                checkout scm
                echo "commit hash : ${env.GIT_COMMIT}, tag_name: ${env.TAG_NAME}, author: ${env.GIT_AUTHOR_NAME}"
                }
        }
        
        stage('build') {
            steps {
                echo "building the application from ${env.GIT_BRANCH}"
                sh "docker build -t front_end ."
                }
        }

        stage('test') {
            steps {
                echo "Test"
                echo "..."
                sh "docker run --name front -d -p 80:80 front_end"
                sh "if [ $(curl -LI http://127.0.0.1 -o /dev/null -w '%{http_code}\n' -s) == '200' ]; then echo 'Service is up!'; fi"
                sh "docker rm -f front"
                }
        }

    }

    post {
    always {
        echo "Job done"
        }
    }
}
