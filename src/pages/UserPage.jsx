// import React from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, Card, CardContent, Typography, Avatar, Grid, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useEffect, useState } from 'react';
import { getUser } from "../api/user";


// function UserPage() {
//   // サンプルデータ
//   const posts = [
//     { title: 'Title', date: 'Updated today' },
//     { title: 'Title', date: 'Updated yesterday' },
//     { title: 'Title', date: 'Updated 2 days ago' },
//     { title: 'Title', date: 'Updated today' },
//     { title: 'Title', date: 'Updated yesterday' },
//     { title: 'Title', date: 'Updated 2 days ago' },
//     { title: 'Title', date: 'Updated today' },
//     { title: 'Title', date: 'Updated 2 days ago' },
//   ];

  // // ユーザー情報の状態管理
  // const [user, setUser] = useState({ name: '', email: '' });

  // useEffect(() => {
  //   // localStorageからユーザー情報を取得
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser)); // JSONからオブジェクトに変換して保存
  //   }
  // }, []);

function UserPage({ userId }) {

    // サンプルデータ
  const posts = [
    { title: 'Title', date: 'Updated today' },
    { title: 'Title', date: 'Updated yesterday' },
    { title: 'Title', date: 'Updated 2 days ago' },
    { title: 'Title', date: 'Updated today' },
    { title: 'Title', date: 'Updated yesterday' },
    { title: 'Title', date: 'Updated 2 days ago' },
    { title: 'Title', date: 'Updated today' },
    { title: 'Title', date: 'Updated 2 days ago' },
  ];

  // ユーザー情報の状態管理
  const [user, setUser] = useState({ name: '', email: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    // コンポーネントのマウント時にユーザー情報を取得
    const fetchUser = async () => {
      const result = await getUser(userId);
      if (result.user) {
        setUser(result.user);
      } else if (result.error) {
        setError(result.error);
      }
    };

    fetchUser();
  }, [userId]);  

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', color: '#fff' }}>
      {/* AppBar with Tabs */}
      <AppBar position="static" sx={{ bgcolor: '#000', borderBottom: '1px solid #444' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Tabs value={2} textColor="inherit" indicatorColor="primary">
            <Tab label="Home" sx={{ color: '#fff' }} />
            <Tab label="New" sx={{ color: '#fff' }} />
            <Tab label="Account" sx={{ color: '#fff', borderBottom: '2px solid #7F00FF' }} />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container sx={{ display: 'flex', mt: 4 }}>
        {/* 左側のサイドバー */}
        <Box sx={{ width: '250px', bgcolor: '#1c1c1c', borderRadius: '8px', p: 3 }}>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
            {user.name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa', mb: 3 }}>
            {user.email}
          </Typography>

          <Divider sx={{ bgcolor: '#444' }} />

          <List> {/* Settingリンク　logout機能　未完成 */}
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ color: '#fff' }} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LogoutIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Log out" sx={{ color: '#fff' }} />
            </ListItem>
          </List>
        </Box>

        {/* logout時のトークン削除 */}
        {/* const logout = () => {
          localStorage.removeItem('token');
          navigate('/login');
        }; */}
        

        {/* 右側の投稿リスト */}
        <Grid container spacing={3} sx={{ ml: 4 }}>
          {posts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ display: 'flex', alignItems: 'center', bgcolor: '#1c1c1c', p: 2 }}> {/* カードの色を変更 */}
                {/* <Avatar sx={{ bgcolor: '#7F00FF', mr: 2 }}>A</Avatar> 　アバター表示　*/}
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ color: '#fff' }}> {/* 投稿内容の文字色を変更 */}
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="#aaa"> {/* 投稿日時の文字色を変更 */}
                    {post.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default UserPage;

