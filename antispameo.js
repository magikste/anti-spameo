const authors = [];
var warned = [];
var kicked = [];
var messagelog = [];

/**
 * cliente anti spam! hecho por santiago#0001
 * @param  {Bot} bot - el cliente
 * @param  {object} options - optional (para configurar el bot)
 * @return {[type]}         [description]
 */
module.exports = function (bot, options) {
  // opciones
  const bufferAdvertencias = (options && options.bufferAdvertencias) || 3;
  const bufferMaximo = (options && options.bufferMaximo) || 5;
  const tiempo = (options && options.tiempo) || 1000;
  const mensajeAdvertencia = (options && options.mensajeAdvertencia) || "Deja de spamear por favor.";
  const mensajeKick = (options && options.mensajeKick) || "Fue kickeado por spamear, alguien más?";
  const maxDuplicadosWarn = (options && options. maxDuplicadosWarn || 7);
  const maxDuplicadosKick = (options && options. maxDuplicadosKick || 10);
  const exceptoRol = (options && options.exceptoRol) || []
  const exceptoUsuario = (options && options.exceptoUsuario) || []

  bot.on("message", msg => {

    // porque los bots a de banear los bots .-.
    if (msg.author.bot) return;

    // si el usuario esta en la lista de exceptoRol o exceptoUsuario va a detener!
    if(msg.member && msg.member.roles.some(r => exceptoRol.includes(r.name))) return;
    if(exceptoUsuario.includes(msg.author.tag)) return;

    if ((msg.author.id != bot.user.id) && msg.channel.guild) {
      var now = Math.floor(Date.now());
      authors.push({
        "time": now,
        "author": msg.author.id
      });
      messagelog.push({
        "message": msg.content,
        "author": msg.author.id
      });

      // Probando cuantos mensajes ha mandado el usuario.
      var msgMatch = 0;
      for (var i = 0; i < messagelog.length; i++) {
        if (messagelog[i].message == msg.content && (messagelog[i].author == msg.author.id) && (msg.author.id !== bot.user.id)) {
          msgMatch++;
        }
      }
      // Check matched count
      if (msgMatch == maxDuplicadosWarn && !warned.includes(msg.author.id)) {
        warn(msg, msg.author.id);
      }
      if (msgMatch == maxDuplicadosKick && !kicked.includes(msg.author.id)) {
        kick(msg, msg.author.id);
      }

      var matched = 0;

      for (var i = 0; i < authors.length; i++) {
        if (authors[i].time > now - tiempo) {
          matched++;
          if (matched == bufferAdvertencias && !warned.includes(msg.author.id)) {
            warn(msg, msg.author.id);
          }
          else if (matched == bufferMaximo) {
            if (!kicked.includes(msg.author.id)) {
              kick(msg, msg.author.id);
            }
          }
        }
        else if (authors[i].time < now - tiempo) {
          authors.splice(i);
          warned.splice(warned.indexOf(authors[i]));
          kicked.splice(warned.indexOf(authors[i]));
        }
        if (messagelog.length >= 200) {
          messagelog.shift();
        }
      }
    }
  });

  /**
   * warn user por id
   * @param  {Object} msg
   * @param  {string} userid userid
   */
  function warn(msg, userid) {
    warned.push(msg.author.id);
    msg.channel.send(msg.author + " " + mensajeAdvertencia)
  }

  /**
   * kick a user por id
   * @param  {Object} msg
   * @param  {string} userid userid
   * @return {boolean} True or False
   */
  function kick(msg, userid) {
    for (var i = 0; i < messagelog.length; i++) {
      if (messagelog[i].author == msg.author.id) {
        messagelog.splice(i);
      }
    }

    kicked.push(msg.author.id);

    var user = msg.channel.guild.members.find(member => member.user.id === msg.author.id);
    if (user) {
      user.kick().then((member) => {
        msg.channel.send(msg.author + " " + mensajeKick)
        return true;
     }).catch(() => {
        msg.channel.send(`No tengo los permisos suficientes para kickear a ${msg.author}!`);
        return false;
     });
    }
  }

}
