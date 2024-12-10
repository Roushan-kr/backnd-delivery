const conf = {
    PORT : process.env.PORT || 3000,
    DB_URL : process.env.DB_URL ,
}

Object.freeze(conf);

export default conf;
