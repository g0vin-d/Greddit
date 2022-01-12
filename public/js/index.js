import { login, logout } from './login';
import { subCreate } from './subreddit';
import { createPost, setVote } from './post';
import { createComment, deleteComment } from './comment';

const main2 = document.querySelector('.main-2');
const btnLogin = document.querySelector('.btn__login');
const btnLogOut = document.querySelector('.btn--logout');
const btnShowSubForm = document.querySelector('.btn--showSubForm');
const btnCreateSub = document.querySelector('.btn--createSub');
const btnCancalCreateSub = document.querySelector('.btn--cancalCreate');
const btnCreatePost = document.querySelector('.btn--createPost');
const btnCancelCreatePost = document.querySelector('.btn--cancelCreatePost');
const btnAddComment = document.querySelector('.btn--postComment');
const commentSection = document.querySelector('.comments');
const voteSection = document.querySelector('.post__vote-section');

// Login
if (btnLogin) {
  btnLogin.addEventListener('click', (e) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}

// Logout
if (btnLogOut) {
  btnLogOut.addEventListener('click', logout);
}

// Show Create Subreddit form
if (btnShowSubForm) {
  btnShowSubForm.addEventListener('click', () => {
    document.querySelector('.createSub-form').classList.remove('hidden');
  });
}

// Hide create Subreddit form
if (btnCancalCreateSub) {
  btnCancalCreateSub.addEventListener('click', () => {
    document.querySelector('.createSub-form').classList.add('hidden');
  });
}

// Create Subreddit
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

// Add comment
if (btnAddComment) {
  btnAddComment.addEventListener('click', async (e) => {
    const post = window.location.pathname.split('/')[2];
    const comment = document.getElementById('desc').value;

    await createComment({ post, comment });
    const noOfComments = document.querySelector('.post__comments-link');
    const newCount = +noOfComments.innerHTML.split(' ')[0] + 1;
    noOfComments.innerHTML = `${newCount} <span>Comments</span>`;
  });
}

// Delete Comment
if (commentSection) {
  commentSection.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn--deleteComment')) {
      const id = e.target.closest('.comment').dataset.commentid;
      await deleteComment(id);
      commentSection.removeChild(e.target.closest('.comment'));
      const noOfComments = document.querySelector('.post__comments-link');
      const newCount = +noOfComments.innerHTML.split(' ')[0] - 1;
      noOfComments.innerHTML = `${newCount} <span>Comments</span>`;
    }
  });
}

// Upvote & Downvote
if (main2) {
  main2.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn--upvote')) {
      const voteSection = e.target.closest('.post__vote-section');
      post = voteSection.dataset.postid;

      // set vote
      const vote = await setVote(post, 'upvote');

      voteSection.querySelector('.post__vote-text').textContent = vote;
      voteSection.querySelector('.fa-arrow-up').classList.add('red');
      voteSection.querySelector('.fa-arrow-down').classList.remove('red');
    } else if (e.target.classList.contains('btn--downvote')) {
      const voteSection = e.target.closest('.post__vote-section');
      post = voteSection.dataset.postid;

      // set vote
      const vote = await setVote(post, 'downvote');

      voteSection.querySelector('.post__vote-text').textContent = vote;

      voteSection.querySelector('.fa-arrow-up').classList.remove('red');
      voteSection.querySelector('.fa-arrow-down').classList.add('red');
    }
  });
}
