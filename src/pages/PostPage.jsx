import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, Typography, Button, Card, CardContent, Chip } from '@mui/material';
import { getPost, deletePost } from '../api/user'; // deletePostをインポート
import { useParams, Link, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify'; // XSS対策のためのDOMPurifyをインポート
import { marked } from 'marked'; // マークダウンをHTMLに変換するためのライブラリ

const PostPage = () => {
  const { id } = useParams(); // URLパラメータからidを取得
  const navigate = useNavigate(); // 削除後に別ページにリダイレクトするために使用

  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  // 日付をJSTに変換する関数
  const formatDateToJST = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Tokyo'
    };
    return new Intl.DateTimeFormat('ja-JP', options).format(date);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const result = await getPost(id);
      if (result.error) {
        setError(result.error);
      } else {
        setPost(result.post);
        setTags(result.tags);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const result = await deletePost(id);
    if (result.error) {
      setError(result.error);
    } else {
      console.log(result.message || 'Post deleted successfully');
      alert(result.message || 'Post deleted successfully');
      navigate('/'); // 削除後にホームページにリダイレクト
    }
  };

  if (error) return <div>{error}</div>;
  if (!post) return <div>Loading...</div>; // postがnullの場合にローディングメッセージを表示

  // マークダウンをHTMLに変換し、サニタイズ
  const sanitizedContent = DOMPurify.sanitize(marked(post.content));

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', color: '#fff', pb: 8 }}>
      <Box sx={{ bgcolor: '#000', py: 2, pl: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: '#fff', fontSize: '1.8rem', mr: 1, mt: 1, ml: 1 }}>
          GPT
        </Typography>
        <Typography variant="h5" sx={{ color: '#89CFF0', fontSize: '1.8rem', mt: 1 }}>
          CodeCure
        </Typography>
      </Box>

      <AppBar position="static" sx={{ bgcolor: '#000', borderBottom: '1px solid #444' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Tabs sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tab label="Home" component={Link} to="/" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="Gpt" component={Link} to="/gpt" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="New" component={Link} to="/new/post" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="Profile" component={Link} to="/user" sx={{ color: '#fff' }} />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center', mb: 5 }}>
        <Card sx={{ width: '600px', p: 2, bgcolor: '#1c1c1c', borderRadius: '8px', border: '2px solid #7F00FF' }}>
          <CardContent>
            <Typography variant="subtitle2" sx={{ color: '#aaa', mb: 1 }}>
              {formatDateToJST(post.created_at)}
            </Typography>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              {post.title}
            </Typography>
            <Box
              sx={{ color: '#fff', mb: 2 }}
              dangerouslySetInnerHTML={{ __html: sanitizedContent }} // サニタイズされたHTMLを表示
            />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <Chip key={tag.id} label={tag.name} sx={{ bgcolor: '#e0e0e0' }} />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Container>

      {/* Fixed Delete Button Section */}
      <Box sx={{ bottom: 0, left: 0, width: '100%', bgcolor: '#000', py: 2, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
          Do you delete the Post?
        </Typography>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          DELETE
        </Button>
      </Box>
    </Box>
  );
};

export default PostPage;
