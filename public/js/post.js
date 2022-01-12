import axios from 'axios';
import { showAlert } from './alert';

export const createPost = async (selectOption, title, message) => {
  try {
    subreddit = selectOption.split('-')[1];
    console.log(subreddit);

    const res = await axios({
      method: 'post',
      url: '/api/post',
      data: {
        subreddit,
        title,
        message,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'post created.');
      window.setTimeout(() => {
        location.assign('/');
      }, 1 * 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const setVote = async (id, vote) => {
  try {
    const res = await axios({
      method: 'patch',
      url: `/api/post/${vote}/${id}`,
    });

    if (res.data.status == 'success') {
      return res.data.post.votes;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
