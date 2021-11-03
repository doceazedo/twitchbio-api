import prismaClient from "../../../../database"

export default async function handler(req, res) {
  const { login } =  req.query;
  const body = req.body || null;

  switch (req.method) {
    case "GET":
      const user = await prismaClient.user.findUnique({
        where: {
          id: Number(login)
        },
        include: {
          pronouns: {
            include: { pronoun: true }
          }
        }
      });

      res.status(200).json(user)
      break;
    case "POST":
      if(!body.id || !body.twitchOauth) {
        return res.status(400).json({
          error: 'Missing id or twitchOauth'
        });
      }

      await prismaClient.user.create({
        data: body
      })
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).json({ error: err }));

      break;
    case "PUT":
      if(!body.id) {
        return res.status(400).json({
          error: 'Missing id'
        });
      }

      delete body.id;

      await prismaClient.user.update({
        where: {
          id: Number(body.id)
        },
        data: body
      })
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).json({ error: err }));
      break;
  }
}
