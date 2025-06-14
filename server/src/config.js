require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5001,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/future_letters',
  JWT_SECRET: process.env.JWT_SECRET || 'b9792f9d9e5e60a8f78e02fa06614d2d53c2f3b0309fb29d639d905b3575bf5734894ba358b47f64466bc0e6e9afa09f5dca626b618ff7209fa283c0e9c90839',
  EMAIL: {
    USER: process.env.EMAIL_USER || 'sukruthcr8269@gmail.com',
    PASS: process.env.EMAIL_PASS || 'aefr nkjr dzct rwpg'
  },
  NODE_ENV: process.env.NODE_ENV || 'development'
}; 