import path from 'path'
import fs from 'fs'
const dotenvPath = path.resolve(process.cwd(), '.env')
if (fs.existsSync(dotenvPath)) {
  const env = fs.readFileSync(dotenvPath, 'utf8')
  env.split('\n').forEach(line => {
    const [k,v] = line.split('=')
    if (k) process.env[k.trim()] = (v||'').trim()
  })
}

async function run() {
  const { prisma } = await import('../server/utils/prisma.js')
  await prisma.$connect()
  const users = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' }
  ]
  for (const u of users) {
    try { await prisma.user.create({ data: u }) } catch (e) { /* ignore duplicates */ }
  }
  console.log('Seed complete')
  await prisma.$disconnect()
}

run().catch(e => { console.error('Seed failed', e); process.exit(1) })
