import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/reducers/selectors';
import { updateUserApi } from '@api';
import { setCookie } from 'src/utils/cookie';

export const Profile: FC = () => {
  const user = useSelector(getUser);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const [updateUserError, setUpdateUserError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateUserError(null);

    const userData = {
      name: formValue.name || undefined,
      email: formValue.email || undefined,
      password: formValue.password || undefined
    };

    updateUserApi(userData)
      .then((res) => {
        setFormValue({
          ...formValue,
          password: ''
        });
      })
      .catch((err) => {
        setUpdateUserError(err.message || 'Ошибка при обновлении данных');
      });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={updateUserError || undefined}
    />
  );
};
