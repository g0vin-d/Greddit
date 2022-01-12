import { login, logout } from './login';
import { subCreate } from './subreddit';
import { createPost } from './post';
import { createComment, deleteComment } from './comment';

const btnLogin = document.querySelector('.btn__login');
const btnLogOut = document.querySelector('.btn--logout');
const btnShowSubForm = document.querySelector('.btn--showSubForm');
const btnCreateSub = document.querySelector('.btn--createSub');
const btnCancalCreateSub = document.querySelector('.btn--cancalCreate');
const btnCreatePost = document.querySelector('.btn--createPost');
const btnCancelCreatePost = document.querySelector('.btn--cancelCreatePost');
const btnAddComment = document.querySelector('.btn--postComment');
// const btnDeleteComment = document.querySelector('.btn--deleteComment');
const commentSection = document.querySelector('.comments');

// Login & Logout
if (btnLogin) {
  btnLogin.addEventListener('click', (e) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}

if (btnLogOut) {
  btnLogOut.addEventListener('click', logout);
}

// Create Subreddit
if (btnShowSubForm) {
  btnShowSubForm.addEventListener('click', () => {
    document.querySelector('.createSub-form').classList.remove('hidden');
  });
}
if (btnCancalCreateSub) {
  btnCancalCreateSub.addEventListener('click', () => {
    document.querySelector('.createSub-form').classList.add('hidden');
  });
}

if (btnCreateSub) {
  btnCreateSub.addEventListener('click', (e) => {
    const name = document.getElementById('title').value;
    const desc = document.getElementById('desc').value;
    subCreate(name, desc);
  });
}

// Create Post
if (btnCreatePost) {
  btnCreatePost.addEventListener('click', (e) => {
    const selectOption = document.getElementById('subreddits').value;
    const title = document.getElementById('title').value;
    const desc = document.getElementById('desc').value;
    createPost(selectOption, title, desc);
  });
}

if (btnAddComment) {
  btnAddComment.addEventListener('click', (e) => {
    const post = window.location.pathname.split('/')[2];
    const comment = document.getElementById('desc').value;

    createComment({ post, comment });
  });
}

if (commentSection) {
  commentSection.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn--deleteComment')) {
      const id = e.target.closest('.comment').dataset.commentid;
      await deleteComment(id);
      commentSection.removeChild(e.target.closest('.comment'));
    }
  });
}
