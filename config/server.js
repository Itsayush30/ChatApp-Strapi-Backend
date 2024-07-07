module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', [
        'SltJaHds6HFNXjl5jxGl/Q==',
        'GPgKNe6SLiLqS74M0Ms3vA==',
        'Zp5Ghy+EIwrlW2Dt4QLHqA==',
        'ilBAJo2B35R1CI5t/kdYlQ=='
      ]),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
