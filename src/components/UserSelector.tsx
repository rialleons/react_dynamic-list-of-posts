import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { getUsers } from '../api/user';
import { User } from '../types/User';

type Props = {
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<User>,
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isSelectingUser, setIsSelectingUser] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleUserSelector = () => {
    setIsSelectingUser(!isSelectingUser);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsSelectingUser(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isSelectingUser,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleUserSelector}
        >
          <span>
            {selectedUser ? selectedUser.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => handleUserSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};