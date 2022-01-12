import axios from 'axios';
import { showAlert } from './alert';

export const createComment = async ({ post, comment }) => {
  try {
    let res = await axios({
      method: 'post',
      url: '/api/comment',
      data: {
        post,
        comment,
      },
    });

    res = await axios({
      method: 'get',
      url: `/api/comment/${res.data.data.newCom._id}`,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'comment created.');
      const com = res.data.data.comment;
      const markup = `
          <div class="comment" data-commentId=${com._id}>
            <div class="comment__box">
              <p class="comment__author">u/${com.commenter.username}</p>
              <p class="comment__message">${com.comment}</p>
            </div>
            <a href="#/" class="btn btn--comment btn--deleteComment">Delete</a>
          </div>
      `;
      document
        .querySelector('.comments')
        .insertAdjacentHTML('afterbegin', markup);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteComment = async (id) => {
  try {
    console.log(id);
    const res = await axios({
      method: 'delete',
      url: `/api/comment/${id}`,
    });

    console.log(res);
    if (res.status === 204) {
      showAlert('success', 'comment deleted.', 2);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
