import React from 'react';
import classNames from 'classnames';

import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  chosenPost: Post | null,
  setChosenPost: React.Dispatch<Post | null>
};

export const PostsList: React.FC<Props> = ({
  posts,
  chosenPost,
  setChosenPost,
}) => {
  const handlePostChoosing = (post: Post) => {
    if (post.id === chosenPost?.id) {
      setChosenPost(null);
    } else {
      setChosenPost(post);
    }
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': post.id !== chosenPost?.id,
                  })}
                  onClick={() => handlePostChoosing(post)}
                >
                  {post.id !== chosenPost?.id ? 'Open' : 'Close'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};