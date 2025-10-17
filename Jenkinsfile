pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:${env.PATH}"
    }

    stages {
        stage('Print Git Commit') {
            steps {
                sh 'git rev-parse HEAD'
            }
        }

        stage('Check Node, NPM & Maven') {
            steps {
                sh '''
                which node || echo "node not found"
                which npm || echo "npm not found"
                node -v || echo "node version unknown"
                npm -v || echo "npm version unknown"

                which mvn || echo "mvn not found"
                mvn -v || echo "mvn version unknown"
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                dir('STUDENTAPI-REACT') {
                    sh '''
                    npm install
                    npm run build
                    '''
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                sh '''
                REACT_DEPLOY_DIR="/Users/vadlanibhavya/Downloads/apache-tomcat-10.1.43/webapps/reactstudentapi"

                if [ -d "$REACT_DEPLOY_DIR" ]; then
                    rm -rf "$REACT_DEPLOY_DIR"
                fi

                mkdir -p "$REACT_DEPLOY_DIR"
                cp -R STUDENTAPI-REACT/dist/* "$REACT_DEPLOY_DIR"
                '''
            }
        }

        stage('Build Backend') {
            steps {
                dir('STUDENTAPI-SPRINGBOOT') {
                    sh 'mvn clean package'
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                sh '''
                WAR_PATH="/Users/vadlanibhavya/Downloads/apache-tomcat-10.1.43/webapps/myspringbootproject.war"
                WAR_DIR="/Users/vadlanibhavya/Downloads/apache-tomcat-10.1.43/webapps/myspringbootproject"

                rm -f "$WAR_PATH"
                rm -rf "$WAR_DIR"

                cd STUDENTAPI-SPRINGBOOT/target
                cp *.war "/Users/vadlanibhavya/Downloads/apache-tomcat-10.1.43/webapps/"
                '''
            }
        }

    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}
