import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { withSession } from 'lib/withSession';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Post } from 'src/entity/Post';

const Posts: NextApiHandler = withSession(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    const {title, content, id} = req.body;
    const user = req.session.get('currentUser');
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne<Post>('Post', id);
    post.title = title;
    post.content = content;
    await connection.manager.save(post);
    res.json(post);
  } else if (req.method === 'DELETE') {
    const id = req.query.id.toString();
    const user = req.session.get('currentUser');
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    const connection = await getDatabaseConnection();
    const result = await connection.manager.delete('Post', id)
    res.statusCode = result.affected >= 0 ? 200 : 400;
    res.end()
  }
});

export default Posts;
