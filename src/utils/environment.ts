class Environment {

    get nodeEnv() {
        return process.env.NODE_ENV;
    }

    get isProduction() {
        return this.nodeEnv === 'production';
    }

    get isDevelopment() {
        return this.nodeEnv === 'development';
    }

    get isRunningOnHeroku() {
        return window.location.hostname.endsWith('herokuapp.com');
    }
}

const env = new Environment();

export default env;