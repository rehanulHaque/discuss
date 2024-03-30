import paths from '@/auth/paths'
import { db } from '@/db'
import { Chip } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
db

async function TopicsList() {
    const topics = await db.topic.findMany()
    
  return (
    <div className='flex flex-row gap-2 flex-wrap'>
      {topics.map((topic) =>(
        <div key={topic.id}>
            <Link href={paths.topicShow(topic.slug)}>
                <Chip color='warning' variant='shadow'>{topic.slug}</Chip>
            </Link>
        </div>
      ))}
    </div>
  )
}

export default TopicsList
