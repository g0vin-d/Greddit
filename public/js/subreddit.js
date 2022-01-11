import axios from 'axios';
import { showAlert } from './alert';

export const subCreate = async (name, description) => {
  console.log(name, description);
  try {
    const res = await axios({
      method: 'post',
      url: '/api/r/create',
      data: {
        name,
        description,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Subreddit created.');
      window.setTimeout(() => {
        location.assign('/r/allSubs');
      }, 2000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
