import PostCreateForm from '@/components/posts/PostCreateForm';
import PostList from '@/components/posts/PostList';
import { FetchPostByTopicSlug } from '@/db/quries/posts';

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}


export default function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params;

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => FetchPostByTopicSlug(slug)}/>
      </div>

      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
