pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:${env.PATH}"
        TOMCAT_HOME = "/Users/vadlanibhavya/Downloads/apache-tomcat-10.1.43"
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
                REACT_DEPLOY_DIR="${TOMCAT_HOME}/webapps/reactstudentapi"

                rm -rf "$REACT_DEPLOY_DIR"
                mkdir -p "$REACT_DEPLOY_DIR"
                cp -R STUDENTAPI-REACT/dist/* "$REACT_DEPLOY_DIR"
                '''
            }
        }

        stage('Build Backend') {
            steps {
                dir('STUDENTAPI-SPRINGBOOT') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                sh '''
                WAR_PATH="${TOMCAT_HOME}/webapps/myspringbootproject.war"
                WAR_DIR="${TOMCAT_HOME}/webapps/myspringbootproject"

                rm -f "$WAR_PATH"
                rm -rf "$WAR_DIR"

                cp STUDENTAPI-SPRINGBOOT/target/*.war "$WAR_PATH"
                '''
            }
        }

        // Optional: restart Tomcat if needed
        stage('Restart Tomcat') {
            steps {
                sh '''
                ${TOMCAT_HOME}/bin/shutdown.sh || true
                sleep 5
                ${TOMCAT_HOME}/bin/startup.sh
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
