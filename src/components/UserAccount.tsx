import { User } from '../entities';

export interface IUserAccount {
  user: User;
}

const UserAccount = ({ user }: IUserAccount) => {
  return (
    <>
      <h2>User Profile</h2>
      {user.isAdmin && <button>Edit</button>}
      <div>
        <strong>Name:</strong> {user.name}
      </div>
    </>
  );
};

export default UserAccount;
