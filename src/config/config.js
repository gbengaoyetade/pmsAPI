require('dotenv').load();

const config = {
  development: {
    use_env_variable: 'DEV_DB',
    dialect: 'postgres',
    logging: false,
  },
  test: {
    use_env_variable: 'TEST_DB',
    dialect: 'postgres',
    logging: false,
  },
};
export default config;
