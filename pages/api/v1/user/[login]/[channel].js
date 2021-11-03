export default function handler(req, res) {
  res.status(200).json({
    id: 1,
    pronouns: ['he'],
    badge: 'svelte',
    twitchKey: '',
    // color: 'cyan'
  })
}
