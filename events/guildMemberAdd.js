module.exports = async (client, member) => {
    const r = require('rethinkdb')
    const conn = await r.connect({
        host: '52.188.208.180',
        port: 28015,
        db: "skyndalex",
        username: "admin",
        password: "SGVyk4zyZxokja6"
    })

    const role = await r.table('autoRole').get(`${member.guild.id}`).run(conn)
    member.roles.add(role.autoRole)
}